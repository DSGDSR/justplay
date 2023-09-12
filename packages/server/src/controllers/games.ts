import { HttpResponse } from "../common/utils/response"
import { MissingBodyError, MissingParamsError } from "../common/utils/errors"
import { getGameById, searchGames } from "../services/games"
import { gamesDocs } from "../docs/games"
import { SearchModel } from "../common/models/games"
import { Endpoints } from "../common/enums/endpoints"
import { APIClass } from "../common/interfaces/store"

const ROUTE = 'games'

const gameController = (app: APIClass) => app.group(ROUTE, app => app
    // GET GAME BY ID
    .get('/:id', async ({params, store}) => {
        if (!params?.id) return HttpResponse(null, false, MissingParamsError)

        console.log(store.auth?.access_token)
        return getGameById(params.id, store.auth)
    }, { detail: gamesDocs[Endpoints.GameById] })

    // SEARCH GAMES
    .post('/search', async ({body, store}) => {
        if (!body?.query) return HttpResponse(null, false, MissingBodyError)

        return searchGames(body.query, store.auth)
    }, { detail: gamesDocs[Endpoints.SearchGames], body: SearchModel })
)

export default gameController