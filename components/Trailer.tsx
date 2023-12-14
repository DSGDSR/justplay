'use client'

import { Dialog, DialogContent } from './Dialog'
import { Button, ButtonProps } from './Button'
import Play from './icons/Play'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip'
import { YouTubeLite } from 'react-youtube-lite'

interface Props {
    name: string
    id: string | undefined
}

const TrailerButton = (props: ButtonProps) => {
    return <Tooltip>
        <TooltipTrigger asChild>
            <>
                <Button className="hidden md:flex group" size="bubble" variant="secondary" {...props}>
                    <Play />
                </Button>
                <Button className="md:hidden group" variant="secondary" {...props}>
                    <Play className="w-4 sm:mr-2 sm:-ml-1" /> <span className="hidden sm:block">Trailer</span>
                </Button>
            </>
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
            className="aspect-video w-[720px]"
            id="trailer-video"
        >
            <YouTubeLite url={id} title={`${name} - Trailer`} />
        </DialogContent>
    </Dialog> : <Link target="_blank" href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${name} trailer`)}`}>
        <TrailerButton />
    </Link>
}

export default Trailer
