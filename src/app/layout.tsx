import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import dynamic from "next/dynamic";
const ThemeProviderNoSSR = dynamic(
    () => import("next-themes").then((mod) => mod.ThemeProvider),
    {
        ssr: false,
    }
);

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProviderNoSSR attribute="class" defaultTheme="dark">
                    {children}
                    <Toaster />
                </ThemeProviderNoSSR>
            </body>
        </html>
    );
}
