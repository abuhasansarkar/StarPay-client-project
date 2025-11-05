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
            <style jsx>{`
                @keyframes gradient-flow {
                    0%,
                    100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                .gradient-bg {
                    background: linear-gradient(
                        135deg,
                        #000000 0%,
                        #1a0b2e 25%,
                        #2d1b4e 50%,
                        #1a0b2e 75%,
                        #000000 100%
                    );
                    background-size: 200% 200%;
                    animation: gradient-flow 15s ease infinite;
                }

                @keyframes orb-float-1 {
                    0%,
                    100% {
                        transform: translate(0, 0) scale(1) rotate(0deg);
                        opacity: 0.5;
                    }
                    33% {
                        transform: translate(25px, -20px) scale(1.2)
                            rotate(120deg);
                        opacity: 0.75;
                    }
                    66% {
                        transform: translate(-15px, 15px) scale(1.05)
                            rotate(240deg);
                        opacity: 0.6;
                    }
                }

                @keyframes orb-float-2 {
                    0%,
                    100% {
                        transform: translate(0, 0) scale(1) rotate(0deg);
                        opacity: 0.45;
                    }
                    40% {
                        transform: translate(-30px, 25px) scale(1.25)
                            rotate(-90deg);
                        opacity: 0.7;
                    }
                    70% {
                        transform: translate(20px, -15px) scale(1.1)
                            rotate(-180deg);
                        opacity: 0.55;
                    }
                }

                @keyframes orb-float-3 {
                    0%,
                    100% {
                        transform: translate(0, 0) scale(1) rotate(0deg);
                        opacity: 0.5;
                    }
                    50% {
                        transform: translate(15px, 30px) scale(1.15)
                            rotate(45deg);
                        opacity: 0.75;
                    }
                }
            `}</style>

            <footer className="relative w-full overflow-hidden gradient-bg  bg-black">
                {/* Animated Gradient Orbs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Orb 1 - Purple (Top/Left) */}
                    <div
                        className="absolute"
                        style={{
                            width: "500px",
                            height: "500px",
                            borderRadius: "40%",
                            background:
                                "radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(124,58,237,0.6) 40%, rgba(91,75,255,0.4) 70%, transparent 100%)",
                            top: "-10%",
                            left: "-10%",
                            filter: "blur(90px)",
                            animation: "orb-float-1 8s ease-in-out infinite",
                        }}
                    />

                    {/* Orb 2 - Purple (Middle) */}
                    <div
                        className="absolute"
                        style={{
                            width: "400px",
                            height: "400px",
                            borderRadius: "50%",
                            background:
                                "radial-gradient(circle, rgba(168,85,247,0.7) 0%, rgba(147,51,234,0.5) 50%, rgba(126,34,206,0.3) 80%, transparent 100%)",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            filter: "blur(85px)",
                            animation:
                                "orb-float-2 12s ease-in-out infinite 1.5s",
                        }}
                    />

                    {/* Orb 3 - Blue (Bottom Right) */}
                    <div
                        className="absolute"
                        style={{
                            width: "600px",
                            height: "600px",
                            borderRadius: "45%",
                            background:
                                "radial-gradient(circle, rgba(59,130,246,0.75) 0%, rgba(37,99,235,0.55) 45%, rgba(29,78,216,0.35) 75%, transparent 100%)",
                            bottom: "-15%",
                            right: "-15%",
                            filter: "blur(100px)",
                            animation:
                                "orb-float-3 10s ease-in-out infinite 2s",
                        }}
                    />
                </div>

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
                                businesses. Get started with our cutting-edge
                                POS terminals today.
                            </p>
                            <div className="pt-4">
                                <Link
                                    href="/#pricing"
                                    className="inline-block px-6 py-2 md:py-2.5 border-2 border-[#5B4BFF] text-white rounded-lg font-medium transition-all duration-300 bg-[#5B4BFF] hover:bg-transparent hover:border-[#5B4BFF] hover:text-white hover:shadow-[0_0_15px_rgba(91,75,255,0.6)] focus:outline-none focus:ring-2 text-center text-lg cursor-pointer">
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
        </>
    );
};

export default Footer;
