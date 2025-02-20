// src/components/Header.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { NAVIGATION_ITEMS, ROUTES } from "@/utils/routes";
import { Button } from "@/components/ui/Button";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "./Logo";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const insuranceTypes = [
    { label: "General Liability", path: ROUTES.INSURANCE.GENERAL_LIABILITY },
    { label: "Workers Compensation", path: ROUTES.INSURANCE.WORKERS_COMP },
    { label: "Commercial Auto", path: ROUTES.INSURANCE.COMMERCIAL_AUTO },
  ];

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen && !(event.target as Element).closest(".insurance-dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  if (!mounted) return null;

  const isActive = (path: string) => router.pathname === path;

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-futuristic-surface shadow-lg"
          : "bg-futuristic-surface/80 backdrop-blur-lg"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Logo />
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="relative insurance-dropdown">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-futuristic-light hover:text-futuristic-accent transition-colors"
              >
                Insurance Types
                <ChevronDown
                  className={`ml-1 w-4 h-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-futuristic-surface rounded-md shadow-lg py-1">
                  {insuranceTypes.map((item) => (
                    <Link key={item.path} href={item.path}>
                      <a className="block px-4 py-2 text-sm text-futuristic-light hover:bg-futuristic-accent hover:text-white">
                        {item.label}
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {NAVIGATION_ITEMS.map((item) => (
              <Link key={item.path} href={item.path}>
                <a
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-futuristic-accent"
                      : "text-futuristic-light hover:text-futuristic-accent"
                  }`}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Button
              onClick={() => router.push(ROUTES.INSURE)}
              variant="primary"
              className="px-6"
            >
              Get a Quote
            </Button>
          </div>
          <button
            className="lg:hidden rounded-md p-2 text-futuristic-light hover:text-futuristic-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-2">
            {NAVIGATION_ITEMS.map((item) => (
              <Link key={item.path} href={item.path}>
                <a
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "bg-futuristic-accent text-white"
                      : "text-futuristic-light hover:bg-futuristic-accent"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            <div className="px-3 pt-4">
              <Button
                onClick={() => {
                  router.push(ROUTES.INSURE);
                  setIsMenuOpen(false);
                }}
                variant="primary"
                className="w-full"
              >
                Get a Quote
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
