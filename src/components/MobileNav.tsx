"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

interface NavItem {
  href: string;
  label: string;
  isButton?: boolean;
}

interface MobileNavProps {
  items: NavItem[];
  logoUrl?: string | null;
  siteName: string;
  foundedYear: number;
}

export function MobileNav({ items, logoUrl, siteName, foundedYear }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button - Only visible on mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 text-[#6b6560] dark:text-white/70 hover:text-[#c9a227] dark:hover:text-[#fcd34d] transition-colors"
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-[280px] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ backgroundColor: 'var(--menu-bg, #faf8f5)' }}
        >
          {/* Solid background layer */}
          <div className="absolute inset-0 bg-[#faf8f5] dark:bg-[#1a1f2e]" />

          {/* Content wrapper */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10 bg-[#faf8f5] dark:bg-[#1a1f2e]">
              <div className="flex items-center gap-3">
                {logoUrl ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden relative">
                    <Image src={logoUrl} alt={siteName} fill className="object-cover" sizes="40px" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-[#c9a227] rounded-full flex items-center justify-center">
                    <span className="text-[#1a1f2e] font-bold">SS</span>
                  </div>
                )}
                <div>
                  <span className="font-dm-serif text-lg text-[#2d2926] dark:text-white">{siteName}</span>
                  <p className="text-xs text-[#6b6560] dark:text-white/50">Est. {foundedYear}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-[#6b6560] dark:text-white/70 hover:text-[#c9a227] dark:hover:text-[#fcd34d] transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 bg-[#faf8f5] dark:bg-[#1a1f2e]">
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item.href}>
                    {item.href.startsWith("#") ? (
                      <a
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block py-3 px-4 rounded-xl font-medium transition-colors ${
                          item.isButton
                            ? "bg-[#c9a227] text-[#1a1f2e] hover:bg-[#d4af37] text-center mt-4"
                            : "text-[#2d2926] dark:text-white hover:bg-[#c9a227]/10 dark:hover:bg-[#c9a227]/20 hover:text-[#c9a227] dark:hover:text-[#fcd34d]"
                        }`}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block py-3 px-4 rounded-xl font-medium transition-colors ${
                          item.isButton
                            ? "bg-[#c9a227] text-[#1a1f2e] hover:bg-[#d4af37] text-center mt-4"
                            : "text-[#2d2926] dark:text-white hover:bg-[#c9a227]/10 dark:hover:bg-[#c9a227]/20 hover:text-[#c9a227] dark:hover:text-[#fcd34d]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Theme Toggle */}
            <div className="p-4 border-t border-black/10 dark:border-white/10 bg-[#faf8f5] dark:bg-[#1a1f2e]">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6b6560] dark:text-white/60">Theme</span>
                <ThemeToggle className="text-[#6b6560] dark:text-white/70 hover:text-[#c9a227] dark:hover:text-[#fcd34d] hover:bg-black/5 dark:hover:bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
