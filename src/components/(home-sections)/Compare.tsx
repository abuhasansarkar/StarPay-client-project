"use client";

import React, {useState, useEffect, useRef} from "react";

const Compare = () => {
    const [buyAccordionOpen, setBuyAccordionOpen] = useState(false);
    const [leaseAccordionOpen, setLeaseAccordionOpen] = useState(true);
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

    const handleAccordionToggle = (accordion: "buy" | "lease") => {
        if (accordion === "buy") {
            setBuyAccordionOpen(!buyAccordionOpen);
            if (!buyAccordionOpen) {
                setLeaseAccordionOpen(false);
            }
        } else {
            setLeaseAccordionOpen(!leaseAccordionOpen);
            if (!leaseAccordionOpen) {
                setBuyAccordionOpen(false);
            }
        }
    };

    return (
        <>
            <style jsx global>{`
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-slide-in-up {
                    animation: slideInUp 0.8s ease-out forwards;
                }
            `}</style>

            <section
                ref={sectionRef}
                className="w-full py-16 md:py-20 lg:py-28 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Heading */}
                    <div
                        className={`flex flex-col items-center text-center mb-12 md:mb-16 max-w-5xl mx-auto ${
                            isVisible
                                ? "opacity-100 animate-slide-in-up"
                                : "opacity-0"
                        }`}>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6">
                            Compare Pricing & Fees
                        </h2>
                        <p className="text-base md:text-lg text-gray-600 mb-2">
                            See how StarPay stacks up against Denmark&apos;s
                            leading POS and payment providers.
                        </p>
                        <p className="text-base md:text-lg text-gray-600">
                            Here&apos;s how StarPay compares with other leading
                            POS providers in Denmark — on fees, flexibility, and
                            supported payment types.
                        </p>
                    </div>

                    {/* Main Comparison Table */}
                    <div
                        className={`max-w-6xl mx-auto mb-8 ${
                            isVisible
                                ? "opacity-100 animate-slide-in-up"
                                : "opacity-0"
                        }`}
                        style={{animationDelay: "0.2s"}}>
                        <div className="overflow-x-auto rounded-2xl border border-gray-300">
                            <table className="w-full min-w-[640px]">
                                {/* Header */}
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 md:px-6 py-4 text-left text-sm md:text-base font-medium text-gray-700 min-w-[180px]">
                                            {/* Empty cell */}
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-center text-base md:text-lg font-bold text-[rgb(72,47,234)] min-w-[120px]">
                                            StarPay
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-center text-sm md:text-base font-semibold text-gray-900 min-w-[120px]">
                                            Nets
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-center text-sm md:text-base font-semibold text-gray-900 min-w-[120px]">
                                            iZettle
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-center text-sm md:text-base font-semibold text-gray-900 min-w-[120px]">
                                            Flatpay
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-center text-sm md:text-base font-semibold text-gray-900 min-w-[120px]">
                                            Verifone
                                        </th>
                                    </tr>
                                </thead>

                                {/* Body */}
                                <tbody className="bg-white">
                                    <tr className="border-t border-gray-200 hover:bg-gray-50">
                                        <td className="px-4 md:px-6 py-4 text-sm md:text-base font-medium text-gray-700">
                                            Visa/Master/JCB
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-base md:text-lg font-bold text-green-600">
                                            0.79%
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                            1.30%
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                            1.95%
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                            0.99%
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                            0.99%
                                        </td>
                                    </tr>

                                    <tr className="border-t border-gray-200 hover:bg-gray-50">
                                        <td className="px-4 md:px-6 py-4 text-sm md:text-base font-medium text-gray-700">
                                            Dankort
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-base md:text-lg font-bold text-green-600">
                                            0.33%
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                            0.33%
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                            N/A
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                            N/A
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                            N/A
                                        </td>
                                    </tr>

                                    <tr className="border-t border-gray-200 hover:bg-gray-50">
                                        <td className="px-4 md:px-6 py-4 text-sm md:text-base font-medium text-gray-700">
                                            Vipps/MobilePay
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-base md:text-lg font-bold text-green-600">
                                            0.69%
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                            N/A
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                            1.95%
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                            N/A
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                            0.99%
                                        </td>
                                    </tr>

                                    <tr className="border-t border-gray-200 hover:bg-gray-50">
                                        <td className="px-4 md:px-6 py-4 text-sm md:text-base font-medium text-gray-700">
                                            Crypto payments
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-base md:text-lg font-bold text-green-600">
                                            0%
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                            N/A
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                            N/A
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                            N/A
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                            N/A
                                        </td>
                                    </tr>

                                    <tr className="border-t border-gray-200 hover:bg-gray-50">
                                        <td className="px-4 md:px-6 py-4 text-sm md:text-base font-medium text-gray-700">
                                            AliPay
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-base md:text-lg font-bold text-green-600">
                                            0%
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                            N/A
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                            N/A
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                            N/A
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                            N/A
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Accordions */}
                    <div className="max-w-6xl mx-auto space-y-4">
                        {/* Buy Terminal Accordion */}
                        <div className="rounded-2xl border border-gray-300 overflow-hidden">
                            <button
                                onClick={() => handleAccordionToggle("buy")}
                                className="w-full flex items-center justify-between px-6 md:px-8 py-5 bg-gray-100 hover:bg-gray-200 transition-colors">
                                <span className="text-base md:text-lg font-semibold text-gray-900">
                                    Buy terminal:
                                </span>
                                <span className="text-2xl font-bold text-gray-900">
                                    {buyAccordionOpen ? "−" : "+"}
                                </span>
                            </button>

                            {buyAccordionOpen && (
                                <div className="bg-white">
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[640px]">
                                            <tbody>
                                                <tr className="border-t border-gray-200 hover:bg-gray-50">
                                                    <td className="px-4 md:px-6 py-4 text-sm md:text-base font-medium text-gray-700 min-w-[180px]">
                                                        Rent per month
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-base md:text-lg font-bold text-green-600 min-w-[120px]">
                                                        149kr
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600 min-w-[120px]">
                                                        199kr
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600 min-w-[120px]">
                                                        N/A
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600 min-w-[120px]">
                                                        N/A
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600 min-w-[120px]">
                                                        349kr
                                                    </td>
                                                </tr>

                                                <tr className="border-t border-gray-200 hover:bg-gray-50">
                                                    <td className="px-4 md:px-6 py-4 text-sm md:text-base font-medium text-gray-700">
                                                        Extra charges
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-base md:text-lg font-bold text-green-600">
                                                        No
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                                        Yes
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                                        N/A
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                                        N/A
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                                        Yes
                                                    </td>
                                                </tr>

                                                <tr className="border-t border-gray-200 hover:bg-gray-50">
                                                    <td className="px-4 md:px-6 py-4 text-sm md:text-base font-medium text-gray-700">
                                                        Contract length
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-base md:text-lg font-bold text-green-600">
                                                        12 months
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                                        36 months
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                                        N/A
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                                        N/A
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                                        24 months
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Lease Terminal Accordion */}
                        <div className="rounded-2xl border border-gray-300 overflow-hidden">
                            <button
                                onClick={() => handleAccordionToggle("lease")}
                                className="w-full flex items-center justify-between px-6 md:px-8 py-5 bg-gray-100 hover:bg-gray-200 transition-colors">
                                <span className="text-base md:text-lg font-semibold text-gray-900">
                                    Lease terminal:
                                </span>
                                <span className="text-2xl font-bold text-gray-900">
                                    {leaseAccordionOpen ? "−" : "+"}
                                </span>
                            </button>

                            {leaseAccordionOpen && (
                                <div className="bg-white">
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[640px]">
                                            <tbody>
                                                <tr className="border-t border-gray-200 hover:bg-gray-50">
                                                    <td className="px-4 md:px-6 py-4 text-sm md:text-base font-medium text-gray-700 min-w-[180px]">
                                                        Rent per month
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-base md:text-lg font-bold text-green-600 min-w-[120px]">
                                                        149kr
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600 min-w-[120px]">
                                                        199kr
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600 min-w-[120px]">
                                                        N/A
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600 min-w-[120px]">
                                                        N/A
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600 min-w-[120px]">
                                                        349kr
                                                    </td>
                                                </tr>

                                                <tr className="border-t border-gray-200 hover:bg-gray-50">
                                                    <td className="px-4 md:px-6 py-4 text-sm md:text-base font-medium text-gray-700">
                                                        Extra charges
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-base md:text-lg font-bold text-green-600">
                                                        No
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                                        Yes
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                                        N/A
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                                        N/A
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                                        Yes
                                                    </td>
                                                </tr>

                                                <tr className="border-t border-gray-200 hover:bg-gray-50">
                                                    <td className="px-4 md:px-6 py-4 text-sm md:text-base font-medium text-gray-700">
                                                        Contract length
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-base md:text-lg font-bold text-green-600">
                                                        12 months
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                                        36 months
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                                        N/A
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                                        N/A
                                                    </td>
                                                    <td className="px-4 md:px-6 py-4 text-center text-sm md:text-base text-gray-600">
                                                        24 months
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bottom CTA Section */}
                    <div className="mt-16 md:mt-20 text-center max-w-4xl mx-auto">
                        <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed">
                            StarPay gives you the freedom to accept every
                            payment — with lower fees, no hidden costs, and full
                            Danish support. Ready to switch? Start saving today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a
                                href="#pricing"
                                className="px-8 py-4 rounded-xl bg-[rgb(72,47,234)] text-white text-sm md:text-base font-semibold hover:opacity-90 transition-all">
                                Compare Models
                            </a>
                            <a
                                href="/buy"
                                className="px-8 py-4 rounded-xl bg-black text-white text-sm md:text-base font-semibold hover:bg-gray-800 transition-all">
                                Order Your POS
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Compare;
