import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokoPaBimo - Create Product',
  description: 'Tokopabimo create new product with Next.js',
};

export default function CreateProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
