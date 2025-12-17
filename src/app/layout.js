import "./globals.css";
import { Inter } from 'next/font/google';
import { Providers } from "@/components/Providers";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: "ProcureAI - Agentic RFP Platform",
    description: "Automated RFP Response System",
};

export default function RootLayout({ children }) {
    // In a real app, check session to conditionally render Sidebar
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <div className="flex h-screen bg-background overflow-hidden">
                        <aside className="hidden md:flex">
                            <Sidebar />
                        </aside>
                        <main className="flex-1 flex flex-col overflow-y-auto">
                            {children}
                        </main>
                    </div>
                    <Toaster position="top-right" />
                </Providers>
            </body>
        </html>
    );
}
