import { Button } from '~/components/ui/button'
import type { LandingAction } from '~/types/landing'

export function LandingActionLink({ label, href, icon: Icon }: LandingAction) {
    return (
        <Button
            asChild
            variant='ghost'
            size='pill'>
            <a
                href={href}
                target='_blank'
                rel='noreferrer'>
                <Icon />
                {label}
            </a>
        </Button>
    )
}
