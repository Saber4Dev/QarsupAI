"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import('../components/navbar'));
const Footer = dynamic(() => import('../components/footer'));

/**
 * Payment Method Modal Component
 * Placeholder modal showing payment options (no actual integration)
 */
function PaymentModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-md w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Express Checkout</h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                        <i className="mdi mdi-close text-2xl"></i>
                    </button>
                </div>

                <p className="text-slate-400 text-sm mb-6">Choose your preferred payment method</p>

                {/* Stripe-style payment buttons (visual only) */}
                <div className="space-y-3">
                    {/* Card Payment Button */}
                    <button
                        className="w-full py-3 px-4 border-2 border-slate-200 dark:border-slate-700 rounded-lg hover:border-amber-400 dark:hover:border-amber-400 transition-colors flex items-center justify-center gap-3 bg-white dark:bg-slate-800"
                    >
                        <i className="mdi mdi-credit-card text-2xl text-slate-600 dark:text-slate-300"></i>
                        <span className="font-semibold">Card</span>
                    </button>

                    {/* Apple Pay Button */}
                    <button
                        className="w-full py-3 px-4 border-2 border-slate-200 dark:border-slate-700 rounded-lg hover:border-amber-400 dark:hover:border-amber-400 transition-colors flex items-center justify-center gap-3 bg-black text-white"
                    >
                        <i className="mdi mdi-apple text-2xl"></i>
                        <span className="font-semibold">Apple Pay</span>
                    </button>

                    {/* Google Pay Button */}
                    <button
                        className="w-full py-3 px-4 border-2 border-slate-200 dark:border-slate-700 rounded-lg hover:border-amber-400 dark:hover:border-amber-400 transition-colors flex items-center justify-center gap-3 bg-white dark:bg-slate-800"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span className="font-semibold">Google Pay</span>
                    </button>
                </div>

                <p className="text-xs text-slate-400 text-center mt-6">
                    Payment integration coming soon
                </p>
            </div>
        </div>
    );
}

export default function Checkout() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Get plan and price from URL parameters
    const planName = searchParams.get('plan') || 'Starter';
    const priceParam = searchParams.get('price');
    const price = priceParam ? parseFloat(priceParam) : 5;

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
    });

    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Validate if form can be submitted
    const isFormValid = formData.fullName.trim() !== '' && formData.email.trim() !== '';

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Handle form submission
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Open payment modal
            setIsModalOpen(true);
        }
    };

    // Redirect if no plan/price provided
    useEffect(() => {
        if (!searchParams.get('plan') || !searchParams.get('price')) {
            router.push('/pricing');
        }
    }, [searchParams, router]);

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
                                <h2 className="text-2xl font-semibold mb-6">Customer Information</h2>

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
                                                className={`w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border ${
                                                    errors.email 
                                                        ? 'border-red-500' 
                                                        : 'border-gray-200 dark:border-gray-800 focus:border-amber-400'
                                                } focus:ring-0`}
                                                placeholder="john@example.com"
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                            )}
                                        </div>

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
                                                disabled={!isFormValid}
                                                className="w-full py-3 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Proceed to Payment
                                            </button>
                                        </div>
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

                                    {/* Token/Session Placeholder */}
                                    <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-800">
                                        <span className="text-slate-400 text-sm">Token/Session</span>
                                        <span className="text-slate-400 text-sm italic">Placeholder</span>
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

            {/* Payment Modal */}
            <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <Footer />
        </>
    );
}

