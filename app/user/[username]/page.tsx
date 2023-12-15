import UserPage from '@/components/pages/UserPage';
import { clerkClient } from '@clerk/nextjs';
import { db } from '@vercel/postgres';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface UserPageRequest {
    params: {
        username: string
    }
}

export async function generateMetadata({ params: { username } }: UserPageRequest): Promise<Metadata> {
    return {
      title: `${username} profile • ${process.env.TITLE}`,
      keywords: `${process.env.GENERIC_KEYWORDS ?? process.env.TITLE}, ${username}, profile, user, username, user page, user profile`,
    }
}

export default async function Page({ params: { username } }: UserPageRequest) {
    const { rows } = await db.sql`SELECT * FROM users WHERE username = ${username}`
    const user = rows[0]?.id ? await clerkClient.users.getUser(rows[0].id) : null
    
    if (user) {
        return <UserPage user={user} />
    } else {
        return notFound()
    }
}