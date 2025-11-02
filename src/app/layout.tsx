import "./globals.css";
import type {Metadata} from "next";
import {Figtree} from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {ThemeProvider} from "@/utils/ThemeProvider";

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
        <html lang="en" suppressHydrationWarning>
            <body className={`${figtree.className} antialiased`}>
                <ThemeProvider
                    attribute="data-theme"
                    defaultTheme="light"
                    enableSystem={false}>
                    {/* Header */}
                    <Header />
                    {children}
                    {/* Footer */}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
