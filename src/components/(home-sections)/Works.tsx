"use client";

import React, {useState, useEffect, useRef} from "react";
import Image from "next/image";

const Works = () => {
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

    const stepsData = [
        {
            id: 1,
            title: "Choose Your POS Terminal",
            description:
                "Choose from four powerful models — from compact handhelds to dual-screen and ECR-approved systems. Each is built for Danish SMEs and ready to accept MobilePay, cards, and crypto.",
            image: "/works/works (1).avif",
        },
        {
            id: 2,
            title: "Activate & Connect",
            description:
                "Once your terminal arrives, simply power it on. Our support team will help you connect it to Wi-Fi and link your payment accounts within minutes.",
            image: "/works/works (2).avif",
        },
        {
            id: 3,
            title: "Start Accepting Payments",
            description:
                "Begin taking payments instantly — with no hidden fees and 24/7 Danish support to keep your business running smoothly.",
            image: "/works/works (3).avif",
        },
    ];

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
                ref={sectionRef}
                className="w-full py-16 md:py-20 lg:py-20 bg-white overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div
                        className={`flex flex-col items-center text-center mb-12 md:mb-16 max-w-4xl mx-auto ${
                            isVisible
                                ? "opacity-100 animate-fade-in-up"
                                : "opacity-0"
                        }`}>
                        <div className="inline-flex items-center px-5 py-2 rounded-full bg-black text-white text-xs md:text-sm font-medium mb-6">
                            Getting started is simple.
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-4">
                            How it works
                        </h2>
                    </div>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
                        {stepsData.map((step, index) => (
                            <div
                                key={step.id}
                                className={`bg-white border border-gray-200 hover:border-[rgb(72,47,234)] rounded-3xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                                    isVisible
                                        ? "opacity-100 animate-fade-in-up"
                                        : "opacity-0"
                                }`}
                                style={{
                                    animationDelay: `${index * 0.2}s`,
                                }}>
                                {/* Step Number Badge */}
                                <div className="relative">
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                        <div className="w-10 h-10 rounded-full bg-[rgb(72,47,234)] text-white flex items-center justify-center font-bold text-lg shadow-lg">
                                            {step.id}
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <div className="relative w-full h-64 bg-gray-100 rounded-t-3xl overflow-hidden">
                                        <Image
                                            src={step.image}
                                            alt={step.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 lg:p-8">
                                    <h3 className="text-xl lg:text-2xl font-bold text-black mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Works;
