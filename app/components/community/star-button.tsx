import { Link } from 'react-router'
import { Star } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { useSetStar } from '~/hooks/community/mutations'
import { cn } from '~/lib/utils'

export interface StarButtonProps {
    handle: string
    starred: boolean
    loginTo?: string | undefined
}

export function StarButton({ handle, starred, loginTo }: StarButtonProps) {
    const { mutate: setStar, isPending } = useSetStar()
    const content = (
        <>
            <Star className={cn(starred && 'fill-current text-warning')} />
            {starred ? 'Starred' : 'Star'}
        </>
    )

    if (loginTo) {
        return (
            <Button
                asChild
                variant='secondary'>
                <Link to={loginTo}>{content}</Link>
            </Button>
        )
    }

    return (
        <Button
            variant='secondary'
            disabled={isPending}
            aria-pressed={starred}
            onClick={() => setStar({ handle, starred: !starred })}>
            {content}
        </Button>
    )
}
