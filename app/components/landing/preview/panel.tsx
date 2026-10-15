import { PreviewDayList } from '~/components/landing/preview/day-list'
import { PreviewReport } from '~/components/landing/preview/report'
import { PreviewToolbar } from '~/components/landing/preview/toolbar'

export function PreviewPanel() {
    return (
        <div className='my-2 mr-2 flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-panel shadow-card'>
            <PreviewToolbar />
            <div className='grid min-h-0 flex-1 grid-cols-[17rem_1fr]'>
                <PreviewDayList />
                <PreviewReport />
            </div>
        </div>
    )
}
