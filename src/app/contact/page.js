"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { contactSchema, sanitizeString, sanitizeEmail } from "@/lib/validation/schemas";

const Navbar = dynamic(() => import('../components/navbar'))
const Footer = dynamic(() => import('../components/footer'))

import { FiHexagon, FiPhone, FiMail, FiMapPin } from "../assets/icons/vander"

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        comments: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Sanitize input on change
        const sanitizedValue = name === 'email' 
            ? value.toLowerCase().trim() 
            : sanitizeString(value);
        
        setFormData(prev => ({
            ...prev,
            [name]: sanitizedValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);

        try {
            // Validate and sanitize all inputs
            const validatedData = contactSchema.parse({
                name: sanitizeString(formData.name),
                email: sanitizeEmail(formData.email),
                subject: sanitizeString(formData.subject),
                comments: sanitizeString(formData.comments),
            });

            // In a real application, you would send this to an API endpoint
            // For now, we'll just validate and show success
            // TODO: Create API route to handle contact form submissions
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setSuccess(true);
            setFormData({ name: '', email: '', subject: '', comments: '' });
        } catch (err) {
            if (err.errors && Array.isArray(err.errors)) {
                setError(err.errors[0]?.message || "Please check your input and try again.");
            } else {
                setError("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid relative mt-20">
                <div className="grid grid-cols-1">
                    <div className="w-full leading-[0] border-0">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin" 
                            title="my-map" 
                            style={{ border: "0" }} 
                            className="w-full h-[500px]" 
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
            <section className="relative lg:py-24 py-16">
                <div className="container">
                    <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                        <div className="lg:col-span-7 md:col-span-6">
                            <Image src="/images/contact.svg" width={0} height={0} sizes="100vw" style={{ width: "100%", height: "auto" }} alt="" />
                        </div>

                        <div className="lg:col-span-5 md:col-span-6">
                            <div className="lg:ms-5">
                                <div className="bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-700 p-6">
                                    <h3 className="mb-6 text-2xl leading-normal font-semibold">Get in touch !</h3>

                                    {error && (
                                        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                                            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                                        </div>
                                    )}

                                    {success && (
                                        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                                            <p className="text-green-600 dark:text-green-400 text-sm">Thank you! Your message has been sent successfully.</p>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit}>
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                            <div className="lg:col-span-6 mb-5">
                                                <label htmlFor="name" className="font-semibold">Your Name:</label>
                                                <input
                                                    name="name"
                                                    id="name"
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    maxLength={100}
                                                    className="form-input w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0 mt-2"
                                                    placeholder="Name :"
                                                />
                                            </div>

                                            <div className="lg:col-span-6 mb-5">
                                                <label htmlFor="email" className="font-semibold">Your Email:</label>
                                                <input
                                                    name="email"
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    maxLength={254}
                                                    autoComplete="email"
                                                    className="form-input w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0 mt-2"
                                                    placeholder="Email :"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1">
                                            <div className="mb-5">
                                                <label htmlFor="subject" className="font-semibold">Your Question:</label>
                                                <input
                                                    name="subject"
                                                    id="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                    maxLength={200}
                                                    className="form-input w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0 mt-2"
                                                    placeholder="Subject :"
                                                />
                                            </div>

                                            <div className="mb-5">
                                                <label htmlFor="comments" className="font-semibold">Your Comment:</label>
                                                <textarea
                                                    name="comments"
                                                    id="comments"
                                                    value={formData.comments}
                                                    onChange={handleChange}
                                                    required
                                                    maxLength={5000}
                                                    className="form-input w-full py-2 px-3 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0 mt-2 h-40"
                                                    placeholder="Message :"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? "Sending..." : "Send Message"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container lg:mt-24 mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[30px]">
                        <div className="text-center px-6">
                            <div className="relative overflow-hidden text-transparent -m-3">
                                <FiHexagon className="h-24 w-24 fill-amber-400/5 group-hover:fill-white/10 mx-auto" />
                                <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-amber-400 rounded-xl group-hover:text-white duration-500 text-2xl flex align-middle justify-center items-center">
                                    <FiPhone />
                                </div>
                            </div>

                            <div className="content mt-7">
                                <h5 className="title h5 text-lg font-semibold">Phone</h5>
                                <p className="text-slate-400 mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>

                                <div className="mt-5">
                                    <Link href="tel:+152534-468-854" className="hover:text-amber-400">+152 534-468-854</Link>
                                </div>
                            </div>
                        </div>

                        <div className="text-center px-6">
                            <div className="relative overflow-hidden text-transparent -m-3">
                                <FiHexagon className="h-24 w-24 fill-amber-400/5 group-hover:fill-white/10 mx-auto" />
                                <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-amber-400 rounded-xl group-hover:text-white duration-500 text-2xl flex align-middle justify-center items-center">
                                    <FiMail />
                                </div>
                            </div>

                            <div className="content mt-7">
                                <h5 className="title h5 text-lg font-semibold">Email</h5>
                                <p className="text-slate-400 mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>

                                <div className="mt-5">
                                    <Link href="mailto:support@qarsup.com" className="hover:text-amber-400">support@qarsup.com</Link>
                                </div>
                            </div>
                        </div>

                        <div className="text-center px-6">
                            <div className="relative overflow-hidden text-transparent -m-3">
                                <FiHexagon className="h-24 w-24 fill-amber-400/5 group-hover:fill-white/10 mx-auto" />
                                <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-amber-400 rounded-xl group-hover:text-white duration-500 text-2xl flex align-middle justify-center items-center">
                                    <FiMapPin />
                                </div>
                            </div>

                            <div className="content mt-7">
                                <h5 className="title h5 text-lg font-semibold">Location</h5>
                                <p className="text-slate-400 mt-3">C/54 Northwest Freeway, Suite 558, <br /> Houston, USA 485</p>

                                <div className="mt-5">
                                    <Link href="#"
                                        data-type="iframe" className="video-play-icon read-more lightbox hover:text-amber-400">View on Google map</Link>
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
