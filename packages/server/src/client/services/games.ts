import { apiUrl } from "../utils/apiUrl"

export const searchGames = async (query: string) => {
    const response = await fetch(`${apiUrl}/games/search`, {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    
    return await response.json()
}

export const getGameById = async (id: string) => {
    const response = await fetch(`${apiUrl}/games/${id}`)
    return await response.json()
}

export const getGameBySlug = async (slug: string) => {
    const response = await fetch(`${apiUrl}/games/slug/${slug}`)
    return await response.json()
}