import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokoPaBimo - Create Category',
  description: 'Tokopabimo create new categories with Next.js',
};

export default function CreateCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
