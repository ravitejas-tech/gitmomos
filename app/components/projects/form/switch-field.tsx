import { Switch } from '~/components/ui/switch'
import { Text } from '~/components/ui/text'

export interface SwitchFieldProps {
    label: string
    description: string
    checked: boolean
    onChange: (checked: boolean) => void
}

export function SwitchField({ label, description, checked, onChange }: SwitchFieldProps) {
    return (
        <div className='flex items-start justify-between gap-4'>
            <div className='space-y-0.5'>
                <Text variant='strong'>{label}</Text>
                <Text variant='caption'>{description}</Text>
            </div>
            <Switch
                checked={checked}
                onChange={onChange}
                label={label}
                className='mt-0.5'
            />
        </div>
    )
}
