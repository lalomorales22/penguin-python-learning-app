import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { PortfolioProvider } from '@/contexts/portfolio-context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Python Sprouts: Grow Your Coding Skills!',
  description: 'Welcome to Python Sprouts! Learn Python in a fun, colorful, and engaging way designed for young coders. Explore coding concepts, create turtle art, and watch your skills grow!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased text-base md:text-lg`}>
        <PortfolioProvider>
          <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 spacious-padding">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </PortfolioProvider>
      </body>
    </html>
  );
}
