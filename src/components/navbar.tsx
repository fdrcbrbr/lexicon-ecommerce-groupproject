'use client';
import Link from "next/link";
import { MENUITEMS } from "@/data/consts"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleMenuClick = (path: string) => {
    router.push(path);
    closeMenu();
  }

  const handleMenuContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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
        <div
          className={`md:hidden absolute top-24 left-0 right-0 bottom-0 z-50 overflow-hidden transition-all duration-300
          ${isMenuOpen ? 'h-full opacity-100' : 'max-h-0 opacity-0'}`}
          onClick={closeMenu}
        >
          <ul
            className="flex flex-col text-md text-center font-semibold bg-white shadow-lg"
            onClick={handleMenuContentClick}
          >
            {MENUITEMS.map((item) => (
              <li key={item.title} className="p-4 border-b border-gray-300 last:border-b-0"
                onClick={() => handleMenuClick(item.path)}
              >
                <span className="hover:underline hover:underline-offset-2">{item.title}</span>
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
        className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
      />
      <span
        className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'opacity-0' : ''
          }`}
      />
      <span
        className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
      />
    </button>
  );
}