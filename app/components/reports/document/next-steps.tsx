import { ArrowRight } from 'lucide-react'
import { Text } from '~/components/ui/text'

export function ReportNextSteps({ steps }: { steps: string[] }) {
    return (
        <ul className='space-y-2.5'>
            {steps.map((step) => (
                <li
                    key={step}
                    className='flex items-start gap-3'>
                    <ArrowRight className='mt-1.5 size-4 shrink-0 text-accent-text' />
                    <Text variant='prose'>{step}</Text>
                </li>
            ))}
        </ul>
    )
}
