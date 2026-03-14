-- Gitmomos: Add missing INSERT RLS policy on profiles table
-- The initial migration only defined SELECT and UPDATE policies.
-- Without an INSERT policy, users cannot create their own profile row,
-- causing the projects FK constraint to fail silently.

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);
