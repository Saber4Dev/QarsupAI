import React from "react";
import Link from "next/link";
import Image from "next/image";

import {FiShoppingCart, FiDribbble, FiLinkedin, FiFacebook, FiInstagram, FiTwitter, FiMail,FiFileText} from '../assets/icons/vander'

export default function Footer(){
    return(
        <>
         <div className="relative">
            <div className="shape absolute xl:-bottom-[30px] lg:-bottom-[16px] md:-bottom-[13px] -bottom-[5px] start-0 end-0 overflow-hidden z-1 rotate-180 text-white dark:text-slate-900">
                <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>
        <footer className="relative bg-gray-900 overflow-hidden">
            <span className="absolute blur-[200px] w-[300px] h-[300px] rounded-full top-0 -start-[0] bg-gradient-to-tl to-amber-400  from-fuchsia-600 z-0"></span>
            
            <div className="container relative md:py-24 py-16">
                <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
                    {/* Brand Section */}
                    <div className="md:col-span-5">
                        <Link href="/" className="inline-block mb-4">
                            <Image src="/images/logo-light.png" width={127} height={24} className="h-6" alt="Qarsup AI"/>
                        </Link>
                        <p className="text-white/70 text-base max-w-md">
                            Qarsup AI is an artificial intelligence platform designed to help teams and businesses generate high-quality content efficiently, consistently, and at scale.
                        </p>
                    </div>

                    {/* Legal Links */}
                    <div className="md:col-span-3">
                        <h5 className="text-white font-semibold mb-4">Legal</h5>
                        <ul className="list-none space-y-2">
                            <li>
                                <Link href="/privacy" className="text-white/70 hover:text-amber-400 duration-500 inline-block">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-white/70 hover:text-amber-400 duration-500 inline-block">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/data-processing" className="text-white/70 hover:text-amber-400 duration-500 inline-block">
                                    Data Processing Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/acceptable-use" className="text-white/70 hover:text-amber-400 duration-500 inline-block">
                                    Acceptable Use Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/refund-policy" className="text-white/70 hover:text-amber-400 duration-500 inline-block">
                                    Refund & Cancellation Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media - Keeping existing social links */}
                    <div className="md:col-span-4 md:text-end text-center">
                        <ul className="list-none footer-list inline-flex flex-wrap justify-center md:justify-end gap-2 mt-6 md:mt-0">
                            <li className="inline">
                                <Link href="https://dribbble.com/qarsup" target="_blank" className="h-8 w-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-800 dark:border-slate-800 rounded-md hover:border-amber-400 dark:hover:border-amber-400 hover:bg-amber-400 dark:hover:bg-amber-400 text-slate-300 hover:text-white">
                                    <FiDribbble className="h-4 w-4 align-middle"/>
                                </Link>
                            </li>
                            <li className="inline">
                                <Link href="http://linkedin.com/company/qarsup" target="_blank" className="h-8 w-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-800 dark:border-slate-800 rounded-md hover:border-amber-400 dark:hover:border-amber-400 hover:bg-amber-400 dark:hover:bg-amber-400 text-slate-300 hover:text-white">
                                    <FiLinkedin className="h-4 w-4 align-middle"/>
                                </Link>
                            </li>
                            <li className="inline">
                                <Link href="https://www.facebook.com/qarsup" target="_blank" className="h-8 w-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-800 dark:border-slate-800 rounded-md hover:border-amber-400 dark:hover:border-amber-400 hover:bg-amber-400 dark:hover:bg-amber-400 text-slate-300 hover:text-white">
                                    <FiFacebook className="h-4 w-4 align-middle"/>
                                </Link>
                            </li>
                            <li className="inline">
                                <Link href="https://www.instagram.com/qarsup/" target="_blank" className="h-8 w-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-800 dark:border-slate-800 rounded-md hover:border-amber-400 dark:hover:border-amber-400 hover:bg-amber-400 dark:hover:bg-amber-400 text-slate-300 hover:text-white">
                                    <FiInstagram className="h-4 w-4 align-middle"/>
                                </Link>
                            </li>
                            <li className="inline">
                                <Link href="https://twitter.com/qarsup" target="_blank" className="h-8 w-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-800 dark:border-slate-800 rounded-md hover:border-amber-400 dark:hover:border-amber-400 hover:bg-amber-400 dark:hover:bg-amber-400 text-slate-300 hover:text-white">
                                    <FiTwitter className="h-4 w-4 align-middle"/>
                                </Link>
                            </li>
                            <li className="inline">
                                <Link href="mailto:support@qarsup.com" className="h-8 w-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-800 dark:border-slate-800 rounded-md hover:border-amber-400 dark:hover:border-amber-400 hover:bg-amber-400 dark:hover:bg-amber-400 text-slate-300 hover:text-white">
                                    <FiMail className="h-4 w-4 align-middle"/>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="py-[30px] px-0 border-t border-gray-800 dark:border-slate-800">
                <div className="container relative text-center">
                    <div className="grid grid-cols-1">
                        <div className="text-center">
                            <p className="text-gray-400">© {new Date().getFullYear()} Qarsup AI. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}
