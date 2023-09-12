import { NotFoundError, ResponseError } from "../common/utils/errors"
import { postIGDB, IGDBError } from "../common/utils/igdb"
import { IHttpResponse } from "../common/interfaces/response"
import { HttpResponse } from "../common/utils/response"
import { IGDBEndpoints } from "../common/enums/endpoints"
import { AuthToken } from "../common/interfaces/auth"

export const getGameById = async (id: string, auth: AuthToken): Promise<IHttpResponse> => {
    return await postIGDB(IGDBEndpoints.Game, auth,
        `fields *; where id=${id};`
    ).then(async (response) => {
        if (!response.ok) {
            return HttpResponse(null, false, ResponseError(response))
        }

        const results = await response.json()
        return results.length
            ? HttpResponse(results[0])
            : HttpResponse(null, false, NotFoundError)
    })
    .catch(err => HttpResponse(null, false, IGDBError(err)))
}

export const searchGames = async (query: string, auth: AuthToken): Promise<IHttpResponse> => {
    return await postIGDB(IGDBEndpoints.Game, auth,
        `fields *; search "${query}"; where version_parent = null;`
    ).then(async (response) => {
        if (!response.ok) {
            return HttpResponse(null, false, ResponseError(response))
        }

        const results = await response.json()
        return HttpResponse(results)
    })
    .catch(err => HttpResponse(null, false, IGDBError(err)))
}