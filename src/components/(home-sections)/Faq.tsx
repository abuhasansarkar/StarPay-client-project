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

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        max-height: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        max-height: 500px;
                        transform: translateY(0);
                    }
                }

                @keyframes slideUp {
                    from {
                        opacity: 1;
                        max-height: 500px;
                        transform: translateY(0);
                    }
                    to {
                        opacity: 0;
                        max-height: 0;
                        transform: translateY(-10px);
                    }
                }

                .accordion-content-enter {
                    animation: slideDown 0.3s ease-out forwards;
                }

                .accordion-content-exit {
                    animation: slideUp 0.3s ease-out forwards;
                }
            `}</style>

            <section
                id="faq"
                ref={sectionRef}
                className="w-full py-12 md:py-16 lg:py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div
                        className={`flex flex-col items-center text-center mb-12 md:mb-16 ${
                            isVisible
                                ? "opacity-100 animate-fade-in-stagger"
                                : "opacity-0"
                        }`}>
                        <div className="inline-flex items-center px-5 py-1 md:py-1.5 rounded-full bg-black text-white text-xs font-medium mb-6">
                            Frequently Asked Questions
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-4">
                            Everything you need to know.
                        </h2>
                        <p className="text-base md:text-lg text-black">
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
                                    className="w-full flex items-center justify-between px-4 md:px-6 py-3 text-left hover:bg-black cursor-pointer transition-colors">
                                    <span className="text-lg md:text-xl font-medium text-white pr-4">
                                        {index + 1}. {faq.question}
                                    </span>
                                    <span
                                        className={`text-4xl font-light text-white shrink-0 transition-transform duration-300 ${
                                            openIndex === index
                                                ? "rotate-180"
                                                : "rotate-0"
                                        }`}>
                                        {openIndex === index ? "−" : "+"}
                                    </span>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        openIndex === index
                                            ? "max-h-96 opacity-100"
                                            : "max-h-0 opacity-0"
                                    }`}>
                                    <div className="p-3 bg-black pt-0">
                                        <p className="text-sm md:text-lg text-black leading-relaxed p-3 px-4 bg-white rounded-xl">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Faq;
