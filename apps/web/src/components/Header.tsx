import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logout from './Logout';

export function Header() {
  return (
    <header className="sticky top-0 z-10 w-full bg-[#1a1a1a] text-white border-b border-[#2a2a2a]">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">TokoPaBimo</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Wishlist"
            className="text-white hover:text-black hover:bg-white"
          >
            <Heart className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Cart"
            className="text-white hover:text-black hover:bg-white"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Logout />
        </div>
      </div>
    </header>
  );
}
