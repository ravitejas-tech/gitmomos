import { PreviewPanel } from '~/components/landing/preview/panel'
import { PreviewSidebar } from '~/components/landing/preview/sidebar'

export function PreviewAppWindow() {
    return (
        <div className='grid h-[46rem] grid-cols-[13rem_1fr] overflow-hidden rounded-xl border border-border-strong bg-bg shadow-overlay'>
            <PreviewSidebar />
            <PreviewPanel />
        </div>
    )
}
