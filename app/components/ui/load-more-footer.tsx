import { Button } from '~/components/ui/button'
import { PanelFooter } from '~/components/ui/panel-footer'
import { Spinner } from '~/components/ui/spinner'

export interface LoadMoreFooterProps {
    label: string
    isLoading: boolean
    onLoadMore: () => void
    framed?: boolean
}

export function LoadMoreFooter({ label, isLoading, onLoadMore, framed = true }: LoadMoreFooterProps) {
    const button = (
        <Button
            variant='secondary'
            onClick={onLoadMore}
            disabled={isLoading}>
            {isLoading && <Spinner />}
            {label}
        </Button>
    )

    return framed ? (
        <PanelFooter className='flex justify-center'>{button}</PanelFooter>
    ) : (
        <div className='flex justify-center'>{button}</div>
    )
}
