import '../assets/css/index.css';
import './layout.css';

import Footer from '@/layout/footer/footer';
import Header from '@/layout/header/header';
import Menu from '@/layout/menu/menu';
import PageWrapper from '@/layout/page-wrapper/page-wrapper';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="app-layout">
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