import * as React from 'react';
import { Outlet } from 'react-router';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/footer/Footer';

export default function MainLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
