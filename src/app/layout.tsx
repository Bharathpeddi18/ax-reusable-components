import '../assets/css/index.css';
import './layout.css';

import Footer from '@/layout/footer/footer';
import Header from '@/layout/header/header';
import Menu from '@/layout/menu/menu';
import PageWrapper from '@/layout/page-wrapper/page-wrapper';

import App from './page';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="ax-app-layout">
          <Menu />
          <Header />
          <PageWrapper>
            <App />
          </PageWrapper>
          <Footer />
        </div>
      </body>
    </html>
  );
}