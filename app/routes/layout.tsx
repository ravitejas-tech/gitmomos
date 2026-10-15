import { Outlet } from 'react-router'
import { Footer } from '~/components/layout/footer'
import { Navbar } from '~/components/layout/navbar'

export default function PublicLayout() {
    return (
        <div className='flex min-h-screen flex-col'>
            <Navbar />
            <main className='flex-1'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
