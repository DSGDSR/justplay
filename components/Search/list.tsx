import { useEffect, useState } from "react"
import clsx from "clsx"
import DefaultThumb from "../icons/DefaultThumb"
import { useRouter } from "next/navigation"
import { IGameSearch } from "@/lib/models/game"
import Link from "next/link"
import Image from "next/image"

interface Props {
    games: IGameSearch[] | null
    onNavigate: () => void
}

const SearchList = ({ games, onNavigate }: Props) => {
    const [cursor, setCursor] = useState(-1)
    const { push } = useRouter()

    const mouseHandler = () => setCursor(-1)
    
    const keyHandler = (event: KeyboardEvent) => {
        if (games === null || games?.length === 0) {
            return
        }

        if (event.code === 'ArrowUp') {
            setCursor(c => c <= 0 ? games.length - 1 : c - 1)
        } else if (event.code === 'ArrowDown') {
            setCursor(c => c >= games.length - 1 ? 0 : c + 1)
        } else if (event.code === 'Enter') {
            // Open game page
            setCursor(c => {
                onNavigate()
                push(`/game/${games[c].slug}`)  
                return -1
            })
        }
    }

    useEffect(() => {
        setCursor(-1)
        window.addEventListener('keydown', keyHandler)
        window.addEventListener('click', mouseHandler)
        window.addEventListener('mousemove', mouseHandler)

        return () => {
            window.removeEventListener('keydown', keyHandler)
            window.removeEventListener('click', mouseHandler)
            window.removeEventListener('mousemove', mouseHandler)
        }
    }, [games])

    return games instanceof Array ? <main>
        { games?.length ? <ul role="listbox" id="search-results">
            { games.map((game, index) => (
                <li key={index} className={clsx(
                    'relative px-3.5 py-3.5',
                    cursor === index && 'focused',
                    cursor === -1 && 'hover:bg-accent hover:text-accent-foreground'
                )}>
                    <Link className="flex items-center" href={`/game/${game.slug}`} onClick={onNavigate}>
                        { game.cover?.url
                            ? <Image src={game.cover?.url} alt={game.name} className="h-11 w-11 rounded-md mr-3"/>
                            : <DefaultThumb className="h-10 w-10 rounded-md mr-3"/> }
                        <div className="flex flex-col w-5/6 gap-0.5">
                            <p className="text-base font-medium whitespace-nowrap text-ellipsis overflow-hidden">{game.name}</p>
                            { game.genres?.length &&
                                <span className="text-xs text-muted-foreground">{game.genres?.map(g => g.name).join(', ')}</span>
                            }
                        </div>
                    </Link>
                </li>
            )) }
        </ul> : <p key={0} className="px-3.5 py-3 text-sm text-gray-400">
            No results found... try again gamer!
        </p> }
    </main> : <></>
}

export default SearchList
