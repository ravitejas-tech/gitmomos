import { useCallback, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { SidebarContent } from '~/components/layout/sidebar-content'
import { Button } from '~/components/ui/button'
import { Drawer } from '~/components/ui/drawer'

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false)
    const close = useCallback(() => setIsOpen(false), [])

    return (
        <>
            <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsOpen(true)}
                aria-label='Open menu'
                aria-expanded={isOpen}
                className='-ml-1.5 md:hidden'>
                <Menu />
            </Button>
            {isOpen && (
                <Drawer
                    label='Menu'
                    side='left'
                    onClose={close}>
                    <SidebarContent
                        onNavigate={close}
                        action={
                            <Button
                                variant='ghost'
                                size='icon'
                                onClick={close}
                                aria-label='Close menu'
                                className='-mr-1.5'>
                                <X />
                            </Button>
                        }
                    />
                </Drawer>
            )}
        </>
    )
}
