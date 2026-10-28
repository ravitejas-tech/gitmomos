import { SidebarContent } from '~/components/layout/sidebar-content'

export function Sidebar() {
    return (
        <aside className='sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-panel md:flex print:hidden'>
            <SidebarContent />
        </aside>
    )
}
