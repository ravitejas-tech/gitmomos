import { RotateCcw, X } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { BotAvatar } from '~/components/ui/bot-avatar'
import { Button } from '~/components/ui/button'
import { CardHeader } from '~/components/ui/card-header'
import { MOMI_NAME, momiRole } from '~/data/public-profile/momi'

export interface ProfileChatHeaderProps {
    name: string
    onReset?: (() => void) | undefined
    onClose: () => void
}

export function ProfileChatHeader({ name, onReset, onClose }: ProfileChatHeaderProps) {
    return (
        <CardHeader
            leading={
                <span className='relative'>
                    <BotAvatar
                        size='lg'
                        animated
                    />
                    <span className='absolute right-0 bottom-0 size-3 rounded-full border-2 border-surface bg-success' />
                </span>
            }
            title={
                <span className='inline-flex items-center gap-2'>
                    {MOMI_NAME}
                    <Badge variant='accent'>AI</Badge>
                </span>
            }
            description={momiRole(name)}
            actions={
                <>
                    {onReset && (
                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={onReset}
                            aria-label='Start a new chat'
                            title='New chat'>
                            <RotateCcw />
                        </Button>
                    )}
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={onClose}
                        aria-label='Close'
                        title='Close'>
                        <X />
                    </Button>
                </>
            }
        />
    )
}
