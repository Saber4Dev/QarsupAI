"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { createClient } from "@/utils/supabase/client";
import ContentEditor from "../components/ContentEditor";

const Navbar = dynamic(() => import('../components/navbar'));

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [subscription, setSubscription] = useState<any>(null);
    const [userRole, setUserRole] = useState<string>('user');
    const [usageStats, setUsageStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // AI Content Generator state
    const [prompt, setPrompt] = useState("");
    const [tone, setTone] = useState("Professional");
    const [wordCount, setWordCount] = useState(500);
    const [seoOptimized, setSeoOptimized] = useState(false);
    const [keywordIntent, setKeywordIntent] = useState("Informational");
    const [generatedContent, setGeneratedContent] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [remainingRequests, setRemainingRequests] = useState<number | null>(null);

    useEffect(() => {
        const loadUserData = async () => {
            const supabase = createClient();
            
            // Get current user
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                router.push('/login');
                return;
            }

            setUser(user);

            // Load profile
            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            setProfile(profileData);

            // Load subscription
            const { data: subscriptionData } = await supabase
                .from('subscriptions')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            setSubscription(subscriptionData);

            // Load user role
            const { data: roleData } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', user.id)
                .single();

            if (roleData) {
                setUserRole(roleData.role || 'user');
            }

            // Load usage stats
            const windowStart = new Date(Date.now() - 60 * 60 * 1000).toISOString();
            const { data: usageData } = await supabase
                .from('api_usage')
                .select('request_count, window_start')
                .eq('user_id', user.id)
                .eq('endpoint', 'ai/generate')
                .gte('window_start', windowStart)
                .order('window_start', { ascending: false })
                .limit(1)
                .single();

            if (usageData) {
                setUsageStats(usageData);
                // Calculate remaining (50 for users, Infinity for admin)
                const limit = roleData?.role === 'admin' ? Infinity : 50;
                setRemainingRequests(Math.max(0, limit - (usageData.request_count || 0)));
            } else {
                const limit = roleData?.role === 'admin' ? Infinity : 50;
                setRemainingRequests(limit);
            }

            setLoading(false);
        };

        loadUserData();
    }, [router]);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    /**
     * Handle AI content generation
     */
    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!prompt.trim()) {
            setError('Please enter a prompt');
            return;
        }

        setIsGenerating(true);
        setError(null);

        try {
            const response = await fetch('/api/ai/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt,
                    tone,
                    wordCount,
                    seoOptimized,
                    keywordIntent,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to generate content');
            }

            setGeneratedContent(result.content || '');
            
            // Update remaining requests
            if (result.remaining !== undefined) {
                setRemainingRequests(result.remaining);
            }

            // Refresh usage stats
            const supabase = createClient();
            const windowStart = new Date(Date.now() - 60 * 60 * 1000).toISOString();
            const { data: usageData } = await supabase
                .from('api_usage')
                .select('request_count, window_start')
                .eq('user_id', user.id)
                .eq('endpoint', 'ai/generate')
                .gte('window_start', windowStart)
                .order('window_start', { ascending: false })
                .limit(1)
                .single();

            if (usageData) {
                setUsageStats(usageData);
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred while generating content');
        } finally {
            setIsGenerating(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto"></div>
                        <p className="mt-4 text-slate-400">Loading dashboard...</p>
                    </div>
                </div>
            </>
        );
    }

    const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email || 'User';
    const isAdmin = userRole === 'admin';
    const requestLimit = isAdmin ? Infinity : 50;
    const usedRequests = usageStats?.request_count || 0;

    return (
        <>
            <Navbar />
            <section className="relative md:pt-44 pt-32 pb-8 bg-gradient-to-b from-amber-400/20 dark:from-amber-400/40 to-transparent">
                <div className="container relative">
                    <div className="grid grid-cols-1">
                        <div>
                            <h1 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold mb-0">Dashboard</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative md:py-24 py-16 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <div className="container relative">
                    <div className="grid lg:grid-cols-12 gap-6">
                        {/* Sidebar Navigation */}
                        <div className="lg:col-span-3">
                            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg dark:shadow-gray-800 p-6 sticky top-24 border border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Navigation</h2>
                                <nav className="space-y-2">
                                    <Link
                                        href="/dashboard"
                                        className="block py-2.5 px-3 rounded-md bg-amber-400/10 text-amber-400 font-medium border border-amber-400/20"
                                    >
                                        <i className="mdi mdi-view-dashboard me-2"></i>Dashboard
                                    </Link>
                                    <Link
                                        href="/dashboard/profile"
                                        className="block py-2.5 px-3 rounded-md text-slate-400 hover:text-amber-400 hover:bg-amber-400/5 transition-colors"
                                    >
                                        <i className="mdi mdi-account me-2"></i>Profile
                                    </Link>
                                    <Link
                                        href="/dashboard/billing"
                                        className="block py-2.5 px-3 rounded-md text-slate-400 hover:text-amber-400 hover:bg-amber-400/5 transition-colors"
                                    >
                                        <i className="mdi mdi-credit-card me-2"></i>Billing
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left block py-2.5 px-3 rounded-md text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-colors"
                                    >
                                        <i className="mdi mdi-logout me-2"></i>Logout
                                    </button>
                                </nav>

                                {/* Role Badge */}
                                {isAdmin && (
                                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center gap-2">
                                            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-xs font-semibold">
                                                <i className="mdi mdi-shield-crown me-1"></i>Admin
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-9 space-y-6">
                            {/* Welcome Section */}
                            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg dark:shadow-gray-800 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
                                            Welcome back, {displayName}!
                                        </h2>
                                        <p className="text-slate-400">
                                            Generate high-quality content with AI assistance
                                        </p>
                                    </div>
                                </div>

                                {/* Stats Cards */}
                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                    {/* Usage Stats */}
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-1">API Requests</p>
                                                <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">
                                                    {isAdmin ? '∞' : `${usedRequests}/${requestLimit}`}
                                                </p>
                                            </div>
                                            <i className="mdi mdi-api text-3xl text-blue-400"></i>
                                        </div>
                                        {!isAdmin && remainingRequests !== null && (
                                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                                                {remainingRequests} remaining this hour
                                            </p>
                                        )}
                                    </div>

                                    {/* Subscription Status */}
                                    {subscription ? (
                                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-amber-600 dark:text-amber-400 text-sm font-medium mb-1">Plan</p>
                                                    <p className="text-lg font-bold text-amber-900 dark:text-amber-300">{subscription.plan_name}</p>
                                                </div>
                                                <i className="mdi mdi-package-variant text-3xl text-amber-400"></i>
                                            </div>
                                            <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${
                                                subscription.status === 'active' 
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                            }`}>
                                                {subscription.status}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">Plan</p>
                                                    <p className="text-lg font-bold text-slate-900 dark:text-slate-300">No Plan</p>
                                                </div>
                                                <i className="mdi mdi-package-variant text-3xl text-slate-400"></i>
                                            </div>
                                            <Link
                                                href="/pricing"
                                                className="inline-block mt-2 text-xs text-amber-600 dark:text-amber-400 hover:underline"
                                            >
                                                Choose a Plan →
                                            </Link>
                                        </div>
                                    )}

                                    {/* Role Card */}
                                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-purple-600 dark:text-purple-400 text-sm font-medium mb-1">Role</p>
                                                <p className="text-lg font-bold text-purple-900 dark:text-purple-300 capitalize">{userRole}</p>
                                            </div>
                                            <i className={`mdi ${isAdmin ? 'mdi-shield-crown' : 'mdi-account'} text-3xl text-purple-400`}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* AI Content Generator */}
                            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg dark:shadow-gray-800 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
                                            <i className="mdi mdi-robot text-amber-400 me-2"></i>AI Content Generator
                                        </h2>
                                        <p className="text-slate-400 text-sm">Create high-quality content powered by Google Gemini AI</p>
                                    </div>
                                </div>

                                <form onSubmit={handleGenerate}>
                                    <div className="space-y-6">
                                        {/* Prompt Input */}
                                        <div>
                                            <label htmlFor="prompt" className="block font-semibold mb-2 text-slate-900 dark:text-white">
                                                Content Prompt <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                id="prompt"
                                                value={prompt}
                                                onChange={(e) => setPrompt(e.target.value)}
                                                required
                                                rows={5}
                                                className="w-full py-3 px-4 bg-slate-50 dark:bg-slate-800 dark:text-slate-200 rounded-lg outline-none border border-gray-200 dark:border-gray-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 resize-none transition-all"
                                                placeholder="Describe what you want to create... (e.g., 'Write a comprehensive blog post about the benefits of artificial intelligence in modern business')"
                                            />
                                            <p className="text-xs text-slate-400 mt-1">Be specific about your content requirements for best results</p>
                                        </div>

                                        {/* Options Grid */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Tone Selector */}
                                            <div>
                                                <label htmlFor="tone" className="block font-semibold mb-2 text-slate-900 dark:text-white">
                                                    <i className="mdi mdi-format-text me-1"></i>Tone
                                                </label>
                                                <select
                                                    id="tone"
                                                    value={tone}
                                                    onChange={(e) => setTone(e.target.value)}
                                                    className="w-full py-2.5 px-4 h-11 bg-slate-50 dark:bg-slate-800 dark:text-slate-200 rounded-lg outline-none border border-gray-200 dark:border-gray-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                                                >
                                                    <option value="Professional">Professional</option>
                                                    <option value="Friendly">Friendly</option>
                                                    <option value="Formal">Formal</option>
                                                    <option value="Casual">Casual</option>
                                                </select>
                                            </div>

                                            {/* Word Count */}
                                            <div>
                                                <label htmlFor="wordCount" className="block font-semibold mb-2 text-slate-900 dark:text-white">
                                                    <i className="mdi mdi-format-size me-1"></i>Word Count
                                                </label>
                                                <input
                                                    type="number"
                                                    id="wordCount"
                                                    value={wordCount}
                                                    onChange={(e) => setWordCount(parseInt(e.target.value) || 500)}
                                                    min="100"
                                                    max="5000"
                                                    step="100"
                                                    className="w-full py-2.5 px-4 h-11 bg-slate-50 dark:bg-slate-800 dark:text-slate-200 rounded-lg outline-none border border-gray-200 dark:border-gray-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* SEO and Keyword Intent */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* SEO Optimized */}
                                            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                                <label className="flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={seoOptimized}
                                                        onChange={(e) => setSeoOptimized(e.target.checked)}
                                                        className="form-checkbox rounded border-gray-300 dark:border-gray-600 text-amber-400 focus:border-amber-400 focus:ring focus:ring-offset-0 focus:ring-amber-200 focus:ring-opacity-50 cursor-pointer me-3 w-5 h-5"
                                                    />
                                                    <div>
                                                        <span className="font-semibold text-slate-900 dark:text-white">SEO Optimized</span>
                                                        <p className="text-slate-400 text-xs mt-0.5">Optimize content for search engines</p>
                                                    </div>
                                                </label>
                                            </div>

                                            {/* Keyword Intent */}
                                            <div>
                                                <label htmlFor="keywordIntent" className="block font-semibold mb-2 text-slate-900 dark:text-white">
                                                    <i className="mdi mdi-key-variant me-1"></i>Keyword Intent
                                                </label>
                                                <select
                                                    id="keywordIntent"
                                                    value={keywordIntent}
                                                    onChange={(e) => setKeywordIntent(e.target.value)}
                                                    className="w-full py-2.5 px-4 h-11 bg-slate-50 dark:bg-slate-800 dark:text-slate-200 rounded-lg outline-none border border-gray-200 dark:border-gray-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                                                >
                                                    <option value="Informational">Informational</option>
                                                    <option value="Commercial">Commercial</option>
                                                    <option value="Transactional">Transactional</option>
                                                    <option value="Navigational">Navigational</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Error Message */}
                                        {error && (
                                            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                                <div className="flex items-center">
                                                    <i className="mdi mdi-alert-circle text-red-600 dark:text-red-400 me-2"></i>
                                                    <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Generate Button */}
                                        <div>
                                            <button
                                                type="submit"
                                                disabled={isGenerating || !prompt.trim() || (!isAdmin && remainingRequests !== null && remainingRequests <= 0)}
                                                className="w-full py-3.5 px-6 inline-flex items-center justify-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 border-amber-400 hover:border-amber-500 text-white rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                            >
                                                {isGenerating ? (
                                                    <>
                                                        <span className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                                                        Generating Content...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="mdi mdi-magic-staff me-2"></i>
                                                        Generate Content
                                                    </>
                                                )}
                                            </button>
                                            {!isAdmin && remainingRequests !== null && remainingRequests <= 0 && (
                                                <p className="text-center text-sm text-red-500 mt-2">
                                                    You've reached your hourly limit. Please wait before generating more content.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </form>

                                {/* Generated Content Editor */}
                                {generatedContent && (
                                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                                <i className="mdi mdi-file-document-edit me-2 text-amber-400"></i>Generated Content
                                            </h3>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setGeneratedContent("");
                                                    setPrompt("");
                                                }}
                                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-sm flex items-center gap-1"
                                            >
                                                <i className="mdi mdi-close"></i>Clear
                                            </button>
                                        </div>
                                        <ContentEditor
                                            content={generatedContent}
                                            onChange={setGeneratedContent}
                                        />
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
