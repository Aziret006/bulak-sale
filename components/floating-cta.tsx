"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, Phone } from "lucide-react";

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}
      `}
    >
      {/* Expanded buttons */}
      <div
        className={`absolute bottom-20 right-0 flex flex-col gap-3 transition-all duration-300 ease-out
          ${isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
        `}
      >
        <a
          href="https://wa.me/996222233002"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg
          hover:bg-green-700 hover:scale-105 transition"
        >
          <span className="text-sm font-medium whitespace-nowrap">
            WhatsApp
          </span>
          <MessageCircle className="w-5 h-5" />
        </a>

        <a
          href="tel:+996222233002"
          className="flex items-center gap-3 bg-[#3d4f5f] text-white px-4 py-3 rounded-xl shadow-lg
          hover:bg-[#2d3f4f] hover:scale-105 transition"
        >
          <span className="text-sm font-medium whitespace-nowrap">
            Позвонить
          </span>
          <Phone className="w-5 h-5" />
        </a>
      </div>

      {/* Main button wrapper */}
      <div className="relative">
        {/* Pulse */}
        {!isExpanded && (
          <span className="absolute inset-0 rounded-full bg-[#2f7cff]/30 animate-ping pointer-events-none" />
        )}

        {/* Button */}
        <button
          type="button"
          onClick={() => setIsExpanded(prev => !prev)}
          aria-label="Связаться с нами"
          className={`relative z-10 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center
          transition-all duration-300 hover:scale-110
          ${isExpanded ? "bg-[#e8eef1] text-[#3d4f5f] rotate-180" : "bg-[#2f7cff] text-white"}
        `}
        >
          {isExpanded ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}
