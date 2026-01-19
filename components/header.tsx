"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "#services", label: "Услуги" },
  { href: "#pricing", label: "Цены" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#contact", label: "Контакты" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Функция для плавной прокрутки к секции
  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    // Закрываем мобильное меню если открыто
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    
    // Находим элемент по ID
    const element = document.querySelector(sectionId);
    if (element) {
      // Плавная прокрутка с учетом высоты хедера
      const headerHeight = 80; // Высота хедера в пикселях
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
      <div className="container mx-auto px-4 lg:px-[7%] md:px-8">
        <div className="flex items-center justify-between">
          <div className="relative z-10 group cursor-pointer" onClick={(e) => scrollToSection("#hero", e)}>
              <div className="flex items-center">
               <span className="text-xl md:text-2xl font-extrabold tracking-tight">
                <span className="text-[#3A3F42]">BULAK</span>
                <span className="text-[#3DB7F4]">SALE</span>
              </span>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={(e) => scrollToSection(link.href, e)}
                className="relative text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors duration-300 group outline-none focus:outline-none"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#2f7cff] to-transparent group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-4">
        
            <Button
              className="bg-gradient-to-r from-[#2f7cff] to-[#2f7cff]/80 hover:from-[#2563eb] hover:to-[#2563eb]/80 text-white rounded-full px-6 h-11 group shadow-lg shadow-[#2f7cff]/20 transition-all duration-300"
              onClick={(e) => scrollToSection("#contact", e)}
            >
              <div className="flex items-center gap-2">
                     Записаться на консультацию
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Button>
          </div>

          {/* Кнопка мобильного меню */}
          <button
            type="button"
            className="lg:hidden relative z-10 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <div className="flex flex-col gap-1.5">
                <div className="w-6 h-0.5 rounded-full bg-gray-900" />
                <div className="w-6 h-0.5 rounded-full bg-gray-900" />
                <div className="w-6 h-0.5 rounded-full bg-gray-900" />
              </div>
            )}
          </button>
        </div>

        {/* Мобильное меню */}
        <div
          className={`lg:hidden fixed inset-0 bg-white transition-all duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          style={{ top: "80px" }}
        >
          <nav className="relative flex flex-col items-center justify-center h-full gap-8 pb-20 z-10">
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                onClick={(e) => scrollToSection(link.href, e)}
                className="text-2xl font-medium text-gray-900 hover:text-[#2f7cff] transition-all duration-300 outline-none focus:outline-none"
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : "0ms",
                  transform: isMobileMenuOpen
                    ? "translateY(0)"
                    : "translateY(20px)",
                  opacity: isMobileMenuOpen ? 1 : 0,
                }}
              >
                {link.label}
              </button>
            ))}
            
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#2f7cff] to-[#2f7cff]/80 hover:from-[#2563eb] hover:to-[#2563eb]/80 text-white rounded-full px-8 mt-6 h-14 text-base font-semibold shadow-lg shadow-[#2f7cff]/20 transition-all duration-300"
              style={{
                transitionDelay: isMobileMenuOpen ? "400ms" : "0ms",
                transform: isMobileMenuOpen
                  ? "translateY(0)"
                  : "translateY(20px)",
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
              onClick={(e) => scrollToSection("#contact", e)}
            >
              <div className="flex items-center gap-2">
                 Записаться на консультацию
                <ArrowRight className="w-5 h-5" />
              </div>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}