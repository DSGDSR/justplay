import { Endpoints } from '../../../common/enums/endpoints'
import { ApiDocs } from '../../src/common/interfaces/docs'

export const gamesDocs: ApiDocs = {
    [Endpoints.GameById]: {
        summary: 'Get a game by IGDB id',
        tags: ['Games'],
        parameters: [{
            name: 'id',
            in: 'path',
            schema: {
                default: '131890' // Sea of stars
            }
        }]
    },
    [Endpoints.SearchGames]: {
        summary: 'Search games',
        tags: ['Games'],
        requestBody: {
            $ref: '#/components/schemas/Search'
        }
    }
}