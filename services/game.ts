import { Endpoints } from '@/lib/enums'
import { IGame } from '@/lib/models/game'
import { IHttpResponse } from '@/lib/models/response'
import { apiUrl } from '@/lib/utils'
import { notFound } from 'next/navigation'

export async function getGame(slug: string): Promise<IHttpResponse<IGame>> {
    const url = `${apiUrl}${Endpoints.GameBySlug}`
    const res = await fetch(url.replace(':slug', slug))

    if (!res.ok) notFound()
    return res.json()
}

export async function getGamesList(gameIds: number[]): Promise<IHttpResponse<IGame[]>> {
    const url = `${apiUrl}${Endpoints.GamesListByIds}`
    const res = await fetch(url.replace(':ids', `(${gameIds.join(',')})`))

    return res.json()
}