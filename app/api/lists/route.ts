import { ListActions, ListStates, ListTypes } from '@/lib/enums';
import {
    HttpResponse,
    ListNameSchemma,
    MissingBodyError
} from '@/lib/utils'
import { VercelPoolClient, db } from '@vercel/postgres'
import { NextRequest } from 'next/server'
import { parse, ValiError, flatten } from 'valibot'

const createList = async (userId: string, name: string, client: VercelPoolClient): Promise<Response> => {
    if (!userId || !name) return HttpResponse(null, false, MissingBodyError)

    try {
        parse(ListNameSchemma, name);

        const { rowCount } = await client.query('INSERT INTO list (user_id, name) VALUES ($1, $2);', [
            userId,
            name
        ]);

        if (rowCount > 0) {
            return HttpResponse(null, true)
        }

        return HttpResponse(null, false, {
            status: 500,
            message: 'Could not create list. Please try again later.'
        })
    } catch (error) {
        const message = flatten(error as ValiError).root?.join('. ') ?? ''
        return HttpResponse(null, false, { status: 500, message })
    }
}

const deleteList = async (
    listId: number,
    client: VercelPoolClient
): Promise<Response> => {
    if (!listId) return HttpResponse(null, false, MissingBodyError)
    const { rowCount } = await client.query('DELETE FROM list WHERE id = $1', [listId]);

    if (rowCount > 0) {
        return HttpResponse(null, true)
    }

    return HttpResponse(null, false, {
        status: 500,
        message: 'Could not delete the list'
    })
}

const getLists = async (userId: string, client: VercelPoolClient): Promise<Response> => {
    if (!userId) return HttpResponse(null, false, MissingBodyError)
    const { rows } = await client.query('SELECT * FROM list WHERE user_id = $1', [userId])

    return HttpResponse(rows, true)
}

const getAll = async (userId: string, client: VercelPoolClient): Promise<Response> => {
    if (!userId) return HttpResponse(null, false, MissingBodyError)
    const { rows } = await client.query('SELECT * FROM list_item WHERE user_id = $1;', [userId])

    return HttpResponse({
        [ListTypes.Favorite]: rows.filter((list) => list.list_type === ListTypes.Favorite),
        [ListTypes.Playlist]: rows.filter((list) => list.list_type === ListTypes.Playlist),
        [ListTypes.Finished]: rows.filter((list) => list.list_type === ListTypes.Finished),
        [ListTypes.Custom]: rows.filter((list) => !!list.custom_list_id)
    }, true)
}

const get = async (userId: string, gameId: number, client: VercelPoolClient): Promise<Response> => {
    if (!userId || !gameId) return HttpResponse(null, false, MissingBodyError)
    const { rows } = await client.query(
        'SELECT * FROM list_item WHERE user_id = $1 AND game = $2;',
        [userId, gameId]
    )

    return HttpResponse({
        [ListTypes.Favorite]: rows.some((list) => list.list_type === ListTypes.Favorite) ? ListStates.Active : ListStates.Inactive,
        [ListTypes.Playlist]: rows.some((list) => list.list_type === ListTypes.Playlist) ? ListStates.Active : ListStates.Inactive,
        [ListTypes.Finished]: rows.some((list) => list.list_type === ListTypes.Finished) ? ListStates.Active : ListStates.Inactive,
        [ListTypes.Custom]: ListStates.Inactive
    }, true)
}

const add = async (
    userId: string,
    gameId: number,
    listId: number | null,
    listType: ListTypes,
    client: VercelPoolClient
): Promise<Response> => {
    if (!userId || !gameId || !listType) return HttpResponse(null, false, MissingBodyError)
    const { rowCount } = await client.query('INSERT INTO list_item VALUES ($1, $2, $3, $4);', [
        userId,
        listType,
        listId,
        gameId
    ]);

    if (rowCount > 0) {
        return await getAll(userId, client)
    }

    return HttpResponse(null, false, {
        status: 500,
        message: 'Could not add the game to the list'
    })
}

const remove = async (
    userId: string,
    gameId: number,
    listId: number | null,
    listType: ListTypes,
    client: VercelPoolClient
): Promise<Response> => {
    if (!userId || !gameId || !listType) return HttpResponse(null, false, MissingBodyError)
    const { rowCount } = await client.query(`DELETE FROM list_item WHERE
        user_id = $1 AND
        list_type = $2 AND
        ${listId !== null ? 'custom_list_id = $3' : 'custom_list_id IS NULL'} AND
        game = ${listId !== null ? '$4' : '$3'};`,
    listId !== null ? [userId, listType, listId, gameId] : [userId, listType, gameId]);

    if (rowCount > 0) {
        return await getAll(userId, client)
    }

    return HttpResponse(null, false, {
        status: 500,
        message: 'Could not remove the game from the list'
    })
}

export async function POST(_request: NextRequest) {
    const client = await db.connect()
    const { userId, gameId, listId, listType, action, name } = await _request.json()
    if (!action) return HttpResponse(null, false, MissingBodyError)

    const actions: Record<ListActions, () => Promise<Response>> = {
        [ListActions.AddGame]: () => add(userId, gameId, listId, listType, client),
        [ListActions.RemoveGame]: () => remove(userId, gameId, listId, listType, client),
        [ListActions.GetGame]: () => get(userId, gameId, client),
        [ListActions.GetAllGames]: () => getAll(userId, client),
        [ListActions.GetLists]: () => getLists(userId, client),
        [ListActions.CreateList]: () => createList(userId, name, client),
        [ListActions.DeleteList]: () => deleteList(listId, client),
    }

    try {
        return await actions[action as ListActions]()
    } catch (error) {
        return HttpResponse(null, false, {
            status: 500,
            message: String(error)
        })
    }
}