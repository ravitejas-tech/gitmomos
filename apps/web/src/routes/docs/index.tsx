import { redirect } from 'react-router';

export function loader() {
    return redirect('/docs/architecture');
}

export default function DocsIndex() {
    return null;
}
