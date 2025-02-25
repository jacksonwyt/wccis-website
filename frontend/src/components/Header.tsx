// src/components/Header.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { NAVIGATION_ITEMS, ROUTES } from "@/utils/routes";
import { Button } from "@/components/ui/Button";
import { Menu, X, ChevronDown, Shield, Phone, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);
      setIsScrollingUp(currentScrollY < lastScrollY || currentScrollY <= 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const insuranceTypes = [
    {
      label: "General Liability",
      path: ROUTES.INSURANCE.GENERAL_LIABILITY,
      description: "Essential coverage for third-party claims",
      icon: Shield
    },
    {
      label: "Workers Compensation",
      path: ROUTES.INSURANCE.WORKERS_COMP,
      description: "Protect your employees and business",
      icon: Shield
    },
    {
      label: "Commercial Auto",
      path: ROUTES.INSURANCE.COMMERCIAL_AUTO,
      description: "Coverage for your business vehicles",
      icon: Shield
    }
  ];

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-300 transform",
        isScrolled ? "backdrop-blur-xl bg-black/80" : "bg-transparent",
        isScrollingUp ? "" : "translate-y-[-100%]",
        "border-b border-white/[0.05]"
      )}
      style={{
        height: isScrolled ? "64px" : "80px",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      <nav className="max-w-[1400px] h-full mx-auto px-6">
        <div className="flex items-center justify-between h-full">
          {/* Logo - scales down on scroll */}
          <div className={cn(
            "transition-all duration-300",
            isScrolled ? "scale-90" : "scale-100"
          )}>
            <Logo />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('insurance')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-200 
                         hover:text-white transition-colors hover:bg-white/[0.05] border-b border-transparent hover:border-white/[0.1]"
              >
                Insurance
                <ChevronDown 
                  className={cn(
                    "ml-1 w-4 h-4 transition-transform duration-300",
                    activeDropdown === 'insurance' ? "rotate-180" : ""
                  )} 
                />
              </button>
              
              {/* Enhanced Dropdown Menu */}
              <div 
                className={cn(
                  "absolute top-full left-0 w-screen max-w-2xl pt-2 transition-all duration-200",
                  activeDropdown === 'insurance' 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-2 pointer-events-none"
                )}
              >
                <div className="bg-white/[0.07] border border-white/[0.1] p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {insuranceTypes.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className="group flex flex-col p-4 hover:bg-white/[0.05] transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                            <item.icon className="w-5 h-5 text-blue-400" />
                          </div>
                          <span className="font-medium text-white 
                                       group-hover:text-blue-400 transition-colors">
                            {item.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 
                                  group-hover:text-gray-200 transition-colors">
                          {item.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                  
                  {/* Quote CTA in Dropdown */}
                  <div className="mt-6 p-4 border-t border-white/[0.1]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-sm font-medium text-white">Need help choosing?</p>
                          <p className="text-sm text-gray-300">Talk to an expert</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-blue-400 hover:text-blue-300"
                        onClick={() => router.push(ROUTES.CONTACT)}
                      >
                        Contact Us
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Navigation Items */}
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-all duration-300",
                  router.pathname === item.path
                    ? "text-white bg-white/[0.05]"
                    : "text-gray-200 hover:text-white hover:bg-white/[0.05]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-sm font-medium text-gray-200 hover:text-white 
                       hover:bg-white/[0.05] transition-colors"
              onClick={() => router.push(ROUTES.CONTACT)}
            >
              Contact Us
            </Button>
            <Button
              onClick={() => router.push(ROUTES.INSURE)}
              className="bg-white text-black hover:bg-gray-100 
                       px-6 py-2.5 group transition-all duration-300"
            >
              Get Quote
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 
                                 transition-transform" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-200 hover:text-white 
                     hover:bg-white/[0.05] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={cn(
            "lg:hidden fixed inset-x-0 top-[64px] bg-black/90 backdrop-blur-xl border-t border-white/[0.1]",
            "transition-all duration-300 transform",
            isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          )}
        >
          <div className="max-h-[calc(100vh-64px)] overflow-y-auto px-6 py-8 space-y-6">
            {/* Insurance Links */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-300 px-4">Insurance</h3>
              {insuranceTypes.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="flex items-center px-4 py-3 text-gray-200 hover:text-white 
                           hover:bg-white/[0.05] rounded-lg group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3 text-blue-400 
                                    group-hover:text-blue-300 transition-colors" />
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-gray-300 group-hover:text-gray-200">
                      {item.description}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Navigation Items */}
            <div className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "block px-4 py-3 rounded-lg transition-colors",
                    router.pathname === item.path
                      ? "text-white bg-white/[0.05]"
                      : "text-gray-200 hover:text-white hover:bg-white/[0.05]"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                variant="ghost"
                className="w-full justify-center text-gray-200"
                onClick={() => {
                  router.push(ROUTES.CONTACT);
                  setIsMenuOpen(false);
                }}
              >
                Contact Us
              </Button>
              <Button
                className="w-full justify-center bg-white text-black hover:bg-gray-100"
                onClick={() => {
                  router.push(ROUTES.INSURE);
                  setIsMenuOpen(false);
                }}
              >
                Get Quote
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
