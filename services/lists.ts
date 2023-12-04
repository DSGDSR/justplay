import { ListActions, Endpoints } from "@/lib/enums"
import { List, ListsItemsResponse } from "@/lib/models/lists"
import { IHttpResponse } from "@/lib/models/response"
import { HttpResponse, ResponseError, apiUrl } from "@/lib/utils"

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