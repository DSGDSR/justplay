import AsideSection from '@/components/AsideSection'
import ExternalAccounts from '@/components/ExternalAccounts'
import { User } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
    user: User
}

export default async function UserPage({ user }: Props) {
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

        <main className="flex gap-8 flex-col md:flex-row">
            <div style={{ flex: '1 1 0' }}>
                <div>test</div>
            </div>
            <aside style={{ flex: '0 0 280px' }} >
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

