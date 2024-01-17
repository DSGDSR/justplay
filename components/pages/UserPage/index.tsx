
import Activity from '@/components/Activity'
import AsideSection from '@/components/AsideSection'
import CustomListsSection from '@/components/CustomLists'
import ExternalAccounts from '@/components/ExternalAccounts'
import GamesList from '@/components/GamesList'
import Section from '@/components/Section'
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
    const finished = listedGames?.[ListTypes.Finished]?.slice(0, 4) ?? []
    const wantToPlay = listedGames?.[ListTypes.Playlist]?.slice(0, 4) ?? []

    const activity = listedGames ? [
        ...listedGames?.[ListTypes.Favorite] ?? [],
        ...listedGames?.[ListTypes.Playlist] ?? [],
        ...listedGames?.[ListTypes.Finished] ?? [],
        ...listedGames?.[ListTypes.Custom] ?? []
    ].sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }).slice(0, 5) : []

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

        <main className="flex gap-10 md:gap-12 flex-col md:flex-row">
            <div style={{ flex: '1 1 0' }} className="flex flex-col gap-10 sm:gap-12">
                { activity.length ? 
                    <Section title="Activity">
                        <Activity user={user} activity={activity} limit={5}/>
                    </Section>
                : <></> }

                <GamesList
                    list={lastFavorite}
                    listedGames={listedGames}
                    sectionName="Favorite games"
                    link={lastFavorite.length > 3 ? `/${user.username}/favorites` : undefined}
                />

                { listedGames?.[ListTypes.Custom]?.length ? <CustomListsSection
                    userId={user.id}
                    isSection={true}
                    listedGames={listedGames?.[ListTypes.Custom]}
                /> : <></> }
            </div>
            <aside style={{ flex: '0 0 320px' }} >
                <AsideSection
                    title="Connected accounts"
                    condition={user.externalAccounts?.length > 0}
                    pre={<></>}
                >
                    <ExternalAccounts externalAccounts={user.externalAccounts} />
                </AsideSection>

                <AsideSection
                    title="Want to play"
                    link={`/${user.username}/playlist`}
                    linkText={
                        listedGames?.[ListTypes.Playlist] && listedGames?.[ListTypes.Playlist].length > 4
                            ? listedGames?.[ListTypes.Playlist].length : undefined
                    }
                >
                    <GamesList
                        list={wantToPlay}
                        listedGames={null}
                        link={`/${user.username}/playlist`}
                        variant='compact'
                    />
                </AsideSection>

                <AsideSection
                    title="Finished games"
                    link={`/${user.username}/finished`}
                    linkText={
                        listedGames?.[ListTypes.Finished] && listedGames?.[ListTypes.Finished].length > 4
                            ? listedGames?.[ListTypes.Finished].length : undefined
                    }
                >
                    <GamesList
                        list={finished}
                        listedGames={null}
                        link={`/${user.username}/finished`}
                        variant='compact'
                    />
                </AsideSection>
                
            </aside>
        </main>
    </section>
}

