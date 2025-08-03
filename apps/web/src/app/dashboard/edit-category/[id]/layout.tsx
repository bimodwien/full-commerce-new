import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokoPakBimo - Edit Category',
  description: 'Tokopakbimo edititng categories with Next.js',
};

export default function EditCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
