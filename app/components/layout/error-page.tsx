import { Container } from '~/components/ui/container'
import { Text } from '~/components/ui/text'

export interface ErrorPageProps {
    title: string
    details: string
    stack?: string | undefined
}

export function ErrorPage({ title, details, stack }: ErrorPageProps) {
    return (
        <Container className='space-y-4 py-16'>
            <Text
                as='h1'
                variant='page-title'>
                {title}
            </Text>
            <Text tone='secondary'>{details}</Text>
            {stack && (
                <pre className='w-full overflow-x-auto p-4'>
                    <Text
                        as='code'
                        variant='code'
                        tone='muted'>
                        {stack}
                    </Text>
                </pre>
            )}
        </Container>
    )
}
