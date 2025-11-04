"use client";

import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "../ProductCard";
// Check icon component
const Check = ({className}: {className?: string}) => (
    <svg
        className={className}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
        />
    </svg>
);

const products = {
    buy: [
        {
            id: "t3-small-smart-pos",
            path: "/buy/t3-small-smart-pos",
            title: "T3 - Small Smart POS",
            subtitle:
                "T3 Smart - Desktop POS — Classic, Stable, and Powerful. A full-size POS terminal for fixed business locations.",
            price: "Kr.99",
            ctaLabel: "Buy Now",
            billingNote: "Billed in one annual payment.",
            features: [
                "4” main touchscreen with customer-facing display option",
                "Powerful processor for smooth operation",
                "Built-in thermal printer, QR scanner, and card reader",
                "Supports ECR integration and accounting automation",
                "Wired and wireless connectivity (LAN/Wi-Fi/4G)",
                "Perfect for supermarkets, restaurants, and offices",
            ],
            quote: "Reliable desktop terminal for serious daily business use",
            imageSrc: "/works/works (1).avif",
        },
        {
            id: "t1plus-compact-pos",
            path: "/buy/t1plus-compact-pos",
            title: "T1 Plus - Compact All-in-One POS",
            subtitle:
                "T1Plus - Perfect for cafés, salons, or mobile businesses.",
            price: "$299",
            ctaLabel: "Buy Now",
            billingNote: "Billed in one annual payment.",
            features: [
                "5.5” HD touchscreen — compact and lightweight design",
                "Built-in printer and barcode scanner",
                "Supports MobilePay, Cards, and Crypto",
                "4G / Wi-Fi / Bluetooth connectivity",
                "Long-life battery for all-day use",
                "Ideal for countertop or handheld operation",
            ],
            quote: "A portable powerhouse for small businesses.",
            imageSrc: "/works/works (2).avif",
        },
        {
            id: "t6-dual-pos",
            path: "/buy/t6-dual-pos",
            title: "T6 Dual - Large Dual Screen POS",
            subtitle:
                "T6 Dual - Made for busy stores and restaurants needing a professional setup.",
            price: "$399",
            ctaLabel: "Buy Now",
            billingNote: "Billed in one annual payment.",
            features: [
                "Dual displays (merchant + customer screen) for instant payment confirmation",
                "Sleek Android interface with intuitive checkout",
                "Integrated printer and NFC card reader",
                "Supports MobilePay, Visa, Mastercard, Crypto",
                "High-speed Wi-Fi and Ethernet for stable connections",
                "Great for cafés, retail shops, and service desks",
            ],
            quote: "Speed, transparency, and style in one device",
            imageSrc: "/works/works (3).avif",
        },
        {
            id: "telpo-c9-dual-screen-cash-register",
            path: "/buy/telpo-c9-dual-screen-cash-register",
            title: "Telpo C9 - Dual Screen Cash Register",
            subtitle:
                "Powerful, elegant, and built for high-volume retail and hospitality.",
            price: "$499",
            ctaLabel: "Buy Now",
            billingNote: "Billed in one annual payment.",
            features: [
                "15.6” Full HD main touchscreen + 10.1” customer display",
                "Accepts MobilePay, Visa, Mastercard & Crypto",
                "Integrated printer and barcode scanner support",
                "High-performance Android OS for smooth checkout",
                "Multiple connectivity options — Wi-Fi, LAN, Bluetooth, USB",
                "Ideal for shops, cafés, and restaurants needing professional counters",
            ],
            quote: "Premium dual-screen POS for seamless business operations",
            imageSrc: "/works/works (4).avif",
        },
    ],
    lease: [
        {
            id: "t3-small-smart-pos",
            path: "/lease/t3-small-smart-pos",
            title: "T3 - Small Smart POS (Lease Option)",
            subtitle:
                "T3 Smart Desktop POS — Classic, Stable, and Powerful. A full-size POS terminal for fixed business locations.",
            price: "$9.99/mo",
            ctaLabel: "Lease Now",
            billingNote: "Monthly lease plan with full support.",
            features: [
                "Includes maintenance and support",
                "Flexible upgrade options",
                "Same great performance with lower upfront cost",
                "Ideal for small and growing businesses",
            ],
            quote: "Start strong without heavy investment.",
            imageSrc: "/works/works (1).avif",
        },
        {
            id: "t1plus-compact-pos",
            path: "/lease/t1plus-compact-pos",
            title: "T1Plus - Compact All-in-One POS (Lease Option)",
            subtitle: "Perfect for cafés, salons, or mobile businesses.",
            price: "$19.99/mo",
            ctaLabel: "Lease Now",
            billingNote: "Monthly lease plan with full support.",
            features: [
                "Includes hardware warranty and service",
                "Quick swap-out for hardware issues",
                "Affordable monthly plan with zero deposit",
                "Ideal for short-term or mobile operations",
            ],
            quote: "Stay mobile, pay as you grow.",
            imageSrc: "/works/works (2).avif",
        },
        {
            id: "t6-dual-pos",
            path: "/lease/t6-dual-pos",
            title: "T6 Dual - Large Dual Screen POS (Lease Option)",
            subtitle:
                "Made for busy stores and restaurants needing a professional setup.",
            price: "$29.99/mo",
            ctaLabel: "Lease Now",
            billingNote: "Monthly lease plan with full support.",
            features: [
                "Professional dual-screen POS setup",
                "Maintenance and software updates included",
                "Fast replacement and upgrade service",
                "Ideal for restaurants, cafés, and retail",
            ],
            quote: "Lease premium performance without high upfront costs.",
            imageSrc: "/works/works (3).avif",
        },
        {
            id: "telpo-c9-dual-screen-cash-register",
            path: "/lease/telpo-c9-dual-screen-cash-register",
            title: "Telpo C9 - Dual Screen Cash Register (Lease Option)",
            subtitle:
                "Powerful, elegant, and built for high-volume retail and hospitality.",
            price: "$39.99/mo",
            ctaLabel: "Lease Now",
            billingNote: "Monthly lease plan with full support.",
            features: [
                "Zero upfront cost, full maintenance coverage",
                "Ideal for large retail environments",
                "Automatic software updates and support",
                "Flexible upgrade or return policy",
            ],
            quote: "Scale your business with minimal risk.",
            imageSrc: "/works/works (4).avif",
        },
    ],
};

