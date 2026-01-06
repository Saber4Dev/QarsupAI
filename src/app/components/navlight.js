"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function NavLight(){
    const [toggleMenu, setToggleMenu] = useState(false)
    const [scroll, setScroll] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(()=>{
        const handleScroll = () => {
            setScroll(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    },[])

    useEffect(() => {
        const supabase = createClient();
        
        // Check current session
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    const isActive = (path) => {
        if (path === '/') {
            return pathname === '/';
        }
        return pathname?.startsWith(path);
    };

    return(
        <>
        <nav id="topnav" className={`${scroll ? "nav-sticky" : "" } defaultscroll is-sticky`}>
            <div className="container">
                <Link className="logo" href="/">
                    <span className="inline-block dark:hidden">
                        <Image src="/images/logo-dark.png" width={128} height={24} className="h-6 l-dark" alt="Qarsup AI"/>
                        <Image src="/images/logo-white.png" width={128} height={24} className="h-6 l-light" alt="Qarsup AI"/>
                    </span>
                    <Image src="/images/logo-light.png" width={128} height={24} className="h-6 hidden dark:inline-block" alt="Qarsup AI"/>
                </Link>
               
                <div className="menu-extras">
                    <div className="menu-item">
                        <Link href="#" className={`${toggleMenu ? 'open' : ''} navbar-toggle`} onClick={()=>setToggleMenu(!toggleMenu)}>
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </Link>
                    </div>
                </div>
                
                <ul className="buy-button list-none mb-0">
                    <li className="inline mb-0">
                        {!loading && (
                            user ? (
                                <button 
                                    onClick={handleLogout}
                                    className="py-[6px] px-4 md:inline hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400/5 hover:bg-amber-400 border border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white font-semibold"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link href="/login">
                                    <span className="py-[6px] px-4 md:inline hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400/5 hover:bg-amber-400 border border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white font-semibold">Login</span>
                                    <span className="py-[6px] px-4 inline md:hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white font-semibold">Login</span>
                                </Link>
                            )
                        )}
                    </li>
                </ul>
                
                <div id="navigation" className={`${toggleMenu ? 'block' : ''}`}>
                    <ul className="navigation-menu nav-light">
                        <li className={isActive('/') ? 'active' : ''}>
                            <Link href="/" className="sub-menu-item">Home</Link>
                        </li>
                        <li className={isActive('/aboutus') ? 'active' : ''}>
                            <Link href="/aboutus" className="sub-menu-item">About Us</Link>
                        </li>
                        <li className={isActive('/pricing') ? 'active' : ''}>
                            <Link href="/pricing" className="sub-menu-item">Pricing</Link>
                        </li>
                        <li className={isActive('/services') ? 'active' : ''}>
                            <Link href="/services" className="sub-menu-item">Services</Link>
                        </li>
                        <li className={isActive('/contact') ? 'active' : ''}>
                            <Link href="/contact" className="sub-menu-item">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </>
    )
}
