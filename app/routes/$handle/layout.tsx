import { Outlet, useMatch } from 'react-router'
import { BrandBar } from '~/components/layout/brand-bar'

export default function ProfileLayout() {
    const isProfilePage = useMatch('/:handle') !== null

    return (
        <div className='min-h-screen'>
            <BrandBar size={isProfilePage ? 'md' : 'document'} />
            <main>
                <Outlet />
            </main>
        </div>
    )
}
