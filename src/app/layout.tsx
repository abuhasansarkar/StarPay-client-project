import "./globals.css";
import type {Metadata} from "next";
import {Figtree} from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const figtree = Figtree({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "StarPay - Payment Solutions",
    description: "Modern payment solutions for your business",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="scroll-smooth">
            <body className={`${figtree.className} antialiased`}>
                {/* Header */}
                <Header />
                {children}
                {/* Footer */}
                <Footer />
            </body>
        </html>
    );
}
