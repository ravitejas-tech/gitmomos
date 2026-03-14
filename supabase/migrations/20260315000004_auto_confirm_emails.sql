-- Gitmomos: Auto-confirm emails for new users
-- This migration updates the handle_new_user function to ensure
-- that every new signup is automatically confirmed in auth.users,
-- bypassing the "Email not confirmed" hurdle during development.

-- 1. Update the existing trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Auto-confirm the email in auth.users
    -- We do this as a separate update because we are in an AFTER INSERT trigger
    UPDATE auth.users 
    SET email_confirmed_at = NOW(),
        updated_at = NOW()
    WHERE id = NEW.id 
    AND email_confirmed_at IS NULL;

    -- Create public profile
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

-- 2. Bulk confirm any existing unconfirmed users to fix current state
UPDATE auth.users 
SET email_confirmed_at = NOW(),
    updated_at = NOW()
WHERE email_confirmed_at IS NULL;
