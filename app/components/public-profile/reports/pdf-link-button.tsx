import { Link } from 'react-router'
import { Download } from 'lucide-react'
import { Button, type ButtonProps } from '~/components/ui/button'

export interface PdfLinkButtonProps extends Pick<ButtonProps, 'variant' | 'size' | 'className'> {
    to: string
    label: string
    compact?: boolean
}

export function PdfLinkButton({
    to,
    label,
    compact,
    variant = 'secondary',
    size = 'sm',
    className,
}: PdfLinkButtonProps) {
    return (
        <Button
            asChild
            variant={variant}
            size={size}
            className={className}>
            <Link
                to={to}
                aria-label={compact ? label : undefined}>
                <Download />
                <span className={compact ? 'max-sm:hidden' : undefined}>{compact ? 'PDF' : label}</span>
            </Link>
        </Button>
    )
}
