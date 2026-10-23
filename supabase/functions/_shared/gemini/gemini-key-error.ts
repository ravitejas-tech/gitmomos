import { GEMINI_KEY_REJECTED_MESSAGE } from '../constants/gemini.constants.ts'
import { HttpError } from '../http/http-error.ts'

export class GeminiKeyError extends HttpError {
    constructor() {
        super(400, GEMINI_KEY_REJECTED_MESSAGE)
    }
}
