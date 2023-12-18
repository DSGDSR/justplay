'use client'

import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import Chevron from './icons/Chevron';

interface Props {
    items: ReactNode
    className?: string
}

const Slider = ({ className, items }: Props) => {
    const slider = useRef<HTMLDivElement>(null)
    const [scrollInterval, setScrollInterval] = useState<NodeJS.Timeout | null>(null)
    const [scrollPosition, setScrollPosition] = useState<'left' | 'right' | 'both' | 'none'>('left')

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
    
    useEffect(() =>  {
        if (getScrollPosition() === 0 && getScrollPosition() === (slider?.current?.scrollWidth ?? 0) - (slider?.current?.clientWidth ?? 0)) {
            setScrollPosition('none')
        } else {
            slider?.current?.addEventListener('scroll', listenToScroll)

            return () => {
                slider?.current?.removeEventListener('scroll', listenToScroll)
            }
        }

    })

    return <div className={cn('relative', className)}>
        <div ref={slider} className="whitespace-nowrap overflow-x-scroll overflow-y-hidden no-scrollbar">
            {items}
        </div>
        <div className="controls absolute w-full flex justify-between h-full -top-1 pointer-events-none">
            <SliderControl direction="left" onClick={scrollLeft} className={cn(
                ['left', 'none'].includes(scrollPosition) && 'opacity-0 pointer-events-none'
            )} onMouseEnter={() => autoScroll('left')} onMouseLeave={stopAutoScroll}/>
            <SliderControl direction="right" onClick={scrollRight} className={cn(
                ['right', 'none'].includes(scrollPosition) && 'opacity-0 pointer-events-none'
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
        'z-10 w-10 rounded-full h-10 bg-background opacity-90 self-center transition-opacity flex justify-center items-center pointer-events-auto cursor-pointer border border-slate-700',
        direction === 'left' ? 'ml-2' : 'mr-2',
        className
    )} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <Chevron direction={direction} strokeWidth={2} className={cn('w-6 md:w-7 h-6 md:h-7 opacity-100', direction === 'left' ? 'mr-0.5' : 'ml-0.5')}/>
    </span>
}

export default Slider
