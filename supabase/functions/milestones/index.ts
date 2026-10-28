import { json } from '../_shared/http/json.ts'
import { readJson } from '../_shared/http/read-json.ts'
import { serve } from '../_shared/http/serve.ts'
import { scanMilestones } from '../_shared/milestones/scan-milestones.ts'
import { requireSyncUser } from '../_shared/sync/require-sync-user.ts'

serve(async (req) => {
    const userId = await requireSyncUser(req, await readJson(req))
    return json(await scanMilestones(userId))
})
