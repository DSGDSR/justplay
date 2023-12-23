import { IGDBEndpoints } from '@/lib/enums'
import { IGame } from '@/lib/models/game'
import {
    MissingParamsError,
    NotFoundError,
    ResponseError,
    IGDBError,
    postIGDB,
    HttpResponse
} from '@/lib/utils'
import { NextRequest } from 'next/server'
import { kv } from '@vercel/kv'

interface GETGameBySlugQuery {
    params: {
        slug: string
    }
}

export async function GET(_request: NextRequest, query: GETGameBySlugQuery) {
    if (!query?.params?.slug) return HttpResponse(null, false, MissingParamsError)
    const { slug } = query.params

    const cachedGame = await kv.get<IGame>(slug)
        .then((game) => game && game.slug === slug ? HttpResponse(game) : null)
        .catch(() => null)

    if (cachedGame) return cachedGame

    return await postIGDB(
        IGDBEndpoints.Games,
        `fields id,slug,name,first_release_date,summary,screenshots.*,cover.*,videos.*,genres.*,keywords.*,alternative_names.*,involved_companies.*,game_engines.*,franchises.*,platforms.*,external_games.*,similar_games.*,similar_games.cover.*;
         where slug="${slug}";`
    ).then(async (response) => {
        if (!response.ok) {
            return HttpResponse(null, false, ResponseError(response))
        }

        const results: IGame[] = await response.json()

        if (results.length) {
            const game = results[0]
            kv.set(game.slug, JSON.stringify(game), {
                ex: 60 * 60 * 24 * 2 // 2 days
            }).catch(() => console.log('Error setting game in KV'))
            return HttpResponse(game)
        } else {
            return HttpResponse(null, false, NotFoundError)
        }
    })
    .catch(err => HttpResponse(null, false, IGDBError(err)))
}