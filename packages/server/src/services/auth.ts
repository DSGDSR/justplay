import Elysia from "elysia"
import { AuthToken } from "../common/interfaces/auth"
import { CustomStore } from "../common/interfaces/store"
import cron from "@elysiajs/cron"

export const getTwitchToken = async (): Promise<AuthToken> => {
    const { SERVER_TWITCH_CLIENT_ID, SERVER_TWITCH_CLIENT_SECRET } = Bun.env

    const response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${SERVER_TWITCH_CLIENT_ID}&client_secret=${SERVER_TWITCH_CLIENT_SECRET}&grant_type=client_credentials`, {
        method: 'POST'
    })
    .then(async (response) => {
        const json: AuthToken = await response.json()
        return {
            ...json,
            expire_date: new Date(Date.now() + (json?.expires_in ?? 0)).getTime()
        }
    })
    .catch(err => null)

    if (!response) {
        // Control no token situation
    }

    return response as AuthToken
}

export const checkToken = async (auth: AuthToken | null, store: CustomStore) => {
    if (!auth) return null

    if ((Date.now() - 10000) >= auth.expire_date) {
        console.log('token outdated')
        auth = await getTwitchToken()
        store.auth = auth
        return { auth }
    } else {
        console.log('token useful')
        return { auth }
    }
}

export const refreshToken = (app: Elysia) => cron({
    name: 'refreshToken',
    pattern: '*/30 * * * *',
    run: async() => {
        (app.store as CustomStore).auth = await getTwitchToken()
        console.debug('New token generated: ', (app.store as CustomStore).auth)
    }
})