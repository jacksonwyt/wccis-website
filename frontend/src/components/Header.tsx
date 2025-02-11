// frontend/src/components/Header.tsx
// frontend/src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NAVIGATION_ITEMS, ROUTES } from '../utils/routes';
import { Button } from './ui/Button';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Skip effect on server-side
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Set initial scroll state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => router.pathname === path;

  const insuranceOptions = {
    'General Liability': {
      description: 'Protect your business from third-party claims',
      features: ['Property Damage Coverage', 'Bodily Injury Protection', 'Legal Defense'],
      path: ROUTES.INSURANCE.GENERAL_LIABILITY
    },
    'Workers Compensation': {
      description: 'Coverage for employee injuries and illnesses',
      features: ['Medical Benefits', 'Lost Wage Coverage', 'Death Benefits'],
      path: ROUTES.INSURANCE.WORKERS_COMP
    },
    'Commercial Auto': {
      description: 'Protection for your business vehicles',
      features: ['Liability Coverage', 'Physical Damage', 'Hired/Non-owned'],
      path: ROUTES.INSURANCE.COMMERCIAL_AUTO
    }
  };

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            href={ROUTES.HOME}
            className="flex items-center transform transition hover:scale-105"
          >
            <span className="text-2xl font-bold text-blue-600">WCCIS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => {
              if (item.label === 'Insurance') {
                return (
                  <div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => setActiveMegaMenu('insurance')}
                    onMouseLeave={() => setActiveMegaMenu(null)}
                  >
                    <button
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium group
                        ${isActive(item.path) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                    >
                      {item.label}
                      <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 
                        ${activeMegaMenu === 'insurance' ? 'rotate-180' : ''}`}
                      />
                    </button>
                    
                    {/* Mega Menu */}
                    <div
                      className={`absolute top-full -left-4 w-[600px] bg-white rounded-lg shadow-xl 
                        transition-all duration-200 transform origin-top 
                        ${activeMegaMenu === 'insurance' 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-0 scale-95 pointer-events-none'}`}
                    >
                      <div className="p-6 grid grid-cols-3 gap-8">
                        {Object.entries(insuranceOptions).map(([name, details]) => (
                          <div key={name} className="space-y-2">
                            <Link
                              href={details.path}
                              className="block font-medium text-gray-900 hover:text-blue-600 transition-colors"
                            >
                              {name}
                            </Link>
                            <p className="text-sm text-gray-600">{details.description}</p>
                            <ul className="text-sm text-gray-500 space-y-1">
                              {details.features.map((feature) => (
                                <li key={feature} className="flex items-center">
                                  <span className="w-1 h-1 bg-blue-600 rounded-full mr-2"></span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="bg-gray-50 p-4 rounded-b-lg">
                        <Link
                          href={ROUTES.INSURE}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Compare All Coverage Options →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive(item.path) 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <Button
              onClick={() => router.push(ROUTES.INSURE)}
              className="bg-blue-600 text-white px-6 transform transition hover:scale-105"
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden rounded-md p-2 text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? 'max-h-screen opacity-100'
              : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="py-4 space-y-2">
            {NAVIGATION_ITEMS.map((item) => {
              if (item.subItems) {
                return (
                  <div key={item.label} className="space-y-1">
                    <div className="px-3 py-2 text-sm font-medium text-gray-700">
                      {item.label}
                    </div>
                    <div className="pl-4 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          href={subItem.path}
                          className={`block px-3 py-2 rounded-md text-sm
                            ${isActive(subItem.path)
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-700 hover:bg-gray-50'}`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block px-3 py-2 rounded-md text-sm font-medium
                    ${isActive(item.path)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="px-3 pt-4">
              <Button
                onClick={() => {
                  router.push(ROUTES.INSURE);
                  setIsMenuOpen(false);
                }}
                className="w-full"
              >
                Get a Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;