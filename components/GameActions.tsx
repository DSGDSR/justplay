"use client"

import { useState } from "react"
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
import { ListsState } from "@/lib/models/lists"
import { list } from "postcss"

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
    listsState: ListsState | undefined
    gameId: number
}

const GameActions = ({ listsState, gameId }: Props) => {
    const { isSignedIn, userId } = useAuth()
    const { info, error } = useToast()
    const [listWarning, setListWarning] = useState(false)
    const [lists, setLists] = useState<ListsState>(listsState ?? {
        [ListType.Favorite]: ListState.Inactive,
        [ListType.Playlist]: ListState.Inactive,
        [ListType.Finished]: ListState.Inactive,
        [ListType.Custom]: ListState.Inactive
    })

    const updateList = async (listTypes: ListType[], listId: number | null = null) => {
        if (!isSignedIn || !userId) {
            info('You must be signed in to use lists.')
            return
        }
        
        const actions = listTypes.map(list => lists[list] === ListState.Active ? ListAction.Remove : ListAction.Add)
        
        setLists({ ...lists, ...listTypes.map(list => ({ [list]: ListState.Loading })).reduce((a, b) => ({ ...a, ...b })) })
        
        const additions = await Promise.all(listTypes.map((list, index) => {
            return addToList(actions[index], gameId, list, userId, listId)
        }))
        
        if (additions.every(addition => !addition || ('success' in addition && !addition.success))) {
            error('An error ocurred while adding or removing the game from the list.')
            setLists({ ...lists, ...listTypes.map((list, i) => ({ [list]: listTypes[i] })).reduce((a, b) => ({ ...a, ...b })) })
            return
        }
        
        setLists({ ...lists, ...listTypes.map((list, i) => ({ [list]: actions[i] })).reduce((a, b) => ({ ...a, ...b })) })
    }


    return <div className="flex flex-col gap-3.5 w-full">
        <WarningDialog open={listWarning} onOpenChange={setListWarning} updateList={updateList} />

        <div className="flex gap-3.5">
            <ListButton onClick={() => {
                if (lists[ListType.Favorite] === ListState.Loading) return
                updateList([ListType.Favorite])
            }} tooltip={
                lists[ListType.Favorite] === ListState.Active ? 'Remove from favorites' : 'Add to favorites'
            }>
                { lists[ListType.Favorite] !== ListState.Loading ?
                    <Heart active={lists[ListType.Favorite] === ListState.Active} /> : <Spinner size={24}/> }
            </ListButton>
            <ListButton onClick={() => {
                if (lists[ListType.Playlist] === ListState.Loading) return
                updateList([ListType.Playlist])
            }} tooltip={
                lists[ListType.Playlist] === ListState.Active ? 'Remove from playlist' : 'Want to play'
            }>
                { lists[ListType.Playlist] !== ListState.Loading ?
                    <Gamepad active={lists[ListType.Playlist] === ListState.Active} /> : <Spinner size={24}/> }
            </ListButton>
            <ListButton onClick={() => {
                if (lists[ListType.Finished] === ListState.Loading) return
                if (lists[ListType.Playlist] === ListState.Active && lists[ListType.Finished] === ListState.Inactive) {
                    setListWarning(true)
                } else {
                    updateList([ListType.Finished])
                }
            }} tooltip={
                lists[ListType.Finished] === ListState.Active ? 'Set as not finished' : 'Set as finished'
            }>
                { lists[ListType.Finished] !== ListState.Loading ?
                    <Medal active={lists[ListType.Finished] === ListState.Active} /> : <Spinner size={24}/> }
            </ListButton>
        </div>
        <Button variant="secondary" size="lg" className="w-full">
            <PlaylistAdd className="mr-2"/> Add to list
        </Button>
    </div>
}

const ListButton = ({ className, children, tooltip, ...props }: any) => <Tooltip>
    <TooltipTrigger asChild>
        <Button variant="secondary" className={cn("flex-grow h-16", className)} {...props}>
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