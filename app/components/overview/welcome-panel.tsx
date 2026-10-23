import { ConnectActions } from '~/components/connections/connect-actions'
import { NumberedStep } from '~/components/ui/numbered-step'
import { Card } from '~/components/ui/card'
import { LogoMark } from '~/components/ui/logo-mark'
import { Text } from '~/components/ui/text'
import { WELCOME_STEPS } from '~/data/activity/welcome'

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
                {WELCOME_STEPS.map((step, index) => (
                    <NumberedStep
                        key={step.title}
                        step={index + 1}
                        {...step}
                    />
                ))}
            </ol>
        </Card>
    )
}
