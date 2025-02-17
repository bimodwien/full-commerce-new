import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokoPaBimo - Category',
  description: 'Tokopabimo see all categories with Next.js',
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
