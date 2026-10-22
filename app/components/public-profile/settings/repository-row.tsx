import { Badge } from '~/components/ui/badge'
import { IconChip } from '~/components/ui/icon-chip'
import { ListRow } from '~/components/ui/list-row'
import { Switch } from '~/components/ui/switch'
import { Text } from '~/components/ui/text'
import { PROVIDER_ICONS } from '~/data/connections/constants'
import { useShowRepositoryOnProfile } from '~/hooks/public-profile/mutations'
import type { Repository } from '~/types/connections'

export function ProfileRepositoryRow({ repository }: { repository: Repository }) {
    const { mutate: show } = useShowRepositoryOnProfile()

    return (
        <ListRow>
            <IconChip icon={PROVIDER_ICONS[repository.connection.provider]} />
            <Text
                variant='strong'
                truncate
                className='min-w-0 flex-1'>
                {repository.full_name}
            </Text>
            {repository.is_private && (
                <Badge
                    variant='neutral'
                    className='max-sm:hidden'>
                    Private
                </Badge>
            )}
            <Switch
                checked={repository.on_profile}
                onChange={(onProfile) => show({ id: repository.id, onProfile })}
                label={`Show ${repository.full_name} on your profile`}
            />
        </ListRow>
    )
}
