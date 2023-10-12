import { unix2Date } from "./unix2date"

const defaultConfig: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}

export const localizedDate = (
    unix: number,
    locale = 'en-GB',
    config: Intl.DateTimeFormatOptions = defaultConfig
): string => {
    const date = unix2Date(unix)
    return date.toLocaleString(locale, config)
}