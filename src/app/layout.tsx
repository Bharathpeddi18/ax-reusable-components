import { AXServiceWorker } from '@/components/service-worker';
import '../assets/css/index.css';
import './layout.css';

import Footer from '@/layout/ax-footer/ax-footer';
import Header from '@/layout/ax-header/ax-header';
import Menu from '@/layout/ax-menu/ax-menu';
import PageWrapper from '@/layout/ax-page-wrapper/ax-page-wrapper';
import type { Metadata, Viewport } from 'next';

// region Outer Functions
export const metadata: Metadata = {
  title: 'Astrax School',
  description: 'School Management Application',

  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Astrax School',
  },
};

export const viewport: Viewport = {
  themeColor: '#00308F',
};

// region Main Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AXServiceWorker />
        <div className="ax-app-layout">
          <Menu />
          <Header />
          <PageWrapper>
            {children}
          </PageWrapper>
          <Footer />
        </div>
      </body>
    </html>
  );
}