import { IScreenshot } from "@/lib/models/media"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"
import Chevron from "./icons/Chevron"
import Link from "next/link"

interface Props {
    screenshots: IScreenshot[]
}

const Slider = ({ screenshots }: Props) => {
    const [slide, setSlide] = useState<string>(screenshots[0]?.image_id)

    const previousUrl = () => {
        const index = screenshots.findIndex(s => s.image_id === slide)
        return screenshots.at(index - 1)?.image_id
    }
    
    const nextUrl = () => {
        const index = screenshots.findIndex(s => s.image_id === slide)
        return index === screenshots.length - 1 ?
            screenshots[0].image_id : screenshots.at(index + 1)?.image_id
    }

    const previous = () => setSlide(previousUrl() ?? screenshots[screenshots.length - 1].image_id)
    const next = () => setSlide(nextUrl() ?? screenshots[0].image_id)

    return <div className="flex flex-col items-center aspect-video">
        <div className="w-full bg-white rounded overflow-x-hidden flex snap-x h-full">
            { screenshots.map(s => <div key={s.image_id} className="snap-start w-full h-full flex-shrink-0" id={s.image_id}>
                <Image
                    className="w-full h-full object-cover"
                    src={`https://${s.url.slice(2).replace('t_thumb', 't_720p')}`}
                    alt={s.image_id}
                    width={s.width}
                    height={s.height}
                    quality={100}
                />
            </div> )}
        </div>

        <div className="absolute w-full h-full flex justify-between items-center p-4">
            <Link href={`#${previousUrl()}`} onClick={previous} className="p-0.5 bg-white text-black rounded-full cursor-pointer opacity-70 hover:opacity-100 transition-all">
                <Chevron direction="left" className="pr-0.5 w-7 h-7"/>
            </Link>
            <Link href={`#${nextUrl()}`} onClick={next} className="p-0.5 bg-white text-black rounded-full cursor-pointer opacity-70 hover:opacity-100 transition-all">
                <Chevron direction="right" className="pl-0.5 w-7 h-7"/>
            </Link>
        </div>
    
        <div className="flex absolute bottom-5 gap-3 bg-white rounded-full py-2 px-3 opacity-70 hover:opacity-100 transition-all">
            { screenshots.map(s  => <SliderControl
                key={`control-${s.image_id}`}
                id={s.image_id}
                selected={slide === s.image_id}
                onClick={() => setSlide(s.image_id)}
            /> )}
        </div>
    </div>
}

const SliderControl = ({ id, selected, onClick }: any) => <a
    className={cn("w-3 h-3 text-gray-700 rounded-full bg-gray-400 flex justify-center items-center",
        selected && 'bg-black'
    )}
    href={`#${id}`}
    onClick={onClick}
></a>

export default Slider
