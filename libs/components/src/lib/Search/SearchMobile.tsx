'use client'

import { useState, useRef, useEffect } from 'react'
import { debounce, cleanQuery } from '@wheretoplay/shared/utils'
import { IconArrowDown, IconX, IconSearch } from "@tabler/icons-react";
import { Spinner } from '../icons';
import { IGameSearch, IHttpResponse } from '@wheretoplay/shared/models';
import SearchList from './SearchList';
import { SearchProps } from '.';

const ID = 'mobile-search-input'

export const MobileSearch = ({ onSearch }: SearchProps) => {
    const [isSearching, setIsSearching] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [games, setGames] = useState<IGameSearch[] | null>(null)
    const searchInput = useRef<HTMLInputElement | null>(null)

    const loadGames = (response: IHttpResponse<IGameSearch[]>) => {
        if (response.success) {
            setGames(response.data)
        } else {
            setGames([])
            // Error sonner toast
        }
    }

    const onClick = () => {
        if (document.activeElement?.id === ID) {
            setIsFocused(true)
            document.body.style.setProperty('overflow', 'hidden')
        } else {
            setGames(null)
            setIsFocused(false)
            blurInput()
            document.body.style.setProperty('overflow', 'auto')
            if (searchInput.current) {
                searchInput.current.value = ''
            }
        }
    }

    useEffect(() => {
        document.addEventListener('click', onClick);

        return () => document.removeEventListener('click', onClick);
    }, [])

    const debouncedSearch = debounce(async (query: string) => {
        if (!!query) {
            setIsSearching(true)
            const games: IHttpResponse<IGameSearch[]> = await onSearch(cleanQuery(query), true, 15).json()
            loadGames(games)
        } else {
            setGames(null)
        }

        setIsSearching(false)
    }, 650)

    const focusInput = () => searchInput.current?.focus()
    const blurInput = () => searchInput.current?.blur()
    const clearInput = () => {
        if (searchInput.current) {
            searchInput.current.value = ''
            searchInput.current.focus()
        }
    }

    const clear = () => {
        setGames(null)
    }

    return <>
        <div className="relative flex items-center">
            <input
                id={ID}
                className="flex items-center rounded-md font-base pl-10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-muted sm:bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-10 sm:h-9 px-4 py-2 relative w-full justify-between sm:justify-start text-sm text-muted-foreground sm:pr-12 sm:w-64"
                placeholder="Search games..."
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                ria-autocomplete="list"
                role="combobox"
                aria-controls="search-results"
                aria-expanded={games?.length ? 'true' : 'false'}
                type="text"
                onChange={(event) => debouncedSearch(event.target.value)}
                ref={searchInput}
            />
            {!isSearching && !isFocused && <IconSearch onClick={focusInput} className="stroke-[#a1a1aa] absolute left-3.5 top-3" size={16} />}
            {isFocused && <IconArrowDown onClick={blurInput} className="stroke-[#a1a1aa] absolute left-3.5 rotate-90" size={18} />}
            {!isSearching && isFocused && <div onClick={clearInput} className="absolute right-1.5 h-8 w-8 flex justify-center items-center">
                <IconX className="stroke-[#a1a1aa] w-5" />
            </div>}
            {isSearching && <Spinner onClick={clearInput} color="#a1a1aa" className="absolute right-3.5" size={18} />}
        </div>

        {isFocused ? <SearchList games={games} onNavigate={clear} className="border-b border-slate-800 w-screen right-0 top-[53px] bg-background/95 supports-backdrop-blur:bg-background/60 backdrop-blur h-[calc(100vh-118px)] overflow-y-scroll absolute" /> : <></>}
    </>;
}
