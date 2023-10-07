export const unix2Date = (unix: number): Date => {
    return new Date(unix * 1000)
}