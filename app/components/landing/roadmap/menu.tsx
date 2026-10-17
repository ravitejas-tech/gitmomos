import { LandingIconPill } from '~/components/landing/icon-pill'
import { COMING_SOON } from '~/data/coming-soon/features'

export function RoadmapMenu() {
    return (
        <ul className='mt-12 flex flex-wrap justify-center gap-2'>
            {COMING_SOON.map(({ slug, label, icon }) => (
                <li key={slug}>
                    <a
                        href={`#${slug}`}
                        className='rounded-full transition-opacity hover:opacity-80'>
                        <LandingIconPill
                            icon={icon}
                            label={label}
                        />
                    </a>
                </li>
            ))}
        </ul>
    )
}
