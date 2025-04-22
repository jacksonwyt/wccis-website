// src/components/Header.tsx
import React, { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
import Link from "next/link";
import { useRouter } from "next/router";
import { NAVIGATION_ITEMS, ROUTES } from "@/utils/routes";
import { Button } from "@/components/ui/Button";
import { Menu, X, ChevronDown, Shield, Phone, ArrowRight, Plus } from "lucide-react";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();
  // State to track client-side mounting for Portal
  const [isClient, setIsClient] = useState(false);

  // Effect to set isClient to true after mounting
  useEffect(() => {
    setIsClient(true);
  }, []);

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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
    <>
      <header
        className={cn(
          "fixed w-full z-40 transition-all duration-300 transform",
          isScrolled ? "backdrop-blur-xl bg-black/80" : "bg-transparent",
          isScrollingUp ? "" : "translate-y-[-100%]",
          "border-b border-white/[0.05]",
          isScrolled ? 'h-12 lg:h-16' : 'h-12 lg:h-20'
        )}
        style={{
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        <nav className="max-w-[1400px] h-full mx-auto px-6">
          <div className="flex items-center justify-between h-full">
            {/* Logo - Hidden on mobile, shown on lg+ */}
            <div className={cn(
              "transition-all duration-300 hidden lg:block",
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
                  <div className="bg-white/[0.07] backdrop-blur-md border border-white/[0.1] p-6">
                    <div className="grid grid-cols-2 gap-4">
                      {insuranceTypes.map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          className="group flex flex-col p-4 hover:bg-white/[0.05] transition-all duration-300 rounded-lg"
                          onClick={() => setActiveDropdown(null)}
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
                          onClick={() => {
                            router.push(ROUTES.CONTACT);
                            setActiveDropdown(null);
                          }}
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
                    "px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md",
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
                         hover:bg-white/[0.05] transition-colors rounded-md"
                onClick={() => router.push(ROUTES.CONTACT)}
              >
                Contact Us
              </Button>
              <Button
                onClick={() => router.push(ROUTES.INSURE)}
                className="bg-white text-black hover:bg-gray-100 
                         px-6 py-2.5 group transition-all duration-300 rounded-md"
              >
                Get Quote
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 
                                   transition-transform" />
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* NEW Mobile Navigation - Rendered via Portal */}
      {isClient && createPortal(
        <div className="lg:hidden">
          {/* Sticky Plus/Close Button - Updated styles and icon logic */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full text-white",
              "flex items-center justify-center shadow-lg",
              "transition-all duration-300 ease-in-out transform",
              isMenuOpen 
                ? "bg-red-600 rotate-[225deg] hover:bg-red-700" // Red background, rotate for smooth transition
                : "bg-blue-500 scale-100 hover:scale-110 hover:bg-blue-600" // Blue background
            )}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {/* Conditionally render Plus or X icon */} 
            {isMenuOpen ? (
              <X className="w-7 h-7 transition-opacity duration-200 delay-150" />
            ) : (
              <Plus className="w-7 h-7 transition-opacity duration-200 delay-150" />
            )}
            {/* We rotate the button itself for a smoother transform from + to X */}
          </button>

          {/* Full Screen Overlay - Updated background and transitions */}
          <div
            className={cn(
              "fixed inset-0 z-40 bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 backdrop-blur-lg", // Subtle gradient and stronger blur
              "flex flex-col items-center justify-center pt-16", // Added pt-16 for top padding
              "transition-opacity duration-300 ease-in-out", // Faster fade for overlay
              isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
          >
            {/* Logo at the top of the mobile menu */} 
            <div className={cn(
                "mb-12 transition-all duration-300 ease-in-out", // Added margin-bottom
                isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-90",
                "delay-100" // Slight delay
            )}>
              <Logo />
            </div>

            {/* Navigation Links Container - Updated links and delays */}
            <nav className="flex flex-col items-center space-y-8 text-center px-4">
              {/* Single Insurance Link */} 
              <Link
                key={"mobile-insurance"}
                href={ROUTES.INSURE} // Link to the main insure page
                className={cn(
                  "text-2xl text-gray-200 hover:text-white transition-all duration-300 ease-in-out",
                  "px-4 py-2 hover:bg-white/10 rounded-md",
                  isMenuOpen 
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4",
                  "delay-150" // Start delay slightly later after logo
                )}
                style={{ transitionDelay: `150ms` }} 
                onClick={() => setIsMenuOpen(false)}
              >
                Insurance
              </Link>

              {/* Divider */}
              <hr className={cn(
                 "w-1/2 border-gray-700 my-4 transition-all duration-300 ease-in-out",
                 isMenuOpen ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
                 "delay-200" // Adjusted delay
               )} 
               style={{ transitionDelay: `225ms` }} // Adjusted delay
               /> 

              {/* Main Navigation Items - Adjusted delays */}
              {NAVIGATION_ITEMS.map((item, index) => (
                <Link
                  key={"mobile-" + item.path}
                  href={item.path}
                  className={cn(
                    "text-2xl transition-all duration-300 ease-in-out",
                    "px-4 py-2 hover:bg-white/10 rounded-md",
                    router.pathname === item.path
                      ? "text-white font-semibold"
                      : "text-gray-200 hover:text-white",
                    isMenuOpen 
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4",
                    // Delay starts after Insurance link (index 0) and first divider (index 1)
                     `delay-${(index + 2) * 100}` 
                  )}
                  style={{ transitionDelay: `${(index + 2) * 75 + 150}ms` }} // Adjusted base delay
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

               {/* Divider - Adjusted delays */}
               <hr className={cn(
                 "w-1/2 border-gray-700 my-4 transition-all duration-300 ease-in-out",
                 isMenuOpen ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
                 // Delay after Insurance (0), Divider (1), Nav Items (NAVIGATION_ITEMS.length)
                 `delay-${(NAVIGATION_ITEMS.length + 2) * 100}`
               )} 
               style={{ transitionDelay: `${(NAVIGATION_ITEMS.length + 2) * 75 + 150}ms` }}
               /> 

              {/* Action Buttons - Adjusted delays */}
              <Button
                variant="ghost"
                className={cn(
                  "text-2xl text-gray-200 hover:text-white transition-all duration-300 ease-in-out",
                  "px-4 py-2 hover:bg-white/10 rounded-md",
                  isMenuOpen 
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4",
                   // Delay after Insurance (0), Divider (1), Nav Items (length), Divider (1)
                  `delay-${(NAVIGATION_ITEMS.length + 3) * 100}`
                )}
                style={{ transitionDelay: `${(NAVIGATION_ITEMS.length + 3) * 75 + 150}ms` }}
                onClick={() => {
                  router.push(ROUTES.CONTACT);
                  setIsMenuOpen(false);
                }}
              >
                Contact Us
              </Button>
              <Button
                className={cn(
                  "text-2xl bg-white text-black hover:bg-gray-200 transition-all duration-300 ease-in-out", 
                  "px-8 py-3 rounded-md",
                  isMenuOpen 
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4",
                   // Delay after Insurance (0), Divider (1), Nav Items (length), Divider (1), Contact (1)
                  `delay-${(NAVIGATION_ITEMS.length + 4) * 100}`
                )}
                style={{ transitionDelay: `${(NAVIGATION_ITEMS.length + 4) * 75 + 150}ms` }}
                onClick={() => {
                  router.push(ROUTES.INSURE);
                  setIsMenuOpen(false);
                }}
              >
                Get Quote
              </Button>
            </nav>
          </div>
        </div>,
        document.body // Target element for the portal
      )}
    </>
  );
};

export default Header;
