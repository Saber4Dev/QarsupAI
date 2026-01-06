-- Qarsup AI - User Roles and Usage Tracking
-- Run this SQL in your Supabase SQL Editor

-- ============================================
-- 1. USER ROLES TABLE
-- ============================================
-- Stores user roles (admin, user, etc.)

CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'user', -- 'admin' or 'user'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own role
CREATE POLICY "Users can view own role"
    ON public.user_roles
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy: Only admins can read all roles (we'll add this after creating admin)
-- For now, users can only see their own role

-- ============================================
-- 2. API USAGE TRACKING TABLE
-- ============================================
-- Tracks API requests per user for rate limiting

CREATE TABLE IF NOT EXISTS public.api_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    endpoint TEXT NOT NULL, -- e.g., 'ai/generate'
    request_count INTEGER DEFAULT 1,
    window_start TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.api_usage ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own usage
CREATE POLICY "Users can view own usage"
    ON public.api_usage
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy: Allow authenticated users to insert their own usage
-- This allows the API route to track usage
CREATE POLICY "Users can insert own usage"
    ON public.api_usage
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy: Allow authenticated users to update their own usage
CREATE POLICY "Users can update own usage"
    ON public.api_usage
    FOR UPDATE
    USING (auth.uid() = user_id);

-- ============================================
-- 3. INDEXES for performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);
CREATE INDEX IF NOT EXISTS idx_api_usage_user_id ON public.api_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_endpoint ON public.api_usage(endpoint);
CREATE INDEX IF NOT EXISTS idx_api_usage_window ON public.api_usage(user_id, endpoint, window_start);

-- ============================================
-- 4. FUNCTION: Auto-create user role on profile creation
-- ============================================
-- Automatically creates a 'user' role when a profile is created

CREATE OR REPLACE FUNCTION public.handle_new_profile_role()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user')
    ON CONFLICT (user_id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Create user role when profile is created
DROP TRIGGER IF EXISTS on_profile_created_role ON public.profiles;
CREATE TRIGGER on_profile_created_role
    AFTER INSERT ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_profile_role();

-- ============================================
-- 5. FUNCTION: Clean old usage records
-- ============================================
-- Cleans up usage records older than 24 hours

CREATE OR REPLACE FUNCTION public.cleanup_old_usage()
RETURNS void AS $$
BEGIN
    DELETE FROM public.api_usage
    WHERE window_start < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

