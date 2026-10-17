import { Navigate, useParams } from 'react-router'
import { ComingSoonPage } from '~/components/coming-soon/page'
import { COMING_SOON } from '~/data/coming-soon/features'
import { COMING_SOON_PREVIEWS } from '~/data/coming-soon/previews'
import { DASHBOARD_PATH } from '~/data/navigation'

export default function ComingSoon() {
    const { feature: slug } = useParams()
    const feature = COMING_SOON.find((item) => item.slug === slug)
    if (!feature) {
        return (
            <Navigate
                to={DASHBOARD_PATH}
                replace
            />
        )
    }

    const Preview = COMING_SOON_PREVIEWS[feature.slug]
    return (
        <ComingSoonPage feature={feature}>
            <Preview />
        </ComingSoonPage>
    )
}
