import { Service } from '../enums';
import { IInvolvedCompany } from './company';
import { ICover } from './cover';
import { IGenre } from './genre';
import { TListsState } from './list';
import { IScreenshot, IVideo } from './media';
import { IPlatform } from './platform';

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

export interface IGame extends Omit<IPrimitiveGame, 'cover' | 'screenshots' | 'external_games' | 'videos' | 'genres' | 'involved_companies' | 'platforms' | 'similar_games' | 'game_engines' | 'keywords' | 'alternative_names'> {
    cover: ICover
    genres: IGenre[]
    screenshots: IScreenshot[]
    videos: IVideo[]
    involved_companies: IInvolvedCompany[]
    platforms: IPlatform[]
    lists?: TListsState
    external_games?: IExternalGame[]
    similar_games: IGame[]
    franchises?: IGame[] // Change to IFranchise
    game_engines?: IGame[] // Change to IGameEngine
    keywords: IKeyword[]
    alternative_names: IAlternativeName[]
}

export interface IAlternativeName {
    id: number
    name: string
    game: number
}

export interface IKeyword {
    id: number
    name: string
    slug: string
    url: string
}

export interface IExternalGame {
    id: number
    category: Service
    game: number
    name?: string
    uid: string
    url?: string
    year?: number
}

export interface IGameSearch {
    id: number
    name: string
    slug: string
    cover: ICover | undefined
    genres: IGenre[]
}
