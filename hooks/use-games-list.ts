import { IGame } from '@/lib/models/game'
import { useGamesStore } from '@/lib/stores/games.store'
import { getGamesList } from '@/services/game';
import { useEffect, useState } from 'react'

const useGamesList = (ids: number[], sort?: ((a: IGame, b: IGame) => number)) => {
    const [games, setGames] = useState<IGame[] | null>(null);
    const { getGames, addGames } = useGamesStore();

    useEffect(() => {
        if (!ids || !ids.length) {
            setGames([])
        } else {
            getGamesFromList(ids)
                .then((res) => {
                    addGames(res)
                    setGames(sort ? res.sort(sort) : res)
                })
                .catch(() => setGames([]))
        }
    }, [])

    const getCatchedGames = (ids: number[]) => {
        return getGames().filter(g => ids.includes(g.object.id))
    }

    const getGamesFromList = async (ids: number[]) => {
        // Get catched games
        const cached = getCatchedGames(ids).map(g => g.object)

        // Get missing games
        const missing = ids.filter(id => !cached.find(g => g.id === id))
        
        return !missing?.length ? cached : getGamesList(missing)
            .then((res) => [...res.data, ...cached])
            .catch(() => [])
    }
    
    return games;
}

export default useGamesList
/*
import { IGame } from "@/lib/models/game"
import { useGamesStore } from "@/lib/stores/games.store"
import { getGamesList } from "@/services/game";
import { useEffect, useState } from "react"

const useGamesList = (ids: number[], sort?: ((a: IGame, b: IGame) => number)) => {
    const [games, setGames] = useState<IGame[] | null>(null);
    const { getGames, addGames, setState, state } = useGamesStore();

    useEffect(() => {
        if (!ids || !ids.length) {
            setGames([])
        } else {
            updateGames()
        }
    }, [])

    useEffect(() => {
        if (state === 'ready') {
            updateGames()
        }
    }, [state, games])

    const updateGames = () => {
        getGamesFromList(ids)
            .then((res) => {
                addGames(res)
                setGames(sort ? res.sort(sort) : res)
            })
            .catch(() => setGames([]))
    }

    const getCatchedGames = (ids: number[]) => {
        return getGames().filter(g => ids.includes(g.object.id))
    }

    const getGamesFromList = async (ids: number[]) => {
        // Get catched games
        const cached = getCatchedGames(ids).map(g => g.object)

        // Get missing games
        const missing = ids.filter(id => !cached.find(g => g.id === id))

        if (missing?.length) {
            setState('loading')
            return getGamesList(missing)
                .then((res) => [...res.data, ...cached])
                .catch(() => [])
        } else {
            return cached
        }
    }
    
    return games;
}

export default useGamesList
*/