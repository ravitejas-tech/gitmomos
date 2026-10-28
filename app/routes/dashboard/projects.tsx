import { useState } from 'react'
import { Plus } from 'lucide-react'
import { DashboardPage } from '~/components/layout/dashboard-page'
import { ProjectModal } from '~/components/projects/form/modal'
import { ProjectGrid } from '~/components/projects/list/grid'
import { Button } from '~/components/ui/button'

export default function ProjectsPage() {
    const [isCreating, setCreating] = useState(false)

    return (
        <DashboardPage
            title='Projects'
            actions={
                <Button onClick={() => setCreating(true)}>
                    <Plus />
                    New project
                </Button>
            }>
            <ProjectGrid onCreate={() => setCreating(true)} />
            {isCreating && <ProjectModal onClose={() => setCreating(false)} />}
        </DashboardPage>
    )
}
