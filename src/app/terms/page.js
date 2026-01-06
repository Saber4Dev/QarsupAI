"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const NavLight = dynamic(() => import('../components/navbar'))
const Footer = dynamic(() => import('../components/footer'))

import { MdKeyboardArrowDown } from "../assets/icons/vander"

export default function Terms() {
    useEffect(() => {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    }, []);

    const [activeIndex, setActiveIndex] = useState(1)
    
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const accordianData = [
        {
            id: 1,
            title: 'What happens if I violate these Terms of Service?',
            desc: 'Violation of these Terms may result in immediate suspension or termination of your account, and we reserve the right to take appropriate legal action. We may also remove content that violates these terms without prior notice.'
        },
        {
            id: 2,
            title: 'Can I cancel my subscription at any time?',
            desc: 'Yes, you may cancel your subscription at any time through your account settings. Cancellation will take effect at the end of your current billing period, and you will continue to have access to the service until that time.'
        },
        {
            id: 3,
            title: 'What is your refund policy?',
            desc: 'Refund policies vary by subscription plan. Generally, refunds may be available within a specified period after purchase, subject to our refund policy. Please contact support@qarsup.com for specific refund inquiries.'
        },
        {
            id: 4,
            title: 'How do you handle intellectual property rights?',
            desc: 'You retain ownership of content you create using our platform. However, by using our services, you grant us a license to use, store, and process your content as necessary to provide the service. You must ensure you have the right to use any content you input into the platform.'
        },
        {
            id: 5,
            title: 'What happens to my data if I delete my account?',
            desc: 'Upon account deletion, we will delete or anonymize your personal data in accordance with our Privacy Policy and applicable laws. Some data may be retained for legal or operational purposes as required by law.'
        },
    ]

    return (
        <>
            <NavLight />
            <section className="relative md:pt-44 pt-32 pb-8 bg-gradient-to-b from-amber-400/20 dark:from-amber-400/40 to-transparent">
                <div className="container relative">
                    <div className="grid grid-cols-1 text-center mt-6">
                        <div>
                            <h1 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold mb-0">Terms of Service</h1>
                        </div>

                        <ul className="tracking-[0.5px] mb-0 inline-block mt-5">
                            <li className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out hover:text-amber-400">
                                <Link href="/">Qarsup AI</Link>
                            </li>
                            <li className="inline-block text-base mx-0.5 ltr:rotate-0 rtl:rotate-180">
                                <i className="mdi mdi-chevron-right"></i>
                            </li>
                            <li className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out text-amber-400" aria-current="page">
                                Terms of Service
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

                                {/* Introduction */}
                                <section className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">1. Introduction</h2>
                                    <p className="text-slate-400 leading-relaxed mb-3">
                                        Welcome to Qarsup AI. These Terms of Service ("Terms") govern your access to and use of our website, services, and platform (collectively, the "Service") operated by Qarsup AI ("we", "our", or "us").
                                    </p>
                                    <p className="text-slate-400 leading-relaxed">
                                        By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access the Service.
                                    </p>
                                </section>

                                {/* Acceptance of Terms */}
                                <section className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">2. Acceptance of Terms</h2>
                                    <p className="text-slate-400 leading-relaxed mb-3">
                                        By creating an account, accessing, or using Qarsup AI, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
                                    </p>
                                    <p className="text-slate-400 leading-relaxed">
                                        You must be at least 18 years old or the age of majority in your jurisdiction to use this Service. If you are using the Service on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.
                                    </p>
                                </section>

                                {/* User Accounts */}
                                <section className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">3. User Accounts</h2>
                                    <p className="text-slate-400 leading-relaxed mb-3">
                                        To access certain features of the Service, you must register for an account. You agree to:
                                    </p>
                                    <ul className="list-none text-slate-400 space-y-2 ml-4 mb-3">
                                        <li className="flex items-start">
                                            <i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2 mt-0.5"></i>
                                            <span>Provide accurate, current, and complete information during registration</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2 mt-0.5"></i>
                                            <span>Maintain and update your account information to keep it accurate</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2 mt-0.5"></i>
                                            <span>Maintain the security of your account credentials</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2 mt-0.5"></i>
                                            <span>Accept responsibility for all activities that occur under your account</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2 mt-0.5"></i>
                                            <span>Notify us immediately of any unauthorized use of your account</span>
                                        </li>
                                    </ul>
                                </section>

                                {/* Use of Service */}
                                <section className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">4. Use of Service</h2>
                                    <p className="text-slate-400 leading-relaxed mb-3">
                                        You may use our Service for lawful business and personal purposes. You agree not to:
                                    </p>
                                    <ul className="list-none text-slate-400 space-y-2 ml-4 mb-3">
                                        <li className="flex items-start">
                                            <i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2 mt-0.5"></i>
                                            <span>Use the Service in any way that violates applicable laws or regulations</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2 mt-0.5"></i>
                                            <span>Attempt to gain unauthorized access to the Service or related systems</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2 mt-0.5"></i>
                                            <span>Interfere with or disrupt the Service or servers connected to the Service</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2 mt-0.5"></i>
                                            <span>Use automated systems to access the Service without authorization</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2 mt-0.5"></i>
                                            <span>Create content that is illegal, harmful, or infringes on others' rights</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2 mt-0.5"></i>
                                            <span>Reverse engineer, decompile, or attempt to extract source code</span>
                                        </li>
                                    </ul>
                                </section>

                                {/* Intellectual Property */}
                                <section className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">5. Intellectual Property</h2>
                                    <p className="text-slate-400 leading-relaxed mb-3">
                                        The Service, including its original content, features, and functionality, is owned by Qarsup AI and is protected by international copyright, trademark, and other intellectual property laws.
                                    </p>
                                    <p className="text-slate-400 leading-relaxed mb-3">
                                        You retain ownership of content you create using our platform. However, by using our Service, you grant us a worldwide, non-exclusive, royalty-free license to use, store, and process your content as necessary to provide and improve the Service.
                                    </p>
                                    <p className="text-slate-400 leading-relaxed">
                                        You represent and warrant that you have the right to use any content you input into the platform and that such use does not violate any third-party rights.
                                    </p>
                                </section>

                                {/* Subscription and Payment */}
                                <section className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">6. Subscription and Payment</h2>
                                    <p className="text-slate-400 leading-relaxed mb-3">
                                        Some features of the Service may require a paid subscription. By subscribing, you agree to:
                                    </p>
                                    <ul className="list-none text-slate-400 space-y-2 ml-4 mb-3">
                                        <li className="flex items-start">
                                            <i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2 mt-0.5"></i>
                                            <span>Pay all fees associated with your subscription plan</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2 mt-0.5"></i>
                                            <span>Provide accurate billing information</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2 mt-0.5"></i>
                                            <span>Authorize us to charge your payment method for recurring fees</span>
                                        </li>
                                    </ul>
                                    <p className="text-slate-400 leading-relaxed">
                                        Subscriptions automatically renew unless cancelled. You may cancel your subscription at any time through your account settings. Refunds are subject to our refund policy.
                                    </p>
                                </section>

                                {/* Limitation of Liability */}
                                <section className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">7. Limitation of Liability</h2>
                                    <p className="text-slate-400 leading-relaxed mb-3">
                                        To the maximum extent permitted by law, Qarsup AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                                    </p>
                                    <p className="text-slate-400 leading-relaxed">
                                        Our total liability for any claims arising from or related to the Service shall not exceed the amount you paid us in the twelve months preceding the claim.
                                    </p>
                                </section>

                                {/* Termination */}
                                <section className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">8. Termination</h2>
                                    <p className="text-slate-400 leading-relaxed mb-3">
                                        We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including if you breach these Terms.
                                    </p>
                                    <p className="text-slate-400 leading-relaxed">
                                        Upon termination, your right to use the Service will cease immediately. You may also terminate your account at any time by contacting us or using the account deletion feature.
                                    </p>
                                </section>

                                {/* Changes to Terms */}
                                <section className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">9. Changes to Terms</h2>
                                    <p className="text-slate-400 leading-relaxed">
                                        We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. Your continued use of the Service after changes become effective constitutes acceptance of the new Terms.
                                    </p>
                                </section>

                                {/* Contact Information */}
                                <section className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">10. Contact Information</h2>
                                    <p className="text-slate-400 leading-relaxed mb-3">
                                        If you have any questions about these Terms of Service, please contact us at:
                                    </p>
                                    <p className="text-slate-400 leading-relaxed">
                                        <a href="mailto:support@qarsup.com" className="text-amber-400 hover:text-amber-500 duration-500">
                                            support@qarsup.com
                                        </a>
                                    </p>
                                </section>

                                {/* FAQ Accordion Section */}
                                <section className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
                                    <div className="mt-6">
                                        {accordianData.map((item, index) => {
                                            return (
                                                <div className="relative shadow dark:shadow-gray-800 rounded-md overflow-hidden mt-4" key={index}>
                                                    <h3 className="text-base font-semibold">
                                                        <button
                                                            type="button"
                                                            onClick={() => setActiveIndex(activeIndex === item.id ? null : item.id)}
                                                            className={`${activeIndex === item.id ? "bg-gray-50 dark:bg-slate-800 text-amber-400" : ""} flex justify-between items-center p-5 w-full font-medium text-start hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors`}
                                                        >
                                                            <span>{item.title}</span>
                                                            <MdKeyboardArrowDown className={`${activeIndex === item.id ? "rotate-180" : ""} w-4 h-4 shrink-0 transition-transform`} />
                                                        </button>
                                                    </h3>
                                                    <div className={activeIndex === item.id ? "" : "hidden"}>
                                                        <div className="p-5">
                                                            <p className="text-slate-400 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </section>

                                {/* Accept/Decline Buttons */}
                                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                                    <p className="text-slate-400 mb-4 text-sm">
                                        By clicking "Accept", you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <Link
                                            href="/"
                                            className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md"
                                        >
                                            Accept
                                        </Link>
                                        <Link
                                            href="/"
                                            className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-transparent hover:bg-amber-400 border-amber-400 text-amber-400 hover:text-white rounded-md"
                                        >
                                            Decline
                                        </Link>
                                    </div>
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
