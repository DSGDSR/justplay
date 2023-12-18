'use client'

import { IGame } from '@/lib/models/game'
import { ListItem, ListsItemsResponse } from '@/lib/models/lists'
import { getGamesList } from '@/services/game'
import { useEffect, useState } from 'react'
import GameCard from './GameCard'
import Skeleton from './Skeleton'
import Section from './Section'

interface Props {
    list: ListItem[]
    listedGames: ListsItemsResponse | null
    sectionLink?: string
    sectionName?: string
}

const GamesList = ({ list, listedGames, sectionName, sectionLink }: Props) => {
    const [games, setGames] = useState<IGame[] | null>(null)

    useEffect(() => {
        if (!list) {
            setGames([])
        } else {
            getGamesList(list.map(f => f.game))
                .then((res) => setGames(res.data?.length ? res.data : []))
                .catch(() => setGames([]))
        }
    }, [])

    return sectionName ? <Section title={sectionName} linkUrl={sectionLink}>
        <GamesListContent list={list} games={games} listedGames={listedGames} />
    </Section> : <GamesListContent list={list} games={games} listedGames={listedGames} />
}

const GamesListContent = ({ games, list, listedGames }: {
    list: ListItem[]
    games: IGame[] | null
    listedGames: ListsItemsResponse | null
}) => <div className="flex gap-3">
    {
        (!games && list.length)
            ? <>{ Array(list.length).fill(true).map((_, idx) => <Skeleton className={'aspect-[9/12] w-[25%]'} key={`gl_skel_${idx}`} />) }</>
            : (games && games.length && list.length) ?
                games.map(game => <GameCard
                    key={game.id}
                    game={game}
                    className={'!w-[25%]'}
                    lists={listedGames}
                />) : <span className="opacity-60 text-sm">No games added yet.</span>
    }
</div>

export default GamesList