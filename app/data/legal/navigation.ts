import { LICENSE_PATH, PRIVACY_PATH } from '~/data/navigation'

export const LEGAL_NAV = [
    { to: PRIVACY_PATH, label: 'Privacy Policy' },
    { to: LICENSE_PATH, label: 'License (MIT)' },
] as const
