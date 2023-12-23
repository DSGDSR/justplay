'use client'

import { IGame } from '@/lib/models/game'
import { ListItem, ListsItemsResponse } from '@/lib/models/lists'
import GameCard, { GameCardPlaceholder } from './GameCard'
import Skeleton from './Skeleton'
import Section from './Section'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import useGamesList from '@/hooks/use-games-list'

interface Props {
    variant?: 'list' | 'compact'
    list: ListItem[]
    listedGames: ListsItemsResponse | null
    link?: string
    sectionName?: string
}

const GamesList = ({ variant = 'list', list, listedGames, sectionName, link }: Props) => {
    const games = useGamesList(
        list.map(l => l.game),
        (a, b) => {
            // TODO: This is a temporary solution to avoid the games being sorted by the order they were added to the list
            const aIndex = list.findIndex(f => f.game === a.id)
            const bIndex = list.findIndex(f => f.game === b.id)
            return variant === 'compact' ? aIndex - bIndex : bIndex - aIndex
        }
    )

    return sectionName ? <Section title={sectionName} linkUrl={link} linkText='Show all'>
        <GamesListContent list={list} games={games} listedGames={listedGames} />
    </Section> : (variant === 'list'
        ? <GamesListContent list={list} games={games} listedGames={listedGames} />
        : <GamesListCompactContent list={list} games={games} link={link} />
    )
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
                [...games ?? [], ...Array(4).fill(null)].slice(0,4).reverse().map(game => <GameCard
                    key={game.id}
                    game={game}
                    className={'!w-[25%]'}
                    lists={listedGames}
                />) : <span className="opacity-60 text-sm">No games added yet.</span>
    }
</div>

const Placeholder = () => <GameCardPlaceholder
    style={{boxShadow: '2px 0px 12px black'}}
    className={'!w-[35%] inline-block last:ml-0 -ml-[13.4%]'}
/>

const GamesListCompactContent = ({ games, list, link }: {
    list: ListItem[]
    games: IGame[] | null
    link?: string
}) => {
    return <div className="relative group">
        <div className="flex flex-row-reverse justify-end">{
            (!games && list.length)
                ? <>{ Array(4).fill(true).map((_, idx) => <Skeleton className={'aspect-[9/12] w-[35%] inline-block last:ml-0 -ml-[13.4%]'} key={`gl_skel_${idx}`} />) }</>
                : [...games ?? [], ...Array(4).fill(null)].slice(0,4).reverse().map((game, idx) => 
                    game ? <GameCard
                        key={game.id}
                        game={game}
                        className={'!w-[35%] inline-block last:ml-0 -ml-[13.4%]'}
                        style={{boxShadow: '2px 0px 12px black'}}
                        hover={false}
                        lists={null}
                    /> : <Placeholder key={`gm_placeholder_${idx}`} />
                )
        }</div>
        <Link href={link ?? '#'} className={cn(
            'absolute z-0 top-0 w-full h-full bg-black rounded-md transition-all duration-300',
            'group-hover:bg-opacity-50 bg-opacity-0 cursor-pointer',
            'border-0 border-slate-700 group-hover:border-slate-300 group-hover:border-[3px]'
        )}></Link>
    </div>
}

export default GamesList