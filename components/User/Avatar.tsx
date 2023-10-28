"use client"

import { useEffect, useState } from "react";
import { Button } from "../Button"
import { UserButton, SignedIn, SignedOut, ClerkLoaded, useClerk } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import Link from "next/link";
import X from "../icons/X";

const avatarSize = {
    width: '2.15rem',
    height: '2.15rem',
}
const elements = {
    userButtonBox: avatarSize,
    userButtonTrigger: avatarSize,
    userButtonAvatarBox: avatarSize,
    userButtonAvatarImage: avatarSize,
}

const UserAvatar = () => {
    const clerk = useClerk()

    const addProfileButton = () => {
        const userDropdown = document.querySelector('.cl-userButtonPopoverActions')
        if (userDropdown) {
            const root = createRoot(document.createElement('div'));
            root.render(createPortal(<ViewProfile
                classes={{
                    parent: Array.from(userDropdown.children[0].classList).join(' '),
                    icon: Array.from(userDropdown.children[0].children[0].classList).join(' '),
                    svg: Array.from(userDropdown.children[0].children[0].children[0].classList).join(' '),
                    text: Array.from(userDropdown.children[0].children[1].classList).join(' '),
                }} />, userDropdown));

            userDropdown.children[0]?.classList.add('order-2')
            userDropdown.children[1]?.classList.add('order-3')
        }
    }

    const setOpenState = () => {
        setTimeout(() => {
            setIsOpen(!!document.querySelector('.cl-userButtonPopoverCard'))
        })
    }

    useEffect(() => {
        document.querySelector('#user-avatar')?.addEventListener('click', addProfileButton)
        document.addEventListener('click', setOpenState)
        
        return () => {
            document.querySelector('#user-avatar')?.removeEventListener('click', addProfileButton)
            document.addEventListener('click', setOpenState)
        }
    }, [])

    return <div className='relative min-w-[2.25rem] h-9' id="user-avatar">
        <div className='absolute top-0 left-0 w-9 h-9 rounded-full bg-muted z-[0] flex justify-center items-center'>
            {/* isOpen ? <X className="w-7"/> :
                // Ham menu

                <svg className="opacity-100 sm:opacity-100 w-7" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 6l16 0" className={cn('transition', isOpen && 'opacity-0 [transform:translateY(12px)]')}></path>
                    <path d="M4 12l16 0" className={cn('transition [transform-origin:center]', isOpen && '-rotate-45')}></path>
                    <path d="M4 12l16 0" className={cn('transition [transform-origin:center]', isOpen && 'rotate-45')}></path>
                    <path d="M4 18l16 0" className={cn('transition', isOpen && 'opacity-0 [transform:translateY(-12px)]')}></path>
                </svg>
            */}
        </div>
        <ClerkLoaded>
            <SignedIn>
                <UserButton afterSignOutUrl='/' appearance={{ elements }} /> {/*TODO change url*/}
            </SignedIn>
            <SignedOut>
                <Button size={'sm'} onClick={() => clerk.openSignIn({})} className="z-[1]">Sign in</Button>
            </SignedOut>
        </ClerkLoaded>
    </div>
}

const ViewProfile = ({ classes }: any) => <Link href={`/profile`} className={classes.parent} role="menuitem">
    <div className={classes.icon}>
        <svg className={cn(classes.svg, "w-4 h-4")} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
        </svg>
    </div>

    <span className={classes.text}>View profile</span>    
</Link>

export default UserAvatar