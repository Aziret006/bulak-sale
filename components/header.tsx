"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "#portfolio", label: "О нас" },
  { href: "#services", label: "Услуги" },
  { href: "#pricing", label: "Цены" },
  { href: "#contact", label: "Контакты" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const element = document.querySelector(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-110 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen 
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-[7%]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="relative z-[120] cursor-pointer" 
            onClick={(e) => scrollToSection("#hero", e)}
          >
            <div className="flex items-center">
              <span className="text-xl md:text-2xl font-extrabold tracking-tight">
                <span className="text-[#3A3F42]">BULAK</span>
                <span className="text-[#3DB7F4]">SALE</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={(e) => scrollToSection(link.href, e)}
                className="relative text-gray-700 hover:text-[#3DB7F4] text-sm font-semibold transition-colors duration-300 group outline-none"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3DB7F4] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              className="bg-[#3DB7F4] hover:bg-[#3DB7F4] text-white rounded-full px-7 h-12 font-bold shadow-lg shadow-[#3DB7F4]/20 transition-all duration-300 flex items-center gap-2 group active:scale-95"
              href="https://wa.me/996708772844" target="_blank" rel="noreferrer"
            >
          Записаться на консультацию
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Burger Menu Button */}
          <button
            type="button"
            className="lg:hidden relative z-[120] p-2 flex items-center justify-center w-10 h-10 outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <div className="relative w-6 h-5">
              <span 
                className={`absolute left-0 w-full h-0.5 bg-gray-900 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? "top-2 rotate-45" : "top-0"
                }`} 
              />
              <span 
                className={`absolute left-0 top-2 w-full h-0.5 bg-gray-900 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0 scale-0" : "opacity-100"
                }`} 
              />
              <span 
                className={`absolute left-0 w-full h-0.5 bg-gray-900 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? "top-2 -rotate-45" : "top-4"
                }`} 
              />
            </div>
          </button>
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-white z-115 pt-24 pb-112 px-8 lg:hidden flex flex-col justify-between overflow-y-auto transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={(e) => scrollToSection(link.href, e)}
              className="text-lg font-bold text-left text-gray-900 hover:text-[#3DB7F4] transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="mt-12 space-y-8 transition-all duration-500 delay-100">
          <Link
            className="w-full bg-[#3DB7F4] text-white rounded-2xl py-5 text-lg font-bold shadow-xl shadow-[#3DB7F4]/20 flex items-center justify-center gap-3 active:scale-95 transition-transform"
            href="https://wa.me/996708772844" target="_blank" rel="noreferrer"
            // onClick={(e) => scrollToSection("#contact", e)}
          >
            Записаться на консультацию
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <div className="flex justify-between items-center text-gray-500 text-sm">
            <span>+996 222 233 002</span>
            <span>Бишкек, Кыргызстан</span>
          </div>
        </div>
      </div>
    </header>
  );
}