import type { LiHTMLAttributes } from 'react'
import type { ExtraProps } from 'react-markdown'
import { BulletItem } from '~/components/ui/bullet-item'
import { TASK_LIST_ITEM_CLASS } from '~/data/releases/markdown'

export function MarkdownListItem({ className, children }: LiHTMLAttributes<HTMLLIElement> & ExtraProps) {
    return <BulletItem tone={className?.includes(TASK_LIST_ITEM_CLASS) ? 'none' : 'neutral'}>{children}</BulletItem>
}
