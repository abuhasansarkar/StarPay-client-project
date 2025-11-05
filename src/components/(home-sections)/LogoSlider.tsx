"use client";

import React from "react";
import Image from "next/image";

const LogoSlider = () => {
    const logos = [
        {name: "Logo 1", path: "/logos/logo (1).avif"},
        {name: "Logo 2", path: "/logos/logo (2).avif"},
        {name: "Logo 3", path: "/logos/logo (3).avif"},
        {name: "Logo 4", path: "/logos/logo (4).avif"},
        {name: "Logo 5", path: "/logos/logo (5).avif"},
        {name: "Logo 6", path: "/logos/logo (6).avif"},
        {name: "Logo 7", path: "/logos/logo (7).avif"},
        {name: "Logo 8", path: "/logos/logo (8).avif"},
        {name: "Logo 9", path: "/logos/logo (9).avif"},
    ];

    // Duplicate once for seamless infinite scroll
    const allLogos = [...logos, ...logos];

    return (
        <>
            <style jsx global>{`
                @keyframes logoScroll {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-50%);
                    }
                }

                .logo-track {
                    display: flex;
                    width: max-content;
                    animation: logoScroll var(--scroll-speed, 25s) linear
                        infinite;
                }

                .logo-slider:hover .logo-track {
                    animation-play-state: paused;
                }
            `}</style>

            <section className="w-full py-12 md:py-16 lg:py-20 overflow-hidden bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Heading */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-center mb-6 md:mb-10 text-black">
                        Helping people stay organised from
                    </h2>

                    {/* Logo Slider */}
                    <div className="relative max-w-6xl mx-auto overflow-hidden logo-slider">
                        {/* Fading edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                        {/* Animated Track */}
                        <div
                            className="logo-track gap-4 md:gap-5 lg:gap-6"
                            style={{"--scroll-speed": "40s"} as React.CSSProperties}>
                            {allLogos.map((logo, index) => (
                                <div
                                    key={`${logo.name}-${index}`}
                                    className="shrink-0 flex items-center justify-center w-24 h-16 sm:w-28 sm:h-18 md:w-32 md:h-20 rounded-xl bg-white border border-gray-300 hover:border-[#482fea] hover:shadow-xl transition-all duration-300 px-4">
                                    <Image
                                        src={logo.path}
                                        alt={logo.name}
                                        width={100}
                                        height={100}
                                        className="w-16 h-8 sm:w-18 sm:h-12 md:w-20 md:h-12 lg:w-24 lg:h-14 object-contain"
                                        priority={index < 9}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LogoSlider;
