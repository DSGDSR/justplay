import { IGDBEndpoints } from "../../../common/enums/endpoints";
import { AuthToken } from "../common/interfaces/auth";
import { IHttpError } from "../common/interfaces/error";

export const IGDBError = (error: any): IHttpError => ({
    status: 500,
    message: String(error)
})

const fetchIGDB = (
    endpoint: IGDBEndpoints,
    token: AuthToken | null,
    init?: FetchRequestInit | undefined,
    method = 'GET',
): Promise<Response> => fetch(`https://api.igdb.com/v4/${endpoint}`, {
    ...init,
    method,
    headers: {
        'Accept': 'application/json',
        'Client-ID': Bun.env.SERVER_TWITCH_CLIENT_ID ?? 'no-client-id',
        'Authorization': `Bearer ${token?.access_token ?? 'no-token'}`,
        ...init?.headers
    }
})

export const postIGDB = (
    endpoint: IGDBEndpoints,
    token: AuthToken | null,
    body?: BodyInit | null
): Promise<Response> => fetchIGDB(endpoint, token, { body }, 'POST')

export const getIGDB = fetchIGDB