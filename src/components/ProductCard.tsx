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

    return (
        <div className="bg-[#0B0B0F] text-white rounded-2xl overflow-hidden shadow-lg border border-white/10 flex flex-col transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-[#5B4BFF]/50">
            {/* Image */}
            <div className="relative w-full h-56">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col grow">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-sm text-gray-300 mt-1 leading-relaxed">
                    {subtitle}
                </p>

                {/* Price */}
                <div className="mt-5 text-3xl font-bold text-white">
                    {price}
                </div>

                {/* CTA */}
                <Link
                    href={`/${type}?device=${id}&type=${type}`}
                    className="mt-3 bg-[#5B4BFF] hover:bg-[#4836ff] transition-colors text-center text-white font-medium py-3 rounded-lg">
                    {ctaLabel}
                </Link>

                <p className="text-xs text-gray-400 mt-2">{billingNote}</p>

                {/* Features */}
                <div className="mt-6">
                    <h3 className="text-sm font-semibold mb-3">
                        Key Features:
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-[#5B4BFF] mt-0.5" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Quote */}
                <p className="mt-6 italic text-sm text-gray-400 leading-relaxed">
                    “{quote}”
                </p>
            </div>
        </div>
    );
}
