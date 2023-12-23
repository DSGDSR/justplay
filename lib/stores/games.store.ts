import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IGame } from '../models/game'
import { ICache, cachedObject } from '../models/cache'

const EXPIRE_IN = 0.001 // hours

interface GamesState {
    games: ICache<IGame>[]
    state: 'ready' | 'loading'
    getGames: () => ICache<IGame>[]
    addGames: (games: IGame[]) => void
    setGames: (games: IGame[]) => void
    setState: (state: 'ready' | 'loading') => void
}

const cleanExpiredGames = (games: ICache<IGame>[]) => {
    const now = new Date().getTime()
    return games.filter(game => game.expiresIn > now)
}

export const useGamesStore = create(
    persist<GamesState>(
        (set, get) => ({
            games: [],
            state: 'ready',
            getGames: () => cleanExpiredGames(get().games),
            addGames: (games: IGame[]) => set((state) => {
                const newGames = [...state.games, ...games.map(g => cachedObject(g, EXPIRE_IN))]

                // Remove duplicates
                const uniqueGames = newGames.filter((game, index) => {
                    return newGames.findIndex(cg => cg.object.id === game.object.id) === index
                })

                return { games: cleanExpiredGames(uniqueGames) }
            }),
            setGames: (games: IGame[]) => set({ games: games.map(g => cachedObject(g, EXPIRE_IN)) }),
            setState: (state: 'ready' | 'loading') => set({ state })
        }),
        {
            name: 'games-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
)