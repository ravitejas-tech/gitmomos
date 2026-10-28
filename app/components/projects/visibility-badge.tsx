import { Globe, Lock } from 'lucide-react'
import { Badge } from '~/components/ui/badge'

export function ProjectVisibilityBadge({ isPublic }: { isPublic: boolean }) {
    const Icon = isPublic ? Globe : Lock
    return (
        <Badge
            variant={isPublic ? 'accent' : 'neutral'}
            className='shrink-0'>
            <Icon className='size-3' />
            {isPublic ? 'Public' : 'Private'}
        </Badge>
    )
}
