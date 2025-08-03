import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokoPakBimo - Edit Product',
  description: 'Tokopakbimo editing product with Next.js',
};

export default function EditProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
