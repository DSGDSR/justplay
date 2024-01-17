'use client'

import { from } from '@/lib/utils'
import { Badge } from './Badge'
import { List, ListItem } from '@/lib/models/lists'
import useCustomLists from '@/hooks/use-custom-lists'
import { useGamesStore } from '@/lib/stores/games.store'
import useIsClient from '@/hooks/use-is-client'
import Skeleton from './Skeleton'
import { ActivityTypes } from '@/lib/enums/activity.enum'
import { IGame } from '@/lib/models/game'
import { User } from '@clerk/nextjs/server'

interface Props {
    user: User
    activity: ListItem[]
    limit?: number
}

const Activity = ({ activity, limit = 5, user }: Props) => {
    const { customLists } = useCustomLists(user.id)
    const { games } = useGamesStore()

    const activities = activity.slice(0, limit)
    const isLoaded = useIsClient() && activities.every(a => !!games.find(g => g.object.id === a.game)?.object)

    return isLoaded ? <ul className="-my-2">
        {
            activities.map((item, idx) => {
                const game = games.find(g => g.object.id === item.game)?.object!
                const list = customLists.find(cl => cl.id === item.custom_list_id)
                console.log(game, list)
                return <li key={`${item.game}-${item.list_type}`} className="relative pl-8 sm:pl-[7.5rem] py-3.5 group">
                    <div className="flex flex-col sm:flex-row items-start group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-700 sm:before:ml-24 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-3.5 after:h-3.5 after:bg-slate-700 after:rounded-full sm:after:ml-24 after:-translate-x-1/2 after:translate-y-1.5">
                        <Badge variant="secondary" className="bg-slate-700  sm:absolute left-0 mb-3 sm:mb-0 sm:w-[4.5rem] justify-center text-center text-[.7rem]">
                            { from('en', new Date(item.created_at)) }
                        </Badge>
                        <div>
                            {ActivityItems[item.list_type]({ game, list, user })}
                        </div>
                    </div>
                    <div className="text-slate-500"></div>
                </li>
            })
        }
    </ul> : <ActivitySkeleton />
}

const ActivitySkeleton = () => {
    return <ul className="-my-2">
        {
            [90, 60, 45, 75, 80].map((width, idx) => <li key={`activity_${idx}`} className="relative pl-8 sm:pl-[7.5rem] py-3.5 group">
                <div className="flex flex-col sm:flex-row items-start group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-700 sm:before:ml-24 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-3.5 after:h-3.5 after:bg-slate-700 after:rounded-full sm:after:ml-24 after:-translate-x-1/2 after:translate-y-1.5">
                    <Badge variant="skeleton" className="bg-slate-700 sm:absolute left-0 mb-3 sm:mb-0 w-[4.5rem] text-[.7rem]">1m ago</Badge>
                    <Skeleton style={{width: `${width}%`}} className="h-6" />
                </div>
                <div className="text-slate-500"></div>
            </li>)
        }
    </ul>
}

interface ActivityItemProps {
    game: IGame
    list?: List
    user: User
}

const ActivityItems: Record<ActivityTypes, (props: ActivityItemProps) => JSX.Element> = {
    [ActivityTypes.Favorite]: ({ game, user }: ActivityItemProps) => <p className="text-slate-400">
        <strong className="text-slate-300">{user.username}</strong> added <a href={`/game/${game.slug}`} target="_blank" className="text-slate-300 hover:text-primary"><strong>{game.name}</strong></a> to favorite games
    </p>,
    [ActivityTypes.Playlist]: ({ game, user }: ActivityItemProps) => <p className="text-slate-400">
        <strong className="text-slate-300">{user.username}</strong> added <a href={`/game/${game.slug}`} target="_blank" className="text-slate-300 hover:text-primary"><strong>{game.name}</strong></a> to games to be played
    </p>,
    [ActivityTypes.Finished]: ({ game, user }: ActivityItemProps) => <p className="text-slate-400">
        <strong className="text-slate-300">{user.username}</strong> added <a href={`/game/${game.slug}`} target="_blank" className="text-slate-300 hover:text-primary"><strong>{game.name}</strong></a> to finished games
    </p>,
    [ActivityTypes.Custom]: ({ game, list, user }: ActivityItemProps) => <p className="text-slate-400">
        <strong className="text-slate-300">{user.username}</strong> added <a href={`/game/${game.slug}`} target="_blank" className="text-slate-300 hover:text-primary"><strong>{game.name}</strong></a> to <a className="text-slate-300 hover:text-primary" href={`/${user.username}/list/${list?.slug}`} target="_blank"><strong>{list?.name}</strong></a>
    </p>
}

export default Activity