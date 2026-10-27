import { MAX_DAYS_BACK, INVALID_DATE_MESSAGE } from '../constants/sync.constants.ts'
import { HttpError } from '../http/http-error.ts'
import { addDays, dayWindow, isIsoDate, localDate } from '../lib/dates.ts'
import { uniqueBy } from '../lib/unique-by.ts'
import { adminClient } from '../supabase/admin-client.ts'
import { unwrap } from '../supabase/unwrap.ts'
import type { ReportCommit } from '../types/report.types.ts'
import type { SyncResult } from '../types/sync.types.ts'
import { collectCommits } from './collect-commits.ts'
import { writeReport } from './write-report.ts'

export async function syncDay(userId: string, requestedDate?: string | null): Promise<SyncResult> {
    const timeZone = await profileTimeZone(userId)
    const date = reportDate(requestedDate, timeZone)
    const { start, end } = dayWindow(date, timeZone)

    const errors = await collectCommits(userId, { since: start, until: new Date(Math.min(end.getTime(), Date.now())) })
    const commits = await dayCommits(userId, start, end)
    if (!commits.length) return { date, commitCount: 0, report: 'skipped', errors }

    return { date, commitCount: commits.length, ...(await writeReport(userId, date, commits, errors)) }
}

async function profileTimeZone(userId: string): Promise<string> {
    const profile = unwrap(await adminClient().from('profiles').select('timezone').eq('id', userId).maybeSingle())
    if (!profile) throw new HttpError(404, 'Profile not found')
    return profile.timezone
}

function reportDate(requestedDate: string | null | undefined, timeZone: string): string {
    const today = localDate(timeZone)
    const date = requestedDate ?? today
    if (!isIsoDate(date) || date > today || date < addDays(today, -MAX_DAYS_BACK)) {
        throw new HttpError(400, INVALID_DATE_MESSAGE)
    }
    return date
}

async function dayCommits(userId: string, start: Date, end: Date): Promise<ReportCommit[]> {
    const commits = unwrap(
        await adminClient()
            .from('commits')
            .select('sha, message, committed_at, repositories!inner(full_name, enabled)')
            .eq('user_id', userId)
            .eq('repositories.enabled', true)
            .gte('committed_at', start.toISOString())
            .lt('committed_at', end.toISOString())
            .order('committed_at', { ascending: true })
            .order('repository_id', { ascending: true }),
    )
    return uniqueBy(commits, ({ sha }) => sha).map(({ message, committed_at, repositories }) => ({
        repository: repositories.full_name,
        message,
        committedAt: committed_at,
    }))
}
