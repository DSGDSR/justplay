export interface IPlatform {
    id: number
    name: string
    slug: string
    abbreviation: string
    alternative_name: string
    category: number
    platform_logo: number
    platform_family: number
    summary: string
    url: string
    versions: number[]
    websites: number[]
}

export interface IGroupedPlatforms {
    group: string
    names: string[]
    platforms: IPlatform[]
}
