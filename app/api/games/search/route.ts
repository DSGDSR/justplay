import { IGDBEndpoints } from "@/lib/enums/endpoints"
import { IGameSearch } from "@/lib/models/game"
import { InvalidParams, MissingParamsError, ResponseError } from "@/lib/utils/errors"
import { IGDBError, postIGDB } from "@/lib/utils/igdb"
import { HttpResponse } from "@/lib/utils/response"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
    const body = await request.json()
    if (!body?.query) return HttpResponse(null, false, MissingParamsError)
    if (body?.limit && isNaN(Number(body.limit))) return HttpResponse(null, false, InvalidParams)
    const { query, limit } = body

    return await postIGDB(
        IGDBEndpoints.Game,
        `fields id,name,cover.*,genres.*,slug;
         search "${query}"; where version_parent = null & parent_game = null;
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