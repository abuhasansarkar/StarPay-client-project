"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {

    const sectionsLinks = [
        {name: "How It Works", href: "/how-it-works"},
        {name: "Features", href: "/features"},
        {name: "Testimonials", href: "/testimonials"},
        {name: "Pricing", href: "/pricing"},
    ];

    const informationLinks = [
        {name: "FAQ", href: "/faq"},
        {name: "Contact", href: "/contact"},
        {name: "404", href: "/404"},
        {name: "Use Template", href: "/template"},
    ];

    return (
        <footer className="relative w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat h-full w-full"
                style={{
                    backgroundImage: "url('/bg-img.webp')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            />
            {/* Dark Overlay for better text readability */}
            {/* <div className="absolute inset-0 bg-black/10" /> */}

            <div className="relative z-10 container mx-auto px- sm:px-6 lg:px-8 py-16 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    {/* Left Section - Newsletter */}
                    <div className="space-y-6">
                        {/* Heading */}
                        <h2 className="text-2xl lg:text-3xl font-bold text-white">
                            Join our newsletter
                        </h2>

                        {/* Description */}
                        <p className="text-gray-300 text-sm lg:text-base leading-relaxed max-w-md">
                            Sign up to our mailing list below and be the first
                            to know about new updates. Don&apos;t worry, we hate
                            spam too.
                        </p>
                    </div>
                    <div className="hidden md:block"></div>
                    {/* Right Section - Navigation Links */}
                    <div className="grid grid-cols-2 gap-8 lg:gap-12">
                        {/* Sections Column */}
                        <div className="space-y-4">
                            <h3 className="text-white font-bold text-lg mb-4">
                                Sections
                            </h3>
                            <nav className="space-y-3">
                                {sectionsLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="block text-blue-400 hover:text-blue-300 transition-colors text-sm lg:text-base">
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Information Column */}
                        <div className="space-y-4">
                            <h3 className="text-white font-bold text-lg mb-4">
                                Information
                            </h3>
                            <nav className="space-y-3">
                                {informationLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="block text-blue-400 hover:text-blue-300 transition-colors text-sm lg:text-base">
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
