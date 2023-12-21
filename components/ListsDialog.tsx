'use client'

import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from './Dialog'
import { Button } from './Button'
import { List, ListsItemsResponse } from '@/lib/models/lists'
import { Checkbox } from './Checkbox'
import X from './icons/X'
import { ListNameSchemma, cn, slugify } from '@/lib/utils'
import { parse, flatten, ValiError } from 'valibot'
import { useToast } from '@/hooks/use-toast'
import { addToList, createList, getLists, removeFromList } from '@/services/lists'
import { ListTypes } from '@/lib/enums'
import Spinner from './icons/Spinner'
import { IHttpResponse } from '@/lib/models/response'

interface Props {
    gamesListed: ListsItemsResponse | null
    trigger: ReactNode
    userId: string | null | undefined
    gameId: number
}

const ListsDialog = ({ trigger, userId, gameId, gamesListed }: Props) => {
    const [lists, setLists] = useState<List[]>([])
    const [listedGames, setListedGames] = useState<ListsItemsResponse | null>(gamesListed)
    const [loading, setLoading] = useState<boolean>(false)
    const { error } = useToast()

    const updateLists = (callback?: () => void) => {
        if (!userId) return

        getLists(userId).then(lists => {
            if (lists?.data) setLists(lists.data)
            callback?.()
        })
    }

    useEffect(() => updateLists(), [userId])

    const updateListedGames = (gamesResponse: IHttpResponse<ListsItemsResponse | null> | null) => {
        if (!gamesResponse?.data) {
            error('Error ocurred when adding/removing the game from the list. Please try again later.')
            return
        }

        setLoading(false)
        setListedGames(gamesResponse.data)
    }

    const toggleList = (listId: string, addition: boolean) => {
        if (!userId) return

        setLoading(true)
        if (addition) {
            addToList(userId, gameId, listId, ListTypes.Custom)
                .then(updateListedGames)
                .catch(err => error('The game could not be added to the list. Please try again later.')) // TODO Control
        } else {
            removeFromList(userId, gameId, listId, ListTypes.Custom)
                .then(updateListedGames)
                .catch(err => error('The game could not be removed from the list. Please try again later.')) // TODO Control
        }
    }

    /*const onDelete = async (listId: number) => {
        if (deleted === undefined || deleted !== listId) {
            setDeleted(listId)
            info('Click again to confirm the list deletion')
        } else {
            setDeleted(undefined)
            const response = await deleteList(listId)
            if (response?.success) {
                toast('List deleted successfully!')
            } else {
                error('Something went wrong, please try again later')
            }
            updateLists()
        }
    }*/

    return userId ? <Dialog>
        <DialogTrigger asChild>{ trigger }</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add game to my lists</DialogTitle>
            </DialogHeader>

            <main className="relative flex flex-col border-2 rounded-md border-slate-800 border-dashed p-1 gap-1 mt-3 overflow-hidden">
                { lists?.map(list => <ListItem
                    key={list.id}
                    list={list}
                    toggleList={toggleList}
                    isAdded={!!listedGames?.[ListTypes.Custom]?.find(l => l.game === gameId && l.custom_list_id === list.id) ?? false}
                />) }
                <CreateList setLoading={setLoading} onCreate={(c) => updateLists(c)} userId={userId} lists={lists}/>

                { /* LOADING PLACEHOLDER */ }
                <div className={cn('hidden h-full w-full absolute z-[1] bg-background opacity-70 top-0 left-0 justify-center items-center', loading && 'flex')}>
                    <Spinner size={30} />
                </div>
            </main>
        </DialogContent>
    </Dialog> : trigger
}

const ListItem = ({ list, toggleList, isAdded }: {
    list: List
    toggleList: (listId: string, addition: boolean) => void
    isAdded: boolean
}) => {
    return <div className="group relative" key={list.id}>
        <label htmlFor={`list-${list.id}`} className="cursor-pointer flex items-center gap-3 bg-slate-800 group-hover:bg-slate-900 rounded-md h-11 px-3">
            <Checkbox
                id={`list-${list.id}`}
                defaultChecked={isAdded}
                className="border-white data-[state=checked]:bg-white"
                onCheckedChange={(checked) => toggleList(list.id, !!checked)}
            />
            <p className="text-sm font-medium truncate">{ list.name }</p>
        </label>
    </div>
}

const CreateList = ({ onCreate, userId, setLoading, lists }: {
    setLoading: Dispatch<SetStateAction<boolean>>
    onCreate: (callback: () => void) => void
    userId: string
    lists: List[]
}) => {
    const nameInput = useRef<HTMLInputElement>(null)
    const [open, setOpen] = useState(false)
    const { error } = useToast()

    const create = async () => {
        if (!nameInput.current) return
        const name = nameInput.current.value

        if (!validateName(name)) return

        if (lists.find(l => l.name === name || l.slug === slugify(name))) {
            error('You already have a list with that name.')
            return
        }

        setLoading(true)
        createList(userId, name)
            .then(() => {
                onCreate(() => {
                    setOpen(false)
                    if (nameInput.current) {
                        nameInput.current.value = ''
                    }
                })
            })
            .catch(() => error('Something went wrong, please try again later'))
            .finally(() => setLoading(false))
    }

    const validateName = (name: string): boolean => {
        try {
            parse(ListNameSchemma, name);
            return true
        } catch (e) {
            const msg = flatten(e as ValiError).root?.join('. ') ?? null
            error(msg ?? 'Something went wrong, please try again later')
            return false
        }
    }

    return <>
        { open
            ? <>
                <div className="h-11 flex bg-slate-800 rounded-md items-center pl-3 pr-1.5 gap-1 z-[1]">
                    <input ref={nameInput} onKeyDown={e => {
                        if (e.key === 'Enter') create()
                    }} placeholder="List name" type="text" autoFocus className="w-full h-11 text-white outline-none text-sm bg-transparent pr-2"/>
                    <Button variant="outline" className={'right px-2 py-1 h-8 text-sm font-normal'} onClick={create}>Create</Button>
                    <Button variant="outline" className="right px-2 py-1 h-8" onClick={() => setOpen(false)} >
                        <X className="w-4"/>
                    </Button>
                </div>
            </>
            : <Button onClick={() => setOpen(true)} className="w-full justi gap-3 bg-slate-800 hover:bg-slate-900 rounded-md h-11 px-3 text-white justify-start">
                <X className="w-4 stroke-2 rotate-45" /> Create new list
            </Button>
        }
    </>
}

export default ListsDialog
