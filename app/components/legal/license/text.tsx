import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { MIT_LICENSE } from '~/data/legal/license'

export function LicenseText() {
    return (
        <Card
            tone='subtle'
            padding='md'
            className='space-y-4'>
            {MIT_LICENSE.paragraphs.map((paragraph) => (
                <Text
                    key={paragraph}
                    variant='code'
                    tone='secondary'>
                    {paragraph}
                </Text>
            ))}
            <Text
                variant='code'
                tone='muted'>
                {MIT_LICENSE.disclaimer}
            </Text>
        </Card>
    )
}
