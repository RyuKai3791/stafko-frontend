import Head from 'next/head';
import './ui/global.css';
import { inter } from './ui/invoices/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stafko',
  description: 'The definitive management app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
    </>
  );
}
