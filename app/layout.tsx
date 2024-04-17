import './ui/global.css';
import { inter } from './ui/invoices/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stafko',
  description: 'The definitive management app',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
