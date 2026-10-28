import { Search, X } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

export interface SearchFieldProps {
    label: string
    placeholder: string
    value: string
    onChange: (value: string) => void
}

export function SearchField({ label, placeholder, value, onChange }: SearchFieldProps) {
    return (
        <div
            role='search'
            className='relative'>
            <Search className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-muted' />
            <Input
                enterKeyHint='search'
                aria-label={label}
                placeholder={placeholder}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className='px-9'
            />
            {value && (
                <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => onChange('')}
                    aria-label='Clear search'
                    className='absolute top-1/2 right-0.5 -translate-y-1/2'>
                    <X />
                </Button>
            )}
        </div>
    )
}
