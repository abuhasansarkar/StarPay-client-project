"use client";

import React, {useEffect, useRef, useState} from "react";
import ProductCard from "../ProductCard";

const products = {
    buy: [
        {
            id: "t3-small-smart-pos",
            path: "/buy/t3-small-smart-pos",
            title: "T3 - Small Smart POS",
            subtitle:
                "T3 Smart Desktop POS — Classic, Stable, and Powerful. A full-size POS terminal for fixed business locations.",
            price: "$99",
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
            title: "T1Plus - Compact All-in-One POS",
            subtitle: "Perfect for cafés, salons, or mobile businesses.",
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
                "Made for busy stores and restaurants needing a professional setup.",
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

const Pricing = () => {
    const [activeTab, setActiveTab] = useState<"buy" | "lease">("buy");
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

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

    return (
        <>
            <section
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
                            className={`text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mb-8 ${
                                isVisible
                                    ? "opacity-100 animate-fade-in-scale"
                                    : "opacity-0"
                            }`}
                            style={{animationDelay: "0.2s"}}>
                            Choose from our range of powerful POS terminals. Buy
                            outright or lease with flexible terms.
                        </p>

                        {/* Buy/Lease Tabs */}
                        <div className="inline-flex bg-white rounded-lg p-1">
                            <button
                                onClick={() => setActiveTab("buy")}
                                className={`px-8 py-3 rounded-md text-sm md:text-base font-semibold transition-all cursor-pointer ${
                                    activeTab === "buy"
                                        ? "bg-[rgb(72,47,234)] text-white"
                                        : "bg-transparent text-black hover:bg-gray-100"
                                }`}>
                                Buy
                            </button>
                            <button
                                onClick={() => setActiveTab("lease")}
                                className={`px-8 py-3 rounded-md text-sm md:text-base font-semibold transition-all cursor-pointer ${
                                    activeTab === "lease"
                                        ? "bg-[rgb(72,47,234)] text-white"
                                        : "bg-transparent text-black hover:bg-gray-100"
                                }`}>
                                Lease
                            </button>
                        </div>
                    </div>

                    {/* Product Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4 max-w-[1600px] mx-auto">
                        {currentProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className={`${
                                    isVisible
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
                </div>
            </section>
        </>
    );
};

export default Pricing;
