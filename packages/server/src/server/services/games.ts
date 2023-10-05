import { NotFoundError, ResponseError } from "../utils/errors"
import { postIGDB, IGDBError } from "../utils/igdb"
import { IHttpResponse } from "../../../../common/interfaces/response"
import { HttpResponse } from "../utils/response"
import { IGDBEndpoints } from "../../../../common/enums/endpoints"
import { AuthToken } from "../../common/interfaces/auth"
import { IGame, IGameSearch } from "../../../../common/interfaces/game"

export const getGameById = async (id: string, auth: AuthToken, by: 'id' | 'slug' = 'id'): Promise<IHttpResponse<IGame>> => {
    return await postIGDB(IGDBEndpoints.Game, auth,
        `fields *; where ${by}=${by === 'id' ? id : `"${id}"`};`
    ).then(async (response) => {
        if (!response.ok) {
            return HttpResponse(null, false, ResponseError(response))
        }

        const results: IGame[] = await response.json()
        return results.length
            ? HttpResponse(results[0])
            : HttpResponse(null, false, NotFoundError)
    })
    .catch(err => HttpResponse(null, false, IGDBError(err)))
}

export const searchGames = async (query: string, auth: AuthToken): Promise<IHttpResponse<IGameSearch[]>> => {
    const terms = query.split(' ');
    return await postIGDB(IGDBEndpoints.Game, auth,
        `fields id,name,cover.*,genres.*,slug;
         search "${query}"; where version_parent = null & parent_game = null;
         limit 5;`
    ).then(async (response) => {
        if (!response.ok) {
            return HttpResponse(null, false, ResponseError(response))
        }

        let results: IGameSearch[] = await response.json()
        return HttpResponse(results)
    })
    .catch(err => HttpResponse(null, false, IGDBError(err)))
}

/*export const getCovers = async (coverIds: number[], auth: AuthToken): Promise<IHttpResponse> => {
    return await postIGDB(IGDBEndpoints.Covers, auth,
        `fields id,image_id,url; where id=(${coverIds.join(',')});`
    ).then(async (response) => {
        if (!response.ok) {
            return HttpResponse(null, false, ResponseError(response))
        }

        const results = await response.json()
        return HttpResponse(results)
    })
    .catch(err => HttpResponse(null, false, IGDBError(err)))
}*/