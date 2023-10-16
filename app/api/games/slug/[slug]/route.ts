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

interface GETGameBySlugQuery {
    params: {
        slug: string
    }
}

export async function GET(_request: NextRequest, query: GETGameBySlugQuery) {
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

        return results.length
            ? HttpResponse(results[0]) : HttpResponse(null, false, NotFoundError)
    })
    .catch(err => HttpResponse(null, false, IGDBError(err)))
}