"use client"

import { IGame } from "@/lib/models/game";
import GameCard from "./GameCard";
import { use, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Chevron from "./icons/Chevron";

interface Props {
    games: IGame[]
    className?: string
    lazy?: boolean
}

const CardsSlider = ({ games, className, lazy }: Props) => {
    const [scrollPosition, setScrollPosition] = useState<'left' | 'right' | 'both'>('left')

    const slider = () => document.querySelector('#cards-slider')

    const getScrollPosition = () => {
        return slider()?.scrollLeft ?? 0
    }

    const scrollRight = () => {
        slider()?.scroll({
            left: getScrollPosition() + 450,
            behavior: 'smooth'
        })
    }
    
    const scrollLeft = () => {
        slider()?.scroll({
            left: getScrollPosition() - 450,
            behavior: 'smooth'
        })
    }

    const listenToScroll = () => {
        if (getScrollPosition() === 0) {
            setScrollPosition('left')
        } else if (getScrollPosition() === (slider()?.scrollWidth ?? 0) - (slider()?.clientWidth ?? 0)) {
            setScrollPosition('right')
        } else if (
            scrollPosition !== 'both' && (getScrollPosition() > 0 ||
            getScrollPosition() < (slider()?.scrollWidth ?? 0) - (slider()?.clientWidth ?? 0))
        ) {
            setScrollPosition('both')
        }
    }
    
    useEffect(() => {
        slider()?.addEventListener('scroll', listenToScroll)

        return () => {
            slider()?.removeEventListener('scroll', listenToScroll)
        }
    })

    return <div className={cn('relative', className)}>
        <div id="cards-slider" className="whitespace-nowrap overflow-x-scroll overflow-y-hidden no-scrollbar">
            {games.map((game, index) => (
                <GameCard key={game.id} game={game} className="inline-block mr-3 last:mr-0" lazy={lazy} />
            ))}
        </div>
        <div className="controls absolute w-full flex justify-between h-full -top-1 pointer-events-none">
            <SliderControl direction="left" onClick={scrollLeft} className={cn(
                scrollPosition === 'left' && 'opacity-0 pointer-events-none'
            )}/>
            <SliderControl direction="right" onClick={scrollRight} className={cn(
                scrollPosition === 'right' && 'opacity-0 pointer-events-none'
            )}/>
        </div>
    </div>
}

const SliderControl = ({ direction, onClick, className }: {
    direction: 'left' | 'right',
    onClick: () => void,
    className?: string
}) => {
    return <span className={cn(
        'h-full w-10 bg-background opacity-80 transition-opacity flex justify-center items-center pointer-events-auto cursor-pointer',
        className
    )} onClick={onClick}>
        <Chevron direction={direction} className="w-8 h-8 ml-1 opacity-100"/>
    </span>
}

export default CardsSlider



