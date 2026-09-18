import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-clear-navy text-white mt-20 pt-16 pb-8">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-clear-gold rounded flex items-center justify-center">
                <span className="text-xs font-bold text-clear-navy">CP</span>
              </div>
              Clear Path NEMT
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Providing accessible non-emergency medical transportation for MassHealth and Medicare members.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-clear-gold transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-clear-gold transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-clear-gold transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-clear-gold transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/benefits/masshealth" className="hover:text-clear-gold transition">
                  MassHealth Info
                </Link>
              </li>
              <li>
                <Link href="/benefits/medicare" className="hover:text-clear-gold transition">
                  Medicare Info
                </Link>
              </li>
              <li>
                <Link href="/providers" className="hover:text-clear-gold transition">
                  Provider Login
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-clear-gold transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">1-844-NEMT-123</p>
                  <p className="text-xs">Available 24/7</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <a href="mailto:support@goclearpathemt.com" className="hover:text-clear-gold transition">
                  support@goclearpathemt.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <p>Boston, MA 02101</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white border-opacity-20 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Clear Path NEMT. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-clear-gold transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-clear-gold transition">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="hover:text-clear-gold transition">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
