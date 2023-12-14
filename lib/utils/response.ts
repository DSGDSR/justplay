import { NextResponse } from 'next/server';
import { IHttpError } from '../models/error';

export const HttpResponse = (
    data: any,
    success = true,
    error: IHttpError | null = null
): NextResponse => NextResponse.json({
    data,
    success,
    error,
    ...Array.isArray(data) ? {
        count: data.length
    } : {}
}, {
    status: error?.status ?? 200
})