import { AuthToken } from "../../common/interfaces/auth"
import { APIClass, CustomStore } from "../../common/interfaces/store"
import cron from "@elysiajs/cron"
import { log } from "../utils/logger"

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

export const refreshToken = (app: APIClass) => cron({
    name: 'refreshToken',
    pattern: '0 * * * *',
    run: async() => {
        const token = await getTwitchToken()
        app.store.auth = token
        log(`🔑 New token generated: ${token?.access_token}`)
    }
})

/*export const checkToken = async (auth: AuthToken | null, store: CustomStore) => {
    if (!auth) return null

    if ((Date.now() - 10000) >= auth.expire_date) {
        auth = await getTwitchToken()
        store.auth = auth
        return { auth }
    } else {
        return { auth }
    }
}*/