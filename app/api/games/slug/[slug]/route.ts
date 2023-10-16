import { IGDBEndpoints, ListState, ListType } from "@/lib/enums"
import { IGame } from "@/lib/models/game"
import {
    MissingParamsError,
    NotFoundError,
    ResponseError,
    IGDBError,
    postIGDB,
    HttpResponse
} from "@/lib/utils"
import { NextRequest } from "next/server"
import { getListsByUser } from "@/app/api/lists/route"

interface GETGameBySlugQuery {
    params: {
        slug: string
    }
}

export async function GET(_request: NextRequest, query: GETGameBySlugQuery) {
    const userId = _request.headers.get('userId')

    if (!query?.params?.slug) return HttpResponse(null, false, MissingParamsError)
    const { slug } = query.params

    return await postIGDB(
        IGDBEndpoints.Games,
        `fields *,screenshots.*,cover.*,videos.*,genres.*,involved_companies.*,platforms.*,external_games.*;
         where slug="${slug}";`
    ).then(async (response) => {
        if (!response.ok) {
            return HttpResponse(null, false, ResponseError(response))
        }

        const results: IGame[] = await response.json()

        let lists = null
        if (!!userId) {
            lists = await getListsByUser(userId, results[0].id)
        }

        return results.length
            ? HttpResponse({
                ...results[0],
                ...lists ? {
                    lists: {
                        [ListType.Favorite]: lists.some((list) => list.list_type === ListType.Favorite) ? ListState.Active : ListState.Inactive,
                        [ListType.Playlist]: lists.some((list) => list.list_type === ListType.Playlist) ? ListState.Active : ListState.Inactive,
                        [ListType.Finished]: lists.some((list) => list.list_type === ListType.Finished) ? ListState.Active : ListState.Inactive,
                        [ListType.Custom]: ListState.Inactive
                    }
                } : {}
            }) : HttpResponse(null, false, NotFoundError)
    })
    .catch(err => HttpResponse(null, false, IGDBError(err)))
}