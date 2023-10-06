import { IGDBEndpoints } from "@/lib/enums/endpoints"
import { IGame } from "@/lib/models/game"
import { InvalidParams, MissingParamsError, NotFoundError, ResponseError } from "@/lib/utils/errors"
import { IGDBError, postIGDB } from "@/lib/utils/igdb"
import { HttpResponse } from "@/lib/utils/response"
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
        IGDBEndpoints.Game,
        `fields *; where slug="${slug}";`
    ).then(async (response) => {
        if (!response.ok) {
            return HttpResponse(null, false, ResponseError(response))
        }

        const results: IGame[] = await response.json()
        return results.length
            ? HttpResponse(results[0])
            : HttpResponse(null, false, NotFoundError)
    })
    .catch(err => HttpResponse(null, false, IGDBError(err)))
}