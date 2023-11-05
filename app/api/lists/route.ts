import { ListAction, ListState, ListType } from "@/lib/enums";
import {
    HttpResponse,
    MissingBodyError
} from "@/lib/utils"
import { clerkClient } from "@clerk/nextjs";
import { VercelPoolClient, db } from "@vercel/postgres"
import { NextRequest } from "next/server"

const getLists = async (userId: string, client: VercelPoolClient): Promise<Response> => {
    if (!userId) return HttpResponse(null, false, MissingBodyError)
    const { rows } = await client.query(`SELECT * FROM list WHERE user_id = $1`, [userId])

    return HttpResponse(rows, true)
}

const getAll = async (userId: string, client: VercelPoolClient): Promise<Response> => {
    if (!userId) return HttpResponse(null, false, MissingBodyError)
    const { rows } = await client.query(`SELECT * FROM list_item WHERE user_id = $1;`, [userId])

    return HttpResponse({
        [ListType.Favorite]: rows.filter((list) => list.list_type === ListType.Favorite),
        [ListType.Playlist]: rows.filter((list) => list.list_type === ListType.Playlist),
        [ListType.Finished]: rows.filter((list) => list.list_type === ListType.Finished),
        [ListType.Custom]: rows.filter((list) => !!list.Custom_list_id)
    }, true)
}

const get = async (userId: string, gameId: number, client: VercelPoolClient): Promise<Response> => {
    if (!userId || !gameId) return HttpResponse(null, false, MissingBodyError)
    const { rows } = await client.query(
        `SELECT * FROM list_item WHERE user_id = $1 AND game = $2;`,
        [userId, gameId]
    )

    return HttpResponse({
        [ListType.Favorite]: rows.some((list) => list.list_type === ListType.Favorite) ? ListState.Active : ListState.Inactive,
        [ListType.Playlist]: rows.some((list) => list.list_type === ListType.Playlist) ? ListState.Active : ListState.Inactive,
        [ListType.Finished]: rows.some((list) => list.list_type === ListType.Finished) ? ListState.Active : ListState.Inactive,
        [ListType.Custom]: ListState.Inactive
    }, true)
}

const add = async (
    userId: string,
    gameId: number,
    listId: number | null,
    listType: ListType,
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
        // await updateListsMetadata(userId, client)
        return HttpResponse(null, true)
    }

    return HttpResponse(null, false, {
        status: 500,
        message: "Could not add the game to the list"
    })
}

const remove = async (
    userId: string,
    gameId: number,
    listId: number | null,
    listType: ListType,
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
        // await updateListsMetadata(userId, client)
        return HttpResponse(null, true)
    }

    return HttpResponse(null, false, {
        status: 500,
        message: "Could not remove the game from the list"
    })
}

export async function POST(_request: NextRequest) {
    const client = await db.connect()
    const { userId, gameId, listId, listType, action } = await _request.json()
    if (!action) return HttpResponse(null, false, MissingBodyError)

    const actions: Record<ListAction, () => Promise<Response>> = {
        [ListAction.AddGame]: () => add(userId, gameId, listId, listType, client),
        [ListAction.RemoveGame]: () => remove(userId, gameId, listId, listType, client),
        [ListAction.GetGame]: () => get(userId, gameId, client),
        [ListAction.GetAllGames]: () => getAll(userId, client),
        [ListAction.GetLists]: () => getLists(userId, client),
    }

    try {
        return await actions[action as ListAction]()
    } catch (error) {
        return HttpResponse(null, false, {
            status: 500,
            message: String(error)
        })
    }
}