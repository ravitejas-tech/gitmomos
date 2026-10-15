import { Text } from '~/components/ui/text'
import { CREATOR } from '~/data/landing/creator'

export function CreatorStory() {
    return (
        <div className='max-w-2xl md:pt-9'>
            <blockquote>
                <Text
                    variant='heading'
                    className='text-balance'>
                    {CREATOR.quote}
                </Text>
            </blockquote>
            <div className='mt-8 space-y-5'>
                {CREATOR.story.map((paragraph) => (
                    <Text
                        key={paragraph}
                        variant='article'
                        tone='secondary'>
                        {paragraph}
                    </Text>
                ))}
            </div>
            <Text
                variant='article'
                tone='muted'
                className='mt-8 border-t border-border pt-8'>
                {CREATOR.closing}
            </Text>
        </div>
    )
}
