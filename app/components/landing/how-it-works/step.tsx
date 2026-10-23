import { Pill } from '~/components/ui/pill'
import { Text } from '~/components/ui/text'

export interface HowItWorksStepProps {
    step: string
    title: string
    description: string
}

export function HowItWorksStep({ step, title, description }: HowItWorksStepProps) {
    return (
        <li className='group flex gap-5 md:flex-col md:gap-0'>
            <div className='flex items-center self-start md:mb-7 md:self-stretch'>
                <Pill className='px-2.5'>
                    <Text
                        as='span'
                        variant='meta'
                        tone='primary'>
                        {step}
                    </Text>
                </Pill>
                <span className='mx-4 hidden h-px flex-1 bg-border-strong group-last:invisible md:block' />
            </div>
            <div className='md:pr-8'>
                <Text
                    as='h3'
                    variant='subheading'>
                    {title}
                </Text>
                <Text
                    tone='secondary'
                    className='mt-2 max-w-xs'>
                    {description}
                </Text>
            </div>
        </li>
    )
}
