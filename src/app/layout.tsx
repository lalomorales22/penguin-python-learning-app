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
  title: 'Penguin Python: Code with Maximus The Kid!',
  description: 'Welcome to Penguin Python! Join Maximus The Kid to learn Python in a fun, icy, and engaging way. Explore coding concepts, create penguin art, and watch your skills slide to success!',
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
