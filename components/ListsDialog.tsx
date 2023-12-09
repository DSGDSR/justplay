'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from './Dialog'
import { Button } from './Button'
import { List } from '@/lib/models/lists'
import { ListActions } from '@/lib/enums'
import { Checkbox } from './Checkbox'
import X from './icons/X'
import { ListNameSchemma } from '@/lib/utils'
import { parse, flatten, ValiError } from 'valibot'
import { IHttpResponse } from '@/lib/models/response'
import { useToast } from '@/hooks/use-toast'
import { getLists } from '@/services/lists'

const createList = async (userId: string, name: string): Promise<IHttpResponse<null> | null> => {
    return await fetch('/api/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: ListActions.CreateList, name, userId })
    }).then(res => res.json()).catch(() => null)
}

interface Props {
    trigger: ReactNode
    userId: string | null | undefined
}

const ListsDialog = ({ trigger, userId }: Props) => {
    // get the user's lists
    const [lists, setLists] = useState<List[]>([])

    const updateLists = () => {
        if (!userId) return

        getLists(userId).then(lists => {
            if (lists?.data) setLists(lists.data)
        })
    }

    useEffect(() => updateLists(), [userId])

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

            <main className="flex flex-col border-2 rounded-md border-slate-800 border-dashed p-1 gap-1 mt-3">
                { lists?.map(list => <ListItem key={list.id} list={list} />) }
                <CreateList onCreate={updateLists} userId={userId} />
            </main>
        </DialogContent>
    </Dialog> : trigger
}

const ListItem = ({ list }: {
    list: List
}) => {
    return <div className="group relative" key={list.id}>
        <label htmlFor={`list-${list.id}`} className="cursor-pointer flex items-center gap-3 bg-slate-800 group-hover:bg-slate-900 rounded-md h-11 px-3">
            <Checkbox className="border-white data-[state=checked]:bg-white" id={`list-${list.id}`} />
            <p className="text-sm font-medium truncate">{ list.name }</p>
        </label>
    </div>
}

const CreateList = ({ onCreate, userId }: {
    onCreate: () => void
    userId: string
}) => {
    const nameInput = useRef<HTMLInputElement>(null)
    const [open, setOpen] = useState(false)
    const { error } = useToast()

    const create = async () => {
        if (!nameInput.current) return
        const name = nameInput.current.value

        if (!validateName(name)) return

        const lists = await createList(userId, name)
        if (lists) {
            setOpen(false)
            nameInput.current.value = ''
            onCreate()
        }
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

    const cancel = () => {
        setOpen(false)
    }

    return <>
        { open
            ? <>
                <div className="h-11 flex bg-slate-800 rounded-md items-center pl-3 pr-1.5 gap-1 z-[1]">
                    <input ref={nameInput} placeholder="List name" type="text" autoFocus className="w-full h-11 text-white outline-none text-sm bg-transparent pr-2"/>
                    <Button variant="outline" className={'right px-2 py-1 h-8 text-sm font-normal'} onClick={create}>Create</Button>
                    <Button variant="outline" className="right px-2 py-1 h-8" onClick={cancel} >
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
