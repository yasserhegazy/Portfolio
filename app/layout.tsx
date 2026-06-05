import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import ScrollProgress from '@/components/ui/ScrollProgress';
import PageLoader from '@/components/ui/PageLoader';
import SmartCursor from '@/components/ui/SmartCursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Yasser Hegazy | Backend-focused Full-Stack Engineer',
  description: 'Backend-focused Full-Stack Engineer building SaaS platforms, RESTful APIs, real-time systems, dashboards, and AI-integrated workflows with Laravel, FastAPI, Python, and Next.js.',
  keywords: ['Backend Engineer', 'Full-Stack Engineer', 'Software Engineer', 'System Architecture', 'API Design', 'Laravel', 'FastAPI', 'Next.js', 'React', 'TypeScript', 'PHP', 'Python', 'REST API', 'SaaS', 'AI Engineering', 'RAG', 'LangGraph', 'Yasser Hegazy'],
  authors: [{ name: 'Yasser Hegazy' }],
  creator: 'Yasser Hegazy',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yasserhegazy.com',
    title: 'Yasser Hegazy | Backend-focused Full-Stack Engineer',
    description: 'Backend-focused Full-Stack Engineer building SaaS platforms, APIs, real-time systems, dashboards, and AI-integrated workflows.',
    siteName: 'Yasser Hegazy Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yasser Hegazy | Backend-focused Full-Stack Engineer',
    description: 'Backend-focused Full-Stack Engineer building SaaS platforms, APIs, real-time systems, dashboards, and AI-integrated workflows.',
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <PageLoader />
            <ScrollProgress />
            <SmartCursor />
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
