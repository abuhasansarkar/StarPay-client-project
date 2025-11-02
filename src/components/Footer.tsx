"use client";

import React, {useState} from "react";
import Link from "next/link";

const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log("Newsletter subscription:", email);
        setEmail("");
    };

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
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-[#1a0b3d]" />

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
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
