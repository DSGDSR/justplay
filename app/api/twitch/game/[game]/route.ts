
import { IHttpResponse } from '@/lib/models/response'
import { IStreaming } from '@/lib/models/streaming'
import {
    InvalidParams,
    MissingParamsError,
    NotFoundError,
    ResponseError,
    IGDBError,
    HttpResponse,
    fetchTwitchGame
} from '@/lib/utils'
import { NextRequest } from 'next/server'

interface GETTwitchGameQuery {
    params: {
        game: string
    }
}

export async function GET(_request: NextRequest, query: GETTwitchGameQuery) {
    if (!query?.params?.game) return HttpResponse(null, false, MissingParamsError)
    if (typeof query.params.game !== 'string') return HttpResponse(null, false, InvalidParams)

    return await fetchTwitchGame(query.params.game)
        .then(async (response) => {
            if (!response.ok) {
                return HttpResponse(null, false, ResponseError(response))
            }
            
            const results: IHttpResponse<IStreaming[]> = await response.json()
            return results?.data && Array.isArray(results.data)
                ? HttpResponse(results.data)
                : HttpResponse(null, false, NotFoundError)
        })
        .catch(err => HttpResponse(null, false, IGDBError(err)))
}