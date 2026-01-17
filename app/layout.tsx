import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Yasser Hegazy | Backend Software Engineer',
  description: 'Backend Software Engineer specializing in Laravel, Django, FastAPI, and modern API architectures. Building secure, scalable, production-ready systems.',
  keywords: ['Backend Engineer', 'Software Engineer', 'Laravel', 'Django', 'FastAPI', 'PHP', 'Python', 'REST API', 'Yasser Hegazy'],
  authors: [{ name: 'Yasser Hegazy' }],
  creator: 'Yasser Hegazy',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yasserhegazy.com',
    title: 'Yasser Hegazy | Backend Software Engineer',
    description: 'Backend Software Engineer specializing in Laravel, Django, FastAPI, and modern API architectures.',
    siteName: 'Yasser Hegazy Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yasser Hegazy | Backend Software Engineer',
    description: 'Backend Software Engineer specializing in Laravel, Django, FastAPI, and modern API architectures.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <FloatingActions />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
