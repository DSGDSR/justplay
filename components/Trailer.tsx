"use client"

import { Dialog, DialogContent } from "./Dialog"
import { Button, ButtonProps } from "./Button"
import Play from "./icons/Play"
import { useEffect, useState } from "react"
import Link from "next/link"

interface Props {
    name: string
    id: string | undefined
}

const TrailerButton = (props: ButtonProps) => {
    return <Button {...props}>
        <Play className="-ml-1 mr-2 h-4 w-4"/> Play trailer
    </Button>
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
    </Dialog> : <Link target="_blank" href={`https://www.youtube.com/results?search_query=${name}+trailer`}>
        <TrailerButton />
    </Link>
}

export default Trailer
