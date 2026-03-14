import { type RouteConfig, index, route, layout } from '@react-router/dev/routes';

export default [
    layout('../layouts/MainLayout.tsx', [
        index('../routes/home.tsx'),
        route('docs', '../routes/docs.tsx'),
        route('install', '../routes/install.tsx'),
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
