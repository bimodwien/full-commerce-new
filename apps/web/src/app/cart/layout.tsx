import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokoPakBimo - Cart',
  description: 'Tokopakbimo see all cart with Next.js',
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
