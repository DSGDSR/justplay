import { IGDBEndpoints } from "@/lib/enums/endpoints"
import { IGame } from "@/lib/models/game"
import { InvalidParams, MissingParamsError, NotFoundError, ResponseError } from "@/lib/utils/errors"
import { IGDBError, postIGDB } from "@/lib/utils/igdb"
import { HttpResponse } from "@/lib/utils/response"
import { NextRequest } from "next/server"

interface GETGameByIdQuery {
    params: {
        id: string
    }
}

export async function GET(_request: NextRequest, query: GETGameByIdQuery) {
    if (!query?.params?.id) return HttpResponse(null, false, MissingParamsError)
    if (isNaN(Number(query.params.id))) return HttpResponse(null, false, InvalidParams)
    const id = Number(query.params.id)

    return await postIGDB(
        IGDBEndpoints.Game,
        `fields *; where id=${id};`
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