import type { ToasterProps } from 'react-hot-toast'

export const TOASTER_OPTIONS: ToasterProps = {
    position: 'bottom-right',
    toastOptions: {
        style: {
            background: 'var(--surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--overlay-shadow)',
            fontSize: '14px',
            borderRadius: '8px',
        },
    },
}
