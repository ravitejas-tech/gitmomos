import { Search } from 'lucide-react'
import { Input } from '~/components/ui/input'

export interface RepositoryFilterProps {
    value: string
    onChange: (value: string) => void
}

export function RepositoryFilter({ value, onChange }: RepositoryFilterProps) {
    return (
        <div className='relative max-w-sm'>
            <Search className='absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-muted' />
            <Input
                placeholder='Filter repositories'
                aria-label='Filter repositories'
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className='pl-9'
            />
        </div>
    )
}
