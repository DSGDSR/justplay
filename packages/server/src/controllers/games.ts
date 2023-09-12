import Elysia, { t } from "elysia"
import { HttpResponse } from "../common/utils/response"
import { MissingBodyError, MissingParamsError } from "../common/utils/errors"
import { getGameById, searchGames } from "../services/games"
import { gamesDocs } from "../docs/games"
import { SearchModel } from "../common/models/games"
import { Endpoints } from "../common/enums/endpoints"

const gameController = (new Elysia({
    name: 'Games',
    prefix: '/games',

}))

// GET GAME BY ID
.get('/:id', async ({params}) => {
    if (!params?.id) return HttpResponse(null, false, MissingParamsError)

    return getGameById(params.id)
}, { detail: gamesDocs[Endpoints.GameById] })

// SEARCH GAMES
.post('/search', async ({body}) => {
    if (!body?.query) return HttpResponse(null, false, MissingBodyError)

    return searchGames(body.query)
}, { detail: gamesDocs[Endpoints.SearchGames], body: SearchModel })

export default gameController