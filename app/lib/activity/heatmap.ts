import { HEATMAP_LEVELS } from '~/data/activity/ranges'
import type { DayCount, HeatmapCell } from '~/types/activity'

export function heatmapCells(daily: DayCount[]): HeatmapCell[] {
    const max = Math.max(1, ...daily.map((day) => day.commits))
    return daily.map(({ date, commits }) => ({
        date,
        commits,
        level: commits ? Math.max(1, Math.ceil((commits / max) * HEATMAP_LEVELS)) : 0,
    }))
}
