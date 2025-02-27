// src/components/Footer.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ROUTES } from "@/utils/routes";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setIsVisible(true);
      }
    };

    checkScroll(); // Check on mount
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <footer
      className={`relative border-t border-gray-200/20 bg-gradient-to-b from-gray-900 to-gray-800 text-white ${isVisible ? "visible" : ""}`}
    >
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {/* Company Info Card */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">WCCIS</h3>
            <p className="text-gray-300">
              Your trusted independent insurance agency for contractors since 1995.
            </p>
            <div className="space-y-2">
              <Link
                href="tel:+18001234567"
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors py-2 md:py-1"
              >
                <Phone className="w-4 h-4 mr-2" />
                (855) 376-2200
              </Link>
              <Link
                href="mailto:customerservice@wccis.com"
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors py-2 md:py-1"
              >
                <Mail className="w-4 h-4 mr-2" />
                customerservice@wccis.com
              </Link>
              <div className="flex items-start text-gray-300">
                <MapPin className="w-4 h-4 mr-2 mt-1" />
                <span>
                  14781 Pomerado Rd,
                  <br />
                  Suite 215
                  <br />
                  Poway, CA 92064
                </span>
              </div>
            </div>
          </div>

          {/* Insurance Links Card */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Insurance</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={ROUTES.INSURANCE.GENERAL_LIABILITY}
                  className="text-gray-300 hover:text-blue-400 transition-colors block py-2 md:py-1"
                >
                  General Liability
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.INSURANCE.WORKERS_COMP}
                  className="text-gray-300 hover:text-blue-400 transition-colors block py-2 md:py-1"
                >
                  Workers Compensation
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.INSURANCE.COMMERCIAL_AUTO}
                  className="text-gray-300 hover:text-blue-400 transition-colors block py-2 md:py-1"
                >
                  Commercial Auto
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Card */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={ROUTES.ABOUT}
                  className="text-gray-300 hover:text-blue-400 transition-colors block py-2 md:py-1"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.CONTACT}
                  className="text-gray-300 hover:text-blue-400 transition-colors block py-2 md:py-1"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.BLOG}
                  className="text-gray-300 hover:text-blue-400 transition-colors block py-2 md:py-1"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} WCCIS. All rights reserved. CA License #058303
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-blue-400 transition-colors py-2 md:py-1"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-blue-400 transition-colors py-2 md:py-1"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;