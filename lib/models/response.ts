import { IHttpError } from './error';

export interface IHttpResponse<T = any> {
    data: T,
    success: boolean,
    error: IHttpError | null
}