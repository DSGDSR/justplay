import { IGroupedPlatforms, IPlatform } from "@/lib/models/platform";
import { ReactNode } from "react";
import Windows from "./icons/platforms/Windows";
import Mac from "./icons/platforms/Mac";
import { Tooltip, TooltipTrigger, TooltipContent } from "./Tooltip";
import Linux from "./icons/platforms/Linux";
import Android from "./icons/platforms/Android";
import PlayStation from "./icons/platforms/PlayStation";
import Xbox from "./icons/platforms/Xbox";
import NintendoSwitch from "./icons/platforms/Switch";
import { cn, formatList } from "@/lib/utils";
import GameCube from "./icons/platforms/GameCube";
import Wii from "./icons/platforms/Wii";
import WiiU from "./icons/platforms/WiiU";

interface Props {
  platforms: IPlatform[];
}

const PlatformTooltip = ({ platform }: { platform: IGroupedPlatforms }) => <Tooltip>
    <TooltipTrigger asChild>
        { PlatformIcons[platform.group] }
    </TooltipTrigger>
    <TooltipContent sideOffset={5}>{ formatList(platform.names) }</TooltipContent>
</Tooltip>

const Platforms = ({ platforms }: Props) => {
    const groupedPlatforms = groupPlatforms(platforms)

    return <ul className="list-none flex items-center gap-3.5 text-slate-600">
        {Object.keys(groupedPlatforms).map(platform => <li key={platform}>
            { <PlatformTooltip platform={groupedPlatforms[platform]} /> }
        </li>)}
    </ul>
}

const groupPlatforms = (platforms: IPlatform[]) => {
    const groupedPlatforms: Record<string, IGroupedPlatforms> = {}
    platforms.forEach(p => {
        const group = Object.keys(PlatformGroups).find(g => PlatformGroups[g].includes(p.id))
        if (group) {
            if (!groupedPlatforms[group]) {
                groupedPlatforms[group] = {
                    group,
                    names: [p.name],
                    platforms: [p]
                }
            } else {
                groupedPlatforms[group].names.push(p.name)
                groupedPlatforms[group].platforms.push(p)
            }
        }
    })
    return groupedPlatforms
}

const PlatformGroups: Record<string, number[]> = {
    'Windows': [6, 74, 161, 405],
    'PS': [8, 9, 38, 46, 48, 165, 167, 390],
    'XBOX': [11, 12, 49, 169],
    'Mac': [14, 75, 115],
    'Linux': [3],
    'NintendoSwitch': [130],
    'Android': [34],
    'NintendoDS': [20],
    'Nintendo3DS': [37, 137],
    'NintendoDSi': [159],
    'Nintendo64': [4, 416],
    'GameCube': [21],
    'NES': [18, 131],
    'SNES': [19],
    'iOS': [39],
    'Wii': [5], // TODO
    'WiiU': [41] // TODO
}

const IconClasses = 'w-6 h-6 fill-current text-md cursor-default'
const PlatformIcons: Record<string, ReactNode> = {
    'Windows': <Windows className={IconClasses} style={{transform: 'scale(.9)'}}/>,
    'PS': <PlayStation className={IconClasses} />, //PS VITA (46) & PSP (38) TODO change?
    'XBOX': <Xbox className={IconClasses} style={{transform: 'scale(.85)'}}/>,
    'Mac': <Mac className={IconClasses} />,
    'Linux': <Linux className={IconClasses} />,
    'NintendoSwitch': <NintendoSwitch className={IconClasses} style={{transform: 'scale(.85)'}}/>,
    'Android': <Android className={IconClasses} />,
    'NintendoDS': <strong className={IconClasses}>DS</strong>,
    'Nintendo3DS': <strong className={IconClasses}>3DS</strong>,
    'NintendoDSi': <strong className={IconClasses}>DSi</strong>,
    'Nintendo64': <strong className={IconClasses}>N64</strong>,
    'GameCube': <GameCube className={IconClasses} />,
    'NES': <strong className={IconClasses}>NES</strong>,
    'SNES': <strong className={IconClasses}>SNES</strong>,
    'iOS': <strong className={IconClasses}>iOS</strong>,
    'Wii': <Wii className={cn(IconClasses, 'w-7')} />,
    'WiiU': <WiiU className={cn(IconClasses, 'w-11')}/>,
}

export default Platforms
