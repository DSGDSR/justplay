import { CoverSkeleton, ThumbSkeleton } from "@/app/game/[slug]/page"
import PreloadedImage from "@/components/PreloadedImage"
import Screenshots from "@/components/Screenshots"
import Skeleton from "@/components/Skeleton"
import Trailer from "@/components/Trailer"
import { Endpoints } from "@/lib/enums"
import { IGame } from "@/lib/models/game"
import { IHttpResponse } from "@/lib/models/response"
import { apiUrl } from "@/lib/utils"
import { redirect } from "next/navigation"

async function getGame(slug: string): Promise<IHttpResponse<IGame>> {
    const url = `${apiUrl}${Endpoints.GameBySlug}`
    const res = await fetch(url.replace(':slug', slug))
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (!res.ok) {
        redirect('/')// custtom 404 TODO ?
    }

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

    return <>
        { screenshot ? <figure className="relative h-[22rem] w-full thumb-filter blur">
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
        <section className="container game-page relative -top-[16.5rem]">
            <header className="flex gap-8">
                <figure className="aspect-[9/12] w-80 shadow-md"> {/* TODO NO COVER */}
                    <PreloadedImage
                        className="w-full h-full rounded-sm"
                        src={`https://${game.cover.url.slice(2).replace('t_thumb', 't_cover_big')}`}
                        alt={game.name}
                        width={game.cover.width}
                        height={game.cover.height}
                        skeleton={<CoverSkeleton />}
                        priority={true}
                    />
                </figure>
                <div className="main-details w-full flex flex-col justify-end">
                    <hgroup className="flex flex-col gap-4 w-full">
                        <h1 className="text-6xl font-bold text-shadow-lg mb-2">{game.name}</h1>
                        <Skeleton className="h-9 w-2/5" />
                        <Skeleton className="h-8 w-1/4" />
                    </hgroup>
                    <div className="actions mt-12 flex gap-5">
                        <Trailer name={game.name} id={video?.video_id} />
                        { screenshots?.length ? <Screenshots screenshots={screenshots} /> : <></> }
                    </div>
                </div>
            </header>
        </section>
        {//JSON.stringify(game, null, 2)
        }
    </>
}
