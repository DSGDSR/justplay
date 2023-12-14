import { IGroupedPlatforms, IPlatform } from '@/lib/models/platform';
import { ReactNode } from 'react';
import Windows from './icons/platforms/Windows';
import Mac from './icons/platforms/Mac';
import { Tooltip, TooltipTrigger, TooltipContent } from './Tooltip';
import Linux from './icons/platforms/Linux';
import Android from './icons/platforms/Android';
import PlayStation from './icons/platforms/PlayStation';
import Xbox from './icons/platforms/Xbox';
import NintendoSwitch from './icons/platforms/Switch';
import { cn, formatList } from '@/lib/utils';
import GameCube from './icons/platforms/GameCube';
import Wii from './icons/platforms/Wii';
import WiiU from './icons/platforms/WiiU';
import { Platforms } from '@/lib/enums';

interface Props {
  platforms: IPlatform[];
}

const PlatformTooltip = ({ platform }: { platform: IGroupedPlatforms }) => <Tooltip>
    <TooltipTrigger asChild>
        <div className="scale-90 sm:scale-100">
            { PlatformIcons[platform.group] }
        </div>
    </TooltipTrigger>
    <TooltipContent sideOffset={5}>{ formatList(platform.names) }</TooltipContent>
</Tooltip>

const PlatformsList = ({ platforms }: Props) => {
    const groupedPlatforms = groupPlatforms(platforms)

    return <ul className="list-none flex items-center gap-3 sm:gap-4 text-slate-300 flex-wrap">
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
    [Platforms.Windows]: [6, 74, 161, 405],
    [Platforms.PS]: [8, 9, 38, 46, 48, 165, 167, 390],
    [Platforms.XBOX]: [11, 12, 49, 169],
    [Platforms.Mac]: [14, 75, 115],
    [Platforms.Linux]: [3],
    [Platforms.NintendoSwitch]: [130],
    [Platforms.Android]: [34],
    [Platforms.NintendoDS]: [20],
    [Platforms.Nintendo3DS]: [37, 137],
    [Platforms.NintendoDSi]: [159],
    [Platforms.Nintendo64]: [4, 416],
    [Platforms.GameCube]: [21],
    [Platforms.NES]: [18, 131],
    [Platforms.SNES]: [19],
    [Platforms.iOS]: [39],
    [Platforms.Wii]: [5], // TODO
    [Platforms.WiiU]: [41] // TODO
}

const IconClasses = 'w-s h-s fill-current text-md cursor-default'
const PlatformIcons: Record<string, ReactNode> = {
    [Platforms.Windows]: <Windows className={IconClasses} style={{transform: 'scale(.9)'}}/>,
    [Platforms.PS]: <PlayStation className={IconClasses} />, //PS VITA (46) & PSP (38) TODO change?
    [Platforms.XBOX]: <Xbox className={IconClasses} style={{transform: 'scale(.85)'}}/>,
    [Platforms.Mac]: <Mac className={IconClasses} />,
    [Platforms.Linux]: <Linux className={IconClasses} />,
    [Platforms.NintendoSwitch]: <NintendoSwitch className={IconClasses} style={{transform: 'scale(.85)'}}/>,
    [Platforms.Android]: <Android className={IconClasses} />,
    [Platforms.NintendoDS]: <strong className={IconClasses}>DS</strong>,
    [Platforms.Nintendo3DS]: <strong className={IconClasses}>3DS</strong>,
    [Platforms.NintendoDSi]: <strong className={IconClasses}>DSi</strong>,
    [Platforms.Nintendo64]: <strong className={IconClasses}>N64</strong>,
    [Platforms.GameCube]: <GameCube className={IconClasses} />,
    [Platforms.NES]: <strong className={IconClasses}>NES</strong>,
    [Platforms.SNES]: <strong className={IconClasses}>SNES</strong>,
    [Platforms.iOS]: <strong className={IconClasses}>iOS</strong>,
    [Platforms.Wii]: <Wii className={cn(IconClasses, 'w-7')} />,
    [Platforms.WiiU]: <WiiU className={cn(IconClasses, 'w-11')}/>,
}

export default PlatformsList
