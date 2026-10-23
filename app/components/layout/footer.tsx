import { NavLink } from 'react-router'
import { FooterLinkGroup } from '~/components/layout/footer-link-group'
import { Container } from '~/components/ui/container'
import { LogoMark } from '~/components/ui/logo-mark'
import { Text } from '~/components/ui/text'
import { FOOTER_NOTE, FOOTER_TAGLINE } from '~/data/brand'
import { FOOTER_LINKS, HOME_PATH } from '~/data/navigation'

export function Footer() {
    return (
        <footer className='border-t border-border print:hidden'>
            <Container className='py-14 md:py-20'>
                <div className='grid grid-cols-2 gap-10 md:grid-cols-6'>
                    <div className='col-span-2 md:col-span-3'>
                        <NavLink
                            to={HOME_PATH}
                            aria-label='gitmomos home'
                            className='inline-flex'>
                            <LogoMark className='size-6' />
                        </NavLink>
                        <Text
                            variant='caption'
                            className='mt-4 max-w-56'>
                            {FOOTER_TAGLINE}
                        </Text>
                    </div>
                    {Object.entries(FOOTER_LINKS).map(([title, links]) => (
                        <FooterLinkGroup
                            key={title}
                            title={title}
                            links={links}
                        />
                    ))}
                </div>

                <div className='mt-16 flex flex-col gap-2 sm:flex-row sm:justify-between'>
                    <Text variant='caption'>© {new Date().getFullYear()} gitmomos</Text>
                    <Text variant='caption'>{FOOTER_NOTE}</Text>
                </div>
            </Container>
        </footer>
    )
}
