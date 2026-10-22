import { forwardRef, type InputHTMLAttributes } from 'react'
import { Send } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Spinner } from '~/components/ui/spinner'

export interface ChatComposerProps extends InputHTMLAttributes<HTMLInputElement> {
    isPending?: boolean
}

export const ChatComposer = forwardRef<HTMLInputElement, ChatComposerProps>(({ isPending, ...props }, ref) => (
    <div className='flex gap-2'>
        <Input
            ref={ref}
            autoComplete='off'
            {...props}
        />
        <Button
            type='submit'
            disabled={isPending}>
            {isPending ? <Spinner /> : <Send />}
            Ask
        </Button>
    </div>
))
ChatComposer.displayName = 'ChatComposer'
