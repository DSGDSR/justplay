export interface IScreenshot {
    id: number
    alpha_channel: false
    animated: false
    game: number
    height: number
    image_id: string
    url: string
    width: number
}

export interface IVideo {
    id: number
    name: string
    video_id: string
    game: number
}
