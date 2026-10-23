import { forwardRef, useState, type InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '~/components/ui/input'

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    revealLabel?: string
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ revealLabel = 'password', ...props }, ref) => {
        const [visible, setVisible] = useState(false)
        const Icon = visible ? EyeOff : Eye

        return (
            <div className='relative'>
                <Input
                    ref={ref}
                    type={visible ? 'text' : 'password'}
                    className='pr-10'
                    {...props}
                />
                <button
                    type='button'
                    onClick={() => setVisible(!visible)}
                    aria-label={`${visible ? 'Hide' : 'Show'} ${revealLabel}`}
                    className='absolute top-1/2 right-3 -translate-y-1/2 text-text-muted transition-colors hover:text-text-primary'>
                    <Icon className='size-4' />
                </button>
            </div>
        )
    },
)
PasswordInput.displayName = 'PasswordInput'
