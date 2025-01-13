import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from '@/components/providers/store.providers';

export const metadata: Metadata = {
  title: 'TokoPaBimo',
  description: 'Tokopabimo with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
