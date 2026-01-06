/**
 * API Route: Create Subscription
 * 
 * Creates a subscription record in Supabase for the authenticated user
 * Called after user signs up during checkout
 */

import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();
        
        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get request body
        const body = await request.json();
        const { planName, price } = body;

        // Validate input
        if (!planName || !price) {
            return NextResponse.json(
                { error: 'Plan name and price are required' },
                { status: 400 }
            );
        }

        // Ensure user profile exists
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', user.id)
            .single();

        if (profileError || !profile) {
            // Create profile if it doesn't exist
            const { error: insertError } = await supabase
                .from('profiles')
                .insert({
                    id: user.id,
                    email: user.email || '',
                    full_name: user.user_metadata?.full_name || '',
                });

            if (insertError) {
                return NextResponse.json(
                    { error: 'Failed to create profile' },
                    { status: 500 }
                );
            }
        }

        // Create subscription
        const { data: subscription, error: subscriptionError } = await supabase
            .from('subscriptions')
            .insert({
                user_id: user.id,
                plan_name: planName,
                price: parseFloat(price),
                status: 'pending',
            })
            .select()
            .single();

        if (subscriptionError) {
            return NextResponse.json(
                { error: 'Failed to create subscription', details: subscriptionError.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { 
                success: true,
                subscription: {
                    id: subscription.id,
                    plan_name: subscription.plan_name,
                    price: subscription.price,
                    status: subscription.status,
                }
            },
            { status: 201 }
        );

    } catch (error: any) {
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}

