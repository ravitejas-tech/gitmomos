import * as React from 'react';
import { NavLink } from 'react-router';
import { Container } from '../ui/Container';

const FOOTER_LINKS = {
    Product: [
        { name: 'Features', href: '#' },
        { name: 'CLI', href: '#' },
        { name: 'Dashboard', href: '#' },
    ],
    Resources: [
        { name: 'Documentation', href: '/docs' },
        { name: 'Installation', href: '/install' },
        { name: 'API (Coming Soon)', href: '#' },
    ],
    Community: [
        { name: 'GitHub', href: '#' },
        { name: 'Issues', href: '#' },
        { name: 'Discussions', href: '#' },
    ],
    Legal: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'License', href: '#' },
    ],
};

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-bg-base/80 backdrop-blur-md pt-16 pb-8 text-sm mt-auto relative overflow-hidden">
            <div className="absolute bottom-0 inset-x-0 h-px bg-primary-gradient opacity-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-blue-dark/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <Container>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
                    <div className="col-span-2 lg:col-span-1">
                        <NavLink
                            to="/"
                            className="text-xl font-bold font-heading text-primary-gradient flex items-center gap-2 mb-4"
                        >
                            <span className="text-2xl">⚡</span>
                            gitmomos
                        </NavLink>
                        <p className="text-text-secondary font-medium leading-relaxed">
                            Fresh daily work reports,
                            <br />
                            served hot from your git logs.
                        </p>
                    </div>

                    {Object.entries(FOOTER_LINKS).map(([title, links]) => (
                        <div key={title} className="flex flex-col gap-4">
                            <h4 className="font-semibold text-gray-200">{title}</h4>
                            <ul className="flex flex-col gap-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <NavLink
                                            to={link.href}
                                            className="text-text-secondary hover:text-primary-purple transition-colors duration-200"
                                        >
                                            {link.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col items-center justify-center gap-2 text-text-secondary/60">
                    <p>© {new Date().getFullYear()} gitmomos. Built for developers.</p>
                </div>
            </Container>
        </footer>
    );
}
