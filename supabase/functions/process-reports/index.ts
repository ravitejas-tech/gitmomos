// @ts-nocheck
import { createClient } from "supabase-js";
import { GoogleGenerativeAI } from "google-generative-ai";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );

    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '');
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest", // Using standard alias from listModels
      generationConfig: { responseMimeType: "application/json" }
    });

    const { data: pendingReports, error: queueError } = await supabaseClient
      .from('reports')
      .select('*, projects(name, remote_url)')
      .eq('status', 'pending')
      .limit(10); // Process in batches

    if (queueError) throw queueError;

    const results = [];

    for (const report of pendingReports) {
      try {
        const { data: commits, error: cError } = await supabaseClient
          .from('commits_metadata')
          .select('message, author_timestamp')
          .eq('project_id', report.project_id)
          .eq('user_id', report.user_id)
          .gte('author_timestamp', `${report.date}T00:00:00Z`)
          .lte('author_timestamp', `${report.date}T23:59:59Z`)
          .order('author_timestamp', { ascending: true });

        if (cError) throw cError;

        if (!commits || commits.length === 0) {
          await supabaseClient.from('reports').update({ 
            status: 'generated',
            content: JSON.stringify({ summary: "No commits found for this period.", key_work_areas: [], achievements: [], suggestions: [] })
          }).eq('id', report.id);
          continue;
        }

        const commitSummary = commits.map(c => `- ${c.message}`).join('\n');
        const prompt = `
          Analyze the following commit messages for the project "${report.projects.name}" on ${report.date}.
          Generate a professional developer productivity report in JSON format.
          
          Commits:
          ${commitSummary}

          The JSON object must follow this schema:
          {
            "summary": "Detailed overall summary of the day's progress",
            "key_work_areas": ["Top area 1", "Top area 2"],
            "achievements": ["Key achievement 1", "Key achievement 2"],
            "suggestions": ["Technical or workflow improvement suggestion"]
          }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        const reportContent = JSON.parse(text);

        await supabaseClient.from('reports').update({
          content: JSON.stringify(reportContent),
          status: 'generated'
        }).eq('id', report.id);

        results.push({ id: report.id, success: true });

      } catch (err) {
        console.error(`Error processing report ${report.id}:`, err);
        results.push({ 
          id: report.id, 
          success: false, 
          error: err.message
        });
      }
    }

    return new Response(JSON.stringify({ processed: results.length, details: results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
