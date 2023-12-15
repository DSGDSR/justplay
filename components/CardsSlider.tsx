'use client'

import { IGame } from '@/lib/models/game';
import GameCard from './GameCard';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import Chevron from './icons/Chevron';
import { ListsItemsResponse } from '@/lib/models/lists';

interface Props {
    games: IGame[]
    className?: string
    lazy?: boolean
    lists?: ListsItemsResponse
}

const CardsSlider = ({ games, className, lazy, lists }: Props) => {
    const slider = useRef<HTMLDivElement>(null)
    const [scrollInterval, setScrollInterval] = useState<NodeJS.Timeout | null>(null)
    const [scrollPosition, setScrollPosition] = useState<'left' | 'right' | 'both'>('left')

    const getScrollPosition = () => {
        return slider?.current?.scrollLeft ?? 0
    }

    const scrollRight = () => {
        stopAutoScroll()
        slider?.current?.scroll({
            left: getScrollPosition() + 450,
            behavior: 'smooth'
        })
    }
    
    const scrollLeft = () => {
        stopAutoScroll()
        slider?.current?.scroll({
            left: getScrollPosition() - 450,
            behavior: 'smooth'
        })
    }

    const autoScroll = (direction: 'left' | 'right') => {
        setScrollInterval(setInterval(() => {
            if (!slider?.current) return

            slider.current.scrollLeft = direction === 'left'
                ? slider.current.scrollLeft - 2.5
                : slider.current.scrollLeft + 2.5
        }, 10))
    }

    const stopAutoScroll = () => {
        if (scrollInterval) {
            clearInterval(scrollInterval)
            setScrollInterval(null)
        }
    }

    const listenToScroll = () => {
        if (getScrollPosition() === 0) {
            setScrollPosition('left')
        } else if (getScrollPosition() === (slider?.current?.scrollWidth ?? 0) - (slider?.current?.clientWidth ?? 0)) {
            setScrollPosition('right')
        } else if (
            scrollPosition !== 'both' && (getScrollPosition() > 0 ||
            getScrollPosition() < (slider?.current?.scrollWidth ?? 0) - (slider?.current?.clientWidth ?? 0))
        ) {
            setScrollPosition('both')
        }
    }
    
    useEffect(() => {
        slider?.current?.addEventListener('scroll', listenToScroll)

        return () => {
            slider?.current?.removeEventListener('scroll', listenToScroll)
        }
    })

    return <div className={cn('relative', className)}>
        <div ref={slider} className="whitespace-nowrap overflow-x-scroll overflow-y-hidden no-scrollbar">
            {games.map((game, index) => (
                <GameCard key={game.id} game={game} className="inline-block mr-2 md:mr-3 last:mr-0" lazy={lazy} lists={lists} />
            ))}
        </div>
        <div className="controls absolute w-full flex justify-between h-full -top-1 pointer-events-none">
            <SliderControl direction="left" onClick={scrollLeft} className={cn(
                scrollPosition === 'left' && 'opacity-0 pointer-events-none'
            )} onMouseEnter={() => autoScroll('left')} onMouseLeave={stopAutoScroll}/>
            <SliderControl direction="right" onClick={scrollRight} className={cn(
                scrollPosition === 'right' && 'opacity-0 pointer-events-none'
            )} onMouseEnter={() => autoScroll('right')} onMouseLeave={stopAutoScroll}/>
        </div>
    </div>
}

const SliderControl = ({ direction, onClick, className, onMouseEnter, onMouseLeave }: {
    direction: 'left' | 'right',
    onClick: () => void,
    onMouseEnter: () => void,
    onMouseLeave: () => void,
    className?: string
}) => {
    return <span className={cn(
        'h-full z-10 w-7 md:w-10 bg-background opacity-80 transition-opacity flex justify-center items-center pointer-events-auto cursor-pointer',
        className
    )} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <Chevron direction={direction} className={cn('w-6 md:w-8 h-6 md:h-8 opacity-100', direction === 'left' ? 'mr-1' : 'ml-1')}/>
    </span>
}

export default CardsSlider



