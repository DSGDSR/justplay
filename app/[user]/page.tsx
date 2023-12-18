import UserPage from '@/components/pages/UserPage';
import { getListedGames } from '@/services/lists';
import { clerkClient } from '@clerk/nextjs';
import { db } from '@vercel/postgres';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface UserPageRequest {
    params: {
        user: string
    }
}

export async function generateMetadata({ params: { user } }: UserPageRequest): Promise<Metadata> {
    return {
      title: `${user} profile • ${process.env.TITLE}`,
      keywords: `${process.env.GENERIC_KEYWORDS ?? process.env.TITLE}, ${user}, profile, user, username, user page, user profile`,
    }
}

export default async function Page({ params: { user: username } }: UserPageRequest) {

    const { rows } = await db.sql`SELECT * FROM users WHERE username = ${username}`
    const user = rows[0]?.id ? await clerkClient.users.getUser(rows[0].id) : null

    if (!user) {
        return notFound()
    }

    const { data: listedGames } = await getListedGames(user.id)
    
    return <UserPage user={user} listedGames={listedGames} />
}