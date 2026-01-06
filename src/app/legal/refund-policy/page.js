"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const NavLight = dynamic(() => import('../../components/navbar'))
const Footer = dynamic(() => import('../../components/footer'))

export default function RefundPolicy() {
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
                            <h1 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold mb-0">Refund & Cancellation Policy</h1>
                        </div>

                        <ul className="tracking-[0.5px] mb-0 inline-block mt-5">
                            <li className="inline-block capitalize font-medium duration-500 ease-in-out hover:text-amber-400">
                                <Link href="/">Qarsup AI</Link>
                            </li>
                            <li className="inline-block text-base mx-0.5 ltr:rotate-0 rtl:rotate-180">
                                <i className="mdi mdi-chevron-right"></i>
                            </li>
                            <li className="inline-block capitalize font-medium duration-500 ease-in-out text-amber-400" aria-current="page">
                                Refund & Cancellation Policy
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
                                            This Refund & Cancellation Policy ("Policy") applies to all subscription-based services provided by QARSUP LLC through the Qarsup AI platform. This Policy outlines our refund eligibility criteria, cancellation procedures, and billing expectations.
                                        </p>
                                    </section>

                                    {/* Subscription-Based Services */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">2. Subscription-Based Services</h2>
                                        <p className="text-slate-400 leading-relaxed mb-3">
                                            Qarsup AI offers subscription-based services with various pricing plans. By subscribing to our services, you agree to the following terms:
                                        </p>
                                        <ul className="list-none text-slate-400 space-y-2 ml-4">
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Subscriptions are billed according to the selected plan and billing cycle</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Subscription fees are charged in advance for the billing period</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Subscriptions automatically renew unless cancelled before the renewal date</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>You will continue to have access to the service until the end of your current billing period after cancellation</span>
                                            </li>
                                        </ul>
                                    </section>

                                    {/* Refund Eligibility */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">3. Refund Eligibility</h2>
                                        <p className="text-slate-400 leading-relaxed mb-3">
                                            Refund requests are evaluated on a case-by-case basis. Generally, refunds may be considered in the following circumstances:
                                        </p>
                                        <ul className="list-none text-slate-400 space-y-2 ml-4">
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Technical issues that prevent you from accessing or using the service, and we are unable to resolve the issue</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Duplicate charges or billing errors on our part</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Refund requests made within a reasonable time frame after purchase (subject to our discretion)</span>
                                            </li>
                                        </ul>
                                        <p className="text-slate-400 leading-relaxed mt-4">
                                            Refunds are generally not available for:
                                        </p>
                                        <ul className="list-none text-slate-400 space-y-2 ml-4 mt-2">
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Change of mind or dissatisfaction with the service after use</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Account suspension or termination due to violation of our Terms of Service or Acceptable Use Policy</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Partial use of the service during the billing period</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Refund requests made after the service has been substantially used</span>
                                            </li>
                                        </ul>
                                        <p className="text-slate-400 leading-relaxed mt-4">
                                            We reserve the right to deny refund requests that do not meet our eligibility criteria or that we determine to be fraudulent or abusive.
                                        </p>
                                    </section>

                                    {/* Cancellation Process */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">4. Cancellation Process</h2>
                                        <p className="text-slate-400 leading-relaxed mb-3">
                                            You may cancel your subscription at any time through your account settings or by contacting our support team. The cancellation process is as follows:
                                        </p>
                                        <ul className="list-none text-slate-400 space-y-2 ml-4">
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Access your account dashboard and navigate to the billing or subscription settings</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Follow the cancellation instructions provided in your account</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Alternatively, contact our support team at support@qarsup.com to request cancellation</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>You will receive a confirmation email once your cancellation is processed</span>
                                            </li>
                                        </ul>
                                        <p className="text-slate-400 leading-relaxed mt-4">
                                            Cancellation will take effect at the end of your current billing period. You will retain access to the service until the end of the period for which you have already paid. No refunds will be issued for the remaining portion of the billing period unless otherwise specified.
                                        </p>
                                    </section>

                                    {/* Contact for Billing Issues */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">5. Contact for Billing Issues</h2>
                                        <p className="text-slate-400 leading-relaxed">
                                            If you have questions about billing, wish to request a refund, or need assistance with cancellation, please contact our support team. We aim to respond to all inquiries within a reasonable timeframe.
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
                                        <p className="text-slate-400 leading-relaxed mt-4">
                                            When contacting us about billing issues, please include:
                                        </p>
                                        <ul className="list-none text-slate-400 space-y-2 ml-4 mt-2">
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Your account email address</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Transaction ID or invoice number (if applicable)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span>Description of the issue or reason for refund request</span>
                                            </li>
                                        </ul>
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

