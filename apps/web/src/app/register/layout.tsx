import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokoPaBimo - Register',
  description: 'Tokopabimo register with Next.js',
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
