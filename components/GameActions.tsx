"use client"

import { useState } from "react"
import { Button } from "./Button"
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip"
import Gamepad from "./icons/Gamepad"
import Heart from "./icons/Heart"
import Medal from "./icons/Medal"
import PlaylistAdd from "./icons/PlaylistAdd"

const GameActions = () => {
    const [isFavorite, setIsFavorite] = useState(false)
    const [isPlaylist, setIsPlaylist] = useState(false)
    const [isFinished, setIsFinished] = useState(false)

    return <div className="flex flex-col gap-3.5 w-full">
        <div className="flex gap-3.5">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="secondary" className="flex-grow h-16" onClick={
                        () => setIsFavorite(!isFavorite)
                    }>
                        <Heart active={isFavorite} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={7.5}>{
                    isFavorite ? 'Remove from favorites' : 'Add to favorites'
                }</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="secondary" className="flex-grow h-16" onClick={
                        () => setIsPlaylist(!isPlaylist)
                    }>
                        <Gamepad active={isPlaylist} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={7.5}>{
                    isPlaylist ? 'Remove from playlist' : 'Want to play'
                }</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="secondary" className="flex-grow h-16" onClick={
                        () => setIsFinished(!isFinished)
                    }>
                        <Medal active={isFinished} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={7.5}>{
                    isFinished ? 'Set as not finished' : 'Set as finished'
                }</TooltipContent>
            </Tooltip>
        </div>
        <Button variant="secondary" size="lg" className="w-full">
            <PlaylistAdd className="mr-2"/> Add to list
        </Button>
    </div>
}

export default GameActions