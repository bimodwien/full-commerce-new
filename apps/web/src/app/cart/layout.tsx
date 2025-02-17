import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokoPaBimo - Cart',
  description: 'Tokopabimo see all cart with Next.js',
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
