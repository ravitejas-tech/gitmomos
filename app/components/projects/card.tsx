import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'

export interface ProjectCardProps {
    to: string
    name: string
    description: string | null
    badge?: ReactNode
    children: ReactNode
}

export function ProjectCard({ to, name, description, badge, children }: ProjectCardProps) {
    return (
        <Link
            to={to}
            className='block rounded-xl focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none'>
            <Card
                tone='interactive'
                padding='lg'
                className='flex h-full flex-col gap-3'>
                <div className='flex items-start justify-between gap-3'>
                    <Text
                        as='h3'
                        variant='subheading'
                        truncate>
                        {name}
                    </Text>
                    {badge}
                </div>
                {description && (
                    <Text
                        tone='secondary'
                        className='line-clamp-2'>
                        {description}
                    </Text>
                )}
                <div className='mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-1'>{children}</div>
            </Card>
        </Link>
    )
}
