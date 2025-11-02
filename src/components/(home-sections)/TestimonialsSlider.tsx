"use client";

import React from "react";

const TestimonialsSlider = () => {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Jensen",
            role: "Café Owner",
            quote: "StarPay has transformed how we handle payments. The setup was incredibly simple, and our customers love the variety of payment options. Best decision for our business!",
            rating: 5,
        },
        {
            id: 2,
            name: "Michael Andersen",
            role: "Barbershop Owner",
            quote: "The 0% crypto fees are amazing! We've started accepting Bitcoin and it's opened up a whole new customer base. The terminal is sleek and professional.",
            rating: 5,
        },
        {
            id: 3,
            name: "Emma Larsen",
            role: "Boutique Manager",
            quote: "Customer support is outstanding! They helped us get set up in minutes and are always available when we need them. Highly recommend StarPay to any Danish business.",
            rating: 5,
        },
        {
            id: 4,
            name: "Thomas Nielsen",
            role: "Restaurant Owner",
            quote: "Simplicity keeps my workday organized without the hassle. It's the easiest task manager I've used. The dual-screen system is perfect for our busy restaurant.",
            rating: 5,
        },
        {
            id: 5,
            name: "Sophie Hansen",
            role: "Retail Store Owner",
            quote: "Accepting MobilePay, cards, and crypto all in one terminal has streamlined our checkout process. Our transaction rates are the best in Scandinavia!",
            rating: 5,
        },
        {
            id: 6,
            name: "Lars Christensen",
            role: "Gym Owner",
            quote: "The ECR-approved system integrates perfectly with our membership software. No hidden fees means we know exactly what we're paying. Fantastic service!",
            rating: 5,
        },
    ];

    // Duplicate testimonials for seamless infinite scroll
    const allTestimonials = [...testimonials, ...testimonials, ...testimonials];

    return (
        <>
            <style jsx global>{`
                @keyframes testimonialSlide {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-33.333%);
                    }
                }

                .testimonial-scroll-animation {
                    animation: testimonialSlide 15s linear infinite;
                    will-change: transform;
                }

                .testimonial-scroll-animation:hover {
                    animation-play-state: paused;
                }

                @media (max-width: 768px) {
                    .testimonial-scroll-animation {
                        animation: testimonialSlide 30s linear infinite;
                    }
                }
            `}</style>

            <section className="w-full py-16 md:py-20 lg:py-28 bg-white overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Badge and Heading */}
                    <div className="flex flex-col items-center text-center mb-12 md:mb-16">
                        <div className="inline-flex items-center px-5 py-2 rounded-full bg-black text-white text-xs md:text-sm font-medium mb-6">
                            Testimonials
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-4">
                            What others are saying.
                        </h2>
                        <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl">
                            Trusted by founders and creatives who value
                            simplicity and results.
                        </p>
                    </div>

                    {/* Testimonials Slider Container */}
                    <div className="relative overflow-hidden py-5">
                        {/* Gradient Overlays */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

                        {/* Animated Slider */}
                        <div className="flex gap-4 md:gap-6 testimonial-scroll-animation">
                            {allTestimonials.map((testimonial, index) => (
                                <div
                                    key={`${testimonial.id}-${index}`}
                                    className="shrink-0 w-80 sm:w-96 md:w-[420px] bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow duration-300">
                                    {/* Star Rating */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map(
                                            (_, i) => (
                                                <svg
                                                    key={i}
                                                    className="w-5 h-5 text-[rgb(72,47,234)]"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            )
                                        )}
                                    </div>

                                    {/* Quote */}
                                    <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                                        &ldquo;{testimonial.quote}&rdquo;
                                    </p>

                                    {/* Author Info */}
                                    <div className="flex items-center gap-3">
                                        {/* Avatar */}
                                        <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center shrink-0">
                                            <svg
                                                className="w-6 h-6 text-white"
                                                fill="currentColor"
                                                viewBox="0 0 20 20">
                                                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                                            </svg>
                                        </div>
                                        {/* Name and Role */}
                                        <div>
                                            <p className="text-[rgb(72,47,234)] font-semibold text-sm md:text-base">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-gray-600 text-xs md:text-sm">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TestimonialsSlider;
