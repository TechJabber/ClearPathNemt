import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="clear-nav sticky top-0 z-50 shadow-md">
      <div className="container-max py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-clear-gold rounded-lg flex items-center justify-center">
              <span className="font-bold text-clear-navy text-sm">CP</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">Clear Path NEMT</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-clear-gold transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-clear-gold transition">
              About
            </Link>
            <Link href="/services" className="hover:text-clear-gold transition">
              Services
            </Link>
            <Link href="/providers" className="hover:text-clear-gold transition">
              Providers
            </Link>
            <Link href="/contact" className="hover:text-clear-gold transition">
              Contact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-white hover:text-clear-gold transition"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="bg-clear-gold text-clear-navy px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white hover:bg-opacity-10 rounded"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-white border-opacity-20 flex flex-col gap-4">
            <Link href="/" className="block hover:text-clear-gold transition">
              Home
            </Link>
            <Link href="/about" className="block hover:text-clear-gold transition">
              About
            </Link>
            <Link href="/services" className="block hover:text-clear-gold transition">
              Services
            </Link>
            <Link href="/providers" className="block hover:text-clear-gold transition">
              Providers
            </Link>
            <Link href="/contact" className="block hover:text-clear-gold transition">
              Contact
            </Link>
            <div className="pt-4 border-t border-white border-opacity-20 flex flex-col gap-2">
              <Link
                href="/auth/login"
                className="block text-center py-2 hover:bg-white hover:bg-opacity-10 rounded transition"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="block text-center bg-clear-gold text-clear-navy py-2 rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                Register
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
