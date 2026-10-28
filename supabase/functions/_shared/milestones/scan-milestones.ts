import { MILESTONES_KEY_MISSING_MESSAGE, SCAN_BATCH_SIZE, SCAN_BUDGET_MS } from '../constants/milestones.constants.ts'
import { findAiKey } from '../ai/find-ai-key.ts'
import { HttpError } from '../http/http-error.ts'
import { milestoneReportsSchema, type MilestoneReport } from '../schemas/milestones.schema.ts'
import { adminClient } from '../supabase/admin-client.ts'
import { unwrap } from '../supabase/unwrap.ts'
import type { AiKey } from '../types/ai.types.ts'
import type { FoundMilestone, MilestoneScan } from '../types/milestones.types.ts'
import { findMilestones } from './find-milestones.ts'

export async function scanMilestones(userId: string): Promise<MilestoneScan> {
    const key = await findAiKey(userId)
    if (!key) throw new HttpError(400, MILESTONES_KEY_MISSING_MESSAGE)
    return scanBatches(userId, key, Date.now() + SCAN_BUDGET_MS, { scanned: 0, found: 0, remaining: true })
}

async function scanBatches(
    userId: string,
    key: AiKey,
    deadline: number,
    progress: MilestoneScan,
): Promise<MilestoneScan> {
    const reports = await pendingReports(userId)
    if (!reports.length) return { ...progress, remaining: false }

    const milestones = await findMilestones(key, reports)
    await recordMilestones(userId, reports, milestones)

    const next = {
        scanned: progress.scanned + reports.length,
        found: progress.found + milestones.length,
        remaining: true,
    }
    return Date.now() < deadline ? scanBatches(userId, key, deadline, next) : next
}

async function pendingReports(userId: string): Promise<MilestoneReport[]> {
    const rows = unwrap(
        await adminClient().rpc('pending_milestone_reports', { p_user_id: userId, p_limit: SCAN_BATCH_SIZE }),
    )
    return milestoneReportsSchema.parse(rows)
}

async function recordMilestones(userId: string, reports: MilestoneReport[], milestones: FoundMilestone[]) {
    unwrap(
        await adminClient().rpc('record_milestones', {
            p_user_id: userId,
            p_reports: reports.map(({ id, updated_at }) => ({ id, updated_at })),
            p_milestones: milestones,
        }),
    )
}
