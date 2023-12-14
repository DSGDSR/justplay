'use client'

import { Dialog, DialogContent } from './Dialog'
import { Button, ButtonProps } from './Button'
import { useEffect, useState } from 'react'
import Slider from './Slider'
import { IScreenshot } from '@/lib/models/media'
import Photo from './icons/Photo'
import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip'

interface Props {
    screenshots: IScreenshot[]
}

const ScreenshotsButton = (props: ButtonProps) => {
    return <Tooltip>
        <TooltipTrigger asChild>
            <>
                <Button {...props} className="hidden md:flex group" size="bubble" variant="secondary">
                    <Photo />
                </Button>
                <Button {...props} className="md:hidden group" variant="secondary">
                    <Photo className="w-4 sm:mr-2" /> <span className="hidden sm:block">Gallery</span>
                </Button>
            </>
        </TooltipTrigger>
        <TooltipContent sideOffset={7.5}>Screenshots</TooltipContent>
    </Tooltip>
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
