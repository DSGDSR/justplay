import { IGDBEndpoints } from '../enums';
import { IHttpError } from '../models/error';

export const IGDBError = (error: any): IHttpError => ({
    status: 500,
    message: String(error)
})

const fetchIGDB = (
    endpoint: IGDBEndpoints,
    init?: RequestInit | undefined,
    method = 'GET',
): Promise<Response> => fetch(`https://api.igdb.com/v4/${endpoint}`, {
    ...init,
    method,
    headers: {
        'Accept': 'application/json',
        'Client-ID': process.env.SERVER_TWITCH_CLIENT_ID ?? 'no-client-id',
        'Authorization': `Bearer ${process.env.SERVER_TWITCH_ACCESS_TOKEN ?? 'no-token'}`,
        ...init?.headers
    }
})

export const postIGDB = (
    endpoint: IGDBEndpoints,
    body?: BodyInit | null
): Promise<Response> => fetchIGDB(endpoint, { body }, 'POST')

export const getIGDB = fetchIGDB