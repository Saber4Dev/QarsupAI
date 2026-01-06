"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const NavLight = dynamic(() => import('../components/navbar'))
const Footer = dynamic(() => import('../components/footer'))

export default function Privacy() {
    useEffect(() => {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    }, []);

    const currentDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    return (
        <>
            <NavLight />
            <section className="relative md:pt-44 pt-32 pb-8 bg-gradient-to-b from-amber-400/20 dark:from-amber-400/40 to-transparent">
                <div className="container relative">
                    <div className="grid grid-cols-1 text-center mt-6">
                        <div>
                            <h1 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold mb-0">Privacy Policy</h1>
                        </div>

                        <ul className="tracking-[0.5px] mb-0 inline-block mt-5">
                            <li className="inline-block capitalize font-medium duration-500 ease-in-out hover:text-amber-400">
                                <Link href="/">Qarsup AI</Link>
                            </li>
                            <li className="inline-block text-base mx-0.5 ltr:rotate-0 rtl:rotate-180">
                                <i className="mdi mdi-chevron-right"></i>
                            </li>
                            <li className="inline-block capitalize font-medium duration-500 ease-in-out text-amber-400" aria-current="page">
                                Privacy Policy
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="relative md:py-24 py-16">
                <div className="container relative">
                    <div className="md:flex justify-center">
                        <div className="md:w-3/4">
                            <div className="p-6 md:p-8 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md">
                                <p className="text-slate-400 mb-8 text-sm">
                                    <strong>Effective Date:</strong> {currentDate}
                                </p>

                                <div className="space-y-8">
                                    {/* Introduction */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">1. Introduction</h2>
                                        <p className="text-slate-400 leading-relaxed">
                                            QARSUP LLC, operating as Qarsup AI ("we", "our", or "us"), is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                                        </p>
                                    </section>

                                    {/* Information We Collect */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">2. Information We Collect</h2>
                                        <p className="text-slate-400 leading-relaxed mb-3">
                                            We may collect the following types of information:
                                        </p>
                                        <ul className="list-none text-slate-400 space-y-2 ml-4">
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Personal information such as name, email address, and account credentials when you register or log in.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Usage data including pages visited, features used, and interactions with the platform.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Technical data such as IP address, browser type, and device information.</span>
                                            </li>
                                        </ul>
                                    </section>

                                    {/* How We Use Your Information */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">3. How We Use Your Information</h2>
                                        <p className="text-slate-400 leading-relaxed mb-3">
                                            We use the collected information to:
                                        </p>
                                        <ul className="list-none text-slate-400 space-y-2 ml-4">
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Provide, operate, and maintain our services</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Authenticate users and manage accounts</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Improve platform performance and user experience</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Communicate important service-related information</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Ensure security and prevent unauthorized access</span>
                                            </li>
                                        </ul>
                                    </section>

                                    {/* Data Storage and Security */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">4. Data Storage and Security</h2>
                                        <p className="text-slate-400 leading-relaxed">
                                            We take reasonable technical and organizational measures to protect your information. User authentication and data may be managed through third-party infrastructure providers. While we strive to protect your data, no system can be guaranteed to be completely secure.
                                        </p>
                                    </section>

                                    {/* Sharing of Information */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">5. Sharing of Information</h2>
                                        <p className="text-slate-400 leading-relaxed">
                                            We do not sell or rent your personal information. We may share information only when required to operate our services, comply with legal obligations, or protect our rights.
                                        </p>
                                    </section>

                                    {/* Third-Party Services */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">6. Third-Party Services</h2>
                                        <p className="text-slate-400 leading-relaxed">
                                            Our platform may rely on trusted third-party services for hosting, authentication, analytics, or infrastructure. These providers process data in accordance with their own privacy policies.
                                        </p>
                                    </section>

                                    {/* Data Retention */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">7. Data Retention</h2>
                                        <p className="text-slate-400 leading-relaxed">
                                            We retain personal data only for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required by law.
                                        </p>
                                    </section>

                                    {/* Your Rights */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">8. Your Rights</h2>
                                        <p className="text-slate-400 leading-relaxed">
                                            Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data. Requests can be made by contacting us.
                                        </p>
                                    </section>

                                    {/* Changes to This Policy */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">9. Changes to This Policy</h2>
                                        <p className="text-slate-400 leading-relaxed">
                                            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
                                        </p>
                                    </section>

                                    {/* Company Information */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">10. Company Information</h2>
                                        <p className="text-slate-400 leading-relaxed">
                                            Qarsup AI is operated by QARSUP LLC, a Limited Liability Company registered in the United States.
                                        </p>
                                        <p className="text-slate-400 leading-relaxed mt-4">
                                            <strong>Company Address:</strong><br />
                                            312 W 2ND ST NUM 6872<br />
                                            Casper, WY 82601<br />
                                            United States
                                        </p>
                                    </section>

                                    {/* Contact Us */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">11. Contact Us</h2>
                                        <p className="text-slate-400 leading-relaxed">
                                            If you have any questions about this Privacy Policy, you may contact us at:
                                        </p>
                                        <p className="text-slate-400 leading-relaxed mt-2">
                                            <a href="mailto:support@qarsup.com" className="text-amber-400 hover:text-amber-500 duration-500">
                                                support@qarsup.com
                                            </a>
                                        </p>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}
