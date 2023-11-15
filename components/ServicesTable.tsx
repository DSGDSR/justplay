"use client"

import { ServiceType, Services } from "@/lib/enums"
import { IExternalGame } from "@/lib/models/game"
import { ReactNode } from "react"
import Section from "./Section"
import { cn } from "@/lib/utils"
import Steam from "./icons/services/Steam"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip"
import Xbox from "./icons/platforms/Xbox"
import GOG from "./icons/services/GOG"
import PlayStore from "./icons/services/PlayStore"
import Amazon from "./icons/services/Amazon"
import AmazonLuna from "./icons/services/AmazonLuna"
import PSStore from "./icons/services/PSStore"
import EpicGames from "./icons/services/EpicGames"
import ItchIo from "./icons/services/ItchIo"
import Oculus from "./icons/services/Oculus"
import Mac from "./icons/platforms/Mac"
import Utomik from "./icons/services/Utomik"
import FocusEnt from "./icons/services/FocusEnt"
import EShop from "./icons/services/EShop"
import useServices from "@/hooks/use-services"

interface Props {
    services: IExternalGame[] | undefined
    name: string
}

const ServicesTable = ({ services, name }: Props) => {
    const refinedServices = useServices(services, name)

    return Object.keys(refinedServices ?? {}).length > 0 && <Section title="Play now">
        <div className="flex flex-col">
            { refinedServices && Object.keys(refinedServices).map((serviceType, idx) => {
                const services = refinedServices[serviceType as ServiceType]

                return <div className="relative pl-6" key={serviceType}>
                    <h4 className={cn(
                        "absolute left-0 h-full flex justify-center items-center uppercase w-6 font-semibold text-xs rotate-180 [writing-mode:vertical-lr]",
                        serviceType === ServiceType.Buy && 'bg-slate-700',
                        serviceType === ServiceType.Subscription && 'bg-slate-500',
                        serviceType === ServiceType.Streaming && 'bg-slate-300 text-slate-500',
                    )}>{serviceType}</h4>
                    <ul className={cn(
                        "flex flex-wrap flex-grow border-slate-900 items-center gap-2 md:gap-3.5 pl-2.5 md:pl-3.5 py-2 md:py-3 border-t",
                        idx === Object.keys(refinedServices).length - 1 && 'border-b'
                    )}>
                        { services.map((service, idx) => <li key={idx}>
                            {ServiceIcons[service.category](service)}
                        </li>) }
                    </ul>
                </div>
            })}
        </div>
    </Section>
}

const ServiceIcon = ({ children, className, service, url }: any) => <Tooltip>
    <TooltipTrigger asChild>
        <Link href={url ?? '#'} target="_blank" className={cn("flex items-center justify-center cursor-pointer scale-90 md:scale-100 w-14 h-14 rounded-lg bg-white", className)}>
            { children }
        </Link>
    </TooltipTrigger>
    <TooltipContent sideOffset={7.5}>{ Services[service.category].toString() }</TooltipContent>
</Tooltip>

export const ServiceIcons: Record<Services, (service: IExternalGame) => ReactNode> = {
    [Services.Steam]: (s) => <ServiceIcon className="pt-1 overflow-hidden bg-gradient-to-b from-[#152437] to-[#1f76a8]"
        url={`https://store.steampowered.com/app/${s.uid}`} service={s}
    >
        <Steam className="w-12 h-12 -ml-2"/>
    </ServiceIcon>,
    [Services.GOG]: (s) => <ServiceIcon url={s.url} service={s}><GOG/></ServiceIcon>,
    [Services.Microsoft]: (s) => <ServiceIcon url={s.url} service={s} className="bg-[#107b11]">
        <Xbox className="w-8 h-8 fill-white"/>
    </ServiceIcon>,
    [Services.Apple]: (s) => <ServiceIcon url={s.url} service={s}><Mac className="w-9 h-9"/></ServiceIcon>,
    [Services.Android]: (s) => <ServiceIcon url={s.url} service={s} className="bg-[#f7f8fa]"><PlayStore/></ServiceIcon>,
    [Services.AmazonAsin]: (s) => <ServiceIcon url={s.url} service={s} className="bg-[#f7f8fa]"><Amazon/></ServiceIcon>,
    [Services.AmazonLuna]: (s) => <ServiceIcon url={s.url} service={s} className="bg-[#9146ff]"><AmazonLuna/></ServiceIcon>,
    [Services.EpicGame]: (s) => <ServiceIcon url={s.url} service={s}><EpicGames className="fill-white"/></ServiceIcon>,
    [Services.Oculus]: (s) => <ServiceIcon url={s.url} service={s}><Oculus/></ServiceIcon>,
    [Services.Utomik]: (s) => <ServiceIcon url={s.url} service={s}><Utomik/></ServiceIcon>, // TODO - Utomik link not working as expected (http://localhost:3000/game/flame-keeper)
    [Services.ItchIo]: (s) => <ServiceIcon url={s.url} service={s} className="bg-[#ff6260]"><ItchIo/></ServiceIcon>,
    [Services.PSStore]: (s) => <ServiceIcon url={s.url} service={s}><PSStore/></ServiceIcon>,
    [Services.FocusEntertainment]: (s) => <ServiceIcon url={s.url} service={s}><FocusEnt/></ServiceIcon>,
    [Services.XboxGamePass]: (s) => <ServiceIcon url={s.url} service={s} className="bg-[#107b11] flex flex-col gap-1.5">
        <Xbox className="w-6 h-6 fill-white"/>
        <span className="text-[.45rem] font-medium">GAME PASS</span>
    </ServiceIcon>,
    [Services.EShop]: (s) => <ServiceIcon url={s.url} className="bg-[#FF7D00]" service={s}><EShop/></ServiceIcon>,
}  

export default ServicesTable
