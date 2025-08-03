import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokoPakBimo - Detail Product',
  description: 'Tokopakbimo detail product with Next.js',
};

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
