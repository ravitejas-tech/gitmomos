import { EMBEDDING_BATCH_SIZE } from '../constants/gemini.constants.ts'
import { MAX_INDEX_BATCHES } from '../constants/profile-chat.constants.ts'
import { embedTexts } from '../gemini/embed-texts.ts'
import { zip } from '../lib/zip.ts'
import { reportContentSchema } from '../schemas/report.schema.ts'
import { adminClient } from '../supabase/admin-client.ts'
import { unwrap } from '../supabase/unwrap.ts'
import { reportEmbeddingText } from './embedding-text.ts'

export async function indexReports(userId: string) {
    for (let batch = 0; batch < MAX_INDEX_BATCHES; batch++) {
        const reports = await unindexedReports(userId)
        if (!reports.length) return

        const embeddings = await embedTexts(reports.map(reportEmbeddingText))
        unwrap(
            await adminClient()
                .from('report_embeddings')
                .upsert(
                    zip(reports, embeddings).map(([{ id }, values]) => ({
                        user_id: userId,
                        report_id: id,
                        embedding: JSON.stringify(values),
                    })),
                    { onConflict: 'report_id' },
                ),
        )
        if (reports.length < EMBEDDING_BATCH_SIZE) return
    }
}

async function unindexedReports(userId: string) {
    const reports = unwrap(
        await adminClient()
            .from('reports')
            .select('id, date, content, report_embeddings(id)')
            .eq('user_id', userId)
            .eq('status', 'generated')
            .is('report_embeddings', null)
            .order('date', { ascending: false })
            .limit(EMBEDDING_BATCH_SIZE),
    )
    return reports.map(({ id, date, content }) => ({ id, date, content: reportContentSchema.parse(content) }))
}
