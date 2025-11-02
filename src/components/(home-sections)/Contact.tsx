"use client";

import React, {useState, useEffect, useRef, Suspense} from "react";
import {useSearchParams} from "next/navigation";

const ContactForm = () => {
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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

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
        {value: "cards", label: "Cards (Vis, Mastercard, etc) - 0.69% 1"},
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch("/api/contact", {
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

            if (!response.ok) {
                throw new Error(data.message || "Failed to send message");
            }

            setSubmitStatus({
                type: "success",
                message:
                    "Thank you! Your inquiry has been submitted successfully. We'll get back to you soon.",
            });

            // Reset form on success
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
        } catch (error) {
            setSubmitStatus({
                type: "error",
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to send message. Please try again.",
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
            `}</style>

            <section
                id="contact"
                ref={sectionRef}
                className="w-full py-16 md:py-20 lg:py-28 bg-black text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div
                        className={`flex flex-col items-center text-center mb-12 md:mb-16 max-w-4xl mx-auto ${
                            isVisible
                                ? "opacity-100 animate-fade-in-up"
                                : "opacity-0"
                        }`}>
                        <div className="inline-flex items-center px-5 py-2 rounded-full bg-[rgb(72,47,234)] text-white text-xs md:text-sm font-medium mb-6">
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
                        {/* Status Messages */}
                        {submitStatus && (
                            <div
                                className={`mb-6 p-4 rounded-lg ${
                                    submitStatus.type === "success"
                                        ? "bg-green-500/10 border border-green-500/30 text-green-400"
                                        : "bg-red-500/10 border border-red-500/30 text-red-400"
                                }`}>
                                <div className="flex items-start gap-3">
                                    {submitStatus.type === "success" ? (
                                        <svg
                                            className="w-5 h-5 mt-0.5 shrink-0"
                                            fill="currentColor"
                                            viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-5 h-5 mt-0.5 shrink-0"
                                            fill="currentColor"
                                            viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                    <p className="text-sm font-medium">
                                        {submitStatus.message}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Buy/Lease Tabs */}
                        <div className="flex justify-center mb-8">
                            <div className="inline-flex bg-white rounded-lg p-1">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("buy")}
                                    disabled={isSubmitting}
                                    className={`px-12 py-3 rounded-md text-sm md:text-base font-semibold transition-all disabled:cursor-not-allowed ${
                                        activeTab === "buy"
                                            ? "bg-[rgb(72,47,234)] text-white"
                                            : "bg-transparent text-black hover:bg-gray-100 disabled:hover:bg-transparent"
                                    }`}>
                                    Buy
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("lease")}
                                    disabled={isSubmitting}
                                    className={`px-12 py-3 rounded-md text-sm md:text-base font-semibold transition-all disabled:cursor-not-allowed ${
                                        activeTab === "lease"
                                            ? "bg-[rgb(72,47,234)] text-white"
                                            : "bg-transparent text-black hover:bg-gray-100 disabled:hover:bg-transparent"
                                    }`}>
                                    Lease
                                </button>
                            </div>
                        </div>

                        {/* Device Dropdown */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">
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
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white focus:border-[rgb(72,47,234)] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                                <label className="block text-sm font-medium mb-2">
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
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-[rgb(72,47,234)] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
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
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-[rgb(72,47,234)] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Email and Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">
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
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-[rgb(72,47,234)] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
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
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-[rgb(72,47,234)] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    required
                                />
                            </div>
                        </div>

                        {/* Business Name and Company No */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">
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
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-[rgb(72,47,234)] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
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
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-[rgb(72,47,234)] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>
                        {/* Message  */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">
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
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-[rgb(72,47,234)] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>

                        {/* Payment Methods */}
                        <div className="mb-8">
                            <label className="block text-sm font-medium mb-4">
                                Select Payment Methods
                            </label>
                            <div className="space-y-3">
                                {paymentOptions.map((option) => (
                                    <label
                                        key={option.value}
                                        className={`flex items-center gap-3 ${
                                            isSubmitting
                                                ? "cursor-not-allowed opacity-50"
                                                : "cursor-pointer"
                                        } group`}>
                                        <input
                                            type="checkbox"
                                            checked={formData.paymentMethods.includes(
                                                option.value
                                            )}
                                            onChange={() =>
                                                handlePaymentMethodChange(
                                                    option.value
                                                )
                                            }
                                            disabled={isSubmitting}
                                            className="w-5 h-5 rounded border-gray-600 text-[rgb(72,47,234)] focus:ring-[rgb(72,47,234)] focus:ring-offset-0 bg-transparent cursor-pointer disabled:cursor-not-allowed"
                                        />
                                        <span className="text-gray-300 group-hover:text-white transition-colors">
                                            {option.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-[rgb(72,47,234)] text-white font-semibold rounded-lg hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2">
                            {isSubmitting ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Sending...</span>
                                </>
                            ) : (
                                "Request Callback"
                            )}
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

const Contact = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <ContactForm />
        </Suspense>
    );
};

export default Contact;
