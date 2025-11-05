"use client";

import Link from "next/link";

const Hero = () => {
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

                .delay-100 {
                    animation-delay: 0.1s;
                }
                .delay-200 {
                    animation-delay: 0.2s;
                }
                .delay-300 {
                    animation-delay: 0.3s;
                }
                .delay-400 {
                    animation-delay: 0.4s;
                }
            `}</style>

            <section
                id="home"
                className="relative w-full min-h-[600px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden">
                {/* YouTube Video Background */}
                <div className="absolute inset-0 w-full h-full">
                    <iframe
                        className="absolute top-1/2 left-1/2 w-screen h-[56.25vw] min-h-screen min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
                        src="https://www.youtube.com/embed/yDXLh0wFTSM?autoplay=1&mute=1&loop=1&playlist=yDXLh0wFTSM&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
                        title="Hero Background Video"
                        allow="autoplay; encrypted-media"
                        style={{pointerEvents: "none"}}
                    />
                </div>

                {/* Radial Gradient Overlay - black center to black 50% opacity edges */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,1)_0%,rgba(0,0,0,0.5)_100%)]" />

                {/* Content Container */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
                    <div className="flex flex-col items-center justify-center text-center space-y-6 md:space-y-8">
                        {/* Trust Badge */}
                        <div className="inline-flex items-center px-4 md:px-6 md:py-1.5 py-1 rounded-full text-white text-xs font-medium shadow-lg bg-[rgb(72,47,234)] opacity-0 animate-fade-in-up">
                            Trusted in Denmark, Sweden, Norway and Finland
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-tight max-w-5xl opacity-0 animate-fade-in-up delay-100">
                            Accept all payments in one{" "}
                            <span className="font-extrabold bg-[rgb(72,47,234)] px-2 rounded-md text-white">
                                POS
                            </span>{" "}
                            for your business.
                        </h1>

                        {/* Description */}
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed max-w-4xl px-4 opacity-0 animate-fade-in-up delay-200">
                            All in one smart POS system built for the future of
                            business. From barbers to cafes,{" "}
                            <span className="font-semibold">StarPay</span> helps
                            you accept every type of payment effortlessly at 0%
                            crypto fees and the best transaction rates in
                            Scandinavia.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 md:gap-5 pt-4 md:pt-6 opacity-0 animate-fade-in-up delay-300">
                            <Link
                                href="/buy"
                                className="px-6 py-2 md:py-2.5 border-2 border-[#5B4BFF] text-white rounded-lg 
                  font-medium transition-all duration-300
                 bg-[#5B4BFF] hover:bg-transparent hover:border-[#5B4BFF] hover:text-white hover:shadow-[0_0_15px_rgba(91,75,255,0.6)]
                  focus:outline-none focus:ring-2 text-center text-lg">
                                Compare Terminals
                            </Link>

                            <Link
                                href="#pricing"
                                className="px-6 py-2 md:py-2.5 border-2 border-white hover:border-[#5B4BFF] text-white hover:text-white rounded-lg 
                  font-medium transition-all duration-300
                 hover:text-[#5B4BFF] hover:shadow-[0_0_15px_rgba(91,75,255,0.6)]
                  focus:outline-none focus:ring-2 text-center text-lg">
                                Compare pricing
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
