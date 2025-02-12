import Link from 'next/link';
import { Linkedin, Instagram, Twitter, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white border-t border-[#2a2a2a]">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-2">
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <p className="text-gray-300 text-sm">
              TokoPaBimo is an e-commerce store dedicated to providing
              high-quality products and excellent customer service.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 text-sm hover:text-white flex items-start justify-start"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 text-sm hover:text-white flex items-start justify-start"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 text-sm hover:text-white flex items-start justify-start"
                >
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white text-sm flex items-start justify-start"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-gray-300 hover:text-white text-sm flex items-start justify-start"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="text-gray-300 hover:text-white text-sm flex items-start justify-start"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Me</h3>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/bimodwien"
                className="text-gray-300 hover:text-white"
              >
                <span className="sr-only">Github</span>
                <Github className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.instagram.com/bimodprabowo/"
                className="text-gray-300 hover:text-white"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="https://x.com/yaelahmoo"
                className="text-gray-300 hover:text-white"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </Link>
              <Link
                href="https://linkedin.com/bimodwien"
                className="text-gray-300 hover:text-white"
              >
                <span className="sr-only">Linkedin</span>
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-[#2a2a2a] pt-3 text-center">
          <p className="text-gray-300 text-sm">
            &copy; 2025 TokoPaBimo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
