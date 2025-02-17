import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TokoPaBimo - Wishlist',
  description: 'Tokopabimo see wishlist with Next.js',
};

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
