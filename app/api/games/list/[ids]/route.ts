import { IGDBEndpoints } from '@/lib/enums'
import { IGame } from '@/lib/models/game'
import {
    InvalidParams,
    MissingParamsError,
    ResponseError,
    IGDBError,
    postIGDB,
    HttpResponse
} from '@/lib/utils'
import { NextRequest } from 'next/server'

interface GETGameByIdQuery {
    params: {
        ids: string
    }
}

export async function GET(_request: NextRequest, query: GETGameByIdQuery) {
    if (!query?.params?.ids) return HttpResponse(null, false, MissingParamsError)
    if (!RegExp('\((\d+(,\d+)*)?\)').test(query.params.ids)) return HttpResponse(null, false, InvalidParams)

    return await postIGDB(
        IGDBEndpoints.Games,
        `fields id,slug,name,cover.*; where id=${query.params.ids};`
    ).then(async (response) => {
        if (!response.ok) {
            return HttpResponse(null, false, ResponseError(response))
        }

        const results: IGame[] = await response.json()
        return HttpResponse(results)
    })
    .catch(err => HttpResponse(null, false, IGDBError(err)))
}