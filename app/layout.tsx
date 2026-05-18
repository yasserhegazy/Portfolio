import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import ScrollProgress from '@/components/ui/ScrollProgress';
import PageLoader from '@/components/ui/PageLoader';

export const metadata: Metadata = {
  title: 'Yasser Hegazy | Software Engineer',
  description: 'Software Engineer and Full-Stack Engineer building SaaS platforms, RESTful APIs, dashboards, AI integrations, and database-driven web applications.',
  keywords: ['Software Engineer', 'Full-Stack Engineer', 'Laravel', 'FastAPI', 'Next.js', 'React', 'TypeScript', 'PHP', 'Python', 'REST API', 'SaaS', 'AI Integration', 'Yasser Hegazy'],
  authors: [{ name: 'Yasser Hegazy' }],
  creator: 'Yasser Hegazy',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yasserhegazy.com',
    title: 'Yasser Hegazy | Software Engineer',
    description: 'Software Engineer and Full-Stack Engineer building SaaS platforms, APIs, dashboards, and AI-integrated web applications.',
    siteName: 'Yasser Hegazy Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yasser Hegazy | Software Engineer',
    description: 'Software Engineer and Full-Stack Engineer building SaaS platforms, APIs, dashboards, and AI-integrated web applications.',
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
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <PageLoader />
            <ScrollProgress />
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
