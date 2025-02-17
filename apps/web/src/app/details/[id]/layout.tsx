import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokoPaBimo - Detail Product',
  description: 'Tokopabimo detail product with Next.js',
};

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
