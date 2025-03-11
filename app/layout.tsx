import type { Metadata } from 'next';
import { Public_Sans } from 'next/font/google';

import './globals.css';
import Provider from '@/components/Provider';

const publicSans = Public_Sans({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Finance Tracker',
  description: 'Finance Tracker web application created by Travis Nguyen',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <html lang='en'>
        <body className={`${publicSans.className} antialiased bg-beige-100`}>{children}</body>
      </html>
    </Provider>
  );
}
