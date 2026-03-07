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
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Initialize Supabase Client with User's JWT
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

    // 2. Parse and Validate Request Body
    const { projectId, commits }: IngestBody = await req.json();

    if (!projectId || !Array.isArray(commits)) {
      throw new Error('Invalid request body. Expected projectId and commits array.');
    }

    // 3. Get User Identity
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) throw new Error('Unauthorized');

    // 4. Verify Project Ownership
    const { data: project, error: pError } = await supabaseClient
      .from('projects')
      .select('id')
      .eq('id', projectId)
      .eq('user_id', user.id)
      .single();

    if (pError || !project) {
      throw new Error('Project not found or you do not have permission.');
    }

    // 5. Batch Insert Commit Metadata
    // We use upsert-like logic via constraint handling in DB or simple batch insert
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
      // Ignore unique constraint violations (already synced commits)
      if (insertError.code !== '23505') {
        throw insertError;
      }
    }

    // 6. Update Sync State for the Project
    if (commits.length > 0) {
      const latestHash = commits[0].hash;
      await supabaseClient
        .from('sync_state')
        .upsert({
          project_id: projectId,
          last_synced_hash: latestHash,
          last_sync_at: new Date().toISOString(),
        });
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
