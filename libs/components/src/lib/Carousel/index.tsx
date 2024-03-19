import { IScreenshot } from '@wheretoplay/shared/interfaces'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import CarouselControl from './CarouselControl'

interface Props {
    screenshots: IScreenshot[]
    auto?: boolean
    time?: number // Auto scroll time in seconds
}

export const Carousel = ({ screenshots, auto = false, time = 3 }: Props) => {
    const slider = useRef<HTMLDivElement>(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const [autoInterval, setAutoInterval] = useState<NodeJS.Timer | null>(null)

    const slide = (direction: 'prev' | 'next', index?: number) => {
        if (!slider.current) {
            return
        }

        const { scrollLeft, clientWidth } = slider.current;

        setActiveSlide(current => {
            let width = clientWidth * (index ?? 1)
            let newSlide: number

            if (index !== undefined) {
                newSlide = index
                width = clientWidth * (direction === 'prev' ? current - index : index - current)
            } else if (direction === 'prev' && current === 0) {
                direction = 'next'
                newSlide = screenshots.length - 1
                width = clientWidth * screenshots.length - 1
            } else if (direction === 'next' && current === (screenshots.length - 1)) {
                direction = 'prev'
                newSlide = 0
                width = clientWidth * screenshots.length - 1
            } else {
                newSlide = current + (direction === 'prev' ? -1 : 1)
            }

            slider?.current?.scroll({
                left: direction === 'prev' ? scrollLeft - width : scrollLeft + width,
                behavior: 'smooth',
            });

            return newSlide
        })
    }

    const keyHandler = (event: KeyboardEvent) => {
        if (screenshots === null || screenshots?.length === 0) {
            return
        }

        if (event.code === 'ArrowRight') { // TODO helper
            slide('next')
        } else if (event.code === 'ArrowLeft') {
            slide('prev')
        }
    }

    const stopAutoScroll = () => {
        if (autoInterval) {
            clearInterval(autoInterval)
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', keyHandler)

        return () => {
            window.removeEventListener('keydown', keyHandler)
        }
    }, [screenshots])

    useEffect(() => {
        if (auto && time !== 0) {
            stopAutoScroll()
            const interval = setInterval(() => slide('next'), (time) * 1000)
            setAutoInterval(interval)
        }

        return () => stopAutoScroll()
    }, [auto, time])

    return <div className="relative flex flex-col items-center aspect-video bg-background">
        <div className="w-full rounded overflow-x-hidden flex snap-x h-full object-contain" ref={slider}>
            {screenshots.map(s => <div key={s.image_id} className="snap-start w-full h-full flex-shrink-0" id={s.image_id}>
                <Image
                    className="w-full h-full"
                    src={s.url}
                    alt={s.image_id}
                    width={s.width}
                    height={s.height}
                    quality={100}
                    priority={false}
                />
            </div>)}
        </div>

        <div className="absolute w-full h-full flex justify-between items-center p-3.5">
            <button onClick={() => slide('prev')} className="p-0.5 bg-white text-black rounded-full cursor-pointer opacity-70 hover:opacity-100 transition-all">
                <IconChevronLeft className="pr-0.5 w-7 h-7" />
            </button>
            <button onClick={() => slide('next')} className="p-0.5 bg-white text-black rounded-full cursor-pointer opacity-70 hover:opacity-100 transition-all">
                <IconChevronRight className="pl-0.5 w-7 h-7" />
            </button>
        </div>

        <div className="flex absolute bottom-4 gap-1 bg-white rounded-full py-1 px-2 opacity-70 hover:opacity-100 transition-all hover:scale-125">
            {screenshots.map((image, index) => <CarouselControl
                key={`control-${image.image_id}`}
                selected={activeSlide === index}
                onClick={() => slide(activeSlide > index ? 'prev' : 'next', index)}
            />)}
        </div>
    </div>
}
