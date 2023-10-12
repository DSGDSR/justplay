export interface IInvolvedCompany {
    id: number
    company: number
    created_at: number
    developer: boolean
    game: number
    porting: boolean
    publisher: boolean
    supporting: boolean
    updated_at: number
}

export interface ICompany {
    id: number
    change_date_category: number
    country: number
    created_at: number
    description: string
    developed: number[]
    logo: number
    name: string
    parent: number
    slug: string
    start_date: number
    start_date_category: number
    updated_at: number
    url: string
    websites: number[]
}
