import { ServiceWorker } from '@/services/service-worker';
import '../assets/css/index.css';

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
        <ServiceWorker />
        {children}
      </body>
    </html>
  );
}