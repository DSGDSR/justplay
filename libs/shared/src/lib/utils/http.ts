import { NextResponse } from 'next/server';
import { IHttpResponse, IHttpError } from '../models/http';

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