import { VignetteRow } from '~/components/landing/features/vignettes/row'
import { VignetteStage } from '~/components/landing/features/vignettes/stage'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { METADATA_ROWS } from '~/data/landing/vignettes'

export function MetadataVignette() {
    return (
        <VignetteStage className='justify-center pt-0'>
            <Card className='shadow-overlay'>
                <ul className='divide-y divide-border'>
                    {METADATA_ROWS.map(({ label, allowed }) => (
                        <VignetteRow key={label}>
                            <Text
                                as='span'
                                tone={allowed ? 'secondary' : 'primary'}>
                                {label}
                            </Text>
                            <Badge variant={allowed ? 'success' : 'danger'}>{allowed ? 'Read' : 'Never'}</Badge>
                        </VignetteRow>
                    ))}
                </ul>
            </Card>
        </VignetteStage>
    )
}
