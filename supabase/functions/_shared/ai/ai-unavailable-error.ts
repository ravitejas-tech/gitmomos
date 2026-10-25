export class AiUnavailableError extends Error {
    constructor(
        public readonly status: number,
        message: string,
    ) {
        super(message)
    }
}
