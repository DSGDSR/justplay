'use client'

import { useState, useRef, useEffect } from 'react'
import { IGameSearch } from '@/lib/models/game'
import Spinner from '../icons/Spinner'
import SearchList from './list'
import SearchIcon from '../icons/Search'
import { Endpoints } from '@/lib/enums'
import { debounce, cleanQuery, apiUrl } from '@/lib/utils'
import X from '../icons/X'
import ArrowDown from '../icons/ArrowDown'

const ID = 'mobile-search-input'

const MobileSearchBox = () => {
    const [isSearching, setIsSearching] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [games, setGames] = useState<IGameSearch[] | null>(null)
    const searchInput = useRef<HTMLInputElement | null>(null)

    const loadGames = (response: any) => {
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
    
    const searchGames = async (query: string, fastSearch = false) => {
        const response = await fetch(`${apiUrl}${Endpoints.SearchGames}`, {
            method: 'POST',
            body: JSON.stringify({ query, limit: 15, fastSearch }),
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
                aria-expanded={games?.length ? 'true': 'false'}
                type="text"
                onChange={(event) => debouncedSearch(event.target.value)}
                ref={searchInput}
            />
            { !isSearching && !isFocused && <SearchIcon onClick={focusInput} className="stroke-[#a1a1aa] absolute left-3.5 top-3" size={16}/> }
            { isFocused && <ArrowDown onClick={blurInput} className="stroke-[#a1a1aa] absolute left-3.5 rotate-90" size={18}/> }
            { !isSearching && isFocused && <div onClick={clearInput} className="absolute right-1.5 h-8 w-8 flex justify-center items-center">
                <X className="stroke-[#a1a1aa] w-5"/>
            </div> }
            { isSearching && <Spinner onClick={clearInput} color="#a1a1aa" className="absolute right-3.5" size={18}/> }
        </div>

        { isFocused ? <SearchList games={games} onNavigate={clear} className="border-b border-slate-800 w-screen right-0 top-[53px] bg-background/95 supports-backdrop-blur:bg-background/60 backdrop-blur h-[calc(100vh-118px)] overflow-y-scroll absolute" /> : <></> }
    </>;
}

export default MobileSearchBox