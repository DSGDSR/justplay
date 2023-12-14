import { Endpoints } from '@/lib/enums'
import { IGame } from '@/lib/models/game'
import { IHttpResponse } from '@/lib/models/response'
import { apiUrl } from '@/lib/utils'
import { redirect } from 'next/navigation'

export async function getGame(slug: string): Promise<IHttpResponse<IGame>> {
    const url = `${apiUrl}${Endpoints.GameBySlug}`
    const res = await fetch(url.replace(':slug', slug))

    if (!res.ok) redirect('/')// custtom 404 TODO ?
    return res.json()
}