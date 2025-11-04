"use client";

import React, {useState, useEffect, useRef} from "react";
import {Phone, Mail} from "lucide-react";
import Link from "next/link";

const Contact = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const [formData, setFormData] = useState({
        fullName: "",
        businessName: "",
        email: "",
        phoneNumber: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({type: null, message: ""});

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({type: null, message: ""});

        // Log all form data
        console.log("Form Data Submitted:", {
            fullName: formData.fullName,
            businessName: formData.businessName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            message: formData.message,
            timestamp: new Date().toISOString(),
        });

        // For now, just simulate success since no backend contact endpoint exists
        setTimeout(() => {
            setSubmitStatus({
                type: "success",
                message:
                    "Thank you for contacting us! We'll get back to you soon.",
            });
            setFormData({
                fullName: "",
                businessName: "",
                email: "",
                phoneNumber: "",
                message: "",
            });
            setIsSubmitting(false);
        }, 1000);
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
                className="relative w-full py-16 md:py-20 lg:py-20 bg-black text-white overflow-hidden">
                {/* Animated Gradient Orbs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Orb 1 - Purple (Top Left) */}
                    {/* <div
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
                    /> */}

                    {/* Orb 2 - Blue (Top Right) */}
                    {/* <div
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
                            animation: "orb-float-2 10s ease-in-out infinite 2s",
                        }}
                    /> */}
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                    <div
                        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 ${
                            isVisible
                                ? "opacity-100 animate-fade-in-up"
                                : "opacity-0"
                        }`}>
                        {/* Left Side - Info */}
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl md:text-3xl font-bold mb-6">
                                StarPay
                            </h3>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                Get in touch
                            </h2>
                            <p className="text-base md:text-lg text-gray-400 mb-8 leading-relaxed">
                                Have questions or need help choosing the right
                                POS? <br /> Our team is ready to help you get
                                started today.
                            </p>

                            <div className="mb-6">
                                <h4 className="text-lg font-semibold mb-4">
                                    Prefer a quick chat or Call ?
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <Phone className="w-5 h-5" />
                                        <Link href={"tel:+45 1234 5678"}>
                                            +45 1234 5678
                                        </Link>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <Mail className="w-5 h-5" />
                                        <Link
                                            href={
                                                "mailto:support@starpayments.eu"
                                            }>
                                            support@starpayments.eu
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="#pricing"
                                className="mt-3 px-6 py-2 md:py-2.5 border-2 border-[#5B4BFF] text-white rounded-lg font-medium transition-all duration-300 bg-[#5B4BFF] hover:bg-transparent hover:border-[#5B4BFF] hover:text-white hover:shadow-[0_0_15px_rgba(91,75,255,0.6)] focus:outline-none focus:ring-2 text-center text-lg w-fit">
                                Get Your Terminal Today
                            </Link>
                        </div>

                        {/* Right Side - Form */}
                        <div
                            className={`${
                                isVisible
                                    ? "opacity-100 animate-fade-in-up"
                                    : "opacity-0"
                            }`}
                            style={{animationDelay: "0.2s"}}>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-lg text-white mb-1">
                                        Full Name{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={formData.fullName}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                fullName: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-[rgb(72,47,234)] focus:bg-white/10 focus:outline-none transition-all shadow-lg hover:border-[rgb(72,47,234)]/50"
                                        required
                                    />
                                </div>

                                {/* Email and Phone */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-lg text-white mb-1">
                                            Email{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
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
                                        <label className="block text-lg text-white mb-1">
                                            Phone Number{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="Phone"
                                            value={formData.phoneNumber}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    phoneNumber: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-[rgb(72,47,234)] focus:bg-white/10 focus:outline-none transition-all shadow-lg hover:border-[rgb(72,47,234)]/50"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-lg text-white mb-1">
                                        Message or Questions
                                    </label>
                                    <textarea
                                        placeholder="Write your message or Questions..."
                                        value={formData.message}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                message: e.target.value,
                                            })
                                        }
                                        rows={4}
                                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-[rgb(72,47,234)] focus:bg-white/10 focus:outline-none transition-all shadow-lg hover:border-[rgb(72,47,234)]/50 min-h-[120px] resize-y"
                                    />
                                </div>

                                {/* Status Message */}
                                {submitStatus.type && (
                                    <div
                                        className={`p-4 rounded-lg ${
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
                                    className="w-full mt-3 px-6 py-2 md:py-2.5 border-2 border-[#5B4BFF] text-white rounded-lg font-medium transition-all duration-300 bg-[#5B4BFF] hover:bg-transparent hover:border-[#5B4BFF] hover:text-white hover:shadow-[0_0_15px_rgba(91,75,255,0.6)] focus:outline-none focus:ring-2 text-center text-lg cursor-pointer disabled:opacity-50 ">
                                    {isSubmitting
                                        ? "Sending..."
                                        : "Send Message"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
