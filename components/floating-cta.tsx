"use client";

import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Phone, 
  Mail, 
  Send,
  MessageSquare,
  
} from 'lucide-react';

export const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeVisible = window.scrollY > 300;
      if (shouldBeVisible !== isVisible) {
        setIsVisible(shouldBeVisible);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const contactOptions = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: <MessageSquare className="w-5 h-5" />,
      href: 'https://wa.me/996222233002',
      color: 'bg-[#25D366]',
      hover: 'hover:bg-[#128C7E]',
      textColor: 'text-white'
    },
    {
      id: 'telegram',
      label: 'Telegram',
      icon: <Send className="w-5 h-5" />,
      href: 'https://t.me/alina_bulak',
      color: 'bg-[#0088cc]',
      hover: 'hover:bg-[#0077b5]',
      textColor: 'text-white'
    },
    {
      id: 'phone',
      label: 'Позвонить',
      icon: <Phone className="w-5 h-5" />,
      href: 'tel:+996222233002',
      color: 'bg-slate-800',
      hover: 'hover:bg-slate-900',
      textColor: 'text-white'
    },
    {
      id: 'email',
      label: 'Email',
      icon: <Mail className="w-5 h-5" />,
      href: 'mailto:alina.bulak@outlook.com',
      color: 'bg-white',
      hover: 'hover:bg-slate-50',
      textColor: 'text-slate-900',
      border: 'border border-slate-200'
    }
  ];

  return (
    <div className={`fixed bottom-8 right-8 z-[100] flex flex-col items-end transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      
      {/* Background Overlay */}
      {isExpanded && (
        <div 
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-[-1] cursor-pointer"
        />
      )}

      {/* Contact Options List */}
      <div className={`mb-4 flex flex-col items-end gap-3 w-max transition-all duration-300 transform ${isExpanded ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none translate-y-4'}`}>
        {contactOptions.map((option) => (
          <a
            key={option.id}
            href={option.href}
            target={option.id !== 'phone' ? '_blank' : undefined}
            rel="noopener noreferrer"
            className={`
              flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl transition-all duration-300 hover:translate-x-[-4px] active:scale-95
              ${option.color} ${option.textColor} ${option.hover} ${option.border || ''}
            `}
          >
            <span className="text-sm font-semibold whitespace-nowrap px-1">
              {option.label}
            </span>
            <div className="p-1">
              {option.icon}
            </div>
          </a>
        ))}
      </div>

      {/* Main Trigger Button */}
      <div className="relative">
        {/* Pulse Ring */}
        {!isExpanded && (
          <span className="absolute inset-0 rounded-full bg-indigo-500/30 animate-ping z-[-1]" />
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl
            transition-all duration-300 active:scale-90
            ${isExpanded ? 'bg-white text-slate-800 rotate-90' : 'bg-indigo-600 text-white'}
          `}
          aria-label={isExpanded ? "Закрыть меню" : "Связаться с нами"}
        >
          {isExpanded ? (
            <X className="w-8 h-8" />
          ) : (
            <MessageCircle className="w-8 h-8" />
          )}

          {/* Tooltip */}
          {!isExpanded && (
            <div className="absolute right-full mr-4 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
              Нужна помощь?
            </div>
          )}
        </button>
      </div>
    </div>
  );
};