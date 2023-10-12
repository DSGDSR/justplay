"use client"

import { Dialog, DialogContent } from "./Dialog"
import { Button, ButtonProps } from "./Button"
import Play from "./icons/Play"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./Tooltip"

interface Props {
    name: string
    id: string | undefined
}

const TrailerButton = (props: ButtonProps) => {
    return <Tooltip>
        <TooltipTrigger asChild>
            <Button className="group" size="bubble" variant="secondary" {...props}>
                <Play />
            </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={7.5}>Watch trailer</TooltipContent>
    </Tooltip>
}

const Trailer = ({ name, id }: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isClient, setIsClient] = useState(false)
   
    useEffect(() => {
      setIsClient(true)
    }, [])

    return id && isClient ? <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <TrailerButton onClick={() => setIsOpen(true)} />
        <DialogContent
            size={'embed'}
            onOpenAutoFocus={e => e.preventDefault()}
        >
            <iframe
                width={700} height={395}
                src={`https://tube.rvere.com/embed?v=${id}`}
                title={`${name} - Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                allowFullScreen
            ></iframe>
        </DialogContent>
    </Dialog> : <Link target="_blank" href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${name} trailer`)}`}>
        <TrailerButton />
    </Link>
}

export default Trailer
