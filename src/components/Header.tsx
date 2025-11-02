"use client";

import React, {useState} from "react";
import Link from "next/link";

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        {name: "Home", href: "/"},
        {name: "Services", href: "/services"},
        {name: "About", href: "/about"},
        {name: "Contact", href: "/contact"},
    ];

    return (
        <header
            className="sticky top-0 z-50 w-full border-b transition-colors duration-300"
            style={{
                backgroundColor: "var(--header-bg)",
                borderColor: "var(--border)",
            }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="">
                        <Link
                            href="/"
                            className="text-2xl font-bold"
                            style={{color: "var(--header-text)"}}>
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
                                    className="text-sm font-medium transition-opacity hover:opacity-70"
                                    style={{color: "var(--header-text)"}}>
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
                                className="md:hidden p-2 rounded-lg transition-all hover:opacity-70"
                                style={{color: "var(--header-text)"}}
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
                                className=" bg-[rgb(72,47,234)] hidden md:block px-4 py-2 rounded-lg text-white font-medium transition-all hover:opacity-90">
                                Get Your POS Today
                            </Link>

                            {/* Button 2 */}
                            <Link
                                href="/login"
                                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-70"
                                style={{color: "var(--header-text)"}}>
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div
                        className="md:hidden border-t transition-all duration-300"
                        style={{borderColor: "var(--border)"}}>
                        <nav className="py-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block px-4 py-2 text-sm font-medium transition-opacity hover:opacity-70"
                                    style={{color: "var(--header-text)"}}
                                    onClick={() => setMobileMenuOpen(false)}>
                                    {link.name}
                                </Link>
                            ))}
                            <div className="px-4 pt-2 space-y-2">
                                <Link
                                    href="/buy"
                                    className="block w-full px-4 py-2 rounded-lg text-white font-medium text-center transition-all hover:opacity-90"
                                    style={{backgroundColor: "var(--primary)"}}
                                    onClick={() => setMobileMenuOpen(false)}>
                                    Get Your POS Today
                                </Link>
                                <Link
                                    href="/login"
                                    className="block w-full px-4 py-2 rounded-lg font-medium text-center transition-all hover:opacity-70"
                                    style={{color: "var(--header-text)"}}
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
