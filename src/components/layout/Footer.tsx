// frontend/src/components/layout/Footer.tsx
import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { ROUTES } from "@/utils/routes";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">WCCIS Insurance</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your trusted partner for contractor insurance needs. Independent agency with access to multiple carriers.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-500 hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-light">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-light">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-light">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-light">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href={ROUTES.HOME} className="text-gray-600 hover:text-brand-primary dark:text-gray-300 dark:hover:text-brand-light">
                  Home
                </Link>
              </li>
              <li>
                <Link href={ROUTES.ABOUT} className="text-gray-600 hover:text-brand-primary dark:text-gray-300 dark:hover:text-brand-light">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/insure" className="text-gray-600 hover:text-brand-primary dark:text-gray-300 dark:hover:text-brand-light">
                  Services
                </Link>
              </li>
              <li>
                <Link href={ROUTES.CONTACT} className="text-gray-600 hover:text-brand-primary dark:text-gray-300 dark:hover:text-brand-light">
                  Contact
                </Link>
              </li>
              <li>
                <Link href={ROUTES.INSURE} className="text-gray-600 hover:text-brand-primary dark:text-gray-300 dark:hover:text-brand-light">
                  Get Insured
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Insurance Options */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Insurance Options</h3>
            <ul className="space-y-2">
              <li>
                <Link href={ROUTES.INSURANCE.GENERAL_LIABILITY} className="text-gray-600 hover:text-brand-primary dark:text-gray-300 dark:hover:text-brand-light">
                  General Liability
                </Link>
              </li>
              <li>
                <Link href={ROUTES.INSURANCE.WORKERS_COMP} className="text-gray-600 hover:text-brand-primary dark:text-gray-300 dark:hover:text-brand-light">
                  Workers Compensation
                </Link>
              </li>
              <li>
                <Link href={ROUTES.INSURANCE.COMMERCIAL_AUTO} className="text-gray-600 hover:text-brand-primary dark:text-gray-300 dark:hover:text-brand-light">
                  Commercial Auto
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-brand-primary mt-0.5" />
                <span className="text-gray-600 dark:text-gray-300">(555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-brand-primary mt-0.5" />
                <span className="text-gray-600 dark:text-gray-300">customerservice@wccis.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-primary mt-0.5" />
                <span className="text-gray-600 dark:text-gray-300">
                  123 Insurance Ave, Suite 100<br />
                  San Francisco, CA 94101
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {currentYear} WCCIS Insurance Agency. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-500 hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-light text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-light text-sm">
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