import type { ReactNode } from 'react'
import { Card } from '~/components/ui/card'

export function DocumentCard({ children }: { children: ReactNode }) {
    return (
        <Card className='px-5 py-8 sm:px-10 sm:py-12 xl:px-14 print:border-0 print:p-0 print:shadow-none'>
            <div className='mx-auto max-w-3xl'>{children}</div>
        </Card>
    )
}
