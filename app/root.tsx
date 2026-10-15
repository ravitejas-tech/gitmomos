import type { ReactNode } from 'react'
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { ErrorPage } from '~/components/layout/error-page'
import { FONT_STYLESHEET } from '~/data/ui/fonts'
import { THEME_INIT_SCRIPT } from '~/data/ui/theme'
import { TOASTER_OPTIONS } from '~/data/ui/toaster'
import { queryClient } from '~/services/query-client'
import type { Route } from './+types/root'
import './global.css'

export const links: Route.LinksFunction = () => [
    { rel: 'icon', type: 'image/png', href: '/icon.png' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    { rel: 'stylesheet', href: FONT_STYLESHEET },
]

export function Layout({ children }: { children: ReactNode }) {
    return (
        <html
            lang='en'
            suppressHydrationWarning>
            <head>
                <meta charSet='utf-8' />
                <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <Meta />
                <Links />
            </head>
            <body>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
                <Toaster {...TOASTER_OPTIONS} />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default function App() {
    return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    if (isRouteErrorResponse(error)) {
        return error.status === 404 ? (
            <ErrorPage
                title='404'
                details='The requested page could not be found.'
            />
        ) : (
            <ErrorPage
                title='Error'
                details={error.statusText || 'An unexpected error occurred.'}
            />
        )
    }

    const isDevError = import.meta.env.DEV && error instanceof Error
    return (
        <ErrorPage
            title='Oops!'
            details={isDevError ? error.message : 'An unexpected error occurred.'}
            stack={isDevError ? error.stack : undefined}
        />
    )
}
