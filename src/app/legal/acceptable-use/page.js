"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const NavLight = dynamic(() => import('../../components/navbar'))
const Footer = dynamic(() => import('../../components/footer'))

export default function AcceptableUse() {
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
                            <h1 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold mb-0">Acceptable Use Policy</h1>
                        </div>

                        <ul className="tracking-[0.5px] mb-0 inline-block mt-5">
                            <li className="inline-block capitalize font-medium duration-500 ease-in-out hover:text-amber-400">
                                <Link href="/">Qarsup AI</Link>
                            </li>
                            <li className="inline-block text-base mx-0.5 ltr:rotate-0 rtl:rotate-180">
                                <i className="mdi mdi-chevron-right"></i>
                            </li>
                            <li className="inline-block capitalize font-medium duration-500 ease-in-out text-amber-400" aria-current="page">
                                Acceptable Use Policy
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
                                            This Acceptable Use Policy ("Policy") governs your use of the Qarsup AI platform operated by QARSUP LLC. By accessing or using our services, you agree to comply with this Policy. Violation of this Policy may result in suspension or termination of your account.
                                        </p>
                                    </section>

                                    {/* Lawful Use Requirement */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">2. Lawful Use Requirement</h2>
                                        <p className="text-slate-400 leading-relaxed">
                                            You agree to use the Qarsup AI platform only for lawful purposes and in accordance with all applicable laws, regulations, and this Policy. You are responsible for ensuring that your use of the platform complies with local, state, national, and international laws.
                                        </p>
                                    </section>

                                    {/* Prohibited Content */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">3. Prohibited Content</h2>
                                        <p className="text-slate-400 leading-relaxed mb-3">
                                            You may not use the platform to create, generate, or distribute content that:
                                        </p>
                                        <ul className="list-none text-slate-400 space-y-2 ml-4">
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Is illegal, fraudulent, or violates any applicable laws or regulations</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Infringes upon intellectual property rights, including copyrights, trademarks, or patents</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Is defamatory, libelous, or harmful to others</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Contains hate speech, harassment, or discrimination based on race, religion, gender, sexual orientation, or other protected characteristics</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Is obscene, pornographic, or sexually explicit</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Promotes violence, terrorism, or illegal activities</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Contains malware, viruses, or other harmful code</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Violates privacy rights or contains personal information of others without consent</span>
                                            </li>
                                        </ul>
                                    </section>

                                    {/* Misuse of AI-Generated Content */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">4. Misuse of AI-Generated Content</h2>
                                        <p className="text-slate-400 leading-relaxed mb-3">
                                            When using AI-generated content from our platform, you agree not to:
                                        </p>
                                        <ul className="list-none text-slate-400 space-y-2 ml-4">
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Use generated content to mislead, deceive, or impersonate others</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Generate content that appears to be created by a specific individual or entity without authorization</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Use AI-generated content for spam, phishing, or other fraudulent activities</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Generate content that violates platform terms or applicable laws</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Resell or redistribute AI-generated content in violation of our Terms of Service</span>
                                            </li>
                                        </ul>
                                        <p className="text-slate-400 leading-relaxed mt-4">
                                            You are responsible for reviewing and verifying all AI-generated content before use. We do not guarantee the accuracy, completeness, or suitability of generated content for any particular purpose.
                                        </p>
                                    </section>

                                    {/* Account Suspension Rights */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">5. Account Suspension Rights</h2>
                                        <p className="text-slate-400 leading-relaxed mb-3">
                                            We reserve the right to suspend, restrict, or terminate your account immediately, without prior notice, if we determine that:
                                        </p>
                                        <ul className="list-none text-slate-400 space-y-2 ml-4">
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>You have violated this Acceptable Use Policy or our Terms of Service</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Your use of the platform poses a security risk or threatens the integrity of our services</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>You are using the platform for illegal or fraudulent purposes</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>You are attempting to abuse, exploit, or circumvent platform limitations or security measures</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Your account activity violates applicable laws or regulations</span>
                                            </li>
                                        </ul>
                                        <p className="text-slate-400 leading-relaxed mt-4">
                                            We may also remove or disable access to any content that violates this Policy without prior notice. Suspended or terminated accounts may not be eligible for refunds, as outlined in our Refund & Cancellation Policy.
                                        </p>
                                    </section>

                                    {/* Contact Information */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">6. Contact Information</h2>
                                        <p className="text-slate-400 leading-relaxed">
                                            If you have questions about this Acceptable Use Policy or wish to report a violation, please contact us at:
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

