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
import { Platform } from "@/lib/enums/platforms";

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
    [Platform.Windows]: [6, 74, 161, 405],
    [Platform.PS]: [8, 9, 38, 46, 48, 165, 167, 390],
    [Platform.XBOX]: [11, 12, 49, 169],
    [Platform.Mac]: [14, 75, 115],
    [Platform.Linux]: [3],
    [Platform.NintendoSwitch]: [130],
    [Platform.Android]: [34],
    [Platform.NintendoDS]: [20],
    [Platform.Nintendo3DS]: [37, 137],
    [Platform.NintendoDSi]: [159],
    [Platform.Nintendo64]: [4, 416],
    [Platform.GameCube]: [21],
    [Platform.NES]: [18, 131],
    [Platform.SNES]: [19],
    [Platform.iOS]: [39],
    [Platform.Wii]: [5], // TODO
    [Platform.WiiU]: [41] // TODO
}

const IconClasses = 'w-6 h-6 fill-current text-md cursor-default'
const PlatformIcons: Record<string, ReactNode> = {
    [Platform.Windows]: <Windows className={IconClasses} style={{transform: 'scale(.9)'}}/>,
    [Platform.PS]: <PlayStation className={IconClasses} />, //PS VITA (46) & PSP (38) TODO change?
    [Platform.XBOX]: <Xbox className={IconClasses} style={{transform: 'scale(.85)'}}/>,
    [Platform.Mac]: <Mac className={IconClasses} />,
    [Platform.Linux]: <Linux className={IconClasses} />,
    [Platform.NintendoSwitch]: <NintendoSwitch className={IconClasses} style={{transform: 'scale(.85)'}}/>,
    [Platform.Android]: <Android className={IconClasses} />,
    [Platform.NintendoDS]: <strong className={IconClasses}>DS</strong>,
    [Platform.Nintendo3DS]: <strong className={IconClasses}>3DS</strong>,
    [Platform.NintendoDSi]: <strong className={IconClasses}>DSi</strong>,
    [Platform.Nintendo64]: <strong className={IconClasses}>N64</strong>,
    [Platform.GameCube]: <GameCube className={IconClasses} />,
    [Platform.NES]: <strong className={IconClasses}>NES</strong>,
    [Platform.SNES]: <strong className={IconClasses}>SNES</strong>,
    [Platform.iOS]: <strong className={IconClasses}>iOS</strong>,
    [Platform.Wii]: <Wii className={cn(IconClasses, 'w-7')} />,
    [Platform.WiiU]: <WiiU className={cn(IconClasses, 'w-11')}/>,
}

export default Platforms
