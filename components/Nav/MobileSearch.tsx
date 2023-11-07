"use client"

import { useEffect, useState } from "react";
import MobileSearchBox from "../Search/mobile";
import { cn } from "@/lib/utils";

const MobileSearch = () => {
    const [isVisible, setIsVisible] = useState(true);
    // TODO temp disabled
    /*const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => setScrollPosition(window.scrollY))

    useEffect(() => {
        window.addEventListener('scrollend', listenToScroll);

        return () => window.removeEventListener('scrollend', listenToScroll);
    }, [scrollPosition])

    const listenToScroll = () => {
      const newScrollPosition = window.scrollY;
      setScrollPosition(newScrollPosition);
    
      setIsVisible(newScrollPosition < scrollPosition)
    }*/

    return <div className={cn("block sm:hidden h-[52px] transition", !isVisible && 'h-0')}>
        <div className={cn("px-2.5 pb-3 absolute w-full translate-y-0 opacity-100 transition", !isVisible && '-translate-y-10 opacity-0 pointer-events-none')}>
            <MobileSearchBox className={cn("w-full")} />
        </div>
    </div>
}

export default MobileSearch