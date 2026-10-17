import { Copy, Github } from 'lucide-react'
import { AddressBar } from '~/components/coming-soon/address-bar'
import { StatsCard } from '~/components/coming-soon/stats-card/card'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { CardContent } from '~/components/ui/card-content'
import { CardHeader } from '~/components/ui/card-header'
import { Text } from '~/components/ui/text'
import { STATS_CARD_EMBED, STATS_CARD_README, STATS_CARD_THEMES } from '~/data/coming-soon/stats-card'

export function StatsCardPreview() {
    return (
        <div className='space-y-4'>
            <Card>
                <AddressBar
                    icon={Github}
                    label={STATS_CARD_README.path}
                />
                <div className='space-y-4 p-5'>
                    <div className='space-y-1'>
                        <Text
                            as='h3'
                            variant='heading'>
                            {STATS_CARD_README.greeting}
                        </Text>
                        <Text tone='secondary'>{STATS_CARD_README.intro}</Text>
                    </div>
                    <StatsCard />
                </div>
            </Card>
            <Card>
                <CardHeader
                    title='Embed'
                    description='Paste this into your profile README'
                    actions={STATS_CARD_THEMES.map((theme, index) => (
                        <Badge
                            key={theme}
                            variant={index === 0 ? 'accent' : 'outline'}>
                            {theme}
                        </Badge>
                    ))}
                />
                <CardContent className='flex items-center gap-2'>
                    <div className='min-w-0 flex-1 rounded-lg border border-border bg-surface-muted px-3 py-2'>
                        <Text
                            variant='code'
                            truncate>
                            {STATS_CARD_EMBED}
                        </Text>
                    </div>
                    <Button
                        variant='secondary'
                        size='sm'>
                        <Copy />
                        Copy
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
