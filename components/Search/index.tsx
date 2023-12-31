'use client'

import { Dialog, DialogTrigger, DialogContent } from '../Dialog'
import clsx from 'clsx'
import { useState, useEffect, useRef } from 'react'
import { IGameSearch } from '@/lib/models/game'
import Kbd from '../Kbd'
import Spinner from '../icons/Spinner'
import SearchFooter from './footer'
import SearchList from './list'
import SearchIcon from '../icons/Search'
import { Endpoints } from '@/lib/enums'
import { debounce, cleanQuery, apiUrl, cn } from '@/lib/utils'
import X from '../icons/X'

interface Props {
    className?: string
}

const SearchBox = ({ className }: Props) => {
    const [games, setGames] = useState<IGameSearch[] | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const input = useRef<HTMLInputElement>(null)
    const [isSearching, setIsSearching] = useState(false)

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

    const clearInput = (focus = true) => {
        if (input.current) {
            input.current.value = ''
            if (focus) input.current.focus()
        }
        setGames(null)
    }

    const close = () => {
        setTimeout(() => setIsOpen(false))
        clearInput()
    }

    return (
        <Dialog open={isOpen}>
            <DialogTrigger onClick={() => setIsOpen(true)} className={className}>
                <div className={cn('group inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-muted sm:bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-10 sm:h-9 px-4 py-2 relative w-full justify-between sm:justify-start text-sm text-muted-foreground sm:pr-12 sm:w-64')}>
                    <span className="inline-flex">Search games...</span>
                    <span className="hidden sm:flex absolute right-2 top-[7px] gap-1 text-xs"><Kbd className="!text-[15px] pt-[0.09em] px-[0.31em]">⌘</Kbd>+<Kbd className="!text-[11px]">K</Kbd></span>
                    <SearchIcon size={18} strokeWidth={2} className="block sm:hidden transition-colors group-hover:stroke-accent-foreground stroke-muted-foreground"/>
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
                        <SearchIcon className="stroke-[#a1a1aa]" size={22}/>
                        <input
                            className="flex h-11 w-full rounded-md bg-transparent py-3 ml-3.5 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 pr-2"
                            placeholder="Type a game name..."
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            ria-autocomplete="list"
                            role="combobox"
                            aria-controls="search-results"
                            aria-expanded={games?.length ? 'true': 'false'}
                            type="text"
                            autoFocus={true}
                            ref={input}
                            onChange={(event) => debouncedSearch(event.target.value)}
                        />
                        { isSearching
                            ? <Spinner color="#a1a1aa" size={20}/>
                            : (input.current?.value && input.current?.value.length > 0
                                ? <X className="stroke-[#a1a1aa] cursor-pointer" onClick={clearInput} /> : <></>) }
                    </div>
                </header>

                <SearchList games={games} onNavigate={close}/>

                <SearchFooter />
            </DialogContent>
        </Dialog>
    );
}

export default SearchBox
