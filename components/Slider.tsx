import { IScreenshot } from "@/lib/models/media"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

interface Props {
    screenshots: IScreenshot[]
}

const Slider = ({ screenshots }: Props) => {
    const [slide, setSlide] = useState<string>(screenshots[0]?.image_id)

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
