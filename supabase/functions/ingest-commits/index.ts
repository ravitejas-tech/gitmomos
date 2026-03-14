// @ts-nocheck
// Gitmomos: Commit Ingestion Edge Function
// Standardized for Deno environment

import { createClient } from "supabase-js";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CommitItem {
  hash: string;
  message: string;
  author_email: string;
  author_timestamp: string;
}

interface IngestBody {
  projectId: string;
  commits: CommitItem[];
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Missing Authorization header');

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_ANON_KEY') || '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    const { projectId, commits }: IngestBody = await req.json();

    if (!projectId || !Array.isArray(commits)) {
      throw new Error('Invalid request body. Expected projectId and commits array.');
    }

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) throw new Error('Unauthorized');

    const { data: project, error: pError } = await supabaseClient
      .from('projects')
      .select('id')
      .eq('id', projectId)
      .eq('user_id', user.id)
      .single();

    if (pError || !project) {
      throw new Error('Project not found or you do not have permission.');
    }

    const { error: insertError } = await supabaseClient
      .from('commits_metadata')
      .insert(
        commits.map((c) => ({
          project_id: projectId,
          user_id: user.id,
          hash: c.hash,
          message: c.message,
          author_email: c.author_email,
          author_timestamp: c.author_timestamp,
        }))
      );

    if (insertError) {
      if (insertError.code !== '23505') {
        throw insertError;
      }
    }

    if (commits.length > 0) {
      const latestHash = commits[0].hash;
      await supabaseClient
        .from('sync_state')
        .upsert({
          project_id: projectId,
          last_synced_hash: latestHash,
          last_sync_at: new Date().toISOString(),
        });

      const today = new Date().toISOString().split('T')[0];
      const { data: existingReport } = await supabaseClient
         .from('reports')
         .select('id')
         .eq('project_id', projectId)
         .eq('date', today)
         .maybeSingle();
      
      if (!existingReport) {
        await supabaseClient.from('reports').insert({
          user_id: user.id,
          project_id: projectId,
          date: today,
          content: 'Pending AI context generation based on commits...',
          status: 'pending'
        });
      }
    }

    return new Response(
      JSON.stringify({ success: true, count: commits.length }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: unknown) {
    const err = error as Error;
    return new Response(
      JSON.stringify({ error: err.message || 'An unknown error occurred' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
