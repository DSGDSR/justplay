import { IGame } from '@/lib/models/game';
import PreloadedImage from './PreloadedImage';
import { CoverSkeleton } from './pages/GamePage/skeletons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import DefaultThumb from './icons/DefaultThumb';
import { ListsItemsResponse } from '@/lib/models/lists';
import GameActions from './GameActions';
import { CSSProperties } from 'react';

interface Props {
    game: IGame
    className?: string
    style?: CSSProperties
    lazy?: boolean
    hover?: boolean
    lists?: ListsItemsResponse | null
}

const GameCard = ({ game, className, lazy = true, lists, hover = true, style }: Props) => {
    return <div style={style} className={cn('relative flex flex-col w-32 md:w-48 group rounded-md overflow-hidden', className)}>
        { lists && hover ? <div className={cn(
            'hidden md:block w-9/12 absolute mx-auto z-[5] pointer-events-none group-hover:pointer-events-auto bottom-4',
            'opacity-0 group-hover:opacity-100 transition-opacity',
            'left-1/2 -translate-x-1/2'
        )}>
            <GameActions mode="card" gameId={game.id} lists={lists} />
        </div> : <></> }
        <Link href={`/game/${game.slug}`}>
            { hover ? <div className={cn(
                'absolute z-0 w-full h-full bg-black rounded-md transition-all duration-300',
                'group-hover:bg-opacity-50 bg-opacity-0',
                'border-[.5px] border-slate-700 group-hover:border-slate-300 group-hover:border-[3px]'
            )}></div> : <></> }
            <figure>
                { !!game.cover?.url ? <PreloadedImage
                    className="w-full h-full aspect-[9/12]"
                    src={`https://${game.cover.url.slice(2).replace('t_thumb', 't_cover_big')}`}
                    alt={game.name}
                    width={280}
                    height={373.33}
                    skeleton={<CoverSkeleton />}
                    quality={0}
                    priority={lazy ? false : true}
                /> : <div className="w-full h-full aspect-[9/12] bg-secondary flex items-center">
                    <DefaultThumb />
                </div>
            }
            </figure>
        </Link>
    </div>
}

export const GameCardPlaceholder = ({ className, style }: {
    className?: string
    style?: CSSProperties
}) => {
    return <div className={cn('relative flex flex-col w-32 md:w-48 group rounded-md overflow-hidden', className)} style={style}>
        <figure>
            <DefaultThumb noIcon={true} className="w-full h-full aspect-[9/12] bg-secondary flex items-center" />
        </figure>
    </div>
}

export default GameCard