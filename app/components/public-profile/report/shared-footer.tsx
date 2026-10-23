import { LogoMark } from '~/components/ui/logo-mark'
import { Text } from '~/components/ui/text'
import { SITE_URL } from '~/data/seo/site'
import { hostOf } from '~/lib/url'

export function SharedFooter({ path }: { path: string }) {
    return (
        <footer className='flex items-center gap-2 border-t border-border pt-6'>
            <LogoMark className='size-4' />
            <Text variant='caption'>
                Shared on gitmomos · {hostOf(SITE_URL)}
                {path}
            </Text>
        </footer>
    )
}
