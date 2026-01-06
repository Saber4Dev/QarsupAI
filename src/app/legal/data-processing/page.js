"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const NavLight = dynamic(() => import('../../components/navbar'))
const Footer = dynamic(() => import('../../components/footer'))

export default function DataProcessing() {
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
                            <h1 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold mb-0">Data Processing Policy</h1>
                        </div>

                        <ul className="tracking-[0.5px] mb-0 inline-block mt-5">
                            <li className="inline-block capitalize font-medium duration-500 ease-in-out hover:text-amber-400">
                                <Link href="/">Qarsup AI</Link>
                            </li>
                            <li className="inline-block text-base mx-0.5 ltr:rotate-0 rtl:rotate-180">
                                <i className="mdi mdi-chevron-right"></i>
                            </li>
                            <li className="inline-block capitalize font-medium duration-500 ease-in-out text-amber-400" aria-current="page">
                                Data Processing Policy
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
                                    {/* Scope */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">1. Scope</h2>
                                        <p className="text-slate-400 leading-relaxed">
                                            This Data Processing Policy explains how QARSUP LLC ("we", "our", or "us") processes, stores, and protects personal data collected through the Qarsup AI platform. This policy supplements our Privacy Policy and applies to all data processing activities related to our services.
                                        </p>
                                    </section>

                                    {/* Data Processing Purpose */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">2. Data Processing Purpose</h2>
                                        <p className="text-slate-400 leading-relaxed mb-3">
                                            We process personal data for the following purposes:
                                        </p>
                                        <ul className="list-none text-slate-400 space-y-2 ml-4">
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Service delivery and account management</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Authentication and security</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Content generation and processing</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Platform improvement and analytics</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Communication and support</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Legal compliance and dispute resolution</span>
                                            </li>
                                        </ul>
                                    </section>

                                    {/* Third-Party Processors */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">3. Third-Party Processors</h2>
                                        <p className="text-slate-400 leading-relaxed mb-3">
                                            We may engage third-party service providers to process data on our behalf. These processors include:
                                        </p>
                                        <ul className="list-none text-slate-400 space-y-2 ml-4">
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Hosting and infrastructure providers for data storage and processing</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Authentication service providers for user account management</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>AI service providers for content generation capabilities</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Payment processors for transaction handling (when applicable)</span>
                                            </li>
                                        </ul>
                                        <p className="text-slate-400 leading-relaxed mt-4">
                                            All third-party processors are contractually obligated to maintain appropriate security measures and process data only as instructed by us.
                                        </p>
                                    </section>

                                    {/* Security Measures */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">4. Security Measures</h2>
                                        <p className="text-slate-400 leading-relaxed mb-3">
                                            We implement technical and organizational measures to protect personal data, including:
                                        </p>
                                        <ul className="list-none text-slate-400 space-y-2 ml-4">
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Encryption of data in transit and at rest</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Access controls and authentication requirements</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Regular security assessments and monitoring</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Secure data centers and infrastructure</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Incident response procedures</span>
                                            </li>
                                        </ul>
                                        <p className="text-slate-400 leading-relaxed mt-4">
                                            While we strive to protect your data, no method of transmission or storage is completely secure. We cannot guarantee absolute security of your personal data.
                                        </p>
                                    </section>

                                    {/* User Rights */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">5. User Rights</h2>
                                        <p className="text-slate-400 leading-relaxed mb-3">
                                            Depending on your jurisdiction, you may have certain rights regarding your personal data, including:
                                        </p>
                                        <ul className="list-none text-slate-400 space-y-2 ml-4">
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Right to access your personal data</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Right to rectify inaccurate or incomplete data</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Right to request deletion of your data</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Right to restrict or object to certain processing activities</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Right to data portability</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Right to withdraw consent where processing is based on consent</span>
                                            </li>
                                        </ul>
                                        <p className="text-slate-400 leading-relaxed mt-4">
                                            To exercise these rights, please contact us using the information provided in the Contact Information section below.
                                        </p>
                                    </section>

                                    {/* Contact Information */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">6. Contact Information</h2>
                                        <p className="text-slate-400 leading-relaxed">
                                            If you have questions about our data processing practices or wish to exercise your rights, please contact us at:
                                        </p>
                                        <p className="text-slate-400 leading-relaxed mt-4">
                                            <strong>QARSUP LLC</strong><br />
                                            312 W 2ND ST NUM 6872<br />
                                            Casper, WY 82601<br />
                                            United States
                                        </p>
                                        <p className="text-slate-400 leading-relaxed mt-4">
                                            Email: <a href="mailto:support@qarsup.com" className="text-amber-400 hover:text-amber-500 duration-500">support@qarsup.com</a>
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

