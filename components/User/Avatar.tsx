"use client"

import { Button } from "../Button"
import { UserButton, SignedIn, SignedOut, ClerkLoaded, useClerk } from "@clerk/nextjs";

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

    return <div className='relative min-w-[2.25rem] h-9'>
        <div className='absolute top-0 left-0 w-9 h-9 rounded-full bg-muted z-[0] flex justify-center items-end'></div>
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

export default UserAvatar