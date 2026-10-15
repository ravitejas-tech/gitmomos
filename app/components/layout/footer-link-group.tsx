import { Text } from '~/components/ui/text'
import { TextLink } from '~/components/ui/text-link'

export interface FooterLinkGroupProps {
    title: string
    links: readonly { name: string; href: string }[]
}

export function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
    return (
        <div>
            <Text
                as='h4'
                variant='caption-strong'
                tone='primary'>
                {title}
            </Text>
            <ul className='mt-4 flex flex-col gap-3'>
                {links.map(({ name, href }) => (
                    <li key={name}>
                        <TextLink href={href}>{name}</TextLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}
