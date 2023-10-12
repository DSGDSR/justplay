import { IGDBEndpoints } from "@/lib/enums"
import { IGameSearch } from "@/lib/models/game"
import { NextRequest } from "next/server"
import {
    InvalidParams,
    MissingParamsError,
    ResponseError,
    IGDBError,
    postIGDB,
    HttpResponse
} from "@/lib/utils"

export async function POST(request: NextRequest) {
    const body = await request.json()
    if (!body?.query) return HttpResponse(null, false, MissingParamsError)
    if (body?.limit && isNaN(Number(body.limit))) return HttpResponse(null, false, InvalidParams)
    const { query, limit, fastSearch } = body

    return await postIGDB(
        IGDBEndpoints.Games,
        `fields id,name,cover.*,genres.*,slug;
         search "${query}"; where parent_game = null & cover != null & genres != null ${fastSearch ? '& rating_count > 0' : ''};
         limit ${+limit || '5'};`
    ).then(async (response) => {
        if (!response.ok) {
            return HttpResponse(null, false, ResponseError(response))
        }

        let results: IGameSearch[] = await response.json()
        return HttpResponse(results)
    })
    .catch(err => HttpResponse(null, false, IGDBError(err)))

}