"use client"

import { useEffect, useState } from "react"
import { Button } from "./Button"
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip"
import Gamepad from "./icons/Gamepad"
import Heart from "./icons/Heart"
import Medal from "./icons/Medal"
import PlaylistAdd from "./icons/PlaylistAdd"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./AlertDialog"
import { ListAction, ListState, ListType } from "@/lib/enums"
import { useAuth } from "@clerk/nextjs"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { IHttpResponse } from "@/lib/models/response"
import Spinner from "./icons/Spinner"
import { ListsItemsResponse, ListsState } from "@/lib/models/lists"

const DEFAULT_LISTS: ListsState = {
    [ListType.Favorite]: ListState.Inactive,
    [ListType.Playlist]: ListState.Inactive,
    [ListType.Finished]: ListState.Inactive,
    [ListType.Custom]: ListState.Inactive
}

const addToList = async (
    action: ListAction,
    gameId: number,
    list: ListType,
    userId: string,
    listId: number | null = null
): Promise<IHttpResponse | null> => {
    return await fetch('/api/lists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action,
            listType: list,
            listId,
            gameId,
            userId
        })
    }).then(res => res.json()).catch(() => null)
}

interface Props {
    gameId: number
    lists: ListsItemsResponse | null
    mode?: 'card' | 'page'
}

const GameActions = ({ gameId, lists, mode = 'page' }: Props) => {
    const { isSignedIn, userId } = useAuth()
    const { info, error } = useToast()
    const [listWarning, setListWarning] = useState(false)
    const [listsStates, setListsStates] = useState<ListsState>({
        [ListType.Favorite]: ListState.Loading,
        [ListType.Playlist]: ListState.Loading,
        [ListType.Finished]: ListState.Loading,
        [ListType.Custom]: ListState.Inactive
    })
    
    useEffect(() => {
        setListsStates(lists ? {
            [ListType.Favorite]: lists[ListType.Favorite].filter(l => l.game === gameId).length ? ListState.Active : ListState.Inactive,
            [ListType.Playlist]: lists[ListType.Playlist].filter(l => l.game === gameId).length ? ListState.Active : ListState.Inactive,
            [ListType.Finished]: lists[ListType.Finished].filter(l => l.game === gameId).length ? ListState.Active : ListState.Inactive,
            [ListType.Custom]: ListState.Inactive
        } : DEFAULT_LISTS)
    }, [gameId, isSignedIn, userId])

    const updateList = async (listTypes: ListType[], listId: number | null = null) => {
        if (!isSignedIn || !userId) {
            info('You must be signed in to use lists.')
            return
        }
        
        const actions = listTypes.map(list => listsStates[list] === ListState.Active ? ListAction.RemoveGame : ListAction.AddGame)
        
        setListsStates({ ...listsStates, ...listTypes.map(list => ({ [list]: ListState.Loading })).reduce((a, b) => ({ ...a, ...b })) })
        
        const additions = await Promise.all(listTypes.map((list, index) => {
            return addToList(actions[index], gameId, list, userId, listId)
        }))
        
        if (additions.every(addition => !addition || ('success' in addition && !addition.success))) {
            error('An error ocurred while adding or removing the game from the list.')
            setListsStates({ ...listsStates, ...listTypes.map((list, i) => ({ [list]: listTypes[i] })).reduce((a, b) => ({ ...a, ...b })) })
            return
        }
        
        setListsStates({ ...listsStates, ...listTypes.map((list, i) => ({ [list]: actions[i] })).reduce((a, b) => ({ ...a, ...b })) })
    }


    return <div className={cn("flex flex-col gap-3.5 w-full", mode === 'card' && 'p-2')}>
        <WarningDialog open={listWarning} onOpenChange={setListWarning} updateList={updateList} />

        <div className={cn("flex", mode === 'page' && 'gap-3.5', mode === 'card' && 'justify-between')}>
            <ListButton mode={mode} onClick={(e: MouseEvent) => {
                if (listsStates[ListType.Favorite] === ListState.Loading) return
                updateList([ListType.Favorite])
                e.preventDefault()
            }} tooltip={
                listsStates[ListType.Favorite] === ListState.Active ? 'Remove from favorites' : 'Add to favorites'
            }>
                { listsStates[ListType.Favorite] !== ListState.Loading ?
                    <Heart active={listsStates[ListType.Favorite] === ListState.Active} /> : <Spinner size={24}/> }
            </ListButton>
            <ListButton mode={mode} onClick={(e: MouseEvent) => {
                if (listsStates[ListType.Playlist] === ListState.Loading) return
                updateList([ListType.Playlist])
                e.preventDefault()
            }} tooltip={
                listsStates[ListType.Playlist] === ListState.Active ? 'Remove from playlist' : 'Want to play'
            }>
                { listsStates[ListType.Playlist] !== ListState.Loading ?
                    <Gamepad active={listsStates[ListType.Playlist] === ListState.Active} /> : <Spinner size={24}/> }
            </ListButton>
            <ListButton mode={mode} onClick={(e: MouseEvent) => {
                if (listsStates[ListType.Finished] === ListState.Loading) return
                if (listsStates[ListType.Playlist] === ListState.Active && listsStates[ListType.Finished] === ListState.Inactive) {
                    setListWarning(true)
                } else {
                    updateList([ListType.Finished])
                }
                e.preventDefault()
            }} tooltip={
                listsStates[ListType.Finished] === ListState.Active ? 'Set as not finished' : 'Set as finished'
            }>
                { listsStates[ListType.Finished] !== ListState.Loading ?
                    <Medal active={listsStates[ListType.Finished] === ListState.Active} /> : <Spinner size={24}/> }
            </ListButton>
        </div>
        { mode === 'page' ? <Button variant="secondary" size="lg" className="w-full">
            <PlaylistAdd className="mr-2"/> Add to list
        </Button> : <></> }
    </div>
}

const ListButton = ({ className, children, tooltip, mode, ...props }: any) => <Tooltip className={mode === 'card' ? 'w-[30%]' : 'flex-grow'}>
    <TooltipTrigger asChild>
        <Button variant={mode === 'card' ? 'outline' : 'secondary'} className={cn("w-full h-16", mode === 'card' && 'h-12 shadow-lg', className)} {...props}>
            {children}
        </Button>
    </TooltipTrigger>
    <TooltipContent sideOffset={7.5}>{ tooltip }</TooltipContent>
</Tooltip>

const WarningDialog = ({ open, onOpenChange, updateList }: any) => {
    return <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>This game is in your playlist.</AlertDialogTitle>
                <AlertDialogDescription>If you set it as finished, would you like to remove it from you playlist?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => updateList([ListType.Finished])}>No</AlertDialogCancel>
                <AlertDialogAction onClick={() => updateList([ListType.Playlist, ListType.Finished])}>Yes</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}

export default GameActions