import { IGDBEndpoints } from '@/lib/enums'
import { ICompany } from '@/lib/models/company'
import {
    InvalidParams,
    MissingParamsError,
    NotFoundError,
    ResponseError,
    IGDBError,
    postIGDB,
    HttpResponse
} from '@/lib/utils'
import { NextRequest } from 'next/server'

interface GETCompanyByIdQuery {
    params: {
        id: string
    }
}

export async function GET(_request: NextRequest, query: GETCompanyByIdQuery) {
    if (!query?.params?.id) return HttpResponse(null, false, MissingParamsError)
    if (isNaN(Number(query.params.id))) return HttpResponse(null, false, InvalidParams)
    const id = Number(query.params.id)

    return await postIGDB(
        IGDBEndpoints.Companies,
        `fields *; where id=${id};`
    ).then(async (response) => {
        if (!response.ok) {
            return HttpResponse(null, false, ResponseError(response))
        }

        const results: ICompany[] = await response.json()
        return results.length
            ? HttpResponse(results[0])
            : HttpResponse(null, false, NotFoundError)
    })
    .catch(err => HttpResponse(null, false, IGDBError(err)))
}