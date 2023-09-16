import { IHttpError } from "../common/interfaces/error"

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

export const ResponseError = (response: Response): IHttpError => ({
    status: response.status,
    message: response.statusText
})