"use client"
import React, { useState } from "react";
import Link from "next/link";
import { FiCheckCircle } from '../assets/icons/vander';

export default function Pricing() {
    // State for Custom plan price slider
    const [customPrice, setCustomPrice] = useState(50);

    /**
     * Handle plan selection
     * Navigates to checkout with plan name and price as URL parameters
     */
    const handlePlanSelect = (planName, price) => {
        // Price will be passed as URL parameter
        return `/checkout?plan=${encodeURIComponent(planName)}&price=${encodeURIComponent(price)}`;
    };

    return (
        <>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6 items-stretch">
                {/* Starter Plan */}
                <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-800 h-full flex flex-col">
                    <div className="p-6 flex flex-col flex-grow">
                        <h5 className="text-2xl leading-normal font-semibold">Starter</h5>
                        <p className="text-slate-400 mt-2">Best for individuals testing Qarsup AI</p>
                        <div className="flex mt-4">
                            <span className="text-lg font-semibold">$</span>
                            <span className="text-5xl font-semibold mb-0 ms-1">5</span>
                        </div>
                        <p className="text-slate-400 uppercase text-xs">one-time or monthly</p>

                        {/* Features List */}
                        <div className="mt-6 space-y-2">
                            <div className="flex items-start">
                                <FiCheckCircle className="text-amber-400 h-5 w-5 me-2 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">Access to core AI content generation tools</span>
                            </div>
                            <div className="flex items-start">
                                <FiCheckCircle className="text-amber-400 h-5 w-5 me-2 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">Suitable for light usage and evaluation</span>
                            </div>
                            <div className="flex items-start">
                                <FiCheckCircle className="text-amber-400 h-5 w-5 me-2 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">Standard processing speed</span>
                            </div>
                            <div className="flex items-start">
                                <FiCheckCircle className="text-amber-400 h-5 w-5 me-2 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">Community support</span>
                            </div>
                        </div>

                        <p className="text-slate-400 text-xs mt-4 italic">Ideal for freelancers, students, and individuals exploring AI-assisted content creation.</p>

                        <div className="mt-auto pt-6">
                            <Link
                                href={handlePlanSelect('Starter', 5)}
                                className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md w-full"
                            >
                                Choose Starter
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Pro Plan */}
                <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-800 h-full flex flex-col">
                    <div className="p-6 flex flex-col flex-grow">
                        <h5 className="text-2xl leading-normal font-semibold">Pro</h5>
                        <p className="text-slate-400 mt-2">Designed for professionals and growing teams</p>
                        <div className="flex mt-4">
                            <span className="text-lg font-semibold">$</span>
                            <span className="text-5xl font-semibold mb-0 ms-1">35</span>
                        </div>
                        <p className="text-slate-400 uppercase text-xs">one-time or monthly</p>

                        {/* Features List */}
                        <div className="mt-6 space-y-2">
                            <div className="flex items-start">
                                <FiCheckCircle className="text-amber-400 h-5 w-5 me-2 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">Extended AI usage limits</span>
                            </div>
                            <div className="flex items-start">
                                <FiCheckCircle className="text-amber-400 h-5 w-5 me-2 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">Faster processing priority</span>
                            </div>
                            <div className="flex items-start">
                                <FiCheckCircle className="text-amber-400 h-5 w-5 me-2 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">Advanced content generation features</span>
                            </div>
                            <div className="flex items-start">
                                <FiCheckCircle className="text-amber-400 h-5 w-5 me-2 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">Increased usage flexibility</span>
                            </div>
                            <div className="flex items-start">
                                <FiCheckCircle className="text-amber-400 h-5 w-5 me-2 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">Priority email support</span>
                            </div>
                        </div>

                        <p className="text-slate-400 text-xs mt-4 italic">Ideal for content creators, startups, and professionals using AI regularly.</p>

                        <div className="mt-auto pt-6">
                            <Link
                                href={handlePlanSelect('Pro', 35)}
                                className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md w-full"
                            >
                                Choose Pro
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Custom Plan */}
                <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-800 h-full flex flex-col">
                    <div className="p-6 flex flex-col flex-grow">
                        <h5 className="text-2xl leading-normal font-semibold">Custom</h5>
                        <p className="text-slate-400 mt-2">Tailored for businesses with specific needs</p>
                        
                        <div className="mt-4">
                            <div className="flex items-baseline">
                                <span className="text-lg font-semibold">$</span>
                                <span className="text-5xl font-semibold mb-0 ms-1">{customPrice}</span>
                            </div>
                            <p className="text-slate-400 uppercase text-xs mt-1">one-time or monthly</p>
                        </div>

                        {/* Price Slider */}
                        <div className="mt-6">
                            <label htmlFor="custom-price-slider" className="block text-sm font-medium text-slate-400 mb-2">
                                Select your price
                            </label>
                            <input
                                id="custom-price-slider"
                                type="range"
                                min="10"
                                max="500"
                                value={customPrice}
                                onChange={(e) => setCustomPrice(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                            />
                            <div className="flex justify-between text-xs text-slate-400 mt-1">
                                <span>$10</span>
                                <span>$500</span>
                            </div>
                        </div>

                        {/* Features List */}
                        <div className="mt-6 space-y-2">
                            <div className="flex items-start">
                                <FiCheckCircle className="text-amber-400 h-5 w-5 me-2 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">Custom usage limits based on selected budget</span>
                            </div>
                            <div className="flex items-start">
                                <FiCheckCircle className="text-amber-400 h-5 w-5 me-2 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">Adjustable pricing via slider</span>
                            </div>
                            <div className="flex items-start">
                                <FiCheckCircle className="text-amber-400 h-5 w-5 me-2 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">Scalable for higher workloads</span>
                            </div>
                            <div className="flex items-start">
                                <FiCheckCircle className="text-amber-400 h-5 w-5 me-2 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">Dedicated support options (future-ready)</span>
                            </div>
                        </div>

                        <p className="text-slate-400 text-xs mt-4 italic">Ideal for agencies, enterprises, and teams requiring scalable AI usage.</p>

                        <div className="mt-auto pt-6">
                            <Link
                                href={handlePlanSelect('Custom', customPrice)}
                                className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md w-full"
                            >
                                Choose Custom
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
