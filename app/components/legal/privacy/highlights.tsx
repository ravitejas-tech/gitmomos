import { Card } from '~/components/ui/card'
import { IconChip } from '~/components/ui/icon-chip'
import { Text } from '~/components/ui/text'
import { PRIVACY_HIGHLIGHTS } from '~/data/legal/privacy'

export function PrivacyHighlights() {
    return (
        <div className='mb-4 grid gap-3 sm:grid-cols-3'>
            {PRIVACY_HIGHLIGHTS.map(({ icon, title, description }) => (
                <Card
                    key={title}
                    padding='md'>
                    <IconChip icon={icon} />
                    <Text
                        variant='title'
                        className='mt-4'>
                        {title}
                    </Text>
                    <Text
                        tone='secondary'
                        className='mt-1'>
                        {description}
                    </Text>
                </Card>
            ))}
        </div>
    )
}
