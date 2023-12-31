'use client'

import { MouseEvent, ReactNode, useEffect, useState } from 'react'
import { Button } from './Button'
import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip'
import Gamepad from './icons/Gamepad'
import Heart from './icons/Heart'
import Medal from './icons/Medal'
import PlaylistAdd from './icons/PlaylistAdd'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle
} from './AlertDialog'
import { ListActions, ListStates, ListTypes } from '@/lib/enums'
import { useAuth } from '@clerk/nextjs'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import Spinner from './icons/Spinner'
import { ListsItemsResponse, ListsState } from '@/lib/models/lists'
import ListsDialog from './ListsDialog'
import { toggleList } from '@/services/lists'
import Skeleton from './Skeleton'

const DEFAULT_LIST = (state = ListStates.Inactive): ListsState => ({
    [ListTypes.Favorite]: state,
    [ListTypes.Playlist]: state,
    [ListTypes.Finished]: state,
    [ListTypes.Custom]: state
})

interface Props {
    gameId: number
    lists: ListsItemsResponse | null
    mode?: 'card' | 'page'
    className?: string
}

const GameActions = ({ gameId, lists, mode = 'page', className }: Props) => {
    const { isSignedIn, userId } = useAuth()
    const { info, error } = useToast()
    const [listWarning, setListWarning] = useState(false)
    const [listsStates, setListsStates] = useState<ListsState>(DEFAULT_LIST(ListStates.Loading))

    useEffect(() => {
        setListsStates(lists ? {
            [ListTypes.Favorite]: lists[ListTypes.Favorite].filter(l => l.game === gameId).length ? ListStates.Active : ListStates.Inactive,
            [ListTypes.Playlist]: lists[ListTypes.Playlist].filter(l => l.game === gameId).length ? ListStates.Active : ListStates.Inactive,
            [ListTypes.Finished]: lists[ListTypes.Finished].filter(l => l.game === gameId).length ? ListStates.Active : ListStates.Inactive,
            [ListTypes.Custom]: ListStates.Inactive
        } : DEFAULT_LIST())
    }, [gameId, isSignedIn, userId])

    const updateList = async (listTypes: ListTypes[]) => {
        if (!isSignedIn || !userId) {
            info('You must be signed in to use lists.')
            return
        }
        
        const actions = listTypes.map(list => listsStates[list] === ListStates.Active ? ListActions.RemoveGame : ListActions.AddGame)
        
        setListsStates({ ...listsStates, ...listTypes.map(list => ({ [list]: ListStates.Loading })).reduce((a, b) => ({ ...a, ...b })) })
        
        const additions = await Promise.all(listTypes.map((list, index) => {
            return toggleList(userId, gameId, null, list, actions[index])
        }))
        
        if (additions.every(addition => !addition || ('success' in addition && !addition.success))) {
            error('An error ocurred while adding or removing the game from the list.')
            setListsStates({ ...listsStates, ...listTypes.map((list, i) => ({ [list]: listTypes[i] })).reduce((a, b) => ({ ...a, ...b })) })
            return
        }
        
        setListsStates({ ...listsStates, ...listTypes.map((list, i) => ({ [list]: actions[i] })).reduce((a, b) => ({ ...a, ...b })) })
    }

    return <div className={cn('flex flex-col gap-3.5 w-full', mode === 'card' && 'bg-black bg-opacity-70 rounded-md px-1.5', className)}>
        <WarningDialog open={listWarning} onOpenChange={setListWarning} updateList={updateList} />

        <div className={cn('flex flex-wrap', mode === 'page' ? 'gap-3.5' : 'justify-center')}>
            <ListButton mode={mode} onClick={(e: MouseEvent) => {
                if (listsStates[ListTypes.Favorite] === ListStates.Loading) return
                updateList([ListTypes.Favorite])
                e.preventDefault()
            }} tooltip={
                listsStates[ListTypes.Favorite] === ListStates.Active ? 'Remove from favorites' : 'Add to favorites'
            }>
                { listsStates[ListTypes.Favorite] !== ListStates.Loading ?
                    <Heart active={listsStates[ListTypes.Favorite] === ListStates.Active} className={cn(mode === 'card' && 'hover:stroke-slate-400')} strokeWidth={mode === 'card' ? 2 : 1.5} /> : <Spinner size={24} strokeWidth={mode === 'card' ? 2 : 1.5}/> }
            </ListButton>

            <ListButton mode={mode} onClick={(e: MouseEvent) => {
                if (listsStates[ListTypes.Playlist] === ListStates.Loading) return
                updateList([ListTypes.Playlist])
                e.preventDefault()
            }} tooltip={
                listsStates[ListTypes.Playlist] === ListStates.Active ? 'Remove from playlist' : 'Want to play'
            }>
                { listsStates[ListTypes.Playlist] !== ListStates.Loading ?
                    <Gamepad active={listsStates[ListTypes.Playlist] === ListStates.Active} className={cn(mode === 'card' && 'hover:stroke-slate-400')} strokeWidth={mode === 'card' ? 2 : 1.5} /> : <Spinner size={24} strokeWidth={mode === 'card' ? 2 : 1.5}/> }
            </ListButton>

            <ListButton mode={mode} onClick={(e: MouseEvent) => {
                if (listsStates[ListTypes.Finished] === ListStates.Loading) return
                if (listsStates[ListTypes.Playlist] === ListStates.Active && listsStates[ListTypes.Finished] === ListStates.Inactive) {
                    setListWarning(true)
                } else {
                    updateList([ListTypes.Finished])
                }
                e.preventDefault()
            }} tooltip={
                listsStates[ListTypes.Finished] === ListStates.Active ? 'Set as not finished' : 'Set as finished'
            }>
                { listsStates[ListTypes.Finished] !== ListStates.Loading ?
                    <Medal active={listsStates[ListTypes.Finished] === ListStates.Active} className={cn(mode === 'card' && 'hover:stroke-slate-400')} strokeWidth={mode === 'card' ? 2 : 1.5} /> : <Spinner size={24} strokeWidth={mode === 'card' ? 2 : 1.5}/> }
            </ListButton>

            { mode === 'page' ? <ListsDialog trigger={
                <div className='flex flex-grow md:basis-full'>
                    <Button
                        variant="secondary"
                        size="lg"
                        className="w-full py-6 hidden md:flex"
                        onClick={() => !userId && info('You must be signed in to use lists.')}
                    >
                        <PlaylistAdd className="mr-2"/> Add to list
                    </Button>

                    <ListButton
                        className="md:hidden flex"
                        mode={mode}
                        onClick={() => !userId && info('You must be signed in to use lists.')}
                        tooltip="Handle custom lists"
                    >
                        <PlaylistAdd />
                    </ListButton>
                </div>
            } userId={userId!} gameId={gameId} gamesListed={lists} /> : <></> }
        </div>
    </div>
}

