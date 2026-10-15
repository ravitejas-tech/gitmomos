import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { CREATOR, CREATOR_LINKS } from '~/data/landing/creator'

export function CreatorProfile() {
    return (
        <div className='flex items-center gap-4'>
            <img
                src={CREATOR.photo}
                alt={CREATOR.name}
                className='size-16 shrink-0 rounded-lg border border-border object-cover'
            />
            <div className='min-w-0'>
                <Text
                    as='h3'
                    variant='title'>
                    {CREATOR.name}
                </Text>
                <Text
                    variant='caption'
                    className='mt-0.5'>
                    {CREATOR.role}
                </Text>
                <div className='mt-2 -ml-1.5 flex items-center gap-0.5'>
                    {CREATOR_LINKS.map(({ label, href, icon: Icon }) => (
                        <Button
                            key={label}
                            asChild
                            variant='ghost'
                            size='icon'>
                            <a
                                href={href}
                                target='_blank'
                                rel='noreferrer'
                                aria-label={label}
                                title={label}>
                                <Icon />
                            </a>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}
