import { HttpResponse, MissingBodyError } from '@/lib/utils'
import { NextRequest } from 'next/server'
import { HowLongToBeatService } from 'howlongtobeat'

const hltb = new HowLongToBeatService()

export async function POST(_request: NextRequest) {
    const { query } = await _request.json()
    if (!query) return HttpResponse(null, false, MissingBodyError)

    return await hltb.search(query)
        .then(results => {
            const games = results.filter(game => game.similarity > 0.85)

            if (games.length) {
                return HttpResponse(games[0])
            } else {
                return HttpResponse(null)
            }
        })
        .catch(err => HttpResponse(null, false, err))
}