export default function Pricing() {
    const [activeTab, setActiveTab] = useState<"buy" | "lease">("buy");
    const [isVisible, setIsVisible] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const handleTabChange = (tab: "buy" | "lease") => {
        if (tab === activeTab) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setActiveTab(tab);
            setTimeout(() => setIsTransitioning(false), 50);
        }, 200);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {threshold: 0.1}
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const currentProducts = products[activeTab];
    const firstThreeProducts = currentProducts.slice(0, 3);
    const lastProduct = currentProducts[3];
    const type = activeTab;

    return (
        <>
            <style jsx global>{`
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
            <section
                id="pricing"
                ref={sectionRef}
                className="w-full py-16 md:py-20 lg:py-28 bg-black">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center mb-12 md:mb-16">
                        <div
                            className={`inline-flex items-center px-5 py-2 rounded-full bg-[rgb(72,47,234)] text-white text-xs md:text-sm font-medium mb-6 ${
                                isVisible
                                    ? "opacity-100 animate-fade-in-scale"
                                    : "opacity-0"
                            }`}>
                            Choose Your Terminal
                        </div>
                        <h2
                            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 ${
                                isVisible
                                    ? "opacity-100 animate-fade-in-scale"
                                    : "opacity-0"
                            }`}
                            style={{animationDelay: "0.1s"}}>
                            Buy or Lease Your POS
                        </h2>
                        <p
                            className={`text-base md:text-lg lg:text-xl text-white/80 max-w-3xl mb-8 px-4 ${
                                isVisible
                                    ? "opacity-100 animate-fade-in-scale"
                                    : "opacity-0"
                            }`}
                            style={{animationDelay: "0.2s"}}>
                            Choose from our range of powerful POS terminals. Buy
                            outright or lease with flexible terms.
                        </p>

                        {/* Buy/Lease Tabs */}
                        <div className="inline-flex bg-white rounded-full p-1">
                            <button
                                type="button"
                                onClick={() => handleTabChange("buy")}
                                className={`px-12 py-3 cursor-pointer rounded-full text-sm md:text-base font-semibold transition-all ${
                                    activeTab === "buy"
                                        ? "bg-[rgb(72,47,234)] text-white"
                                        : "bg-transparent text-black hover:bg-gray-100"
                                }`}>
                                Buy
                            </button>
                            <button
                                type="button"
                                onClick={() => handleTabChange("lease")}
                                className={`px-12 py-3 cursor-pointer rounded-full text-sm md:text-base font-semibold transition-all ${
                                    activeTab === "lease"
                                        ? "bg-[rgb(72,47,234)] text-white"
                                        : "bg-transparent text-black hover:bg-gray-100"
                                }`}>
                                Lease
                            </button>
                        </div>
                    </div>

                    {/* First Three Product Cards Grid */}
                    <div
                        className={`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 max-w-[95%] mx-auto mb-6 transition-all duration-300 ${
                            isTransitioning
                                ? "opacity-0 scale-95"
                                : "opacity-100 scale-100"
                        }`}>
                        {firstThreeProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className={`transition-all duration-500 ${
                                    isVisible && !isTransitioning
                                        ? "opacity-100 animate-fade-in-scale"
                                        : "opacity-0"
                                }`}
                                style={{
                                    animationDelay: `${0.3 + index * 0.1}s`,
                                }}>
                                <ProductCard {...product} />
                            </div>
                        ))}
                    </div>

                    {/* Last Product - Full Width Horizontal Layout */}
                    <div
                        className={`max-w-[95%] mx-auto transition-all duration-300 ${
                            isTransitioning
                                ? "opacity-0 scale-95"
                                : isVisible
                                ? "opacity-100 animate-fade-in-scale"
                                : "opacity-0"
                        }`}
                        style={{animationDelay: "0.6s"}}>
                        <div className="relative group text-white rounded-2xl overflow-hidden shadow-lg border border-white/10 flex flex-col md:flex-row transition-all duration-500 hover:shadow-2xl hover:border-[#5B4BFF]">
                            {/* Animated Gradient Backgrounds */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                                {/* Orb 1 - Purple (Top/Left Area) */}
                                <div
                                    className="absolute"
                                    style={{
                                        width: "200px",
                                        height: "200px",
                                        borderRadius: "40%",
                                        background:
                                            "radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(124,58,237,0.6) 40%, rgba(91,75,255,0.4) 70%, transparent 100%)",
                                        top: "10%",
                                        left: "15%",
                                        filter: "blur(70px)",
                                        animation:
                                            "orb-float-1 8s ease-in-out infinite",
                                    }}
                                />

                                {/* Orb 2 - Purple (Middle Area) */}
                                <div
                                    className="absolute"
                                    style={{
                                        width: "160px",
                                        height: "160px",
                                        borderRadius: "50%",
                                        background:
                                            "radial-gradient(circle, rgba(168,85,247,0.7) 0%, rgba(147,51,234,0.5) 50%, rgba(126,34,206,0.3) 80%, transparent 100%)",
                                        top: "45%",
                                        left: "50%",
                                        filter: "blur(65px)",
                                        animation:
                                            "orb-float-2 12s ease-in-out infinite 1.5s",
                                    }}
                                />

                                {/* Orb 3 - Blue (Bottom Right Area) */}
                                <div
                                    className="absolute"
                                    style={{
                                        width: "220px",
                                        height: "220px",
                                        borderRadius: "45%",
                                        background:
                                            "radial-gradient(circle, rgba(59,130,246,0.75) 0%, rgba(37,99,235,0.55) 45%, rgba(29,78,216,0.35) 75%, transparent 100%)",
                                        bottom: "5%",
                                        right: "5%",
                                        filter: "blur(80px)",
                                        animation:
                                            "orb-float-3 10s ease-in-out infinite 2s",
                                    }}
                                />
                            </div>

                            {/* Image - Left Side */}
                            <div className="relative w-full md:w-1/2 z-10 overflow-hidden">
                                <Image
                                    src={lastProduct.imageSrc}
                                    alt={lastProduct.title}
                                    fill
                                    className="object-cover transition-transform duration-500  group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>

                            {/* Content - Right Side */}
                            <div className="p-6 md:p-8 flex flex-col grow md:w-1/2 relative z-10">
                                <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold">
                                    {lastProduct.title}
                                </h2>
                                <p className="text-base md:text-lg lg:text-xl text-gray-300 mt-2 leading-relaxed">
                                    {lastProduct.subtitle}
                                </p>

                                {/* Price */}
                                <div className="mt-4 mb-2 text-5xl lg:text-5xl font-bold text-white">
                                    {lastProduct.price}
                                </div>

                                {/* CTA */}
                                <Link
                                    href={`/${type}?device=${lastProduct.id}&type=${type}`}
                                    className="mt-3 px-6 py-2 md:py-3 border-2 border-[#5B4BFF] text-white rounded-lg 
                  font-medium transition-all duration-300
                 bg-[#5B4BFF] hover:bg-transparent hover:border-[#5B4BFF] hover:text-white hover:shadow-[0_0_15px_rgba(91,75,255,0.6)]
                  focus:outline-none focus:ring-2 text-center text-lg">
                                    {lastProduct.ctaLabel}
                                </Link>

                                <p className="text-sm md:text-base text-gray-400 mt-2 text-center">
                                    {lastProduct.billingNote}
                                </p>

                                {/* Features */}
                                <div className="mt-6">
                                    <h3 className="text-lg md:text-xl font-semibold mb-3">
                                        Key Features:
                                    </h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-md md:text-lg text-white font-medium">
                                        {lastProduct.features.map(
                                            (feature, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-2">
                                                    <Check className="w-5 h-5 md:w-6 md:h-6 text-white shrink-0 mt-0.5" />
                                                    <span>{feature}</span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>

                                {/* Quote */}
                                <p className="mt-6 italic text-md md:text-lg text-gray-400 leading-relaxed">
                                    {lastProduct.quote}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
