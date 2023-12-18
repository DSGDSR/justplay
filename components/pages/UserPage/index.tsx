import AsideSection from '@/components/AsideSection'
import ExternalAccounts from '@/components/ExternalAccounts'
import GamesList from '@/components/GamesList'
import { useServerPathname } from '@/hooks/use-server-pathname'
import { ListTypes } from '@/lib/enums'
import { ListsItemsResponse } from '@/lib/models/lists'
import { User } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
    user: User
    listedGames: ListsItemsResponse | null
}

export default async function UserPage({ user, listedGames }: Props) {
    const lastFavorite = listedGames?.[ListTypes.Favorite]?.slice(0, 4) ?? []
    const lastFinished = listedGames?.[ListTypes.Finished]?.slice(0, 4) ?? []
    const pathname = useServerPathname()

    return <section className="container relative py-16 flex flex-col gap-14">
        <div className="flex gap-10">
            <Link href={user.imageUrl} target='_blank' rel='noopener noreferrer'>
                <Image
                    className="rounded-full w-36 outline-2 outline outline-secondary hover:outline-primary transition-[outline-color]"
                    src={user.imageUrl}
                    width={300} height={300}
                    alt={`${user.username}, ${user.firstName} ${user.lastName}, user profile, justplay, game, game profile, user`}
                />
            </Link>
            <hgroup className="flex flex-col justify-center gap-2.5">
                <h2 className="font-bold text-4xl">{user.username}</h2>
                <h3 className="opacity-60">{user.firstName} {user.lastName}</h3>
            </hgroup>
        </div>

        <main className="flex gap-10 flex-col md:flex-row">
            <div style={{ flex: '1 1 0' }} className="flex flex-col gap-10 sm:gap-12">
                <GamesList
                    list={lastFavorite.slice(0,4)}
                    listedGames={listedGames}
                    sectionName="Favorite games"
                    sectionLink={lastFavorite.length > 3 ? `${pathname}/favorites` : undefined}
                />
                { lastFinished.length ? <GamesList
                    list={lastFinished.slice(0,4)}
                    listedGames={listedGames}
                    sectionName="Last finished games"
                    sectionLink={lastFavorite.length > 3 ? `${pathname}/finished` : undefined}
                /> : <></> }
            </div>
            <aside style={{ flex: '0 0 320px' }} >
                <AsideSection
                    title="Connected accounts"
                    condition={user.externalAccounts?.length > 0}
                    className="gap-3.5"
                    pre={<></>}
                >
                    <ExternalAccounts externalAccounts={user.externalAccounts} />
                </AsideSection>
            </aside>
        </main>
    </section>
}

