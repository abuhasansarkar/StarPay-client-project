import Image from "next/image";
import Link from "next/link";

// Check icon component
const Check = ({className}: {className?: string}) => (
    <svg
        className={className}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
        />
    </svg>
);

interface ProductCardProps {
    id: string;
    path: string;
    imageSrc: string;
    title: string;
    subtitle: string;
    price: string;
    ctaLabel: string;
    billingNote: string;
    features: string[];
    quote: string;
}

export default function ProductCard({
    id,
    path,
    imageSrc,
    title,
    subtitle,
    price,
    ctaLabel,
    billingNote,
    features,
    quote,
}: ProductCardProps) {
    // Extract type from path (buy or lease)
    const type = path.includes("/buy/") ? "buy" : "lease";

    // Generate unique positions based on product ID for variety
    const getPosition = (seed: number, min: number, max: number) => {
        return (seed % (max - min)) + min;
    };

    const idHash = id
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const orb1Top = getPosition(idHash, 5, 25);
    const orb1Left = getPosition(idHash * 2, 10, 30);
    const orb2Top = getPosition(idHash * 3, 40, 65);
    const orb2Right = getPosition(idHash * 4, 5, 25);
    const orb3Bottom = getPosition(idHash * 5, 10, 30);
    const orb3Left = getPosition(idHash * 6, 15, 45);

    return (
        <>
            <style jsx>{`
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
                        opacity: 0.45;
                    }
                    40% {
                        transform: translate(-30px, 25px) scale(1.25)
                            rotate(-90deg);
                        opacity: 0.7;
                    }
                    70% {
                        transform: translate(20px, -15px) scale(1.1)
                            rotate(-180deg);
                        opacity: 0.55;
                    }
                }

                @keyframes orb-float-3 {
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

                .animate-orb-1 {
                    animation: orb-float-1 8s ease-in-out infinite;
                }

                .animate-orb-2 {
                    animation: orb-float-2 12s ease-in-out infinite 1.5s;
                }

                .animate-orb-3 {
                    animation: orb-float-3 10s ease-in-out infinite 2s;
                }
            `}</style>

            <div className="group relative text-white rounded-2xl overflow-hidden shadow-lg border border-white/10 flex flex-col transition-all duration-500 hover:shadow-2xl hover:border-[#5B4BFF]">
                {/* Animated Gradient Backgrounds */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                    {/* Orb 1 - Purple (Top/Left Random Area) */}
                    <div
                        className="absolute animate-orb-1"
                        style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "40%",
                            background:
                                "radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(124,58,237,0.6) 40%, rgba(91,75,255,0.4) 70%, transparent 100%)",
                            top: `${orb1Top}%`,
                            left: `${orb1Left}%`,
                            filter: "blur(60px)",
                        }}
                    />

                    {/* Orb 2 - Purple (Middle Random Area) */}
                    <div
                        className="absolute animate-orb-2"
                        style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                            background:
                                "radial-gradient(circle, rgba(168,85,247,0.7) 0%, rgba(147,51,234,0.5) 50%, rgba(126,34,206,0.3) 80%, transparent 100%)",
                            top: `${orb2Top}%`,
                            right: `${orb2Right}%`,
                            filter: "blur(55px)",
                        }}
                    />

                    {/* Orb 3 - Blue (Bottom Right Area) */}
                    <div
                        className="absolute animate-orb-3"
                        style={{
                            width: "180px",
                            height: "180px",
                            borderRadius: "45%",
                            background:
                                "radial-gradient(circle, rgba(59,130,246,0.75) 0%, rgba(37,99,235,0.55) 45%, rgba(29,78,216,0.35) 75%, transparent 100%)",
                            bottom: "5%",
                            right: "5%",
                            filter: "blur(70px)",
                        }}
                    />
                </div>
                {/* Image */}
                <div className="relative w-full md:h-72 h-48 z-10 overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 400px"
                        priority
                    />
                </div>

                {/* Content */}
                <div className="p-3 md:p-6 flex flex-col grow relative z-10">
                    <h2 className="md:text-4xl text-2xl font-semibold">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-300 mt-1 leading-relaxed">
                        {subtitle}
                    </p>

                    {/* Price */}
                    <div className="mt-4 mb-2 text-3xl lg:text-4xl font-bold text-white">
                        {price}
                    </div>

                    {/* CTA */}
                    <Link
                        href={`/${type}?device=${id}&type=${type}`}
                        className="mt-3 px-6 py-2 md:py-2 border-2 border-[#5B4BFF] text-white rounded-lg 
                  font-medium transition-all duration-300 bg-[#5B4BFF] hover:bg-transparent hover:border-[#5B4BFF] hover:text-white hover:shadow-[0_0_15px_rgba(91,75,255,0.6)]
                  focus:outline-none focus:ring-2 text-center text-lg">
                        {ctaLabel}
                    </Link>

                    <p className="text-md text-white/60 mt-2 text-center">
                        {billingNote}
                    </p>

                    {/* Features */}
                    <div className="mt-6">
                        <h3 className="text-lg md:text-xl font-semibold mb-3">
                            Key Features:
                        </h3>
                        <ul className="space-y-2 text-md md:text-lg text-white font-medium">
                            {features.map((feature, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-2">
                                    <Check className="w-5 h-5 md:w-6 md:h-6 text-white shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quote */}
                    <p className="mt-6 italic text-md md:text-lg text-white/80 leading-relaxed">
                        “{quote}”
                    </p>
                </div>
            </div>
        </>
    );
}
