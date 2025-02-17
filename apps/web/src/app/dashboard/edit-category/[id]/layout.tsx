import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokoPaBimo - Edit Category',
  description: 'Tokopabimo edititng categories with Next.js',
};

export default function EditCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
