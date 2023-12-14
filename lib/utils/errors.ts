import { IHttpError } from '../models/error'

export const MissingBodyError: IHttpError = {
    status: 400,
    message: 'Bad request: missing body'
}

export const MissingParamsError: IHttpError = {
    status: 400,
    message: 'Bad request: missing params'
}

export const NotFoundError: IHttpError = {
    status: 404,
    message: 'Not found'
}

export const InvalidParams: IHttpError = {
    status: 400,
    message: 'Bad request: provided params are invalid'
}

export const ResponseError = (response: Response): IHttpError => ({
    status: response.status,
    message: response.statusText
})