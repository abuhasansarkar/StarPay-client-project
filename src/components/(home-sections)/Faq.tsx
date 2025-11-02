"use client";

import React, {useState, useEffect, useRef} from "react";

const Faq = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
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

    const faqs = [
        {
            question: "What types of payments does StarPay support?",
            answer: "StarPay POS devices accept Crypto, MobilePay, and Card payments (Visa, Mastercard, and more — coming soon). You can take all payments in one terminal, no need for multiple systems or apps.",
        },
        {
            question: "Are crypto payments really 0% fee?",
            answer: "Yes! StarPay offers 0% fees on cryptocurrency payments, making it the most cost-effective solution for accepting digital currencies in Denmark.",
        },
        {
            question:
                "What's the difference between T1Plus, T6, and A10 models?",
            answer: "T1Plus is our compact all-in-one portable POS perfect for mobile businesses. T6 Dual features dual screens for busy stores and restaurants. The A10 is our premium ECR-approved system for large operations requiring advanced integration.",
        },
        {
            question: "Do I need a contract or subscription?",
            answer: "We offer flexible options! You can buy terminals outright with no long-term commitment, or choose our lease program with 12, 24, or 36-month contracts for lower upfront costs.",
        },
        {
            question: "How long does delivery take?",
            answer: "Standard delivery takes 3-5 business days within Denmark. Express delivery options are available for next-day shipping in major cities. All terminals come pre-configured and ready to use.",
        },
        {
            question: "Is StarPay ECR approved and compliant?",
            answer: "Yes, StarPay terminals are fully ECR (Electronic Cash Register) approved and compliant with all Danish payment regulations. Our systems integrate seamlessly with major accounting software.",
        },
    ];

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <style jsx global>{`
                @keyframes fadeInStagger {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-stagger {
                    animation: fadeInStagger 0.6s ease-out forwards;
                }
            `}</style>

            <section
                ref={sectionRef}
                className="w-full py-16 md:py-20 lg:py-28 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div
                        className={`flex flex-col items-center text-center mb-12 md:mb-16 max-w-4xl mx-auto ${
                            isVisible
                                ? "opacity-100 animate-fade-in-stagger"
                                : "opacity-0"
                        }`}>
                        <div className="inline-flex items-center px-5 py-2 rounded-full bg-black text-white text-xs md:text-sm font-medium mb-6">
                            Frequently Asked Questions
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-4">
                            Everything you need to know.
                        </h2>
                        <p className="text-base md:text-lg text-gray-600">
                            Got questions? We&apos;ve got answers. Here&apos;s
                            everything you need to know before getting started.
                        </p>
                    </div>

                    {/* FAQ Accordions */}
                    <div className="max-w-4xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`rounded-2xl border border-gray-300 overflow-hidden bg-black transition-all duration-300 hover:shadow-lg ${
                                    isVisible
                                        ? "opacity-100 animate-fade-in-stagger"
                                        : "opacity-0"
                                }`}
                                style={{
                                    animationDelay: `${0.1 + index * 0.1}s`,
                                }}>
                                <button
                                    onClick={() => handleToggle(index)}
                                    className="w-full flex items-center justify-between px-6 md:px-8 py-5 md:py-6 text-left hover:bg-gray-900 transition-colors">
                                    <span className="text-base md:text-lg font-medium text-white pr-4">
                                        {index + 1}. {faq.question}
                                    </span>
                                    <span className="text-2xl font-light text-white shrink-0">
                                        {openIndex === index ? "−" : "+"}
                                    </span>
                                </button>

                                {openIndex === index && (
                                    <div className="px-6 md:px-8 py-5 md:py-6 bg-white border-t border-gray-300">
                                        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Faq;
