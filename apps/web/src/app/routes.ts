import { type RouteConfig, index, route, layout } from '@react-router/dev/routes';

export default [
    layout('../layouts/MainLayout.tsx', [
        index('../routes/home.tsx'),
        layout('../layouts/DocsLayout.tsx', [
            route('docs', '../routes/docs/index.tsx'),
            route('docs/architecture', '../routes/docs/architecture.tsx'),
            route('docs/quick-start', '../routes/docs/quick-start.tsx'),
        ]),
        layout('../layouts/LegalLayout.tsx', [
            route('legal', '../routes/legal/index.tsx'),
            route('legal/privacy', '../routes/legal/privacy.tsx'),
            route('legal/license', '../routes/legal/license.tsx'),
        ]),
        route('features', '../routes/features.tsx'),
        route('releases', '../routes/releases-index.tsx'),
        route('releases/:version', '../routes/releases.tsx'),
    ]),
    layout('../layouts/DashboardLayout.tsx', [
        route('dashboard', '../routes/dashboard/home.tsx'),
        route('dashboard/reports', '../routes/dashboard/reports.tsx'),
        route('dashboard/projects', '../routes/dashboard/projects.tsx'),
        route('dashboard/projects/:projectId', '../routes/dashboard/project-details.tsx'),
        route('dashboard/analytics', '../routes/dashboard/analytics.tsx'),
        route('dashboard/settings', '../routes/dashboard/settings.tsx'),
    ]),
    route('login', '../routes/login.tsx'),
    route('signup', '../routes/signup.tsx'),
] satisfies RouteConfig;
