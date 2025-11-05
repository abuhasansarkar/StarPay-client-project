"use client";

import React, {useState} from "react";
import Link from "next/link";

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        {name: "Home", href: "/#home"},
        {name: "Testimonials", href: "/#testimonials"},
        {name: "Pricing", href: "/#pricing"},
        {name: "FAQ", href: "/#faq"},
    ];

    // Smooth scroll handler for hash links
    const handleSmoothScroll = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        // Only handle hash links on the same page
        if (href.startsWith("/#") || href.startsWith("#")) {
            e.preventDefault();
            const targetId = href.replace("/#", "").replace("#", "");
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b transition-colors duration-300 bg-black py-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-white">
                            StarPay
                        </Link>
                    </div>

                    {/* Right side - Theme Toggle and Mobile Menu Button */}
                    <div className="flex items-center gap-5">
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) =>
                                        handleSmoothScroll(e, link.href)
                                    }
                                    className="text-md font-medium transition-all duration-200 text-white hover:text-[#5B4BFF] active:scale-95">
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                        {/* Buttons */}
                        <div className="flex-row-reverse md:flex-row flex items-center">
                            {/* Mobile Menu Button */}
                            <button
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="md:hidden p-2 rounded-lg transition-all hover:opacity-70 text-white"
                                aria-label="Toggle menu">
                                {mobileMenuOpen ? (
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>

                            {/* Button 1 */}
                            <Link
                                href="/buy"
                                className="mx-2 md:mx-4 md:px-6 px-4 py-1 md:py-2 border-2 border-[#5B4BFF] text-white rounded-lg font-bold transition-all duration-300 bg-[#5B4BFF] hover:bg-transparent hover:border-[#5B4BFF] hover:text-white hover:shadow-[0_0_15px_rgba(91,75,255,0.6)] md:text-md text-sm cursor-pointer  ">
                                Get Your POS Today
                            </Link>

                            {/* Button 2 */}
                            <Link
                                href="/login"
                                className="px-2 md:px-4 py-1 md:py-2 border-2 border-white/20 text-white rounded-lg font-bold transition-all duration-300 hover:bg-black hover:text-white hover:border-[#5B4BFF] text-sm md:text-md cursor-pointer">
                                LogIn
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-800 transition-all duration-300 bg-black">
                        <nav className="py-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10 active:scale-95 rounded-lg"
                                    onClick={(e) => {
                                        handleSmoothScroll(e, link.href);
                                        setMobileMenuOpen(false);
                                    }}>
                                    {link.name}
                                </Link>
                            ))}
                            <div className="px-4 pt-2 space-y-2">
                                <Link
                                    href="/buy"
                                    className="block w-full px-4 py-2 rounded-lg bg-[#5B4BFF] text-white font-medium text-center transition-all hover:opacity-90"
                                    onClick={() => setMobileMenuOpen(false)}>
                                    Get Your POS Today
                                </Link>
                                <Link
                                    href="/login"
                                    className="block w-full px-4 py-2 rounded-lg border-2 border-white/20 text-white font-medium text-center transition-all hover:opacity-70"
                                    onClick={() => setMobileMenuOpen(false)}>
                                    Sign In
                                </Link>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
