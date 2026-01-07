"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const NavLight = dynamic(() => import('../components/navbar'))
const Footer = dynamic(() => import('../components/footer'))

export default function Cookies() {
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
                            <h1 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold mb-0">Cookie Policy</h1>
                        </div>

                        <ul className="tracking-[0.5px] mb-0 inline-block mt-5">
                            <li className="inline-block capitalize font-medium duration-500 ease-in-out hover:text-amber-400">
                                <Link href="/">Qarsup AI</Link>
                            </li>
                            <li className="inline-block text-base mx-0.5 ltr:rotate-0 rtl:rotate-180">
                                <i className="mdi mdi-chevron-right"></i>
                            </li>
                            <li className="inline-block capitalize font-medium duration-500 ease-in-out text-amber-400" aria-current="page">
                                Cookie Policy
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
                                            This Cookie Policy explains how QARSUP LLC, operating as Qarsup AI ("we", "our", or "us"), uses cookies and similar tracking technologies on our website and platform. This policy should be read in conjunction with our <Link href="/privacy" className="text-amber-400 hover:text-amber-500">Privacy Policy</Link>.
                                        </p>
                                    </section>

                                    {/* What Are Cookies */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">2. What Are Cookies?</h2>
                                        <p className="text-slate-400 leading-relaxed mb-3">
                                            Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                                        </p>
                                        <p className="text-slate-400 leading-relaxed">
                                            Cookies allow a website to recognize your device and store some information about your preferences or past actions. This helps us provide you with a better experience when you browse our website and also allows us to improve our services.
                                        </p>
                                    </section>

                                    {/* Types of Cookies We Use */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">3. Types of Cookies We Use</h2>
                                        
                                        <div className="mb-6">
                                            <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">3.1 Essential Cookies</h3>
                                            <p className="text-slate-400 leading-relaxed mb-3">
                                                These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt-out of these cookies as they are essential for the website to work.
                                            </p>
                                            <ul className="list-none text-slate-400 space-y-2 ml-4">
                                                <li className="flex items-start">
                                                    <span className="text-amber-400 mr-2 mt-1">•</span>
                                                    <span><strong>Authentication cookies:</strong> Used to maintain your login session and remember your authentication state.</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-amber-400 mr-2 mt-1">•</span>
                                                    <span><strong>Security cookies:</strong> Help protect against security threats and unauthorized access.</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-amber-400 mr-2 mt-1">•</span>
                                                    <span><strong>Load balancing cookies:</strong> Distribute website traffic across servers to ensure optimal performance.</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="mb-6">
                                            <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">3.2 Performance and Analytics Cookies</h3>
                                            <p className="text-slate-400 leading-relaxed mb-3">
                                                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the way our website works.
                                            </p>
                                            <ul className="list-none text-slate-400 space-y-2 ml-4">
                                                <li className="flex items-start">
                                                    <span className="text-amber-400 mr-2 mt-1">•</span>
                                                    <span>Track page views and user navigation patterns</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-amber-400 mr-2 mt-1">•</span>
                                                    <span>Measure website performance and loading times</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-amber-400 mr-2 mt-1">•</span>
                                                    <span>Identify popular content and features</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="mb-6">
                                            <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">3.3 Functionality Cookies</h3>
                                            <p className="text-slate-400 leading-relaxed mb-3">
                                                These cookies allow the website to remember choices you make (such as your language preference or region) and provide enhanced, personalized features.
                                            </p>
                                            <ul className="list-none text-slate-400 space-y-2 ml-4">
                                                <li className="flex items-start">
                                                    <span className="text-amber-400 mr-2 mt-1">•</span>
                                                    <span>Remember your preferences and settings</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-amber-400 mr-2 mt-1">•</span>
                                                    <span>Store your language and region preferences</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-amber-400 mr-2 mt-1">•</span>
                                                    <span>Remember your cookie consent preferences</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">3.4 Targeting and Advertising Cookies</h3>
                                            <p className="text-slate-400 leading-relaxed mb-3">
                                                These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant content on other sites. They do not store directly personal information but are based on uniquely identifying your browser and internet device.
                                            </p>
                                            <p className="text-slate-400 leading-relaxed">
                                                Currently, we do not use targeting or advertising cookies, but this may change in the future. If we do, we will update this policy accordingly.
                                            </p>
                                        </div>
                                    </section>

                                    {/* Third-Party Cookies */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">4. Third-Party Cookies</h2>
                                        <p className="text-slate-400 leading-relaxed mb-3">
                                            In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service, deliver advertisements, and so on. These third parties may include:
                                        </p>
                                        <ul className="list-none text-slate-400 space-y-2 ml-4">
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span><strong>Supabase:</strong> Used for authentication and database services. Their cookies help maintain your session and secure your data.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span><strong>Analytics providers:</strong> Help us understand how our website is used and how we can improve it.</span>
                                            </li>
                                        </ul>
                                        <p className="text-slate-400 leading-relaxed mt-3">
                                            These third-party cookies are subject to the respective third parties' privacy policies. We do not control the setting of these cookies, so please check the third-party websites for more information about their cookies and how to manage them.
                                        </p>
                                    </section>

                                    {/* How Long Cookies Stay on Your Device */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">5. How Long Cookies Stay on Your Device</h2>
                                        <p className="text-slate-400 leading-relaxed mb-3">
                                            The length of time a cookie stays on your device depends on whether it is a "persistent" or "session" cookie:
                                        </p>
                                        <ul className="list-none text-slate-400 space-y-2 ml-4">
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span><strong>Session cookies:</strong> These are temporary cookies that are deleted when you close your browser. They help maintain your session while you navigate the website.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-amber-400 mr-2 mt-1">•</span>
                                                <span><strong>Persistent cookies:</strong> These remain on your device for a set period or until you delete them. They remember your preferences and actions across different sessions.</span>
                                            </li>
                                        </ul>
                                    </section>

                                    {/* Managing Cookies */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">6. Managing Cookies</h2>
                                        <p className="text-slate-400 leading-relaxed mb-3">
                                            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in our cookie consent banner or by adjusting your browser settings.
                                        </p>
                                        
                                        <div className="mb-4">
                                            <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">6.1 Browser Settings</h3>
                                            <p className="text-slate-400 leading-relaxed mb-3">
                                                Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your ability to use our website. Here are links to manage cookies in popular browsers:
                                            </p>
                                            <ul className="list-none text-slate-400 space-y-2 ml-4">
                                                <li className="flex items-start">
                                                    <span className="text-amber-400 mr-2 mt-1">•</span>
                                                    <span><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-500">Google Chrome</a></span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-amber-400 mr-2 mt-1">•</span>
                                                    <span><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-500">Mozilla Firefox</a></span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-amber-400 mr-2 mt-1">•</span>
                                                    <span><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-500">Safari</a></span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-amber-400 mr-2 mt-1">•</span>
                                                    <span><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-500">Microsoft Edge</a></span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">6.2 Our Cookie Consent Banner</h3>
                                            <p className="text-slate-400 leading-relaxed">
                                                When you first visit our website, you will see a cookie consent banner. You can accept all cookies, decline non-essential cookies, or customize your preferences. Your choice will be remembered for future visits.
                                            </p>
                                        </div>
                                    </section>

                                    {/* Impact of Disabling Cookies */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">7. Impact of Disabling Cookies</h2>
                                        <p className="text-slate-400 leading-relaxed">
                                            If you choose to disable cookies, some features of our website may not function properly. For example, you may not be able to stay logged in, your preferences may not be saved, and some interactive features may be unavailable. Essential cookies cannot be disabled as they are necessary for the website to function.
                                        </p>
                                    </section>

                                    {/* Updates to This Policy */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">8. Updates to This Cookie Policy</h2>
                                        <p className="text-slate-400 leading-relaxed">
                                            We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
                                        </p>
                                    </section>

                                    {/* Contact Us */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">9. Contact Us</h2>
                                        <p className="text-slate-400 leading-relaxed">
                                            If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
                                        </p>
                                        <p className="text-slate-400 leading-relaxed mt-2">
                                            <a href="mailto:support@qarsup.com" className="text-amber-400 hover:text-amber-500 duration-500">
                                                support@qarsup.com
                                            </a>
                                        </p>
                                        <p className="text-slate-400 leading-relaxed mt-4">
                                            <strong>Company Address:</strong><br />
                                            QARSUP LLC<br />
                                            312 W 2ND ST NUM 6872<br />
                                            Casper, WY 82601<br />
                                            United States
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

