"use client"

import { useEffect, useState } from "react";
import SearchBox from "../Search";
import { cn, throttle } from "@/lib/utils";

const MobileSearch = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        window.addEventListener('scroll', debouncedScroll);

        return () => window.removeEventListener('scroll', debouncedScroll);
    }, [scrollPosition])

    const listenToScroll = () => {
      const newScrollPosition = window.scrollY;
      setScrollPosition(newScrollPosition);
    
      setIsVisible(newScrollPosition < scrollPosition)
    };

    const debouncedScroll = throttle(() => listenToScroll(), 300)

    return <div className={cn("block sm:hidden h-[52px] transition", !isVisible && 'h-0')}>
        <div className={cn("px-2.5 pb-3 absolute w-full translate-y-0 opacity-100 transition", !isVisible && '-translate-y-10 opacity-0 pointer-events-none')}>
            <SearchBox className={cn("w-full")} />
        </div>
    </div>
}

export default MobileSearch