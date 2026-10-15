import { PreviewBlock } from '~/components/landing/preview/block'
import { PreviewBulletList } from '~/components/landing/preview/bullet-list'
import { PreviewCommitRow } from '~/components/landing/preview/commit-row'
import { PreviewRepositoryRow } from '~/components/landing/preview/repository-row'
import { Badge } from '~/components/ui/badge'
import { Text } from '~/components/ui/text'
import { SAMPLE_COMMITS, SAMPLE_REPORT, SAMPLE_REPORT_DATE, SAMPLE_REPORT_META } from '~/data/landing/sample-report'

export function PreviewReport() {
    const { headline, summary, key_work_areas, highlights, repositories } = SAMPLE_REPORT

    return (
        <article className='min-w-0 px-5 py-6 md:px-8 md:py-7'>
            <div className='flex items-center justify-between gap-4'>
                <Text
                    variant='label'
                    tone='accent'>
                    Daily work report
                </Text>
                <Badge variant='success'>Ready</Badge>
            </div>
            <Text
                as='h3'
                variant='document-title'
                className='mt-2'>
                {headline}
            </Text>
            <Text
                variant='caption'
                className='mt-2'>
                {SAMPLE_REPORT_DATE} · {SAMPLE_REPORT_META}
            </Text>
            <Text
                variant='prose'
                tone='secondary'
                className='mt-5'>
                {summary}
            </Text>
            <div className='mt-4 flex flex-wrap gap-1.5'>
                {key_work_areas.map((area) => (
                    <Badge key={area}>{area}</Badge>
                ))}
            </div>
            <div className='mt-7 grid gap-7 border-t border-border pt-6 lg:grid-cols-[1fr_13rem]'>
                <PreviewBlock title='Highlights'>
                    <PreviewBulletList items={highlights.map((highlight) => highlight.title)} />
                </PreviewBlock>
                <PreviewBlock title='By project'>
                    <ul className='divide-y divide-border'>
                        {repositories.map((repository) => (
                            <PreviewRepositoryRow
                                key={repository.name}
                                {...repository}
                            />
                        ))}
                    </ul>
                </PreviewBlock>
            </div>
            <div className='mt-7 border-t border-border pt-6'>
                <PreviewBlock title='Commits'>
                    <ul className='-my-2 divide-y divide-border'>
                        {SAMPLE_COMMITS.map((commit) => (
                            <PreviewCommitRow
                                key={commit.sha}
                                {...commit}
                            />
                        ))}
                    </ul>
                </PreviewBlock>
            </div>
        </article>
    )
}
