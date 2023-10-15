"use client"

import { useState } from "react"
import { Button } from "./Button"
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip"
import Gamepad from "./icons/Gamepad"
import Heart from "./icons/Heart"
import Medal from "./icons/Medal"
import PlaylistAdd from "./icons/PlaylistAdd"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./AlertDialog"
import { ListType } from "@/lib/enums"
import { useAuth } from "@clerk/nextjs"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const GameActions = () => {
    const { isSignedIn } = useAuth()
    const { info } = useToast()
    const [listWarning, setListWarning] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const [isPlaylist, setIsPlaylist] = useState(false)
    const [isFinished, setIsFinished] = useState(false)

    const updateList = (list: ListType) => {
        if (!isSignedIn) {
            info('You must be signed in to use lists.')
            return
        }

        if (list === ListType.Favorite) {
            setIsFavorite(!isFavorite)
        } else if (list === ListType.Playlist) {
            setIsPlaylist(!isPlaylist)
        } else if (list === ListType.Finished) {
            setIsFinished(!isFinished)
        }
    }


    return <div className="flex flex-col gap-3.5 w-full">
        <WarningDialog open={listWarning} onOpenChange={setListWarning} />

        <div className="flex gap-3.5">
            <ListButton onClick={() => updateList(ListType.Favorite)} tooltip={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }>
                <Heart active={isFavorite} />
            </ListButton>
            <ListButton onClick={() => updateList(ListType.Playlist)} tooltip={
                isPlaylist ? 'Remove from playlist' : 'Want to play'
            }>
                <Gamepad active={isPlaylist} />
            </ListButton>
            <ListButton onClick={() => {
                updateList(ListType.Finished)
                if (isPlaylist && !isFinished) {
                    setListWarning(true)
                }
            }} tooltip={
                isFinished ? 'Set as not finished' : 'Set as finished'
            }>
                <Medal active={isFinished} />
            </ListButton>
        lLW</div>
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

const WarningDialog = ({ open, onOpenChange }: any) => {
    return <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>This game is in your playlist.</AlertDialogTitle>
                <AlertDialogDescription>If you set it as finished, would you like to remove it from you playlist?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>No</AlertDialogCancel>
                <AlertDialogAction onClick={() => updateList(ListType.Playlist)}>Yes</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}

export default GameActions