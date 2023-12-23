import { NextResponse } from 'next/server';
import { IHttpError } from '../models/error';
import { IHttpResponse } from '../models/response';

export const HttpResponse = (
    data: any,
    success = true,
    error: IHttpError | null = null
): NextResponse<IHttpResponse> => NextResponse.json({
    data,
    success,
    error,
    ...Array.isArray(data) ? {
        count: data.length
    } : {}
}, {
    status: error?.status ?? 200
})