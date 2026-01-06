"use client"
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { resetPasswordSchema, sanitizeEmail } from "@/lib/validation/schemas";
import { createClient } from "@/utils/supabase/client";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);

        try {
            // Validate and sanitize email
            const validatedData = resetPasswordSchema.parse({
                email: sanitizeEmail(email),
            });

            const supabase = createClient();
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(
                validatedData.email,
                {
                    redirectTo: `${window.location.origin}/reset-password`,
                }
            );

            if (resetError) {
                // Generic error message to prevent user enumeration
                setError("If an account exists with this email, a password reset link has been sent.");
            } else {
                // Always show success to prevent user enumeration
                setSuccess(true);
            }
        } catch (err) {
            if (err.errors && Array.isArray(err.errors)) {
                setError(err.errors[0]?.message || "Please enter a valid email address.");
            } else {
                // Generic error for security
                setError("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="relative overflow-hidden h-screen flex items-center bg-no-repeat bg-left bg-cover bg-fixed" style={{ backgroundImage: "url('/images/bg/bg-ai.jpg')" }}>
                <div className="absolute inset-0 bg-slate-950/20"></div>
                <div className="container relative">
                    <div className="md:flex justify-end">
                        <div className="lg:w-1/3 md:w-2/4">
                            <div className="rounded shadow bg-white dark:bg-slate-900 p-6">
                                <Link href="/">
                                    <Image src="/images/logo-icon-64.png" width={64} height={64} alt="Qarsup AI" />
                                </Link>

                                <h5 className="mt-6 text-xl font-semibold">Forgot password</h5>

                                <p className="text-slate-400 mt-2">Please enter your email address. You will receive a link to create a new password via email.</p>

                                {error && (
                                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                                        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                                    </div>
                                )}

                                {success && (
                                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                                        <p className="text-green-600 dark:text-green-400 text-sm">If an account exists with this email, a password reset link has been sent.</p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="text-start mt-4">
                                    <div className="grid grid-cols-1">
                                        <div className="mb-4">
                                            <label className="font-semibold" htmlFor="ResetEmail">Email Address:</label>
                                            <input
                                                id="ResetEmail"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                maxLength={254}
                                                autoComplete="email"
                                                className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0"
                                                placeholder="name@example.com"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <button
                                                type="submit"
                                                disabled={loading || success}
                                                className="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {loading ? "Sending..." : success ? "Email Sent!" : "Send Reset Link"}
                                            </button>
                                        </div>

                                        <div className="text-center">
                                            <span className="text-slate-400 me-2">Remember your password ? </span> <Link href="/login" className="text-slate-900 dark:text-white font-bold inline-block">Sign in</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
