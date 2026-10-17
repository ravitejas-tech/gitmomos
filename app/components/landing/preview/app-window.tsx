import { LandingWindow } from '~/components/landing/window'
import { PreviewPanel } from '~/components/landing/preview/panel'
import { PreviewSidebar } from '~/components/landing/preview/sidebar'

export function PreviewAppWindow() {
    return (
        <LandingWindow className='grid h-[46rem] grid-cols-[13rem_1fr]'>
            <PreviewSidebar />
            <PreviewPanel />
        </LandingWindow>
    )
}
