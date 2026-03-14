-- Gitmomos: Fix Auth Trigger
-- This migration fixes the "Database error saving new user" by splitting
-- the auto-confirmation logic into a BEFORE INSERT trigger, which is
-- the correct way to modify a record before it is saved in Supabase.

-- 1. Restore handle_new_user to its safe, original state (profile creation only)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, username)
    VALUES (
        NEW.id,
        NEW.email,
        SPLIT_PART(NEW.email, '@', 1)
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create a new function for auto-confirmation (modifies ONLY the NEW record)
CREATE OR REPLACE FUNCTION public.handle_auto_confirm()
RETURNS TRIGGER AS $$
BEGIN
    NEW.email_confirmed_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Attach the BEFORE INSERT trigger for auto-confirmation
DROP TRIGGER IF EXISTS on_auth_user_created_confirm ON auth.users;
CREATE TRIGGER on_auth_user_created_confirm
    BEFORE INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_auto_confirm();

-- 4. Ensure existing trigger remains AFTER INSERT for profile creation
-- (This is already set up in migration 000001, but we ensure it's correct here)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Bulk confirm any missed users one last time
UPDATE auth.users 
SET email_confirmed_at = NOW(),
    updated_at = NOW()
WHERE email_confirmed_at IS NULL;
