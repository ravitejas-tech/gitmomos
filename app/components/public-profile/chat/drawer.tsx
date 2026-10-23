import { ProfileChatForm } from '~/components/public-profile/chat/form'
import { ProfileChatHeader } from '~/components/public-profile/chat/header'
import { ProfileChatThread } from '~/components/public-profile/chat/thread'
import { Drawer } from '~/components/ui/drawer'
import { PanelFooter } from '~/components/ui/panel-footer'
import { Text } from '~/components/ui/text'
import { MOMI_NAME, MOMI_NOTE } from '~/data/public-profile/momi'
import { useProfileChat } from '~/hooks/public-profile/use-profile-chat'
import { firstName } from '~/lib/public-profile/name'
import type { PublicProfile } from '~/types/public-profile'

export interface MomiDrawerProps {
    profile: PublicProfile
    open: boolean
    onClose: () => void
}

export function MomiDrawer({ profile, open, onClose }: MomiDrawerProps) {
    const { messages, isPending, send, reset } = useProfileChat(profile.handle)
    const name = firstName(profile.name)
    if (!open) return null

    return (
        <Drawer
            label={`Chat with ${MOMI_NAME}`}
            onClose={onClose}>
            <ProfileChatHeader
                name={name}
                onReset={messages.length && !isPending ? reset : undefined}
                onClose={onClose}
            />
            <ProfileChatThread
                handle={profile.handle}
                name={name}
                area={profile.areas[0]?.name}
                messages={messages}
                isPending={isPending}
                onAsk={send}
            />
            <PanelFooter className='space-y-2'>
                <ProfileChatForm
                    isPending={isPending}
                    onAsk={send}
                />
                <Text variant='micro'>{MOMI_NOTE}</Text>
            </PanelFooter>
        </Drawer>
    )
}
