export const expiresIn = (expiresIn: number): number => {
    // convert expiresIn to hours
    return expiresIn * 60 * 60 * 1000
}