interface TwitchAuth {
    access_token: string
    expires_in: number
    expire_date: number
    token_type: string
}

export type AuthToken = TwitchAuth | null