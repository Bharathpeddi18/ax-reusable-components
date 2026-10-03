'use client';
import './layout.css'

import Footer from '@/layout/ax-footer/ax-footer';
import Header from '@/layout/ax-header/ax-header';
import Menu from '@/layout/ax-menu/ax-menu';
import PageWrapper from '@/layout/ax-page-wrapper/ax-page-wrapper';
// import AuthGuard from '@/components/auth/auth-guard';

// region Main Component
export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <AuthGuard>
      <div className="ax-app-layout">
        <Menu />

        <Header />

        <PageWrapper>
          {children}
        </PageWrapper>

        <Footer />
      </div>
    // </AuthGuard>
  );
}