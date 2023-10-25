import { Badge } from "@/components/Badge";
import Skeleton from "@/components/Skeleton";
import GamePage from "@/components/pages/GamePage";
import { CoverSkeleton, ThumbSkeleton } from "@/components/pages/GamePage/skeletons";
import { getGame } from "@/services/game";
import { Suspense } from "react";

interface GamePageRequest {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params: { slug } }: GamePageRequest) {
    const { data: game } = await getGame(slug)
   
    return {
      title: `${game.name} - Where to play`
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
        <section className="container game-page relative -top-[18.5rem]">
            <header className="flex gap-8">
                <div className="w-[22rem]">
                    <figure className="aspect-[9/12] shadow-md rounded-md">
                        <CoverSkeleton />
                    </figure>
                </div>
                <div className="main-details w-full flex flex-col justify-end">
                    <hgroup className="flex flex-col gap-1 w-full">
                        <Skeleton className="h-14 mb-5 w-3/5" />
                        <div className="genres flex gap-3 mb-6">
                            <Badge variant={'skeleton'}>Skeleton te</Badge>
                            <Badge variant={'skeleton'}>Skele</Badge>
                            <Badge variant={'skeleton'}>Skeleton</Badge>
                        </div>
                        <Skeleton className="h-7 w-1/4" />
                    </hgroup>
                    <div className="actions mt-12 flex gap-5">
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>
            </header>
        </section>
    </>
}
