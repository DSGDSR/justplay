"use client"

import { Dialog, DialogContent } from "./Dialog"
import { Button, ButtonProps } from "./Button"
import { useEffect, useState } from "react"
import Slider from "./Slider"
import { IScreenshot } from "@/lib/models/media"
import Photo from "./icons/Photo"

interface Props {
    screenshots: IScreenshot[]
}

const ScreenshotsButton = (props: ButtonProps) => {
    return <Button {...props}>
        <Photo className="-ml-1 mr-2 h-4 w-4"/> Gallery
    </Button>
}

const Screenshots = ({ screenshots }: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isClient, setIsClient] = useState(false)

    const toggleDialog = (state: boolean) => {
        !state && window.history.replaceState(null, '', window.location.pathname)
        setIsOpen(state)
    }
   
    useEffect(() => {
      setIsClient(true)
    }, [])

    return isClient ? <Dialog open={isOpen} onOpenChange={toggleDialog}>
        <ScreenshotsButton onClick={() => setIsOpen(true)} />
        <DialogContent
            size={'embed'}
            onOpenAutoFocus={e => e.preventDefault()}
        >
            <Slider screenshots={screenshots} />
        </DialogContent>
    </Dialog> : <></>
}

export default Screenshots
