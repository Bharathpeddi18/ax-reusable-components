import '../assets/css/index.css';
import './layout.css';

import Footer from '@/layout/ax-footer/ax-footer';
import Header from '@/layout/ax-header/ax-header';
import Menu from '@/layout/ax-menu/ax-menu';
import PageWrapper from '@/layout/ax-page-wrapper/ax-page-wrapper';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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