import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokoPakBimo - Register',
  description: 'Tokopakbimo register with Next.js',
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
