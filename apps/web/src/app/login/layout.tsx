import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokoPaBimo - Login',
  description: 'Tokopabimo login with Next.js',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
