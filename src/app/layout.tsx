
import '../assets/css/index.css'

import App from './page';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <App />
      </body>
    </html>
  );
}