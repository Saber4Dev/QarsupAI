"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { createClient } from "@/utils/supabase/client";
import { signupSchema, sanitizeEmail } from "@/lib/validation/schemas";

const Navbar = dynamic(() => import('../components/navbar'));
const Footer = dynamic(() => import('../components/footer'));

export default function Checkout() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Get plan and price from URL parameters
    const planName = searchParams.get('plan') || 'Starter';
    const priceParam = searchParams.get('price');
    const price = priceParam ? parseFloat(priceParam) : 5;

    // Auth state
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Check authentication status
    useEffect(() => {
        const checkAuth = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            
            setUser(user);
            setIsAuthenticated(!!user);
            setLoading(false);

            // If authenticated, pre-fill form with user data
            if (user) {
                setFormData(prev => ({
                    ...prev,
                    email: user.email || '',
                    fullName: user.user_metadata?.full_name || '',
                }));
            }
        };

        checkAuth();

        // Listen for auth changes
        const supabase = createClient();
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setIsAuthenticated(!!session?.user);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    // Redirect if no plan/price provided
    useEffect(() => {
        if (!searchParams.get('plan') || !searchParams.get('price')) {
            router.push('/pricing');
        }
    }, [searchParams, router]);

    /**
     * Handle form input changes
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    /**
     * Validate form before submission
     */
    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password required only if not authenticated
        if (!isAuthenticated && !formData.password.trim()) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Handle form submission
     * Creates account if needed, then stores subscription
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const supabase = createClient();
            let currentUser = user;

            // If not authenticated, create account
            if (!isAuthenticated) {
                // Validate signup data
                const validatedData = signupSchema.parse({
                    email: sanitizeEmail(formData.email),
                    password: formData.password,
                });

                // Sign up user
                const { data: authData, error: signupError } = await supabase.auth.signUp({
                    email: validatedData.email,
                    password: validatedData.password,
                    options: {
                        data: {
                            full_name: formData.fullName,
                        },
                    },
                });

                if (signupError) {
                    setErrors({ email: signupError.message });
                    setIsSubmitting(false);
                    return;
                }

                if (!authData.user) {
                    setErrors({ email: 'Failed to create account. Please try again.' });
                    setIsSubmitting(false);
                    return;
                }

                currentUser = authData.user;
            }

            // Update profile with full name if needed
            if (formData.fullName && formData.fullName !== currentUser.user_metadata?.full_name) {
                const { error: updateError } = await supabase.auth.updateUser({
                    data: {
                        full_name: formData.fullName,
                    },
                });

                if (updateError) {
                    console.error('Failed to update profile:', updateError);
                }
            }

            // Create subscription via API
            const response = await fetch('/api/subscriptions/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planName,
                    price,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                setErrors({ email: result.error || 'Failed to create subscription. Please try again.' });
                setIsSubmitting(false);
                return;
            }

            // Success - redirect to dashboard
            router.push('/dashboard');
            
        } catch (err: any) {
            // Handle validation errors
            if (err.errors && Array.isArray(err.errors)) {
                const validationError = err.errors[0]?.message || 'Invalid input. Please check your information.';
                setErrors({ email: validationError });
            } else {
                setErrors({ email: 'An error occurred. Please try again.' });
            }
            setIsSubmitting(false);
        }
    };

    // Show loading state while checking auth
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

    // Validate if form can be submitted
    const isFormValid = formData.fullName.trim() !== '' && 
                       formData.email.trim() !== '' && 
                       (isAuthenticated || formData.password.trim() !== '');

    return (
        <>
            <Navbar />
            <section className="relative md:pt-44 pt-32 pb-8 bg-gradient-to-b from-amber-400/20 dark:from-amber-400/40 to-transparent">
                <div className="container relative">
                    <div className="grid grid-cols-1 text-center mt-6">
                        <div>
                            <h1 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold mb-0">Checkout</h1>
                        </div>
                        <ul className="tracking-[0.5px] mb-0 inline-block mt-5">
                            <li className="inline-block capitalize font-medium duration-500 ease-in-out hover:text-amber-400">
                                <Link href="/">Qarsup AI</Link>
                            </li>
                            <li className="inline-block text-base mx-0.5">
                                <i className="mdi mdi-chevron-right"></i>
                            </li>
                            <li className="inline-block capitalize font-medium duration-500 ease-in-out text-amber-400">
                                Checkout
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="relative md:py-24 py-16">
                <div className="container relative">
                    <div className="grid lg:grid-cols-12 gap-6">
                        {/* Checkout Form - Left Side */}
                        <div className="lg:col-span-8">
                            <div className="bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800 p-6 md:p-8">
                                <h2 className="text-2xl font-semibold mb-2">Customer Information</h2>
                                
                                {!isAuthenticated && (
                                    <p className="text-slate-400 text-sm mb-6">
                                        Create an account during checkout to complete your purchase.
                                    </p>
                                )}

                                {isAuthenticated && (
                                    <p className="text-green-600 dark:text-green-400 text-sm mb-6">
                                        ✓ You're signed in as {user?.email}
                                    </p>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 gap-6">
                                        {/* Full Name */}
                                        <div>
                                            <label htmlFor="fullName" className="block font-semibold mb-2">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="fullName"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                required
                                                className={`w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border ${
                                                    errors.fullName 
                                                        ? 'border-red-500' 
                                                        : 'border-gray-200 dark:border-gray-800 focus:border-amber-400'
                                                } focus:ring-0`}
                                                placeholder="John Doe"
                                            />
                                            {errors.fullName && (
                                                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label htmlFor="email" className="block font-semibold mb-2">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                disabled={isAuthenticated}
                                                className={`w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border ${
                                                    errors.email 
                                                        ? 'border-red-500' 
                                                        : 'border-gray-200 dark:border-gray-800 focus:border-amber-400'
                                                } focus:ring-0 ${isAuthenticated ? 'opacity-60 cursor-not-allowed' : ''}`}
                                                placeholder="john@example.com"
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                            )}
                                        </div>

                                        {/* Password - Only show if not authenticated */}
                                        {!isAuthenticated && (
                                            <div>
                                                <label htmlFor="password" className="block font-semibold mb-2">
                                                    Password <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                    minLength={8}
                                                    className={`w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border ${
                                                        errors.password 
                                                            ? 'border-red-500' 
                                                            : 'border-gray-200 dark:border-gray-800 focus:border-amber-400'
                                                    } focus:ring-0`}
                                                    placeholder="Password (min. 8 characters)"
                                                />
                                                {errors.password && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                                )}
                                                <p className="text-slate-400 text-xs mt-1">
                                                    Password must be at least 8 characters and include both letters and numbers.
                                                </p>
                                            </div>
                                        )}

                                        {/* Phone */}
                                        <div>
                                            <label htmlFor="phone" className="block font-semibold mb-2">
                                                Phone Number <span className="text-slate-400 text-sm">(Optional)</span>
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 dark:border-gray-800 focus:border-amber-400 focus:ring-0"
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                disabled={!isFormValid || isSubmitting}
                                                className="w-full py-3 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting 
                                                    ? 'Processing...' 
                                                    : isAuthenticated 
                                                        ? 'Complete Purchase' 
                                                        : 'Create Account & Complete Purchase'
                                                }
                                            </button>
                                        </div>

                                        {!isAuthenticated && (
                                            <p className="text-slate-400 text-xs text-center">
                                                Already have an account? <Link href="/login" className="text-amber-400 hover:text-amber-500">Sign in</Link>
                                            </p>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Order Summary - Right Side */}
                        <div className="lg:col-span-4">
                            <div className="bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800 p-6 sticky top-24">
                                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                                <div className="space-y-4">
                                    {/* Plan Name */}
                                    <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-800">
                                        <span className="text-slate-400">Plan</span>
                                        <span className="font-semibold">{planName}</span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-800">
                                        <span className="text-slate-400">Price</span>
                                        <span className="font-semibold text-lg">${price.toFixed(2)}</span>
                                    </div>

                                    {/* Total */}
                                    <div className="flex justify-between items-center pt-4">
                                        <span className="text-lg font-semibold">Total</span>
                                        <span className="text-2xl font-bold text-amber-400">${price.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                                    <Link
                                        href="/pricing"
                                        className="text-amber-400 hover:text-amber-500 text-sm font-medium"
                                    >
                                        ← Change Plan
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
