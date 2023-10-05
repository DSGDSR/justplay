import { Endpoints } from "../../../../common/enums/endpoints"
import { apiUrl } from "../utils/apiUrl"

export const searchGames = async (query: string) => {
    const response = await fetch(`${apiUrl}${Endpoints.SearchGames}`, {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    
    return await response.json()
}

export const getGameById = async (id: string) => {
    const response = await fetch(`${apiUrl}${Endpoints.GameById.replace(':id', id)}`)
    return await response.json()
}

export const getGameBySlug = async (slug: string) => {
    const response = await fetch(`${apiUrl}${Endpoints.GameBySlug.replace(':id', slug)}`)
    return await response.json()
}