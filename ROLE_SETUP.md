# Role-Based Access Control Setup Guide

This guide explains how to set up user roles and control API request limits in Qarsup AI.

## Overview

The system now supports role-based access control with the following features:
- **Admin Role**: Unlimited API requests (no rate limiting)
- **User Role**: Limited to 50 requests per hour (default)
- Usage tracking per user
- Automatic role assignment on signup

## Database Setup

### Step 1: Run the Migration

1. Open your Supabase Dashboard
2. Go to SQL Editor
3. Run the migration file: `supabase/migrations/002_user_roles_and_usage.sql`

This will create:
- `user_roles` table (stores user roles)
- `api_usage` table (tracks API requests)
- Automatic triggers to assign 'user' role on signup

### Step 2: Set Yourself as Admin

1. Open `supabase/migrations/003_set_admin_role.sql`
2. Replace `'YOUR_EMAIL@example.com'` with your actual email address
3. Run the SQL in Supabase SQL Editor

**Alternative: Quick Admin Setup**

```sql
-- Replace 'your-email@example.com' with your email
UPDATE public.user_roles
SET role = 'admin', updated_at = NOW()
WHERE user_id = (
    SELECT id FROM auth.users WHERE email = 'your-email@example.com'
);

-- If role doesn't exist, create it:
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (user_id) DO UPDATE
SET role = 'admin', updated_at = NOW();
```

### Step 3: Verify Your Role

Run this query to verify:

```sql
SELECT ur.role, p.email, p.full_name
FROM public.user_roles ur
JOIN public.profiles p ON p.id = ur.user_id
WHERE p.email = 'your-email@example.com';
```

You should see `role: admin`.

## Rate Limits

### Current Limits

| Role | Limit | Window |
|------|-------|--------|
| Admin | ∞ (Unlimited) | N/A |
| User | 50 requests | Per hour |

### Changing User Limits

To change the default user limit, edit `src/app/api/ai/generate/route.ts`:

```typescript
const RATE_LIMITS = {
    admin: Infinity,
    user: 50, // Change this number
};
```

## Usage Tracking

The system automatically tracks:
- User ID
- Endpoint (e.g., 'ai/generate')
- Request count per hour window
- Window start time

Usage data is stored in the `api_usage` table and automatically cleaned up after 24 hours.

## Dashboard Features

The enhanced dashboard now shows:
- **API Request Stats**: Current usage vs limit
- **Role Badge**: Visual indicator of admin/user role
- **Real-time Updates**: Usage stats update after each request
- **Limit Warnings**: Visual feedback when approaching limits

## API Response

The API now returns:
- `remaining`: Number of requests remaining in the current window
- `X-RateLimit-Remaining` header: Same information in response headers

## Security Notes

1. **Admin Role**: Only set trusted users as admin
2. **Rate Limiting**: Prevents API abuse and cost overruns
3. **Usage Tracking**: All requests are logged for monitoring
4. **Automatic Cleanup**: Old usage records are automatically removed

## Troubleshooting

### User Not Getting Role on Signup

If a user doesn't get a role automatically:
1. Check the trigger exists: `on_profile_created_role`
2. Manually assign role:

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('user-uuid-here', 'user')
ON CONFLICT (user_id) DO NOTHING;
```

### Admin Still Getting Rate Limited

1. Verify role in database:
```sql
SELECT role FROM public.user_roles WHERE user_id = 'your-user-id';
```

2. Check API route is reading role correctly (check server logs)

### Usage Stats Not Updating

1. Check `api_usage` table has records:
```sql
SELECT * FROM public.api_usage WHERE user_id = 'your-user-id';
```

2. Verify RLS policies allow inserts (should use service role for API)

## Next Steps

1. ✅ Run migration `002_user_roles_and_usage.sql`
2. ✅ Set yourself as admin using `003_set_admin_role.sql`
3. ✅ Test API generation from dashboard
4. ✅ Verify admin has unlimited requests
5. ✅ Verify regular users have limits

## Support

If you encounter issues:
1. Check Supabase logs for errors
2. Verify all migrations ran successfully
3. Check RLS policies are correct
4. Ensure service role key is used for API operations

