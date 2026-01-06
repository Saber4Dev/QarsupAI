-- Qarsup AI - Set Admin Role
-- 
-- INSTRUCTIONS:
-- 1. Replace 'YOUR_EMAIL@example.com' with your actual email address
-- 2. Run this SQL in your Supabase SQL Editor
-- 3. This will set your user role to 'admin' (unlimited API requests)

-- ============================================
-- SET ADMIN ROLE FOR YOUR ACCOUNT
-- ============================================

-- Option 1: Set admin by email (recommended)
-- Replace 'YOUR_EMAIL@example.com' with your email
UPDATE public.user_roles
SET role = 'admin', updated_at = NOW()
WHERE user_id = (
    SELECT id FROM auth.users WHERE email = 'YOUR_EMAIL@example.com'
);

-- If the user_roles record doesn't exist, create it:
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'YOUR_EMAIL@example.com'
AND NOT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.users.id
)
ON CONFLICT (user_id) DO UPDATE
SET role = 'admin', updated_at = NOW();

-- ============================================
-- VERIFY ADMIN ROLE
-- ============================================
-- Run this to verify your role was set correctly:
-- SELECT ur.role, p.email, p.full_name
-- FROM public.user_roles ur
-- JOIN public.profiles p ON p.id = ur.user_id
-- WHERE p.email = 'YOUR_EMAIL@example.com';

