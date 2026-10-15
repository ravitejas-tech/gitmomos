import { VignetteRow } from '~/components/landing/features/vignettes/row'
import { VignetteStage } from '~/components/landing/features/vignettes/stage'
import { Card } from '~/components/ui/card'
import { IconChip } from '~/components/ui/icon-chip'
import { Switch } from '~/components/ui/switch'
import { Text } from '~/components/ui/text'
import { CONNECTIONS } from '~/data/landing/vignettes'

export function ConnectionsVignette() {
    return (
        <VignetteStage className='justify-center pt-0'>
            <Card className='shadow-overlay'>
                <ul className='divide-y divide-border'>
                    {CONNECTIONS.map(({ name, detail, icon }) => (
                        <VignetteRow key={name}>
                            <IconChip icon={icon} />
                            <div className='min-w-0 flex-1'>
                                <Text variant='strong'>{name}</Text>
                                <Text
                                    variant='caption'
                                    truncate>
                                    {detail}
                                </Text>
                            </div>
                            <Switch
                                checked
                                label={name}
                                onChange={() => undefined}
                            />
                        </VignetteRow>
                    ))}
                </ul>
            </Card>
        </VignetteStage>
    )
}
