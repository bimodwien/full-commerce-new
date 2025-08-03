import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokoPakBimo - Create Product',
  description: 'Tokopakbimo create new product with Next.js',
};

export default function CreateProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
