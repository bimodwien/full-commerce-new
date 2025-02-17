import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokoPaBimo - Dashboard',
  description: 'Tokopabimo dashboard with Next.js',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
