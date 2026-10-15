import type { NotifyTone } from '~/lib/notify'
import type { SyncResult } from '~/types/reports'

export const SYNC_MESSAGES: Record<SyncResult['report'], { message: string; tone: NotifyTone }> = {
    generated: { message: 'Report updated.', tone: 'success' },
    skipped: { message: 'No commits found for this day yet.', tone: 'blank' },
    kept_edited: { message: 'Commits synced. Your edited report is unchanged.', tone: 'success' },
    failed: { message: 'Commits synced, but the report could not be written.', tone: 'error' },
}
