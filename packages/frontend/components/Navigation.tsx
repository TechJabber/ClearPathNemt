import Link from 'next/link';
import Logo from './Logo';

interface NavigationProps {
  showLoginButton?: boolean;
}

export default function Navigation({ showLoginButton = true }: NavigationProps) {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <Logo size="md" />
          <span className="text-2xl font-bold" style={{ color: '#003366' }}>ClearPath NEMT</span>
        </Link>
        <div className="hidden md:flex gap-6">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-gray-900">
            About
          </Link>
          <Link href="/services" className="text-gray-700 hover:text-gray-900">
            Services
          </Link>
          <Link href="/faq" className="text-gray-700 hover:text-gray-900">
            FAQ
          </Link>
          <Link href="/join-us" className="text-gray-700 hover:text-gray-900">
            Join Us
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-gray-900">
            Contact
          </Link>
        </div>
        {showLoginButton && (
          <Link
            href="/auth/login"
            className="px-6 py-2 rounded text-white"
            style={{ backgroundColor: '#D4A574' }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
