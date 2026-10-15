import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { ReleaseHeader } from '~/components/releases/release-header'
import { ReleaseMobileBar } from '~/components/releases/release-mobile-bar'
import { ReleaseNotes } from '~/components/releases/release-notes'
import { ReleaseSidebar } from '~/components/releases/release-sidebar'
import { ReleasesStatus } from '~/components/releases/releases-status'
import { ScrollTopButton } from '~/components/releases/scroll-top-button'
import { Container } from '~/components/ui/container'
import { useReleases } from '~/hooks/releases/queries'
import { releasePath } from '~/lib/releases'

export function ReleasesPage() {
    const { version } = useParams()
    const navigate = useNavigate()
    const { data: releases, isLoading, isError, refetch } = useReleases()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const latest = releases?.[0]
    const selected = releases?.find(({ tag_name }) => tag_name === version) ?? latest

    useEffect(() => {
        if (!version && latest) navigate(releasePath(latest.tag_name), { replace: true })
    }, [version, latest, navigate])

    if (isLoading || isError || !selected) {
        return (
            <ReleasesStatus
                isLoading={isLoading}
                isError={isError}
                onRetry={() => refetch()}
            />
        )
    }

    return (
        <>
            <Container className='flex flex-col items-start gap-8 py-16 md:py-24 lg:flex-row lg:gap-16'>
                <ReleaseMobileBar
                    tag={selected.tag_name}
                    isOpen={isSidebarOpen}
                    onToggle={() => setIsSidebarOpen((open) => !open)}
                />
                <ReleaseSidebar
                    releases={releases ?? []}
                    selectedTag={selected.tag_name}
                    isOpen={isSidebarOpen}
                    onSelect={() => setIsSidebarOpen(false)}
                />
                <div className='w-full max-w-2xl min-w-0 flex-1'>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={selected.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}>
                            <ReleaseHeader release={selected} />
                            <ReleaseNotes body={selected.body} />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </Container>
            <ScrollTopButton />
        </>
    )
}
