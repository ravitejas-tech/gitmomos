import { AI_PROVIDER_NAMES, aiKeyRejectedMessage } from '../constants/ai.constants.ts'
import { HttpError } from '../http/http-error.ts'
import type { AiProvider } from '../types/ai.types.ts'

export class AiKeyError extends HttpError {
    constructor(public readonly provider: AiProvider) {
        super(400, aiKeyRejectedMessage(AI_PROVIDER_NAMES[provider]))
    }
}
