import { Link } from 'react-router'
import { LogIn } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { COMMENTS_TAB } from '~/data/community/constants'
import { loginPath } from '~/lib/auth/login-path'
import { profileTabPath } from '~/lib/public-profile/handle'

export function CommentSignInPrompt({ handle }: { handle: string }) {
    return (
        <div className='flex flex-wrap items-center justify-between gap-3 px-5 pb-5'>
            <Text tone='secondary'>Sign in to leave a comment.</Text>
            <Button
                asChild
                variant='secondary'>
                <Link to={loginPath(profileTabPath(handle, COMMENTS_TAB))}>
                    <LogIn />
                    Sign in
                </Link>
            </Button>
        </div>
    )
}
