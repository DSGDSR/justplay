import { ListActions, Endpoints, ListTypes } from '@/lib/enums'
import { List, ListsItemsResponse } from '@/lib/models/lists'
import { IHttpResponse } from '@/lib/models/response'
import { HttpResponse, ResponseError, apiUrl } from '@/lib/utils'

export const deleteList = async (listId: number): Promise<IHttpResponse<List[]> | null> => {
    return await fetch('/api/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: ListActions.DeleteList, listId })
    }).then(res => res.json()).catch(() => null)
}

export const getLists = async (userId: string): Promise<IHttpResponse<List[]> | null> => {
    return await fetch('/api/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: ListActions.GetLists, userId })
    }).then(res => res.json()).catch(() => null)
}

export const getListedGames = async (userId: string): Promise<IHttpResponse<ListsItemsResponse | null>> => {
    const lists: IHttpResponse<ListsItemsResponse> = await fetch(`${apiUrl}${Endpoints.Lists}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: ListActions.GetAllGames,
            userId
        })
    })
        .then(res => res.json())
        .catch(error => HttpResponse(null, false, ResponseError(error)))

    return lists
}

export const createList = async (userId: string, name: string): Promise<IHttpResponse<null> | null> => {
    return await fetch('/api/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: ListActions.CreateList, name, userId })
    }).then(res => res.json()).catch((error) => HttpResponse(null, false, ResponseError(error)))
}

export const toggleList = async (
    userId: string,
    gameId: number,
    listId: string | null,
    listType: ListTypes,
    action: ListActions
): Promise<IHttpResponse<ListsItemsResponse | null> | null> => {
    return await fetch('/api/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, userId, gameId, listId, listType })
    }).then(res => res.json()).catch((error) => HttpResponse(null, false, ResponseError(error)))
}

export const removeFromList = (
    userId: string,
    gameId: number,
    listId: string,
    listType: ListTypes
) => toggleList(userId, gameId, listId, listType, ListActions.RemoveGame)


export const addToList = (
    userId: string,
    gameId: number,
    listId: string,
    listType: ListTypes
) => toggleList(userId, gameId, listId, listType, ListActions.AddGame)