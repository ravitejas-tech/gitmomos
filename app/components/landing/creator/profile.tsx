import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { CREATOR, CREATOR_LINKS } from '~/data/landing/creator'

export function CreatorProfile() {
    return (
        <div className='max-w-sm'>
            <img
                src={CREATOR.photo}
                alt={CREATOR.name}
                loading='lazy'
                className='aspect-square w-full rounded-xl border border-border object-cover shadow-card'
            />
            <div className='mt-5'>
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
