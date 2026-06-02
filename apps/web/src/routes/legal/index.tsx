import { redirect } from 'react-router';

export function loader() {
    return redirect('/legal/privacy');
}

export default function LegalIndex() {
    return null;
}
