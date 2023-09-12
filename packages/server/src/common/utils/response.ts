import { IHttpError } from "../interfaces/error";
import { IHttpResponse } from "../interfaces/response";

export const HttpResponse = (
    data: any,
    success = true,
    error: IHttpError | null = null
): IHttpResponse => ({
    data,
    success,
    error
})