"use client"

import { Dialog, DialogTrigger, DialogContent } from "../Dialog"
import clsx from "clsx"
import { useState, useEffect } from "react"
import { IGameSearch } from "@/lib/models/game"
import Kbd from "../Kbd"
import Spinner from "../icons/Spinner"
import SearchFooter from "./footer"
import SearchList from "./list"
import SearchIcon from "../icons/Search"
import { Endpoints } from "@/lib/enums"
import { debounce, cleanQuery, apiUrl } from "@/lib/utils"

interface Props {
}

const SearchBox = ({}: Props) => {
    const [isSearching, setIsSearching] = useState(false)
    const [games, setGames] = useState<IGameSearch[] | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    const keyHandler = (event: KeyboardEvent) => {
        if ((event.metaKey || event.ctrlKey) && event.code === 'KeyK') {
            setIsOpen(true)
        } else if (event.code === 'Escape') {
            setIsOpen(false)
            setTimeout(() => setGames(null), 500)
        }
    }

    const loadGames = (response: any) => {
        if (response.success) {
            setGames(response.data)
        } else {
            setGames([])
            // Error sonner toast
        }
    }
    
    const searchGames = async (query: string, fastSearch = false) => {
        const response = await fetch(`${apiUrl}${Endpoints.SearchGames}`, {
            method: 'POST',
            body: JSON.stringify({ query, fastSearch }),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        
        return await response.json()
    }

    const debouncedSearch = debounce(async (query: string) => {
        if (!!query) {
            setIsSearching(true)
            loadGames(await searchGames(cleanQuery(query), true))
        } else {
            setGames(null)
        }

        setIsSearching(false)
    }, 650)

    useEffect(() => {
        window.addEventListener('keydown', keyHandler);

        return () => {
            window.removeEventListener('keydown', keyHandler);
        }
    }, [])

    const clear = () => {
        setIsOpen(false)
        setGames(null)
    }

    return (
        <Dialog open={isOpen}>
            <DialogTrigger onClick={() => setIsOpen(true)}>
                <div className="inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64">
                    <span className="hidden lg:inline-flex">Search games...</span>
                    <span className="inline-flex lg:hidden">Search...</span>
                    <span className="absolute right-2 top-[7px] flex gap-1 text-xs"><Kbd className="!text-[15px] pt-[0.09em] px-[0.31em]">⌘</Kbd>+<Kbd className="!text-[11px]">K</Kbd></span>
                </div>
            </DialogTrigger>
            <DialogContent
                onCloseAutoFocus={e => e.preventDefault()}
                onOpenAutoFocus={e => e.preventDefault()}
                onInteractOutside={() => setIsOpen(false)}
                className="p-0 gap-0 flex flex-col max-w-xl"
                size={'small'} hideClose={true}
            >
                <header>
                    <div className={clsx('flex items-center px-4 py-2', games !== null && 'border-b')}>
                        <SearchIcon color="#a1a1aa" size={22}/>
                        <input
                            className="flex h-11 w-full rounded-md bg-transparent py-3 ml-3.5 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 pr-2"
                            placeholder="Type a game name..."
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            ria-autocomplete="list"
                            role="combobox"
                            aria-expanded="true"
                            type="text"
                            autoFocus={true}
                            onChange={(event) => debouncedSearch(event.target.value)}
                        />
                        { isSearching && <Spinner color="#a1a1aa" size={19}/> }
                    </div>
                </header>

                <SearchList games={games} onNavigate={clear}/>

                <SearchFooter />
            </DialogContent>
        </Dialog>
    );
}

export default SearchBox
