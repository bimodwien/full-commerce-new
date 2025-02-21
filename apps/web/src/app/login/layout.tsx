import type { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'TokoPaBimo - Login',
  description: 'Tokopabimo login with Next.js',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Head>
      {children}
    </>
  );
}
