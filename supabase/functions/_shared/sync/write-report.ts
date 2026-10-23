import { GEMINI_KEY_MISSING_MESSAGE } from '../constants/gemini.constants.ts'
import { findGeminiKey } from '../gemini/find-gemini-key.ts'
import { HttpError } from '../http/http-error.ts'
import { errorMessage } from '../lib/error-message.ts'
import { generateReport } from '../reports/generate-report.ts'
import { adminClient } from '../supabase/admin-client.ts'
import { unwrap } from '../supabase/unwrap.ts'
import type { ReportCommit } from '../types/report.types.ts'
import type { SyncOutcome } from '../types/sync.types.ts'

export async function writeReport(
    userId: string,
    date: string,
    commits: ReportCommit[],
    errors: string[],
): Promise<SyncOutcome> {
    const admin = adminClient()
    const existing = unwrap(
        await admin.from('reports').select('status, edited_at').eq('user_id', userId).eq('date', date).maybeSingle(),
    )
    if (existing?.edited_at) return { report: 'kept_edited', errors }

    const report = { user_id: userId, date, commit_count: commits.length }
    try {
        const content = await generateReport(await requireGeminiKey(userId), date, commits)
        unwrap(
            await admin
                .from('reports')
                .upsert({ ...report, status: 'generated', content, error: null }, { onConflict: 'user_id,date' }),
        )
        return { report: 'generated', errors }
    } catch (err) {
        const message = errorMessage(err)
        if (existing?.status !== 'generated') {
            unwrap(
                await admin
                    .from('reports')
                    .upsert({ ...report, status: 'failed', error: message }, { onConflict: 'user_id,date' }),
            )
        }
        return { report: 'failed', errors, reportError: message }
    }
}

async function requireGeminiKey(userId: string): Promise<string> {
    const apiKey = await findGeminiKey(userId)
    if (!apiKey) throw new HttpError(400, GEMINI_KEY_MISSING_MESSAGE)
    return apiKey
}
