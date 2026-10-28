import { Badge } from '~/components/ui/badge'
import { cn } from '~/lib/utils'

export interface TagListProps {
    tags: string[]
    limit?: number
    className?: string
}

export function TagList({ tags, limit, className }: TagListProps) {
    if (!tags.length) return null

    return (
        <div className={cn('flex flex-wrap gap-1.5', className)}>
            {tags.slice(0, limit).map((tag) => (
                <Badge
                    key={tag}
                    variant='neutral'>
                    {tag}
                </Badge>
            ))}
        </div>
    )
}
