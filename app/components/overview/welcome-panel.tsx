import { ConnectActions } from '~/components/connections/accounts/connect-actions'
import { NumberedStep } from '~/components/ui/numbered-step'
import { Card } from '~/components/ui/card'
import { LogoMark } from '~/components/ui/logo-mark'
import { Text } from '~/components/ui/text'
import { ONBOARDING_STEPS } from '~/data/onboarding/steps'

export function WelcomePanel() {
    return (
        <Card
            padding='lg'
            className='grid gap-8 lg:grid-cols-2 lg:p-10'>
            <div className='space-y-4'>
                <LogoMark className='size-10' />
                <Text
                    as='h2'
                    variant='display'>
                    Turn your commits into reports anyone can read
                </Text>
                <Text
                    variant='lead'
                    tone='secondary'>
                    Connect a code host to start seeing your activity and daily reports here.
                </Text>
                <div className='pt-2'>
                    <ConnectActions />
                </div>
            </div>
            <ol className='space-y-5 self-center rounded-xl border border-border bg-surface-muted/50 p-6'>
                {ONBOARDING_STEPS.map(({ id, title, description }, index) => (
                    <NumberedStep
                        key={id}
                        step={index + 1}
                        title={title}
                        description={description}
                    />
                ))}
            </ol>
        </Card>
    )
}
