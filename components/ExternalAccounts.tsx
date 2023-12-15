import { OathProviders } from '@/lib/enums'
import Link from 'next/link'
import { ReactNode } from 'react'
import Discord from './icons/social/Discord'
import Twitch from './icons/social/Twitch'
import { ExternalAccount } from '@clerk/nextjs/server'

interface Props {
    externalAccounts: ExternalAccount[]
}

const socialIcon: Record<OathProviders, ReactNode> = {
    [OathProviders.Twitch]: <Twitch size={26} strokeWidth={2} className="stroke-inherit"/>,
    [OathProviders.Discord]: <Discord size={26} strokeWidth={2} className="stroke-inherit"/>
}

const socialUrl: Record<OathProviders, (account: ExternalAccount) => string> = {
    [OathProviders.Twitch]: (a) => `https://twitch.tv/${a.username}`,
    [OathProviders.Discord]: (a) => `https://discord.com/users/${a.externalId}`
}

const ExternalAccounts = ({ externalAccounts }: Props) => {
    return externalAccounts.filter(a => !!a.username && !!a.provider)?.map((account, idx) => {
        return <Link
            href={socialUrl[account.provider as OathProviders](account)}
            target="_blank"
            key={`external_account_${idx}`}
            className="flex text-sm items-center gap-2 opacity-80 hover:text-primary hover:stroke-primary transition-all stroke-white"
        >
            {socialIcon[account.provider as OathProviders]}
            {account.username}
        </Link>
    })
}

export default ExternalAccounts