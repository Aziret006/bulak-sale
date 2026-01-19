"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, MapPin, Phone, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="absolute bottom- left-0 right-0 z-50 bg-[#0a3e6b] w-full text-white overflow-hidden rounded-t-xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#2f7cff] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2f7cff] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center">
               <span className="text-xl md:text-2xl font-extrabold tracking-tight">
                <span className="text-[#25292c]">BULAK</span>
                <span className="text-[#3DB7F4]">SALE</span>
              </span>
            </div>
            <p className="text-white/70 max-w-md mb-6 leading-relaxed">
              Профессиональное внедрение CRM Bitrix24 в Кыргызстане.
              Автоматизация бизнеса, разработка чат-ботов и маркетинговые
              стратегии.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/bulak_alina"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#2f7cff] flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/996222233002"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-green-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="mailto:bulaksale@gmail.com"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#2f7cff] flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6">Услуги</h4>
            <ul className="space-y-4">
              {[
                "Внедрение Bitrix24",
                "Разработка чат-ботов",
                "Интеграция WhatsApp",
                "Сквозная аналитика",
                "Миграция данных",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#services"
                    className="text-white/70 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-6">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#2f7cff] shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  Бишкек, Кыргызстан
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#2f7cff] shrink-0 mt-0.5" />
                <div className="text-sm">
                  <a
                    href="tel:+996222233002"
                    className="text-white/70 hover:text-white transition-colors block"
                  >
                    +996 222 233 002
                  </a>
                  <a
                    href="tel:+996708772844"
                    className="text-white/70 hover:text-white transition-colors block"
                  >
                    +996 708 772 844
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#2f7cff] shrink-0 mt-0.5" />
                <a
                  href="mailto:bulaksale@gmail.com"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  bulaksale@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            {currentYear} Bulaksale. Все права защищены.
          </p>
          <a
            href="https://bulaksale.kg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white text-sm transition-colors"
          >
            bulaksale.kg
          </a>
        </div>
      </div>
    </footer>
  );
}
