export const fetchTwitchGame = (
    gameId: string,
    init?: RequestInit | undefined,
    limit = 10,
    method = 'GET',
): Promise<Response> => fetch(`https://api.twitch.tv/helix/streams?game_id=${gameId}&first=${limit}`, {
    ...init,
    method,
    headers: {
        'Accept': 'application/json',
        'Client-ID': process.env.SERVER_TWITCH_CLIENT_ID ?? 'no-client-id',
        'Authorization': `Bearer ${process.env.SERVER_TWITCH_ACCESS_TOKEN ?? 'no-token'}`,
        ...init?.headers
    }
})