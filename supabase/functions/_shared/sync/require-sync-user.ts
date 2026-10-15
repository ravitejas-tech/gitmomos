import { WORKER_SECRET_HEADER } from '../constants/sync.constants.ts'
import { HttpError } from '../http/http-error.ts'
import { parseBody } from '../http/parse-body.ts'
import { requireEnv } from '../lib/env.ts'
import { safeEqual } from '../lib/safe-equal.ts'
import { workerSyncRequestSchema } from '../schemas/sync.schema.ts'
import { requireUser } from '../supabase/require-user.ts'

export async function requireSyncUser(req: Request, body: unknown): Promise<string> {
    const workerSecret = req.headers.get(WORKER_SECRET_HEADER)
    if (!workerSecret) return (await requireUser(req)).id

    if (!safeEqual(workerSecret, requireEnv('WORKER_SECRET'))) throw new HttpError(401, 'Bad worker secret')
    return parseBody(workerSyncRequestSchema, body).userId
}
