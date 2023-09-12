import { IGDBEndpoints } from "../enums/endpoints";
import { IHttpError } from "../interfaces/error";

export const IGDBError = (error: any): IHttpError => ({
    status: 500,
    message: String(error)
})

const fetchIGDB = (
    endpoint: IGDBEndpoints,
    init?: FetchRequestInit | undefined,
    method = 'GET',
): Promise<Response> => fetch(`https://api.igdb.com/v4/${endpoint}`, {
    ...init,
    method,
    headers: {
        'Accept': 'application/json',
        'Client-ID': 'bsann4zap6kt3upxgvebup15fyifo3',
        'Authorization': 'Bearer dvkns7bj0qhkkkbnbr1hsp8dj03pcb',
        ...init?.headers
    }
})

export const postIGDB = (
    endpoint: IGDBEndpoints,
    body?: BodyInit | null
): Promise<Response> => fetchIGDB(endpoint, { body }, 'POST')

export const getIGDB = fetchIGDB