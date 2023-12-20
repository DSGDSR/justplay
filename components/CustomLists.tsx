'use client'

import { List, ListItem } from '@/lib/models/lists'
import { getLists } from '@/services/lists'
import { useEffect, useState } from 'react'
import Section from './Section'
import GamesList from './GamesList'
import { usePathname } from 'next/navigation'

interface Props {
    userId: string
    title?: string
    isSection?: boolean
    listedGames: ListItem[]
}

const CustomListsSection = ({ userId, listedGames, isSection, title = 'Custom lists' }: Props) => {
    const [lists, setLists] = useState<List[]>([])

    useEffect(() => {
        if (!userId) return

        getLists(userId).then(lists => {
            if (lists?.data) setLists(lists.data)
        })
    }, [userId])

    return isSection ? <Section title={title}>
        <CustomLists lists={lists} listedGames={listedGames} />
    </Section> : <CustomLists lists={lists} listedGames={listedGames} />
}

const CustomLists = ({ lists, listedGames }: {
    lists: List[]
    listedGames: ListItem[]
}) => {
    const pathname = usePathname()

    return <div className="flex flex-col gap-5">
        { lists.map(list => {
            const listGames = listedGames.filter(f => f.custom_list_id === list.id)

            return <div key={list.id} className="flex items-center gap-5">
                <div className="w-2/5 max-w-xs">
                    <GamesList
                        list={listGames}
                        variant='compact'
                        listedGames={null}
                        link={`${pathname}/lists/${list.id}`}
                    />
                </div>
                
                <hgroup className="flex h-full items-start flex-col py-2 gap-2">
                    <h4 className="text-xl font-bold">{ list.name }</h4>
                    <span className="text-xs text-slate-400">{ listGames.length } games</span>
                </hgroup>
            </div>
        }) }
    </div>
}


export default CustomListsSection