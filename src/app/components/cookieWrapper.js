"use client"
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const CookieNotification = dynamic(() => import('./cookieNotification'), {
    ssr: false
});

export default function CookieWrapper() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return <CookieNotification />;
}

