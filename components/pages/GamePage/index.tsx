import { Badge } from '@/components/Badge'
import { CoverSkeleton, ThumbSkeleton } from './skeletons'
import PreloadedImage from '@/components/PreloadedImage'
import Screenshots from '@/components/Screenshots'
import Trailer from '@/components/Trailer'
import GameActions from '@/components/GameActions'
import { cn, localizedDate, unix2Date } from '@/lib/utils'
import Platforms from '@/components/Platforms'
import HowLongToBeat from '@/components/HowLongToBeat'
import Slider from '@/components/Slider'
import Section from '@/components/Section'
import Link from 'next/link'
import Igdb from '@/components/icons/Igdb'
import AsideSection from '@/components/AsideSection'
import ServicesTable from '@/components/ServicesTable'
import { getGame } from '@/services/game'
import { getCompany } from '@/services/company'
import { getListedGames } from '@/services/lists'
import { auth } from '@clerk/nextjs'
import AdBanner from '@/components/AdBanner'
import { IGenre } from '@/lib/models/genre'
import ReadMore from '@/components/ReadMore'
import { useGenres } from '@/hooks/use-genres'
import Company from '../../Company'
import GameCard from '@/components/GameCard'
import { Services } from '@/lib/enums'
import { StreamingSlider } from '@/components/Streaming'

interface Props {
    slug: string
}

const GameGenres = ({ genres, className }: {
    genres: IGenre[] | string[],
    className?: string
}) => {
    return genres?.length ? <div className={cn('genres flex flex-wrap gap-2 md:gap-3 md:mb-4', className)}>
        { genres.map((g, i) => <Badge key={typeof g === 'string' ? g : g.id} variant="secondary" className={cn(i > 2 && 'hidden md:inline-flex')}>
            {typeof g === 'string' ? g : g.name}
        </Badge>) }
    </div> : <></>
}

export default async function GamePage({ slug }: Props) {
    const { userId } = auth()

    const responses = await Promise.all([
        getGame(slug),
        ...userId ? [getListedGames(userId)] : []
    ])

    const game = responses[0].data
    const lists = userId ? responses[1].data : null

    const screenshots = game.screenshots?.length ? game.screenshots.filter(s => s.image_id && s.url) : []
    const screenshot = screenshots.sort((a, b) => b.width - a.width)[0] ?? null

    const videos = game.videos?.length ? game.videos.filter(v => v && v.name && v.video_id) ?? game.videos[0] : []
    const video = videos.find(v => v.name.toLowerCase().trim() === 'trailer') ?? videos[0] ?? null

    const developer = game.involved_companies.find(c => c.developer) ?? null
    const company = developer ? getCompany(developer.company) : null

    const genres = useGenres(game.genres)

    const twitchGame = game.external_games?.find(g => g.category === Services.Twitch)

    return <>
        { screenshot ? <figure className="relative h-[236px] sm:h-64 md:h-96 w-full thumb-filter blur">
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
        <section className={cn('container game-page relative', screenshot ? '-top-[13.75rem] sm:-top-[13.5rem] md:-top-[19rem]' : 'md:mt-20')}>
            <header className="flex gap-8 flex-row-reverse md:flex-row h-[17rem] justify-end sm:h-72 md:justify-normal md:h-auto">
                <div className="flex-grow-0 flex-shrink-0 [flex-basis:152px;] sm:[flex-basis:186px;] md:[flex-basis:280px;] self-end">
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
                <div className="main-details relative w-full flex flex-col justify-end md:mb-10">
                    <hgroup className="flex flex-col gap-3 w-full mb-7 md:mb-14">
                        <h1 className={cn(
                            game.name?.length > 40 ? 'text-lg' : (game.name?.length > 15 ? 'text-xl' : (game.name?.length > 10 ? 'text-2xl' : 'text-3xl')),
                            'break-words sm:text-4xl md:text-7xl font-bold text-shadow-lg sm:mb-1'
                        )}>{game.name}</h1>
                        <GameGenres className="hidden sm:flex" genres={genres} />
                        <div className="hidden sm:block text-base md:text-lg text-shadow">
                            <time dateTime={unix2Date(game.first_release_date).toLocaleString()}>{localizedDate(game.first_release_date)}</time>
                            <Company promise={company} />
                        </div>
                    </hgroup>
                    <div className="md:absolute actions gap-3 md:gap-6 md:right-0 flex">
                        <Trailer name={game.name} id={video?.video_id} />
                        { screenshots?.length ? <Screenshots screenshots={screenshots} /> : <></> }
                    </div>
                </div>
            </header>
            <main className="flex gap-10 mt-20 sm:mt-24 md:mt-3.5 flex-col-reverse md:flex-row">
                <aside style={{ flex: '0 0 280px' }}>
                    <div className="hidden md:block">
                        <GameActions gameId={game.id} lists={lists} />
                    </div>

                    <div className="md:hidden block">
                        <AsideSection title="Genres" condition={!!genres.length}>    
                            <GameGenres className="mb-1" genres={genres} />
                        </AsideSection>
                    </div>

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

                    <AdBanner
                        className="border-2 border-dashed border-slate-800"
                        pre={<hr className="mt-4 mb-5" />}
                        data-ad-slot="1650839076"
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                    />
                </aside>
                <article className="-mt-16 md:-mt-14 min-w-0 flex flex-col gap-10 sm:gap-12" style={{ flex: '1 1 0' }}>
                    <GameActions className="md:hidden" gameId={game.id} lists={lists} />

                    <Section title="Platforms">
                        <Platforms platforms={game.platforms} />
                    </Section>

                    <ServicesTable services={game.external_games} name={game.name} />

                    <Section title="Summary">
                        <ReadMore className="text-shadow">{game.summary}</ReadMore>
                    </Section>

                    <HowLongToBeat gameName={game.name} />
                    
                    { twitchGame ? <StreamingSlider externalGame={twitchGame} isSection={true}/> : <></> }

                    { game.similar_games?.length ? <Section title="Similar games">
                        <Slider items={
                            // Sort games by popularit
                            game.similar_games.sort((a, b) => b.rating - a.rating).map(game => (
                                <GameCard
                                    key={game.id}
                                    game={game}
                                    className="inline-block mr-2 md:mr-3 last:mr-0"
                                    lists={lists ?? undefined}
                                />
                            ))
                        }/>
                    </Section> : <></> }
                </article>
            </main>
        </section>
        {//JSON.stringify(game)
        }
    </>
}

