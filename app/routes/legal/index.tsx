import { redirect } from 'react-router'
import { PRIVACY_PATH } from '~/data/navigation'

export function loader() {
    return redirect(PRIVACY_PATH)
}

export default function LegalIndex() {
    return null
}
