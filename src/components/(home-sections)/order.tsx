"use client";

import React, {useState, useEffect, useRef, Suspense} from "react";
import {useSearchParams} from "next/navigation";

const OrderForm = () => {
    const searchParams = useSearchParams();

    // Get device and type from URL params
    const deviceParam = searchParams?.get("device");
    const typeParam = searchParams?.get("type");

    const [activeTab, setActiveTab] = useState<"buy" | "lease">(
        typeParam === "buy" || typeParam === "lease" ? typeParam : "buy"
    );
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const [formData, setFormData] = useState({
        device: deviceParam || "t3-small-smart-pos",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        businessName: "",
        companyNo: "",
        message: "",
        paymentMethods: [] as string[],
    });

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

    const devices = [
        {value: "t3-small-smart-pos", label: "T3 Smart Desktop POS"},
        {value: "t1plus-compact-pos", label: "T1Plus - Compact All-in-One POS"},
        {value: "t6-dual-pos", label: "T6 Dual - Large Dual Screen POS"},
        {
            value: "telpo-c9-dual-screen-cash-register",
            label: "Telpo C9 - Dual Screen Cash Register",
        },
    ];

    const paymentOptions = [
        {value: "cards", label: "Cards (Visa, Mastercard, etc) - 0.69%"},
        {value: "dankort", label: "Dankort - 0.3%"},
        {value: "vipps", label: "Vipps/MobilePay - 0.69%"},
        {value: "crypto", label: "Crypto - 0% commission"},
        {value: "alipay", label: "Alipay - 0.99%"},
    ];

    const handlePaymentMethodChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            paymentMethods: prev.paymentMethods.includes(value)
                ? prev.paymentMethods.filter((m) => m !== value)
                : [...prev.paymentMethods, value],
        }));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({type: null, message: ""});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({type: null, message: ""});

        // Console log all form data
        console.log("=== Order Form Submission ===");
        console.log("Form Data:", {
            ...formData,
            type: activeTab,
        });
        console.log("===========================");

        try {
            const response = await fetch("/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    type: activeTab,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus({
                    type: "success",
                    message:
                        data.message ||
                        "Your inquiry has been submitted successfully!",
                });
                // Reset form
                setFormData({
                    device: deviceParam || "t3-small-smart-pos",
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    businessName: "",
                    companyNo: "",
                    message: "",
                    paymentMethods: [],
                });
            } else {
                setSubmitStatus({
                    type: "error",
                    message:
                        data.message ||
                        "Failed to submit your inquiry. Please try again.",
                });
            }
        } catch {
            setSubmitStatus({
                type: "error",
                message: "An error occurred. Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <style jsx global>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
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
                id="contact"
                ref={sectionRef}
                className="relative w-full py-12 md:py-16 lg:py-20 bg-black text-white overflow-hidden">
                {/* Animated Gradient Orbs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Orb 1 - Purple (Top Left) */}
                    <div
                        className="absolute"
                        style={{
                            width: "600px",
                            height: "600px",
                            borderRadius: "40%",
                            background:
                                "radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(124,58,237,0.6) 40%, rgba(91,75,255,0.4) 70%, transparent 100%)",
                            top: "-15%",
                            left: "-10%",
                            filter: "blur(90px)",
                            animation: "orb-float-1 8s ease-in-out infinite",
                        }}
                    />

                    {/* Orb 2 - Blue (Top Right) */}
                    <div
                        className="absolute"
                        style={{
                            width: "550px",
                            height: "550px",
                            borderRadius: "45%",
                            background:
                                "radial-gradient(circle, rgba(59,130,246,0.75) 0%, rgba(37,99,235,0.55) 45%, rgba(29,78,216,0.35) 75%, transparent 100%)",
                            top: "-10%",
                            right: "-10%",
                            filter: "blur(85px)",
                            animation:
                                "orb-float-2 10s ease-in-out infinite 2s",
                        }}
                    />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div
                        className={`flex flex-col items-center text-center mb-12 md:mb-16 max-w-4xl mx-auto ${
                            isVisible
                                ? "opacity-100 animate-fade-in-up"
                                : "opacity-0"
                        }`}>
                        <div className="inline-flex items-center px-5 py-1 md:py-1.5 rounded-full bg-[rgb(72,47,234)] text-white text-xs font-medium mb-6">
                            Contact
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
                            Get In Touch
                        </h2>
                        <p className="text-base md:text-lg text-gray-400">
                            Send and Choose your Device that fits your needs,
                            with everything you need to stay organized and
                            productive.
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className={`max-w-2xl mx-auto ${
                            isVisible
                                ? "opacity-100 animate-fade-in-up"
                                : "opacity-0"
                        }`}
                        style={{animationDelay: "0.2s"}}>
                        {/* Buy/Lease Tabs */}
                        <div className="flex justify-center mb-8">
                            <div className="inline-flex bg-white rounded-full p-1">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("buy")}
                                    className={`px-12 py-3 cursor-pointer rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
                                        activeTab === "buy"
                                            ? "bg-[rgb(72,47,234)] text-white scale-105 shadow-lg"
                                            : "bg-transparent text-black hover:bg-gray-100 scale-100"
                                    }`}>
                                    Buy
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("lease")}
                                    className={`px-12 py-3 cursor-pointer rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
                                        activeTab === "lease"
                                            ? "bg-[rgb(72,47,234)] text-white scale-105 shadow-lg"
                                            : "bg-transparent text-black hover:bg-gray-100 scale-100"
                                    }`}>
                                    Lease
                                </button>
                            </div>
                        </div>

                        {/* Device Dropdown */}
                        <div className="mb-6">
                            <label className="block text-base md:text-lg font-medium mb-2">
                                Devices <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.device}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        device: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-gray-600/50 rounded-xl text-white focus:border-[rgb(72,47,234)] focus:bg-white/10 focus:outline-none transition-all shadow-lg hover:border-[rgb(72,47,234)]/50"
                                required>
                                {devices.map((device) => (
                                    <option
                                        key={device.value}
                                        value={device.value}
                                        className="bg-black text-white">
                                        {device.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Name Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-base md:text-lg font-medium mb-2">
                                    First Name{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="First"
                                    value={formData.firstName}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            firstName: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-[rgb(72,47,234)] focus:bg-white/10 focus:outline-none transition-all shadow-lg hover:border-[rgb(72,47,234)]/50"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-base md:text-lg font-medium mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Last"
                                    value={formData.lastName}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            lastName: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-[rgb(72,47,234)] focus:bg-white/10 focus:outline-none transition-all shadow-lg hover:border-[rgb(72,47,234)]/50"
                                />
                            </div>
                        </div>

                        {/* Email and Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-base md:text-lg font-medium mb-2">
                                    Email{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-[rgb(72,47,234)] focus:bg-white/10 focus:outline-none transition-all shadow-lg hover:border-[rgb(72,47,234)]/50"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-base md:text-lg font-medium mb-2">
                                    Phone Number{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            phone: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-[rgb(72,47,234)] focus:bg-white/10 focus:outline-none transition-all shadow-lg hover:border-[rgb(72,47,234)]/50"
                                    required
                                />
                            </div>
                        </div>

                        {/* Business Name and Company No */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-base md:text-lg font-medium mb-2">
                                    Business name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Business"
                                    value={formData.businessName}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            businessName: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-[rgb(72,47,234)] focus:bg-white/10 focus:outline-none transition-all shadow-lg hover:border-[rgb(72,47,234)]/50"
                                />
                            </div>
                            <div>
                                <label className="block text-base md:text-lg font-medium mb-2">
                                    Company No.
                                </label>
                                <input
                                    type="text"
                                    placeholder="Company"
                                    value={formData.companyNo}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            companyNo: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-[rgb(72,47,234)] focus:bg-white/10 focus:outline-none transition-all shadow-lg hover:border-[rgb(72,47,234)]/50"
                                />
                            </div>
                        </div>
                        {/* Message  */}
                        <div className="mb-6">
                            <label className="block text-base md:text-lg font-medium mb-2">
                                Write your message.
                            </label>
                            <textarea
                                placeholder="Your message"
                                value={formData.message}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        message: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-[rgb(72,47,234)] focus:bg-white/10 focus:outline-none transition-all shadow-lg hover:border-[rgb(72,47,234)]/50 min-h-[70px] resize-y"
                            />
                        </div>

                        {/* Payment Methods */}
                        <div className="mb-8">
                            <label className="block text-base md:text-lg font-medium mb-4 text-white">
                                Select Payment Methods
                            </label>

                            <div className="space-y-3">
                                {paymentOptions.map((option) => {
                                    const isActive =
                                        formData.paymentMethods.includes(
                                            option.value
                                        );
                                    return (
                                        <label
                                            key={option.value}
                                            className="flex items-center gap-3 cursor-pointer select-none">
                                            {/* Hidden native checkbox for accessibility */}
                                            <input
                                                type="checkbox"
                                                checked={isActive}
                                                onChange={() =>
                                                    handlePaymentMethodChange(
                                                        option.value
                                                    )
                                                }
                                                className="sr-only"
                                            />

                                            {/* Toggle Switch */}
                                            <div
                                                className={`relative w-10 h-6 shrink-0 rounded-full transition-colors duration-300 cursor-pointer ${
                                                    isActive
                                                        ? "bg-green-500"
                                                        : "bg-gray-500"
                                                }`}>
                                                <span
                                                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                                                        isActive
                                                            ? "translate-x-4"
                                                            : "translate-x-0"
                                                    }`}
                                                />
                                            </div>

                                            {/* Label Text */}
                                            <span
                                                className={`text-md transition-colors ${
                                                    isActive
                                                        ? "text-white"
                                                        : "text-gray-300"
                                                }`}>
                                                {option.label}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Status Message */}
                        {submitStatus.type && (
                            <div
                                className={`p-4 rounded-lg mb-4 ${
                                    submitStatus.type === "success"
                                        ? "bg-green-500/10 border border-green-500 text-green-500"
                                        : "bg-red-500/10 border border-red-500 text-red-500"
                                }`}>
                                {submitStatus.message}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-3 px-6 py-2 md:py-3 border-2 border-[#5B4BFF] text-white rounded-lg font-medium transition-all duration-300 bg-[#5B4BFF] hover:bg-transparent hover:border-[#5B4BFF] hover:text-white hover:shadow-[0_0_15px_rgba(91,75,255,0.6)] focus:outline-none focus:ring-2 text-center text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                            {isSubmitting
                                ? "Submitting..."
                                : "Request Callback"}
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

const OrderPage = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <OrderForm />
        </Suspense>
    );
};

export default OrderPage;
