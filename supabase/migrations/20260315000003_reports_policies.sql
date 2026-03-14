-- Gitmomos: Add missing RLS policies for reports table
-- Users need to be able to insert their own pending reports via CLI sync
-- and view/update them as needed.

CREATE POLICY "Users can insert their own reports" ON public.reports
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reports" ON public.reports
    FOR UPDATE USING (auth.uid() = user_id);
