import { IHttpError } from "../common/interfaces/error";
import { IHttpResponse } from "../../../common/interfaces/response";

export const HttpResponse = (
    data: any,
    success = true,
    error: IHttpError | null = null
): IHttpResponse => ({
    data,
    success,
    error
})