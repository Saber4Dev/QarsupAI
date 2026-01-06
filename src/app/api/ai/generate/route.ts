/**
 * API Route: Generate AI Content
 * 
 * Server-side only - Google Gemini API integration
 * Role-based rate limiting and usage tracking
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@/utils/supabase/server';

// Rate limits per role (requests per hour)
const RATE_LIMITS = {
    admin: Infinity, // No limits for admin
    user: 50, // 50 requests per hour for regular users
};

// Time window for rate limiting (1 hour)
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

/**
 * Check user's role
 */
async function getUserRole(supabase: any, userId: string): Promise<string> {
    const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

    if (error || !data) {
        // Default to 'user' if no role found
        return 'user';
    }

    return data.role || 'user';
}

/**
 * Check and update usage tracking
 */
async function checkUsageLimit(
    supabase: any,
    userId: string,
    role: string
): Promise<{ allowed: boolean; remaining: number; message?: string }> {
    // Admin has no limits
    if (role === 'admin') {
        return { allowed: true, remaining: Infinity };
    }

    const limit = RATE_LIMITS[role as keyof typeof RATE_LIMITS] || RATE_LIMITS.user;
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

    // Get current usage for this window
    const { data: usageData, error: usageError } = await supabase
        .from('api_usage')
        .select('request_count, window_start')
        .eq('user_id', userId)
        .eq('endpoint', 'ai/generate')
        .gte('window_start', windowStart)
        .order('window_start', { ascending: false })
        .limit(1)
        .single();

    let currentCount = 0;
    let currentWindowStart = new Date().toISOString();

    if (usageData && !usageError) {
        // Check if within same window (within 1 hour)
        const windowAge = Date.now() - new Date(usageData.window_start).getTime();
        if (windowAge < RATE_LIMIT_WINDOW_MS) {
            currentCount = usageData.request_count || 0;
            currentWindowStart = usageData.window_start;
        }
    }

    // Check if limit exceeded
    if (currentCount >= limit) {
        const resetTime = new Date(new Date(currentWindowStart).getTime() + RATE_LIMIT_WINDOW_MS);
        const minutesUntilReset = Math.ceil((resetTime.getTime() - Date.now()) / (60 * 1000));
        
        return {
            allowed: false,
            remaining: 0,
            message: `Rate limit exceeded. You have used ${currentCount}/${limit} requests this hour. Please try again in ${minutesUntilReset} minute(s).`,
        };
    }

    // Update or insert usage record
    const newCount = currentCount + 1;
    
    if (usageData && !usageError) {
        // Update existing record
        await supabase
            .from('api_usage')
            .update({
                request_count: newCount,
                updated_at: new Date().toISOString(),
            })
            .eq('user_id', userId)
            .eq('endpoint', 'ai/generate')
            .eq('window_start', currentWindowStart);
    } else {
        // Insert new record
        await supabase
            .from('api_usage')
            .insert({
                user_id: userId,
                endpoint: 'ai/generate',
                request_count: newCount,
                window_start: currentWindowStart,
            });
    }

    return {
        allowed: true,
        remaining: limit - newCount,
    };
}

export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get user role
        const role = await getUserRole(supabase, user.id);

        // Check usage limits (unless admin)
        const usageCheck = await checkUsageLimit(supabase, user.id, role);
        if (!usageCheck.allowed) {
            return NextResponse.json(
                { 
                    error: usageCheck.message || 'Rate limit exceeded',
                    remaining: usageCheck.remaining,
                },
                { status: 429 }
            );
        }

        // Get API key from environment (server-side only)
        const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
        
        if (!apiKey) {
            return NextResponse.json(
                { error: 'AI service not configured' },
                { status: 500 }
            );
        }

        // Get request body
        const body = await request.json();
        const { prompt, tone, wordCount, seoOptimized, keywordIntent } = body;

        // Validate input
        if (!prompt || !prompt.trim()) {
            return NextResponse.json(
                { error: 'Prompt is required' },
                { status: 400 }
            );
        }

        // Build the enhanced prompt with user preferences
        let enhancedPrompt = prompt;

        // Add tone instruction
        if (tone) {
            enhancedPrompt += `\n\nWrite in a ${tone.toLowerCase()} tone.`;
        }

        // Add word count instruction
        if (wordCount) {
            enhancedPrompt += `\n\nTarget approximately ${wordCount} words.`;
        }

        // Add SEO optimization instruction
        if (seoOptimized) {
            enhancedPrompt += `\n\nOptimize the content for SEO with natural keyword integration and proper heading structure.`;
        }

        // Add keyword intent instruction
        if (keywordIntent) {
            const intentInstructions = {
                'Informational': 'Focus on providing valuable information and answering questions.',
                'Commercial': 'Focus on comparing products or services, helping users make purchase decisions.',
                'Transactional': 'Focus on encouraging immediate action or purchase.',
                'Navigational': 'Focus on helping users find specific information or resources.',
            };
            enhancedPrompt += `\n\n${intentInstructions[keywordIntent] || ''}`;
        }

        // Initialize Gemini
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        // Generate content
        const result = await model.generateContent(enhancedPrompt);
        const response = await result.response;
        const generatedText = response.text();

        if (!generatedText) {
            return NextResponse.json(
                { error: 'Failed to generate content' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { 
                success: true,
                content: generatedText,
                remaining: usageCheck.remaining,
            },
            { 
                status: 200,
                headers: {
                    'X-RateLimit-Remaining': usageCheck.remaining.toString(),
                }
            }
        );

    } catch (error: any) {
        console.error('AI generation error:', error);
        return NextResponse.json(
            { 
                error: 'Failed to generate content',
                details: error.message 
            },
            { status: 500 }
        );
    }
}