const ListButton = ({ className, children, tooltip, mode, onClick }: {
    className?: string
    children: ReactNode
    tooltip: string
    mode: 'card' | 'page'
    onClick: (e: MouseEvent<HTMLElement>) => void
}) => <Tooltip className={mode === 'card' ? 'w-1/3' : 'flex-grow'}>
    <TooltipTrigger asChild>
        <Button variant={mode === 'card' ? 'ghost' : 'secondary'} className={cn('w-full h-16', mode === 'card' && 'h-11 shadow-lg p-2.5 hover:[background-color:transparent;]', className)} onClick={onClick}>
            {children}
        </Button>
    </TooltipTrigger>
    <TooltipContent hidden={mode === 'card'} sideOffset={7.5}>{ tooltip }</TooltipContent>
</Tooltip>

const WarningDialog = ({ open, onOpenChange, updateList }: {
    open: boolean
    onOpenChange: (open: boolean) => void
    updateList: (listTypes: ListTypes[]) => void
}) => {
    return <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>This game is in your playlist.</AlertDialogTitle>
                <AlertDialogDescription>If you set it as finished, would you like to remove it from you playlist?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => updateList([ListTypes.Finished])}>No</AlertDialogCancel>
                <AlertDialogAction onClick={() => updateList([ListTypes.Playlist, ListTypes.Finished])}>Yes</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}

export const GameActionsSkeleton = () => <div className="flex flex-wrap gap-3.5">
    <Skeleton className="h-16 flex flex-grow" />
    <Skeleton className="h-16 flex flex-grow" />
    <Skeleton className="h-16 flex flex-grow" />
    <Skeleton className="h-16 md:h-12 flex flex-grow md:basis-full" />
</div>

export default GameActions