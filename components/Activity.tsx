'use client'

import { from } from '@/lib/utils'
import { Badge } from './Badge'
import { ListItem } from '@/lib/models/lists'
import useCustomLists from '@/hooks/use-custom-lists'
import { useGamesStore } from '@/lib/stores/games.store'
import useIsClient from '@/hooks/use-is-client'
import Skeleton from './Skeleton'

interface Props {
    userId: string
    activity: ListItem[]
    limit?: number
}

const Activity = ({ activity, limit, userId }: Props) => {
    const { customLists } = useCustomLists(userId)
    const { games } = useGamesStore()
    const isClient = useIsClient()

    return isClient ? <ul className="-my-2">
        {
            (limit ? activity.slice(0, limit) : activity).map((item, idx) => 
                <li key={`${item.game}-${item.list_type}`} className="relative pl-8 sm:pl-[7.5rem] py-3.5 group">
                    <div className="flex flex-col sm:flex-row items-start group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-700 sm:before:ml-24 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-3.5 after:h-3.5 after:bg-slate-700 after:rounded-full sm:after:ml-24 after:-translate-x-1/2 after:translate-y-1.5">
                        <Badge variant="secondary" className="bg-slate-700 sm:absolute left-0 mb-3 sm:mb-0 w-[4.5rem] justify-center text-center text-[.7rem]">
                            { from('en', new Date(item.created_at)) }
                        </Badge>
                        <div className="font-semibold">{games.find(g => g.object.id === item.game)?.object.name}, {customLists.find(cl => cl.id === item.custom_list_id)?.name}</div>
                    </div>
                    <div className="text-slate-500"></div>
                </li>
            )
        }
    </ul> : <ActivitySkeleton />
}

const ActivitySkeleton = () => {
    return <ul className="-my-2">
        {
            [520, 480, 320, 410, 375].map((width, idx) => <li key={`activity_${idx}`} className="relative pl-8 sm:pl-[7.5rem] py-3.5 group">
                <div className="flex flex-col sm:flex-row items-start group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-700 sm:before:ml-24 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-3.5 after:h-3.5 after:bg-slate-700 after:rounded-full sm:after:ml-24 after:-translate-x-1/2 after:translate-y-1.5">
                    <Badge variant="skeleton" className="bg-slate-700 sm:absolute left-0 mb-3 sm:mb-0 w-[4.5rem] text-[.7rem]">1m ago</Badge>
                    <Skeleton style={{width}} className="h-6" />
                </div>
                <div className="text-slate-500"></div>
            </li>)
        }
    </ul>
}

export default Activity