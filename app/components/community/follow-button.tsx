import { Link } from 'react-router'
import { UserCheck, UserPlus } from 'lucide-react'
import { Button, type ButtonProps } from '~/components/ui/button'
import { useSetFollow } from '~/hooks/community/mutations'

export interface FollowButtonProps {
    handle: string
    following: boolean
    loginTo?: string | undefined
    size?: ButtonProps['size']
}

export function FollowButton({ handle, following, loginTo, size }: FollowButtonProps) {
    const { mutate: setFollow, isPending } = useSetFollow()
    const content = (
        <>
            {following ? <UserCheck /> : <UserPlus />}
            {following ? 'Following' : 'Follow'}
        </>
    )

    if (loginTo) {
        return (
            <Button
                asChild
                variant='secondary'
                size={size}>
                <Link to={loginTo}>{content}</Link>
            </Button>
        )
    }

    return (
        <Button
            variant='secondary'
            size={size}
            disabled={isPending}
            aria-pressed={following}
            onClick={() => setFollow({ handle, following: !following })}>
            {content}
        </Button>
    )
}
