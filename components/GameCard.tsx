import { IGame } from '@/lib/models/game';
import PreloadedImage from './PreloadedImage';
import { CoverSkeleton } from './pages/GamePage/skeletons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import DefaultThumb from './icons/DefaultThumb';
import { ListsItemsResponse } from '@/lib/models/lists';
import GameActions from './GameActions';

interface Props {
    game: IGame
    className: string
    lazy?: boolean
    lists?: ListsItemsResponse
}

const GameCard = ({ game, className, lazy, lists }: Props) => {
    return (
        <Link className={cn('relative flex flex-col gap-3 w-32 md:w-48 group', className)} href={`/game/${game.slug}`}>
            <div className="hidden md:block absolute w-full z-[5] transition-opacity pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto">
                { lists ? <GameActions mode="card" gameId={game.id} lists={lists} /> : <></> }
            </div>
            <div className="absolute z-0 w-full h-full bg-black group-hover:opacity-50 opacity-0 transition-opacity"></div>
            <figure>
                { !!game.cover?.url ? <PreloadedImage
                    className="w-full h-full rounded-md aspect-[9/12]"
                    src={`https://${game.cover.url.slice(2).replace('t_thumb', 't_cover_big')}`}
                    alt={game.name}
                    width={280}
                    height={373.33}
                    skeleton={<CoverSkeleton />}
                    quality={0}
                    priority={lazy ? false : true}
                /> : <div className="w-full h-full rounded-md aspect-[9/12] bg-secondary flex items-center">
                    <DefaultThumb />
                </div>
            }
            </figure>
        </Link>
    )
}

export default GameCard