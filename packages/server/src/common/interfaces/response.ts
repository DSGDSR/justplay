import { IHttpError } from "./error";

export interface IHttpResponse {
    data: any,
    success: boolean,
    error: IHttpError | null
}