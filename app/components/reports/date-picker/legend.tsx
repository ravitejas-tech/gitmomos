import { Text } from '~/components/ui/text'

export function DatePickerLegend() {
    return (
        <div className='flex items-center gap-4'>
            <Text
                as='span'
                variant='micro'
                className='flex items-center gap-1.5'>
                <span className='size-1.5 rounded-full bg-accent' />
                Report
            </Text>
            <Text
                as='span'
                variant='micro'
                className='flex items-center gap-1.5'>
                <span className='size-1.5 rounded-full bg-danger' />
                Failed
            </Text>
        </div>
    )
}
