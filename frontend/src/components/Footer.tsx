// frontend/components/Footer.tsx
// frontend/components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { ROUTES } from '../utils/routes';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">WCCIS</h3>
            <p className="text-sm">Your trusted independent insurance agency for contractors since 1995.</p>
            <div className="space-y-2">
              <a href="tel:+18001234567" className="flex items-center hover:text-white transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                (800) 123-4567
              </a>
              <a href="mailto:info@wccis.com" className="flex items-center hover:text-white transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                info@wccis.com
              </a>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1" />
                <span>123 Insurance Ave,<br />Suite 100<br />City, ST 12345</span>
              </div>
            </div>
          </div>

          {/* Insurance */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Insurance</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={ROUTES.INSURANCE.GENERAL_LIABILITY}
                  className="hover:text-white transition-colors"
                >
                  General Liability
                </Link>
              </li>
              <li>
                <Link 
                  href={ROUTES.INSURANCE.WORKERS_COMP}
                  className="hover:text-white transition-colors"
                >
                  Workers Compensation
                </Link>
              </li>
              <li>
                <Link 
                  href={ROUTES.INSURANCE.COMMERCIAL_AUTO}
                  className="hover:text-white transition-colors"
                >
                  Commercial Auto
                </Link>
              </li>
              <li>
                <Link 
                  href={ROUTES.CERTIFICATE}
                  className="hover:text-white transition-colors"
                >
                  Certificate Requests
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Insurance Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/claims" className="hover:text-white transition-colors">
                  Claims Process
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="hover:text-white transition-colors">
                  Insurance Glossary
                </Link>
              </li>
            </ul>
          </div>

          {/* Partner Carriers */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Partner Carriers</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Replace with actual carrier logos */}
              <div className="bg-white/10 rounded p-2 text-center text-sm">
                Hartford
              </div>
              <div className="bg-white/10 rounded p-2 text-center text-sm">
                Travelers
              </div>
              <div className="bg-white/10 rounded p-2 text-center text-sm">
                Liberty Mutual
              </div>
              <div className="bg-white/10 rounded p-2 text-center text-sm">
                CNA
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm">
              © {currentYear} WCCIS. All rights reserved. CA License #0123456
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
              <div className="flex items-center space-x-4">
                <a 
                  href="#" 
                  className="hover:text-white transition-colors"
                  aria-label="Visit our Facebook page"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="hover:text-white transition-colors"
                  aria-label="Visit our Twitter page"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="hover:text-white transition-colors"
                  aria-label="Visit our LinkedIn page"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  