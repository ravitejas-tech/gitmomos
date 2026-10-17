import { Avatar } from '~/components/ui/avatar'
import { ListRow } from '~/components/ui/list-row'
import { Text } from '~/components/ui/text'
import { pluralize } from '~/lib/format'

export interface TeamMemberRowProps {
    name: string
    role: string
    headline: string
    commits: number
}

export function TeamMemberRow({ name, role, headline, commits }: TeamMemberRowProps) {
    return (
        <ListRow align='start'>
            <Avatar
                name={name}
                size='md'
            />
            <div className='min-w-0 flex-1 space-y-0.5'>
                <Text
                    as='div'
                    variant='strong'
                    truncate>
                    {name}{' '}
                    <Text
                        as='span'
                        variant='caption'>
                        · {role}
                    </Text>
                </Text>
                <Text
                    tone='secondary'
                    truncate>
                    {headline}
                </Text>
            </div>
            <Text
                as='span'
                variant='caption'
                numeric
                className='shrink-0'>
                {pluralize(commits, 'commit')}
            </Text>
        </ListRow>
    )
}
