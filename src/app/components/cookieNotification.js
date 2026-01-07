"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieNotification() {
    const [showNotification, setShowNotification] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check if user has already accepted/declined cookies
        if (typeof window !== 'undefined') {
            const cookieConsent = localStorage.getItem('cookieConsent');
            if (!cookieConsent) {
                // Show notification after a short delay for better UX
                setTimeout(() => {
                    setShowNotification(true);
                }, 1000);
            }
        }
    }, []);

    if (!mounted) {
        return null;
    }

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setShowNotification(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setShowNotification(false);
    };

    if (!showNotification) {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 max-w-md w-[calc(100%-2rem)] md:w-auto animate-slide-up">
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl border border-gray-200 dark:border-slate-800 p-4 md:p-6">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-amber-400/20 dark:bg-amber-400/30 flex items-center justify-center">
                            <i className="mdi mdi-cookie text-amber-400 text-xl"></i>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                            Cookie Consent
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies. 
                            <Link href="/cookies" className="text-amber-400 hover:text-amber-500 ml-1 underline">
                                Learn more
                            </Link>
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={handleAccept}
                                className="px-4 py-2 text-sm font-semibold bg-amber-400 hover:bg-amber-500 text-white rounded-md transition-colors duration-300"
                            >
                                Accept All
                            </button>
                            <button
                                onClick={handleDecline}
                                className="px-4 py-2 text-sm font-semibold bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-md transition-colors duration-300"
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={handleDecline}
                        className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                        aria-label="Close"
                    >
                        <i className="mdi mdi-close text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

