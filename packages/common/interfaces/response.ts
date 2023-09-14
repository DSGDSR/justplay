import { IHttpError } from "../../server/src/common/interfaces/error";

export interface IHttpResponse<T = any> {
    data: T,
    success: boolean,
    error: IHttpError | null
}