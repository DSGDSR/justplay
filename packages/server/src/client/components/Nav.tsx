import { Link, NavLink } from 'react-router-dom';
import SearchBox from './Search';
import UserAvatar from './User/Avatar';

const Nav = () => {
    return <header
        className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur"
    >
        <div className="container flex h-16 items-center">
            <div className="mr-4 hidden md:flex">
                <Link className="mr-6 flex items-center space-x-2" to="/">
                    <span className="font-bold sm:inline-block">WTP</span>
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                    <NavLink className="transition-colors hover:text-foreground/80 text-foreground/60" to="/game/11221">
                        Game
                    </NavLink>
                </nav>
            </div>
            <div
                className="flex flex-1 items-center justify-between space-x-4 md:justify-end"
            >
                <SearchBox />
                <UserAvatar />
            </div>
        </div>
    </header>
}

export default Nav;