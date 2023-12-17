'use client'

import { IStreaming } from '@/lib/models/streaming'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import Slider from './Slider'
import { IExternalGame } from '@/lib/models/game'
import { useEffect, useState } from 'react'
import { getTwitchGame } from '@/services/twitch'
import Section from './Section'
import { EyeOpenIcon } from '@radix-ui/react-icons'
import Play from './icons/Play'

interface StreamingSliderProps {
    externalGame: IExternalGame
    className?: string
    isSection?: boolean
}

const StreamingSlider = ({ className, externalGame, isSection }: StreamingSliderProps) => {
    const [streamings, setStreamings] = useState<IStreaming[]>([])

    useEffect(() => {
        getTwitchGame(externalGame.uid).then(res => {
            setStreamings(res?.data ?? [])
        })
    }, [])

    const slider = <Slider className={className} items={
        streamings.map((streaming, idx) => <Streaming
            key={idx}
            streaming={streaming}
            className="inline-flex mr-3 last:mr-0 w-72"
        />)
    }/>

    return streamings?.length > 0 ? (
        isSection ? <Section title="Popular streamings">{slider}</Section> : slider
    ): <></>
}

interface StreamingProps {
    streaming: IStreaming
    className?: string
}

const Streaming = ({ className, streaming }: StreamingProps) => {
    return (
        <Link href={`https://twitch.tv/${streaming.user_name}`} target="_blank" className={cn('group', className)}>
            <figure className="relative">
                <Image
                    src={streaming.thumbnail_url.replace('{width}', '640').replace('{height}', '360')}
                    alt={`${streaming.user_name} streaming, twitch, thumbnail, ${streaming.game_name}, ${streaming.viewer_count} viewers`}
                    width={640}
                    height={360}
                    quality={10}
                    priority={false}
                    className="rounded-md"
                />
                <div className="absolute top-0 h-full w-full bg-opacity-40 group-hover:bg-opacity-60 bg-black rounded-md border-[.5px] border-slate-700 group-hover:border-slate-300 group-hover:border-[3px] transition-all duration-300"></div>
                <figcaption className="absolute top-0 h-full w-full py-2 px-3 transition-all duration-300">
                    <span className="font-semibold text-shadow-lg">{streaming.user_name}</span>
                    <span className="absolute flex gap-2 items-center text-sm bottom-2 right-3">
                        <EyeOpenIcon className="stroke-primary text-primary w-5 h-5" strokeWidth=".5"/>
                        {streaming.viewer_count}
                    </span>
                </figcaption>
                <Play className="group-hover:opacity-100 opacity-0 transition-opacity absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 stroke-primary fill-primary"/>
            </figure>
        </Link>
    )
}

export { StreamingSlider, Streaming }