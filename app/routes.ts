import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
    layout('routes/layout.tsx', [
        index('routes/index.tsx'),
        layout('routes/legal/layout.tsx', [
            route('legal', 'routes/legal/index.tsx'),
            route('legal/privacy', 'routes/legal/privacy.tsx'),
            route('legal/license', 'routes/legal/license.tsx'),
        ]),
        route('roadmap', 'routes/roadmap.tsx'),
        route('releases', 'routes/releases/index.tsx'),
        route('releases/:version', 'routes/releases/$version.tsx'),
    ]),
    layout('routes/$handle/layout.tsx', [
        route(':handle', 'routes/$handle/index.tsx'),
        route(':handle/reports', 'routes/$handle/reports.tsx'),
        route(':handle/reports/:date', 'routes/$handle/reports.$date.tsx'),
    ]),
    layout('routes/dashboard/layout.tsx', [
        route('dashboard', 'routes/dashboard/index.tsx'),
        route('dashboard/reports', 'routes/dashboard/reports.tsx'),
        route('dashboard/connections', 'routes/dashboard/connections.tsx'),
        route('dashboard/connections/github', 'routes/dashboard/connections.github.tsx'),
        route('dashboard/settings', 'routes/dashboard/settings.tsx'),
        route('dashboard/profile', 'routes/dashboard/profile.tsx'),
        route('dashboard/:feature', 'routes/dashboard/$feature.tsx'),
    ]),
    route('login', 'routes/login.tsx'),
    route('signup', 'routes/signup.tsx'),
    route('robots.txt', 'routes/robots[.]txt.ts'),
    route('sitemap.xml', 'routes/sitemap[.]xml.ts'),
] satisfies RouteConfig
