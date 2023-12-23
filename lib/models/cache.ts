import { expiresIn } from '../utils'

export interface ICache<T = any> {
    object: T
    expiresIn: number
}

/**
 * @param object Object to be cached
 * @param exIn Expiration in hours
 * @returns Cached object
 */
export const cachedObject = <T>(object: T, exIn: number): ICache<T> => {
    // convert expiresIn to hours
    return {
        object,
        expiresIn: Date.now() + expiresIn(exIn)
    }
}