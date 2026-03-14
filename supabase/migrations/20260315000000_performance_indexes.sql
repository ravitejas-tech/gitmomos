-- Create composite index on commits_metadata table for timeseries retrieval
-- This significantly speeds up grouping operations when the AI edge function pulls recent data ranges for a project.

CREATE INDEX IF NOT EXISTS idx_commits_metadata_project_timestamp 
ON public.commits_metadata (project_id, author_timestamp DESC);
