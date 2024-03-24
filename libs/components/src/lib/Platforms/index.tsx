import { IGroupedPlatforms, IPlatform } from '@wheretoplay/shared/models';
import { ReactNode } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from '../Tooltip';
import { cn, formatList } from '@wheretoplay/shared/utils';
import { Platform } from '@wheretoplay/shared/enums';
import { Android, GameCube, Linux, Mac, PlayStation, Wii, WiiU, Windows, Xbox } from '../icons/platforms';
import NintendoSwitch from '../icons/platforms/Switch';

interface PlatformsProps {
    platforms: IPlatform[];
    showTooltip?: boolean;
}

export const Platforms = ({ platforms, showTooltip = true }: PlatformsProps) => {
    const groupedPlatforms = groupPlatforms(platforms)

    return <ul className="list-none flex items-center gap-3 sm:gap-4 text-slate-300 flex-wrap">
        {Object.keys(groupedPlatforms).map(platform => <li key={platform}>
            {showTooltip
                ? <PlatformTooltip platform={groupedPlatforms[platform]} />
                : PlatformIcons[groupedPlatforms[platform].group]}
        </li>)}
    </ul>
}

const PlatformTooltip = ({ platform }: { platform: IGroupedPlatforms }) => <Tooltip>
    <TooltipTrigger asChild>
        <div className="scale-90 sm:scale-100">
            {PlatformIcons[platform.group]}
        </div>
    </TooltipTrigger>
    <TooltipContent sideOffset={5}>{formatList(platform.names)}</TooltipContent>
</Tooltip>

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

const IconClasses = 'w-s h-s fill-current text-md cursor-default'
const PlatformIcons: Record<string, ReactNode> = {
    [Platform.Windows]: <Windows className={IconClasses} style={{ transform: 'scale(.9)' }} />,
    [Platform.PS]: <PlayStation className={IconClasses} />, //PS VITA (46) & PSP (38) TODO change?
    [Platform.XBOX]: <Xbox className={IconClasses} style={{ transform: 'scale(.85)' }} />,
    [Platform.Mac]: <Mac className={IconClasses} />,
    [Platform.Linux]: <Linux className={IconClasses} />,
    [Platform.NintendoSwitch]: <NintendoSwitch className={IconClasses} style={{ transform: 'scale(.85)' }} />,
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
    [Platform.WiiU]: <WiiU className={cn(IconClasses, 'w-11')} />,
}
