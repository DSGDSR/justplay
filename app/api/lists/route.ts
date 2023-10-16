import { ListAction, ListType } from "@/lib/enums";
import {
    HttpResponse,
    MissingBodyError
} from "@/lib/utils"
import { VercelPoolClient, db } from "@vercel/postgres"
import { NextRequest } from "next/server"

export const getListsByUser = async (userId: string, gameId: number): Promise<any[]> => {
    const client = await db.connect()
    const { rows } = await client.query(
        `SELECT * FROM list_item WHERE user_id = $1 AND game = $2;`,
        [userId, gameId]
    )

    return rows
}

const add = async (
    userId: string,
    gameId: number,
    listId: number | null,
    listType: ListType,
    client: VercelPoolClient
): Promise<Response> => {
    const { rowCount } = await client.query('INSERT INTO list_item VALUES ($1, $2, $3, $4);', [
        userId,
        listType,
        listId,
        gameId
    ]);

    return rowCount > 0
        ? HttpResponse(null, true)
        : HttpResponse(null, false, {
            status: 500,
            message: "Could not add the game to list"
        })
}

const remove = async (
    userId: string,
    gameId: number,
    listId: number | null,
    listType: ListType,
    client: VercelPoolClient
): Promise<Response> => {
    const { rowCount } = await client.query(`DELETE FROM list_item WHERE
        user_id = $1 AND
        list_type = $2 AND
        ${listId !== null ? 'custom_list_id = $3' : 'custom_list_id IS NULL'} AND
        game = ${listId !== null ? '$4' : '$3'};`,
    listId !== null ? [userId, listType, listId, gameId] : [userId, listType, gameId]);

    return rowCount > 0
        ? HttpResponse(null, true)
        : HttpResponse(null, false, {
            status: 500,
            message: "Could not remove the game from list"
        })
}

export async function POST(_request: NextRequest) {
    const client = await db.connect()
    const { userId, gameId, listId, listType, action } = await _request.json()
    if (!userId || !gameId || !listType || !action) return HttpResponse(null, false, MissingBodyError)

    const actions: Record<ListAction, () => Promise<Response>> = {
        [ListAction.Add]: () => add(userId, gameId, listId, listType, client),
        [ListAction.Remove]: () => remove(userId, gameId, listId, listType, client)
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