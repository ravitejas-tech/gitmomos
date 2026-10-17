import { FocusTimeline } from '~/components/coming-soon/focus/timeline'
import { StatCard } from '~/components/overview/stat-card'
import { Alert } from '~/components/ui/alert'
import { FOCUS_ALERT, FOCUS_STATS } from '~/data/coming-soon/focus'

export function FocusPreview() {
    return (
        <div className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-3'>
                {FOCUS_STATS.map((stat) => (
                    <StatCard
                        key={stat.label}
                        {...stat}
                    />
                ))}
            </div>
            <FocusTimeline />
            <Alert tone='warning'>{FOCUS_ALERT}</Alert>
        </div>
    )
}
