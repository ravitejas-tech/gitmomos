import { Check } from 'lucide-react'
import { DetailItem } from '~/components/ui/detail-item'
import { RoundBadge, type RoundBadgeTone } from '~/components/ui/round-badge'
import type { TextTone } from '~/components/ui/text'

const stepStates = {
    current: { badge: 'solid', title: 'primary' },
    done: { badge: 'success', title: 'secondary' },
    upcoming: { badge: 'muted', title: 'muted' },
} satisfies Record<string, { badge: RoundBadgeTone; title: TextTone }>

export type NumberedStepState = keyof typeof stepStates

export interface NumberedStepProps {
    step: number
    title: string
    description?: string
    state?: NumberedStepState
}

export function NumberedStep({ step, state, ...props }: NumberedStepProps) {
    const styles = state && stepStates[state]

    return (
        <DetailItem
            leading={<RoundBadge tone={styles?.badge}>{state === 'done' ? <Check /> : step}</RoundBadge>}
            tone={styles?.title}
            aria-current={state === 'current' ? 'step' : undefined}
            {...props}
        />
    )
}
