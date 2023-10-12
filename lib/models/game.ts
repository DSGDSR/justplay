import { IInvolvedCompany } from "./company";
import { ICover } from "./cover";
import { IGenre } from "./genre";
import { IScreenshot, IVideo } from "./media";
import { IPlatform } from "./platform";

export interface IPrimitiveGame {
    id: number
    age_ratings: number[]
    aggregated_rating: number
    aggregated_rating_count: number
    alternative_names: number[]
    artworks: number[]
    category: number
    cover: number
    created_at: number
    external_games: number[]
    first_release_date: number
    game_engines: number[]
    game_modes: number[]
    genres: number[]
    hypes: number
    involved_companies: number[]
    keywords: number[]
    name: string
    platforms: number[]
    player_perspectives: number[]
    rating: number
    rating_count: number
    release_dates: number[]
    screenshots: number[]
    similar_games: number[]
    slug: string
    storyline: string
    summary: string
    tags: number[]
    themes: number[]
    total_rating: number
    total_rating_count: number
    updated_at: number
    url: string
    videos: number[]
    websites: number[]
    checksum: string
    language_supports: number[]
}

export interface IGame extends Omit<IPrimitiveGame, 'cover' | 'screenshots' | 'videos' | 'genres' | 'involved_companies' | 'platforms'>  {
    cover: ICover
    genres: IGenre[]
    screenshots: IScreenshot[]
    videos: IVideo[]
    involved_companies: IInvolvedCompany[]
    platforms: IPlatform[]
}

export interface IGameSearch {
    id: number
    name: string
    slug: string
    cover: ICover | undefined
    genres: IGenre[]
}
