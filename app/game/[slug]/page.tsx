import Skeleton from "@/components/Skeleton";
import GamePage from "@/components/pages/GamePage";
import { CoverSkeleton, ThumbSkeleton } from "@/components/pages/GamePage/skeletons";
import { Suspense } from "react";

interface Props {
    params: {
        slug: string
    }
}

export default function Page({ params: { slug } }: Props) {
    return <Suspense key={slug} fallback={<GamePageSkeleton />}>
        {/*<GamePageSkeleton />*/}
        <GamePage slug={slug} />
        {/*< />*/}
    </Suspense>
}

const GamePageSkeleton = () => {
    return <>
        <ThumbSkeleton />
        <section className="container game-page relative -top-[16.5rem]">
            <header className="flex gap-8">
                <figure className="aspect-[9/12] w-80 shadow-md rounded-sm">
                    <CoverSkeleton />
                </figure>
                <div className="main-details w-full flex flex-col justify-end">
                    <hgroup className="flex flex-col gap-4 w-full">
                        <Skeleton className="h-14 mb-3 w-3/5" />
                        <Skeleton className="h-9 w-2/5" />
                        <Skeleton className="h-8 w-1/4" />
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
