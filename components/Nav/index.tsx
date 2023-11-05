import Link from 'next/link';
import SearchBox from '../Search';
import UserAvatar from '../User/Avatar';
import Ham from './Ham';
import MobileSearch from './MobileSearch';

const Nav = () => {
    return <header
        id="header"
        className="supports-backdrop-blur:bg-background/60 fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur"
    >
        <div className="sm:container flex items-center h-16 px-3 justify-between sm:justify-normal">
            <Ham/>
            <div className="sm:mr-4 flex">
                <Link className="sm:mr-6 flex items-center space-x-2" href="/">
                    <span className="font-bold sm:inline-block text-lg">WTP</span>
                </Link>
                <nav className="hidden sm:flex items-center space-x-6 text-sm font-medium">
                    <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="/game/11221">
                        Game
                    </Link>
                </nav>
            </div>
            <div
                className="flex sm:flex-1 items-center justify-between sm:space-x-4 md:justify-end scale-[.8] sm:scale-100"
            >
                <div className='hidden sm:block'><SearchBox /></div>
                <UserAvatar />
            </div>
        </div>
        <MobileSearch />
    </header>
}

export default Nav;