import { expect, test, describe } from 'bun:test'
import { ResponseError } from '../src/common/utils/errors'
import { HttpResponse } from '../src/common/utils/response'
import { IGDBError } from '../src/common/utils/igdb'

describe('Utils', () => {
    test('it should create a response error object', () => {
        const responseError = ResponseError({ ok: false, status: 404, statusText: 'Not Found' } as Response)
        expect(responseError).toEqual({
            status: 404,
            message: 'Not Found'
        })
    })

    test('it should create a IGDB error object', () => {
        const error = 'Service error'
        const responseError = IGDBError(new Error(error))
        expect(responseError).toEqual({
            status: 500,
            message: `Error: ${error}`
        })
    })

    test('it should create an http response object', () => {
        const error = 'Oh :V error'
        let response = HttpResponse([], false, IGDBError(new Error(error)))
        expect(response).toEqual({
            data: [],
            success: false,
            error: {
                status: 500,
                message: `Error: ${error}`
            }
        })

        response = HttpResponse({}, true)
        expect(response).toEqual({
            data: {},
            success: true,
            error: null
        })
    })

    /*test('it should call fetch method when call igdb post method', () => {
        const spy = spyOn(igdb, 'fetchIGDB')

        igdb.postIGDB(IGDBEndpoints.Game, null, 'body')
        expect(spy).toHaveBeenCalledWith('https://api.igdb.com/v4/game', {
            body: 'body',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': 'no-client-id',
                'Authorization': `Bearer no-token`,
            }
        })
    })*/
})