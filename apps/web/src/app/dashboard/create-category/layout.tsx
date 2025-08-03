import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokoPakBimo - Create Category',
  description: 'Tokopakbimo create new categories with Next.js',
};

export default function CreateCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
