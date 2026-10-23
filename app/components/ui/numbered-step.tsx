import { DetailItem } from '~/components/ui/detail-item'
import { Text } from '~/components/ui/text'

export interface NumberedStepProps {
    step: number
    title: string
    description: string
}

export function NumberedStep({ step, ...props }: NumberedStepProps) {
    return (
        <DetailItem
            leading={
                <Text
                    as='span'
                    variant='caption-strong'
                    tone='accent'
                    className='flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-subtle'>
                    {step}
                </Text>
            }
            {...props}
        />
    )
}
