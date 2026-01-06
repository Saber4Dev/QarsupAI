"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { createClient } from "@/utils/supabase/client";

const Navbar = dynamic(() => import('../../components/navbar'));

export default function Billing() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [subscription, setSubscription] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBilling = async () => {
            const supabase = createClient();
            
            // Check authentication - redirect if not logged in
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                router.push('/login');
                return;
            }

            setUser(user);

            // Load current subscription (most recent)
            const { data: subscriptionData } = await supabase
                .from('subscriptions')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            setSubscription(subscriptionData);
            setLoading(false);
        };

        loadBilling();
    }, [router]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto"></div>
                        <p className="mt-4 text-slate-400">Loading...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <section className="relative md:pt-44 pt-32 pb-8 bg-gradient-to-b from-amber-400/20 dark:from-amber-400/40 to-transparent">
                <div className="container relative">
                    <div className="grid grid-cols-1">
                        <div>
                            <h1 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold mb-0">Billing</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative md:py-24 py-16">
                <div className="container relative">
                    <div className="grid lg:grid-cols-12 gap-6">
                        {/* Sidebar Navigation */}
                        <div className="lg:col-span-3">
                            <div className="bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800 p-6 sticky top-24">
                                <h2 className="text-lg font-semibold mb-4">Navigation</h2>
                                <nav className="space-y-2">
                                    <Link
                                        href="/dashboard"
                                        className="block py-2 px-3 rounded-md text-slate-400 hover:text-amber-400 hover:bg-amber-400/5 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/dashboard/profile"
                                        className="block py-2 px-3 rounded-md text-slate-400 hover:text-amber-400 hover:bg-amber-400/5 transition-colors"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/dashboard/billing"
                                        className="block py-2 px-3 rounded-md bg-amber-400/10 text-amber-400 font-medium"
                                    >
                                        Billing
                                    </Link>
                                    <button
                                        onClick={async () => {
                                            const supabase = createClient();
                                            await supabase.auth.signOut();
                                            router.push('/');
                                        }}
                                        className="w-full text-left block py-2 px-3 rounded-md text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </nav>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-9">
                            <div className="bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800 p-6 md:p-8">
                                <h2 className="text-2xl font-semibold mb-6">Billing & Subscription</h2>

                                {subscription ? (
                                    <div className="space-y-6">
                                        {/* Current Subscription Card */}
                                        <div className="border border-gray-200 dark:border-gray-800 rounded-md p-6">
                                            <h3 className="text-lg font-semibold mb-4">Current Plan</h3>
                                            
                                            <div className="grid md:grid-cols-3 gap-6">
                                                <div>
                                                    <p className="text-slate-400 text-sm mb-2">Plan</p>
                                                    <p className="font-semibold text-xl">{subscription.plan_name}</p>
                                                </div>
                                                
                                                <div>
                                                    <p className="text-slate-400 text-sm mb-2">Price</p>
                                                    <p className="font-semibold text-xl">${parseFloat(subscription.price).toFixed(2)}</p>
                                                </div>
                                                
                                                <div>
                                                    <p className="text-slate-400 text-sm mb-2">Status</p>
                                                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                                                        subscription.status === 'active' 
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                                            : subscription.status === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                                                    }`}>
                                                        {subscription.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Payment Integration Message */}
                                        <div className="bg-amber-400/10 border border-amber-400/20 rounded-md p-6">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0">
                                                    <i className="mdi mdi-information text-2xl text-amber-400"></i>
                                                </div>
                                                <div className="ml-4">
                                                    <h4 className="text-lg font-semibold text-amber-400 mb-2">Payment Integration Coming Soon</h4>
                                                    <p className="text-slate-400">
                                                        We're working on integrating secure payment processing. You'll be able to manage payments, update billing information, and view transaction history soon.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-6 text-center">
                                        <p className="text-slate-400 mb-4">No active subscription found.</p>
                                        <Link
                                            href="/pricing"
                                            className="inline-block py-2 px-5 font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md"
                                        >
                                            Choose a Plan
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
