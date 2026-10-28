import { LinkTile } from '~/components/community/sidebar/link-tile'
import { Text } from '~/components/ui/text'
import { formatNumber } from '~/lib/format'

export interface StatLinkProps {
    to: string
    value: number | undefined
    label: string
}

export function StatLink({ to, value, label }: StatLinkProps) {
    return (
        <LinkTile
            to={to}
            tone='stat'>
            <Text
                variant='heading'
                numeric>
                {value === undefined ? '–' : formatNumber(value)}
            </Text>
            <Text variant='micro'>{label}</Text>
        </LinkTile>
    )
}
