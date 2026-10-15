import { useEffect, useMemo, useState } from 'react'
import { useMatches } from 'react-router'
import { TOC_ROOT_MARGIN } from '~/data/legal/constants'
import type { LegalHandle } from '~/types/legal'

export function useLegalToc() {
    const items = (useMatches().at(-1)?.handle as LegalHandle | undefined)?.toc
    const ids = useMemo(() => items?.map(({ id }) => id) ?? [], [items])
    const [spiedId, setSpiedId] = useState<string>()

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.find((entry) => entry.isIntersecting)
                if (visible) setSpiedId(visible.target.id)
            },
            { rootMargin: TOC_ROOT_MARGIN },
        )
        ids.forEach((id) => {
            const heading = document.getElementById(id)
            if (heading) observer.observe(heading)
        })
        return () => observer.disconnect()
    }, [ids])

    return { items: items ?? [], activeId: spiedId && ids.includes(spiedId) ? spiedId : ids[0] }
}
