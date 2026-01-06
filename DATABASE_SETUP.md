# Database Setup Guide

This guide explains how to set up the Supabase database schema for Qarsup AI.

## Prerequisites

- Supabase project created
- Access to Supabase SQL Editor

## Step 1: Run Database Migration

1. Open your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open the file: `supabase/migrations/001_initial_schema.sql`
4. Copy the entire SQL content
5. Paste it into the SQL Editor
6. Click **Run** to execute

## Step 2: Verify Tables Created

After running the migration, verify the tables exist:

1. Go to **Table Editor** in Supabase
2. You should see:
   - `profiles` table
   - `subscriptions` table

## Step 3: Verify Row Level Security (RLS)

1. In **Table Editor**, click on `profiles` table
2. Go to **Policies** tab
3. Verify these policies exist:
   - "Users can view own profile"
   - "Users can update own profile"
   - "Users can insert own profile"

4. Repeat for `subscriptions` table:
   - "Users can view own subscriptions"
   - "Users can insert own subscriptions"
   - "Users can update own subscriptions"

## Step 4: Test the Setup

1. Sign up a new user through `/signup`
2. Check `profiles` table - a new profile should be automatically created
3. Complete checkout flow
4. Check `subscriptions` table - a new subscription should be created

## Database Schema

### `profiles` Table
- `id` (UUID, Primary Key) - References `auth.users(id)`
- `full_name` (TEXT) - User's full name
- `email` (TEXT) - User's email
- `created_at` (TIMESTAMP) - Auto-generated
- `updated_at` (TIMESTAMP) - Auto-updated

### `subscriptions` Table
- `id` (UUID, Primary Key) - Auto-generated
- `user_id` (UUID) - References `profiles(id)`
- `plan_name` (TEXT) - Plan name (Starter, Pro, Custom)
- `price` (NUMERIC) - Subscription price
- `status` (TEXT) - Status (pending, active, cancelled)
- `created_at` (TIMESTAMP) - Auto-generated
- `updated_at` (TIMESTAMP) - Auto-updated

## Automatic Profile Creation

A database trigger automatically creates a profile when a user signs up. This is handled by the `handle_new_user()` function.

## Troubleshooting

**Issue**: Tables not created
- Solution: Check SQL Editor for errors. Ensure you have proper permissions.

**Issue**: RLS policies not working
- Solution: Verify policies are enabled and correctly configured.

**Issue**: Profile not created on signup
- Solution: Check if the trigger is active in Supabase dashboard → Database → Triggers

