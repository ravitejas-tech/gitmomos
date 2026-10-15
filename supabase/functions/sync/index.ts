import { json } from '../_shared/http/json.ts'
import { parseBody } from '../_shared/http/parse-body.ts'
import { readJson } from '../_shared/http/read-json.ts'
import { serve } from '../_shared/http/serve.ts'
import { syncRequestSchema } from '../_shared/schemas/sync.schema.ts'
import { requireSyncUser } from '../_shared/sync/require-sync-user.ts'
import { syncDay } from '../_shared/sync/sync-day.ts'

serve(async (req) => {
    const body = await readJson(req)
    const userId = await requireSyncUser(req, body)
    const { date } = parseBody(syncRequestSchema, body)
    return json(await syncDay(userId, date))
})
