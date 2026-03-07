import { type RouteConfig, index, route, layout } from '@react-router/dev/routes';

export default [
    layout('../layouts/MainLayout.tsx', [
        index('../routes/home.tsx'),
        route('docs', '../routes/docs.tsx'),
        route('install', '../routes/install.tsx'),
    ]),
    route('login', '../routes/login.tsx'),
    route('signup', '../routes/signup.tsx'),
] satisfies RouteConfig;
