import { NavPill } from '~/components/ui/nav-pill'
import { Text } from '~/components/ui/text'
import { LEGAL_NAV } from '~/data/legal/navigation'

export function LegalNav() {
    return (
        <aside className='shrink-0 lg:w-48'>
            <div className='lg:sticky lg:top-24'>
                <Text
                    variant='eyebrow'
                    className='mb-2 px-2'>
                    Legal
                </Text>
                <nav className='flex gap-1 lg:flex-col'>
                    {LEGAL_NAV.map(({ to, label }) => (
                        <NavPill
                            key={to}
                            to={to}>
                            <Text
                                as='span'
                                variant='inherit'
                                tone='inherit'>
                                {label}
                            </Text>
                        </NavPill>
                    ))}
                </nav>
            </div>
        </aside>
    )
}
