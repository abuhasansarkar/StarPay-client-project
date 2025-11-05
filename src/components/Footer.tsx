"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
    const sectionsLinks = [
        {name: "How It Works", href: "/#how-it-works"},
        {name: "Features", href: "/#features"},
        {name: "Testimonials", href: "/#testimonials"},
        {name: "Pricing", href: "/#pricing"},
    ];

    const informationLinks = [
        {name: "FAQ", href: "/faq"},
        {name: "Contact", href: "/#contact"},
        {name: "Privacy Policy", href: "/privacy"},
        {name: "Terms of Service", href: "/terms"},
    ];

    return (
        <>
            <section className="bg-black ">
                <footer className="relative w-full overflow-hidden bg-gradient-to-b from-black to-[#482fea]/30">
                    <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 lg:py-20 lg:px-8">
                        {/* Main Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-12">
                            {/* Brand Section */}

                            <div className="space-y-4 lg:col-span-3">
                                <h2 className="text-3xl lg:text-4xl font-bold text-white">
                                    StarPay
                                </h2>
                                <p className="text-gray-300 text-sm lg:text-base leading-relaxed max-w-md">
                                    Revolutionizing payment solutions for modern
                                    businesses. Get started with our
                                    cutting-edge POS terminals today.
                                </p>
                                <div className="pt-4">
                                    <Link
                                        href="/#pricing"
                                        className="inline-block px-6 py-1 md:py-2 border-2 border-[#5B4BFF] text-white rounded-lg font-medium transition-all duration-300 bg-[#5B4BFF] hover:bg-transparent hover:border-[#5B4BFF] hover:text-white hover:shadow-[0_0_15px_rgba(91,75,255,0.6)] focus:outline-none focus:ring-2 text-center text-lg cursor-pointer">
                                        Get Started
                                    </Link>
                                </div>
                            </div>

                            <div className="lg:col-span-2 flex lg:flex-row justify-between">
                                {/* Sections Column */}
                                <div className="space-y-4">
                                    <h3 className="text-white font-bold text-lg">
                                        Quick Links
                                    </h3>
                                    <nav className="space-y-3">
                                        {sectionsLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                className="block text-gray-400 hover:text-[#5B4BFF] transition-colors text-sm lg:text-base duration-300">
                                                {link.name}
                                            </Link>
                                        ))}
                                    </nav>
                                </div>

                                {/* Information Column */}
                                <div className="space-y-4">
                                    <h3 className="text-white font-bold text-lg">
                                        Support
                                    </h3>
                                    <nav className="space-y-3">
                                        {informationLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                className="block text-gray-400 hover:text-[#5B4BFF] transition-colors text-sm lg:text-base duration-300">
                                                {link.name}
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-[#5B4BFF]/10 my-8"></div>

                        {/* Bottom Section */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-gray-400 text-sm">
                                © {new Date().getFullYear()} StarPay. All rights
                                reserved.
                            </p>
                            <div className="flex gap-6">
                                <Link
                                    href="/privacy"
                                    className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Privacy
                                </Link>
                                <Link
                                    href="/terms"
                                    className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Terms
                                </Link>
                                <Link
                                    href="/#contact"
                                    className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Contact
                                </Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </section>
        </>
    );
};

export default Footer;
