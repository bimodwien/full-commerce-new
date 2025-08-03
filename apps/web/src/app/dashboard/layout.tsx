import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokoPakBimo - Dashboard',
  description: 'Tokopakbimo dashboard with Next.js',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
