import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokoPakBimo - Category',
  description: 'Tokopakbimo see all categories with Next.js',
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
