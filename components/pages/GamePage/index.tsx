import { Badge } from "@/components/Badge"
import { CoverSkeleton, ThumbSkeleton } from "./skeletons"
import PreloadedImage from "@/components/PreloadedImage"
import Screenshots from "@/components/Screenshots"
import Trailer from "@/components/Trailer"
import GameActions from "@/components/GameActions"
import { Endpoints } from "@/lib/enums"
import { IGame } from "@/lib/models/game"
import { IHttpResponse } from "@/lib/models/response"
import { apiUrl, cn, localizedDate, unix2Date } from "@/lib/utils"
import { redirect } from "next/navigation"
import { ICompany } from "@/lib/models/company"
import Mac from "@/components/icons/platforms/Mac"
import Platforms from "@/components/Platforms"

async function getGame(slug: string): Promise<IHttpResponse<IGame>> {
    const url = `${apiUrl}${Endpoints.GameBySlug}`
    const res = await fetch(url.replace(':slug', slug))

    if (!res.ok) redirect('/')// custtom 404 TODO ?
    return res.json()
}

async function getCompany(id: number): Promise<IHttpResponse<ICompany>> {
    const url = `${apiUrl}${Endpoints.CompanyById}`
    const res = await fetch(url.replace(':id', id.toString()))

    if (!res.ok) redirect('/')// custtom 404 TODO ?
    return res.json()
}

interface Props {
    slug: string
}

export default async function GamePage({ slug }: Props) {
    const { data: game } = await getGame(slug)

    const screenshots = game.screenshots?.length ? game.screenshots.filter(s => s.image_id && s.url) : []
    const screenshot = screenshots.sort((a, b) => b.width - a.width)[0] ?? null

    const videos = game.videos?.length ? game.videos.filter(v => v && v.name && v.video_id) ?? game.videos[0] : []
    const video = videos.find(v => v.name.toLowerCase().trim() === 'trailer') ?? videos[0] ?? null

    const developer = game.involved_companies.find(c => c.developer) ?? null
    const { data: company } = developer ? await getCompany(developer?.company) : { data: null }

    return <>
        { screenshot ? <figure className="relative h-96 w-full thumb-filter blur">
            <PreloadedImage
                className="h-full w-full object-cover rounded-none"
                src={`https://${screenshot.url.slice(2).replace('t_thumb', 't_screenshot_big')}`}
                alt={game.name}
                width={screenshot.width}
                height={screenshot.height}
                skeleton={<ThumbSkeleton />}
                quality={0}
                priority={true}
            />
        </figure> : <></> }
        <section className={cn("container game-page relative", screenshot ? '-top-[19rem]' : 'mt-20')}>
            <header className="flex gap-8">
                <div style={{ flex: '0 0 280px' }}>
                    <figure className="shadow-md w-full"> {/* TODO NO COVER */}
                        <PreloadedImage
                            className="w-full h-full rounded-md aspect-[9/12]"
                            src={`https://${game.cover.url.slice(2).replace('t_thumb', 't_720p')}`}
                            alt={game.name}
                            width={280}
                            height={373.33}
                            skeleton={<CoverSkeleton />}
                            quality={0}
                            priority={true}
                        />
                    </figure>
                </div>
                <div className="main-details relative w-full flex flex-col justify-end mb-10">
                    <hgroup className="flex flex-col gap-3 w-full mb-14">
                        <h1 className="text-7xl font-bold text-shadow-lg mb-1">{game.name}</h1>
                        { game.genres?.length ? <div className="genres flex gap-3 mb-4">
                            { game.genres.map(g => <Badge key={g.id} variant="secondary">{g.name}</Badge>) }
                        </div> : <></> }
                        <div className="text-lg text-shadow">
                            <time dateTime={unix2Date(game.first_release_date).toLocaleString()}>{localizedDate(game.first_release_date)}</time>
                            { company ? <> by <strong>{company.name}</strong></> : <></> }
                        </div>
                    </hgroup>
                    <div className="absolute actions flex gap-6 right-0">
                        <Trailer name={game.name} id={video?.video_id} />
                        { screenshots?.length ? <Screenshots screenshots={screenshots} /> : <></> }
                    </div>
                </div>
            </header>
            <main className="flex gap-8 mt-3.5">
                <aside style={{ flex: '0 0 280px' }}>
                    <GameActions />
                </aside>
                <article className="flex-grow -mt-14">
                    <h3 className="text-xl font-semibold mb-4">Platforms</h3>
                    <Platforms platforms={game.platforms} />

                    <br />
                    <br />
                    <br />
                    <h2 className="text-2xl font-bold mb-3">Summary</h2>
                    <p className="text-shadow">{game.summary}</p>
                </article>
            </main>
        </section>
        {JSON.stringify(game.platforms, null, 2)
        }
    </>
}
