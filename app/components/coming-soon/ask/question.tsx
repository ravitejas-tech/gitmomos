import { Text } from '~/components/ui/text'

export function AskQuestion({ text }: { text: string }) {
    return (
        <div className='flex justify-end'>
            <div className='max-w-md rounded-2xl rounded-br-md bg-accent px-4 py-2.5 text-accent-foreground'>
                <Text tone='inherit'>{text}</Text>
            </div>
        </div>
    )
}
