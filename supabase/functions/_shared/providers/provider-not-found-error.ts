import { HttpError } from '../http/http-error.ts'

export class ProviderNotFoundError extends HttpError {
    constructor(message: string) {
        super(404, message)
    }
}
