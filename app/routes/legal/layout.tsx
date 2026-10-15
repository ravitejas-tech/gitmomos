import { Outlet } from 'react-router'
import { LegalNav } from '~/components/legal/legal-nav'
import { TableOfContents } from '~/components/legal/table-of-contents'
import { Container } from '~/components/ui/container'
import { useLegalToc } from '~/hooks/legal/use-legal-toc'

export default function LegalLayout() {
    const { items, activeId } = useLegalToc()

    return (
        <Container className='flex flex-col gap-10 py-16 md:py-24 lg:flex-row lg:gap-16'>
            <LegalNav />
            <article className='max-w-2xl min-w-0 flex-1'>
                <Outlet />
            </article>
            <TableOfContents
                items={items}
                activeId={activeId}
            />
        </Container>
    )
}
