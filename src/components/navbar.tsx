'use client';
import Link from "next/link";
import { MENUITEMS } from "@/lib/data/consts"
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col justify-start">
      {/* Hamburger Button */}
      <HamburgerButton isOpen={isMenuOpen} onClick={toggleMenu} />

      <nav>
        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-2 items-center justify-center">
          {MENUITEMS.map((item) => (
            <li key={item.title}>
              <Link
                href={item.path}
                className="hover:underline hover:underline-offset-2"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed top-24 left-0 right-0 bottom-0 z-50 overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <ul className="flex flex-col text-md text-center font-semibold">
            {MENUITEMS.map((item) => (
              <li key={item.title} className="p-4 border-b border-gray-300">
                <Link
                  href={item.path}
                  className="hover:underline hover:underline-offset-2"
                  onClick={closeMenu} // Close menu on link click
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

function HamburgerButton({ isOpen, onClick, className = "" }: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 ${className}`}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <span
        className={`block w-6 h-0.5 bg-gray-900 dark:bg-gray-200 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
      />
      <span
        className={`block w-6 h-0.5 bg-gray-900 dark:bg-gray-200 transition-all duration-300 ${isOpen ? 'opacity-0' : ''
          }`}
      />
      <span
        className={`block w-6 h-0.5 bg-gray-900 dark:bg-gray-200 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
      />
    </button>
  );
}