import { Outlet } from 'react-router'
import { BrandBar } from '~/components/layout/brand-bar'

export default function ProfileLayout() {
    return (
        <div className='min-h-screen'>
            <BrandBar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}
