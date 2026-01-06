"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { createClient } from "@/utils/supabase/client";

const Navbar = dynamic(() => import('../../components/navbar'));

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
    });

    useEffect(() => {
        const loadProfile = async () => {
            const supabase = createClient();
            
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

            if (profileData) {
                setProfile(profileData);
                setFormData({
                    fullName: profileData.full_name || '',
                    email: profileData.email || user.email || '',
                });
            } else {
                setFormData({
                    fullName: user.user_metadata?.full_name || '',
                    email: user.email || '',
                });
            }

            setLoading(false);
        };

        loadProfile();
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const supabase = createClient();
            
            // Update auth metadata with full name
            const { error: authError } = await supabase.auth.updateUser({
                data: {
                    full_name: formData.fullName,
                },
            });

            if (authError) throw authError;

            // Update profile - only full_name (email is read-only)
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    full_name: formData.fullName,
                    email: user.email || formData.email, // Keep existing email, don't update
                    updated_at: new Date().toISOString(),
                });

            if (profileError) throw profileError;

            alert('Profile updated successfully!');
            router.refresh();
        } catch (error: any) {
            alert('Failed to update profile: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

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
                            <h1 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold mb-0">Profile</h1>
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
                                        className="block py-2 px-3 rounded-md bg-amber-400/10 text-amber-400 font-medium"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/dashboard/billing"
                                        className="block py-2 px-3 rounded-md text-slate-400 hover:text-amber-400 hover:bg-amber-400/5 transition-colors"
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
                                <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>

                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label htmlFor="fullName" className="block font-semibold mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="fullName"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 dark:border-gray-800 focus:border-amber-400 focus:ring-0"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block font-semibold mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                disabled
                                                className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 dark:border-gray-800 opacity-60 cursor-not-allowed"
                                            />
                                            <p className="text-slate-400 text-xs mt-1">Email cannot be changed</p>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                disabled={saving}
                                                className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {saving ? 'Saving...' : 'Save Changes'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

