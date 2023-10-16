import { IScreenshot } from "@/lib/models/media"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useEffect, useState } from "react"
import Chevron from "./icons/Chevron"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Props {
    screenshots: IScreenshot[]
}

const Slider = ({ screenshots }: Props) => {
    const [slide, setSlide] = useState<string>(screenshots[0]?.image_id)
    const { push } = useRouter()

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

    const keyHandler = (event: KeyboardEvent) => {
        if (screenshots === null || screenshots?.length === 0) {
            return
        }

        if (event.code === 'ArrowRight') {
            push(`${window.location.pathname}#${nextUrl()}` ?? '#')
            next()
        } else if (event.code === 'ArrowLeft') {
            push(`${window.location.pathname}#${previousUrl()}` ?? '#')
            previous()
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', keyHandler)

        return () => {
            window.removeEventListener('keydown', keyHandler)
        }
    }, [screenshots, slide])

    return <div className="flex flex-col items-center aspect-video bg-background">
        <div className="w-full rounded overflow-x-hidden flex snap-x h-full">
            { screenshots.map(s => <div key={s.image_id} className="snap-start w-full h-full flex-shrink-0" id={s.image_id}>
                <Image
                    className="w-full h-full object-contain"
                    src={`https://${s.url.slice(2).replace('t_thumb', 't_720p')}`}
                    alt={s.image_id}
                    width={s.width}
                    height={s.height}
                    quality={100}
                />
            </div> )}
        </div>

        <div className="absolute w-full h-full flex justify-between items-center p-3.5">
            <Link href={`#${previousUrl()}`} onClick={previous} className="p-0.5 bg-white text-black rounded-full cursor-pointer opacity-70 hover:opacity-100 transition-all">
                <Chevron direction="left" className="pr-0.5 w-7 h-7"/>
            </Link>
            <Link href={`#${nextUrl()}`} onClick={next} className="p-0.5 bg-white text-black rounded-full cursor-pointer opacity-70 hover:opacity-100 transition-all">
                <Chevron direction="right" className="pl-0.5 w-7 h-7"/>
            </Link>
        </div>
    
        <div className="flex absolute bottom-4 gap-1 bg-white rounded-full py-1 px-2 opacity-70 hover:opacity-100 transition-all hover:scale-125">
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
    className={'border-4 border-transparent'}
    href={`#${id}`}
    onClick={onClick}
>
    <span className={cn("w-1.5 h-1.5 text-gray-700 rounded-full bg-gray-400 flex justify-center items-center transition-all",
        selected && 'bg-black w-4'
    )}></span>
</a>

export default Slider
