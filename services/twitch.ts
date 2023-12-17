import { Endpoints } from '@/lib/enums'
import { IHttpResponse } from '@/lib/models/response'
import { IStreaming } from '@/lib/models/streaming'
import { apiUrl } from '@/lib/utils'

export async function getTwitchGame(game: string): Promise<IHttpResponse<IStreaming[]>> {
    const url = `${apiUrl}${Endpoints.TopGameStreamings}`
    const res = await fetch(url.replace(':gameId', game))

    return res.json()
}