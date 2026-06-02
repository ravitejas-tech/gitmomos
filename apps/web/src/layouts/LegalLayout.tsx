import { Outlet, NavLink, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { Container } from '../components/ui/Container';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

export default function LegalLayout() {
    const location = useLocation();
    const [toc, setToc] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    // Extract headings for Table of Contents
    useEffect(() => {
        const headings = Array.from(document.querySelectorAll('main.prose h2, main.prose h3'));
        const newToc = headings.map((heading) => {
            // Ensure heading has an ID
            if (!heading.id) {
                heading.id = heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
            }
            return {
                id: heading.id,
                text: heading.textContent || '',
                level: heading.tagName.toLowerCase() === 'h2' ? 2 : 3,
            };
        });
        setToc(newToc);
        
        // Reset active ID on navigation
        if (newToc.length > 0) {
            setActiveId(newToc[0].id);
        } else {
            setActiveId('');
        }
    }, [location.pathname]);

    // Scroll Spy functionality
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter((entry) => entry.isIntersecting);
                if (visibleEntries.length > 0) {
                    // Get the topmost visible intersecting entry
                    setActiveId(visibleEntries[0].target.id);
                }
            },
            { rootMargin: '-10% 0px -80% 0px' }
        );

        const headings = document.querySelectorAll('main.prose h2, main.prose h3');
        headings.forEach((heading) => observer.observe(heading));

        return () => observer.disconnect();
    }, [toc]);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            // Offset for a sticky header if any
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const navLinks = [
        { path: '/legal/privacy', label: 'Privacy Policy' },
        { path: '/legal/license', label: 'License (MIT)' },
    ];

    return (
        <Container className="py-12 md:py-16">
            <div className="flex flex-col lg:flex-row gap-8 relative">
                {/* Left Sidebar */}
                <aside className="lg:w-64 shrink-0">
                    <div className="sticky top-24">
                        <h4 className="text-lg font-bold font-heading mb-4 text-white">Legal</h4>
                        <nav className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            isActive
                                                ? 'bg-primary-purple/10 text-primary-purple'
                                                : 'text-text-secondary hover:text-white hover:bg-white/5'
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0 prose prose-invert max-w-3xl">
                    <Outlet />
                </main>

                {/* Right Sidebar (Table of Contents) */}
                <aside className="hidden xl:block w-64 shrink-0">
                    <div className="sticky top-24">
                        <h4 className="text-sm font-semibold font-heading mb-4 text-text-secondary uppercase tracking-wider">
                            On this page
                        </h4>
                        {toc.length > 0 ? (
                            <nav className="flex flex-col space-y-2 text-sm">
                                {toc.map((item) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        onClick={(e) => handleScroll(e, item.id)}
                                        className={`transition-colors ${
                                            item.level === 3 ? 'ml-4' : ''
                                        } ${
                                            activeId === item.id
                                                ? 'text-primary-purple font-medium'
                                                : 'text-text-secondary hover:text-white'
                                        }`}
                                    >
                                        {item.text}
                                    </a>
                                ))}
                            </nav>
                        ) : (
                            <p className="text-xs text-text-secondary/50">No headings found</p>
                        )}
                    </div>
                </aside>
            </div>
        </Container>
    );
}
