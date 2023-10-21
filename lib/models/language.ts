import { LanguageSupportType } from "../enums"

export interface LanguageSupport {
    id: number
    game: number
    language: Language,
    language_support_type: LanguageSupportType,
}

export interface Language {
    id: number
    name: string
    native_name: string
    locale: string
}
