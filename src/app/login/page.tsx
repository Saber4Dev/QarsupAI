"use client"
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const supabase = createClient();
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) {
                setError(authError.message);
                setLoading(false);
                return;
            }

            if (data.user) {
                router.push("/");
                router.refresh();
            }
        } catch (err) {
            setError("An unexpected error occurred");
            setLoading(false);
        }
    };

    return(
        <>
         <section className="relative overflow-hidden h-screen flex items-center  bg-no-repeat bg-left bg-cover bg-fixed" style={{backgroundImage:"url('/images/bg/bg-ai.jpg')"}}>
            <div className="absolute inset-0 bg-slate-950/20"></div>
            <div className="container relative">
                <div className="md:flex justify-end">
                    <div className="lg:w-1/3 md:w-2/4">
                        <div className="rounded shadow bg-white dark:bg-slate-900 p-6">
                            <Link href="/">
                                <Image src="/images/logo-icon-64.png" width={64} height={64} alt="Qarsup AI"/>
                            </Link>

                            <h5 className="mt-6 text-xl font-semibold">Sign in to your account</h5>

                            {error && (
                                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                                    <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="text-start mt-4">
                                <div className="grid grid-cols-1">
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="LoginEmail">Email Address:</label>
                                        <input 
                                            id="LoginEmail" 
                                            type="email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0" 
                                            placeholder="name@example.com"
                                        />
                                    </div>
    
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="LoginPassword">Password:</label>
                                        <input 
                                            id="LoginPassword" 
                                            type="password" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0" 
                                            placeholder="Password:"
                                        />
                                    </div>
    
                                    <div className="flex justify-between mb-4">
                                        <div className="flex items-center mb-0">
                                            <input className="form-checkbox rounded border-gray-200 dark:border-gray-800 text-amber-400 focus:border-amber-300 focus:ring focus:ring-offset-0 focus:ring-amber-200 focus:ring-opacity-50 cursor-pointer me-2" type="checkbox" value="" id="RememberMe"/>
                                            <label className="form-checkbox-label text-slate-400 cursor-pointer" htmlFor="RememberMe">Remember me</label>
                                        </div>
                                        <p className="text-slate-400 mb-0"><Link href="/reset-password" className="text-slate-400">Forgot password ?</Link></p>
                                    </div>
    
                                    <div className="mb-4">
                                        <button 
                                            type="submit" 
                                            disabled={loading}
                                            className="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? "Signing in..." : "Login / Sign in"}
                                        </button>
                                    </div>
    
                                    <div className="text-center">
                                        <span className="text-slate-400 me-2">Don't have an account ?</span> <Link href="/signup" className="text-slate-900 dark:text-white font-bold inline-block">Sign Up</Link>
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

