# Google Gemini AI Setup Guide

This guide explains how to set up Google Gemini AI for content generation in Qarsup AI.

## Prerequisites

- Google AI Studio account (https://makersuite.google.com/app/apikey)
- Google Gemini API key

## Step 1: Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

## Step 2: Add Environment Variable

Add the following to your `.env.local` file in the project root:

```env
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
```

**⚠️ Important Security Notes:**
- **DO NOT** prefix with `NEXT_PUBLIC_` - this key must remain server-side only
- **DO NOT** commit `.env.local` to version control
- The API key is only used in server-side API routes
- Never expose this key in client-side code

## Step 3: Verify Setup

1. Restart your Next.js dev server after adding the environment variable
2. Navigate to `/dashboard`
3. Enter a prompt in the AI Content Generator
4. Click "Generate Content"
5. If configured correctly, content should be generated

## API Route Security

The Gemini API is called through a server-side API route:
- **Route**: `/api/ai/generate`
- **Method**: POST
- **Authentication**: Required (user must be logged in)
- **Rate Limiting**: 10 requests per minute per IP

## Rate Limiting

AI generation endpoints are rate-limited to:
- **10 requests per minute** per IP address
- Prevents API abuse and cost overruns
- Returns 429 status with `Retry-After` header when limit exceeded

## Troubleshooting

**Issue**: "AI service not configured" error
- **Solution**: Check that `GOOGLE_GEMINI_API_KEY` is set in `.env.local` and restart the server

**Issue**: "Unauthorized" error
- **Solution**: Ensure you're logged in to the application

**Issue**: Rate limit exceeded
- **Solution**: Wait for the rate limit window to reset (1 minute)

**Issue**: Content generation fails
- **Solution**: Check API key validity in Google AI Studio dashboard

## API Usage

The AI generation uses Google's `gemini-pro` model. Current implementation:
- Accepts user prompt
- Applies tone, word count, SEO, and keyword intent preferences
- Returns generated content as plain text
- Content is editable in the dashboard

## Cost Considerations

- Google Gemini API has usage-based pricing
- Monitor usage in Google AI Studio dashboard
- Consider implementing usage tracking per user/subscription tier
- Rate limiting helps control costs

## Future Enhancements

- Usage tracking per user
- Token counting
- Content history/saving
- Multiple model support
- Custom prompts/templates

