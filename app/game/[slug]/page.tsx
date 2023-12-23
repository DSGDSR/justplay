import { AsideSectionSkeleton } from '@/components/AsideSection';
import { Badge } from '@/components/Badge';
import { GameActionsSkeleton } from '@/components/GameActions';
import { SectionSkeleton } from '@/components/Section';
import Skeleton from '@/components/Skeleton';
import GamePage from '@/components/pages/GamePage';
import { CoverSkeleton, ThumbSkeleton } from '@/components/pages/GamePage/skeletons';
import { getGame } from '@/services/game';
import { Metadata } from 'next';
import { Suspense } from 'react';

interface GamePageRequest {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params: { slug } }: GamePageRequest): Promise<Metadata> {
    const { data: game } = await getGame(slug)
   
    return {
      title: `${game.name} • ${process.env.TITLE}`,
      // TODO copy keywords
      keywords: `${process.env.GENERIC_KEYWORDS ?? process.env.TITLE}, ${game.name}, ${game.genres?.map(g => g.name).join(', ') ?? ''}, ${game.alternative_names?.map(an => an.name)?.join(', ') ?? ''}, ${game.keywords?.map(k => k.name)?.join(', ') ?? ''}`,
    }
}

export default function Page({ params: { slug } }: GamePageRequest) {
    return <Suspense key={slug} fallback={<GamePageSkeleton />}>
        {/*<GamePageSkeleton />*/}
        <GamePage slug={slug} />
        {/*< />*/}
    </Suspense>
}

const GamePageSkeleton = () => {
    return <>
        <ThumbSkeleton />
        <section className="container game-page relative -top-[13.75rem] sm:-top-[13.5rem] md:-top-[19rem]">
            <header className="flex gap-10 flex-row-reverse md:flex-row h-[17rem] justify-end sm:h-72 md:justify-normal md:h-auto">
                <div className="flex-grow-0 flex-shrink-0 [flex-basis:152px;] sm:[flex-basis:186px;] md:[flex-basis:260px;] self-end">
                    <figure className="shadow-md w-full">
                        <CoverSkeleton />
                    </figure>
                </div>
                <div className="relative w-full flex flex-col justify-end md:mb-10">
                    <hgroup className="flex flex-col gap-3 w-full mb-7 md:mb-14">
                        <Skeleton className="h-9 md:h-14 md:mb-4 w-3/5" />
                        <Skeleton className="h-9 w-4/5 md:hidden" />
                        <div className="genres hidden sm:flex gap-3 mb-6">
                            <Badge variant={'skeleton'}>Skeleton te</Badge>
                            <Badge variant={'skeleton'}>Skele</Badge>
                            <Badge variant={'skeleton'}>Skeleton</Badge>
                        </div>
                        <Skeleton className="hidden sm:block h-7 w-1/4" />
                    </hgroup>
                    <div className="md:absolute actions gap-3 md:gap-6 md:right-0 flex">
                        <Skeleton className="w-12 h-10 md:h-16 md:w-16 md:rounded-full" />
                    </div>
                </div>
            </header>

            <main className="flex gap-10 mt-20 sm:mt-24 md:mt-3.5 flex-col-reverse md:flex-row">
                <aside style={{ flex: '0 0 260px' }}>
                    <div className="hidden md:block">
                        <GameActionsSkeleton />
                    </div>
                    <AsideSectionSkeleton/>
                    <AsideSectionSkeleton/>
                </aside>
                <article className="-mt-16 md:-mt-14 min-w-0 flex flex-col gap-10 sm:gap-12" style={{ flex: '1 1 0' }}>
                    <div className="md:hidden"><GameActionsSkeleton /></div>
                    <SectionSkeleton />
                    <div className="hidden md:flex flex-col gap-10 sm:gap-12">
                        <SectionSkeleton height={120} />
                        <SectionSkeleton height={55} />
                    </div>
                </article>
            </main>
        </section>
    </>
}
