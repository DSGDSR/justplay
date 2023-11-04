import { ListAction, Endpoints } from "@/lib/enums"
import { ListsItemsResponse } from "@/lib/models/lists"
import { IHttpResponse } from "@/lib/models/response"
import { HttpResponse, ResponseError, apiUrl } from "@/lib/utils"

export const getLists = async (userId: string): Promise<IHttpResponse<ListsItemsResponse | null>> => {
    const lists: IHttpResponse<ListsItemsResponse> = await fetch(`${apiUrl}${Endpoints.Lists}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: ListAction.GetAllGames,
            userId
        })
    })
        .then(res => res.json())
        .catch(error => HttpResponse(null, false, ResponseError(error)))

    return lists
}