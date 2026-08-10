import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk, IBM_Plex_Sans_Arabic } from 'next/font/google';
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

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const SITE_TITLE = 'Yasser Hegazy | Applied AI Engineer & Backend-First Full-Stack';
const SITE_DESC =
  'Applied AI Engineer and backend-first software engineer building reliable AI products for 1,000+ daily users — RAG, multi-agent systems, FastAPI, Laravel, and Next.js. Open to full-time roles.';

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESC,
  keywords: ['Applied AI Engineer', 'AI Engineer', 'Backend Engineer', 'Full-Stack Engineer', 'RAG', 'Multi-Agent Systems', 'LangGraph', 'LangChain', 'FastAPI', 'Python', 'Laravel', 'Next.js', 'AI Infrastructure', 'WAKIB', 'Yasser Hegazy'],
  authors: [{ name: 'Yasser Hegazy' }],
  creator: 'Yasser Hegazy',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yasserhegazy.com',
    title: SITE_TITLE,
    description: SITE_DESC,
    siteName: 'Yasser Hegazy Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESC,
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${plexArabic.variable}`}>
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
