import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokoPaBimo - Edit Product',
  description: 'Tokopabimo editing product with Next.js',
};

export default function EditProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
