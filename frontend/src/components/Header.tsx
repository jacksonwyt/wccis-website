// frontend/src/components/Header.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NAVIGATION_ITEMS, ROUTES } from '../utils/routes';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInsuranceDropdownOpen, setIsInsuranceDropdownOpen] = useState(false);
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">WCCIS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => {
              if (item.subItems) {
                return (
                  <div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => setIsInsuranceDropdownOpen(true)}
                    onMouseLeave={() => setIsInsuranceDropdownOpen(false)}
                  >
                    <button
                      className={`px-3 py-2 rounded-md text-sm font-medium
                        ${isActive(item.path) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                    >
                      {item.label}
                    </button>
                    {isInsuranceDropdownOpen && (
                      <div className="absolute z-10 -ml-4 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.path}
                              href={subItem.path}
                              className={`block px-4 py-2 text-sm
                                ${isActive(subItem.path) 
                                  ? 'bg-blue-50 text-blue-600' 
                                  : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium
                    ${isActive(item.path) 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden rounded-md p-2 text-gray-700 hover:text-blue-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
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
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;