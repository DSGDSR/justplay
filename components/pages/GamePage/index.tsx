import { Badge } from "@/components/Badge"
import { CoverSkeleton, ThumbSkeleton } from "./skeletons"
import PreloadedImage from "@/components/PreloadedImage"
import Screenshots from "@/components/Screenshots"
import Trailer from "@/components/Trailer"
import GameActions from "@/components/GameActions"
import { Services } from "@/lib/enums"
import { cn, localizedDate, unix2Date } from "@/lib/utils"
import Platforms from "@/components/Platforms"
import HowLongToBeat from "@/components/HowLongToBeat"
import CardsSlider from "@/components/CardsSlider"
import Section from "@/components/Section"
import Link from "next/link"
import Igdb from "@/components/icons/Igdb"
import AsideSection from "@/components/AsideSection"
import ServicesTable from "@/components/ServicesTable"
import { getGame } from "@/services/game"
import { getCompany } from "@/services/company"

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
                    <GameActions gameId={game.id} />

                    <AsideSection title="Rating" condition={game.rating_count > 0}>
                        <Link href={game.url} className="text-sm flex items-center gap-2" target="_blank"><Igdb className="fill-purple-500 h-3"/> {game.rating?.toFixed(1)} ({game.rating_count})</Link>
                    </AsideSection>

                    <AsideSection title="Franchise" condition={!!game.franchises?.length}>
                        <Link href={game.franchises?.[0]?.url ?? '/'} className="text-sm" target="_blank">{game.franchises?.[0].name}</Link>
                    </AsideSection>

                    <AsideSection title="Game engines" condition={!!game.game_engines?.length}>
                        <div>
                            { game.game_engines?.map((engine, idx) => {
                                const isLast = idx === (game.game_engines?.length ?? 0) - 1
                                return <Link key={engine.id} href={engine.url ?? '#'} className="text-sm inline" target="_blank">{engine.name}{isLast ? '' : ', '}</Link>
                            }) }
                        </div>
                    </AsideSection>
                </aside>
                <article className="-mt-14 min-w-0 flex flex-col gap-12" style={{ flex: '1 1 0' }}>
                    <Section title="Platforms">
                        <Platforms platforms={game.platforms} />
                    </Section>

                    <ServicesTable services={game.external_games} />

                    <Section title="Summary">
                        <p className="text-shadow">{game.summary}</p>
                    </Section>

                    <HowLongToBeat gameName={game.name} />

                    { game.similar_games?.length ? <Section title="Similar games">
                        <CardsSlider games={
                            // Sort games by popularity
                            game.similar_games.sort((a, b) => b.rating - a.rating)
                        } lazy={true} />
                    </Section> : <></> }
                </article>
            </main>
        </section>
        {JSON.stringify(game.external_games)}
        {game.external_games?.map((game, index) => <>{Services[(game.category as number)]}<br></br></>)}
    </>
}

