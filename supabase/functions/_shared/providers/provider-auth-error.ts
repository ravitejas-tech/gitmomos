import { HttpError } from '../http/http-error.ts'

export class ProviderAuthError extends HttpError {
    constructor(message: string) {
        super(502, message)
    }
}
