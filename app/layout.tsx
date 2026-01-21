import React from "react";
import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next";
import './globals.css';

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-playfair',
  display: 'swap',
});

// Структурированные данные для локального бизнеса
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Bulaksale — внедрение Битрикс24 в Бишкеке",
  "description": "Профессиональное внедрение CRM Bitrix24 в Кыргызстане. Автоматизация бизнеса, интеграция WhatsApp, разработка мобильных приложений.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Бишкек",
    "addressRegion": "Чуйская область",
    "addressCountry": "KG"
  },
  "service": [
    {
      "@type": "Service",
      "name": "Внедрение Битрикс24",
      "description": "Настройка и внедрение CRM системы Битрикс24"
    },
    {
      "@type": "Service",
      "name": "Автоматизация бизнеса",
      "description": "Автоматизация бизнес-процессов и отделов продаж"
    },
    {
      "@type": "Service",
      "name": "Разработка чат-ботов",
      "description": "Создание чат-ботов для WhatsApp и Telegram"
    }
  ],
  "areaServed": {
    "@type": "Country",
    "name": "Кыргызстан"
  },
  "founder": {
    "@type": "Person",
    "name": "Основатель Bulaksale",
    "jobTitle": "CEO"
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e40af',
};

export const metadata: Metadata = {
  title: {
    default: 'Внедрение Битрикс24 в Бишкеке | Bulaksale — автоматизация бизнеса',
    template: '%s | Bulaksale — Битрикс24 в Кыргызстане',
  },
  description: 'Профессиональное внедрение CRM Bitrix24 в Кыргызстане. Вы получите автоматизацию отдела продаж, интеграцию WhatsApp и прозрачную аналитику прибыли. Опыт инженеров 13+ лет.',
  keywords: ['Битрикс24 Бишкек', 'внедрение CRM Кыргызстан', 'автоматизация бизнеса Бишкек', 'чат-бот для бизнеса', 'разработка мобильных приложений Бишкек', 'Bitrix24 Кыргызстан', 'CRM система Бишкек', 'автоматизация продаж'],
  
  // Open Graph для социальных сетей
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://bulaksale.kg/',
    title: 'Внедрение Битрикс24 в Бишкеке | Bulaksale — автоматизация бизнеса',
    description: 'Профессиональное внедрение CRM Bitrix24 в Кыргызстане. Опыт 13+ лет в автоматизации бизнеса.',
    siteName: 'Bulaksale',
    images: [
      {
        url: 'https://bulaksale.kg/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bulaksale — автоматизация бизнеса в Кыргызстане',
      },
    ],
  },
  
  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: 'Внедрение Битрикс24 в Бишкеке | Bulaksale',
    description: 'Профессиональное внедрение CRM Bitrix24 в Кыргызстане',
    images: ['https://bulaksale.kg/twitter-image.jpg'],
    creator: '@bulaksale',
  },
  
  // Robots для SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Дополнительные мета-теги
  authors: [{ name: 'Bulaksale' }],
  creator: 'Bulaksale Team',
  publisher: 'Bulaksale',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Альтернативные языки
  alternates: {
    canonical: 'https://bulaksale.kg/',
    languages: {
      'ru-RU': 'https://bulaksale.kg/ru',
      'kg-KG': 'https://bulaksale.kg/kg',
    },
  },
  
  // Категория для поисковиков
  category: 'Business Services',
  
  // Географические метки
  other: {
    'geo.region': 'KG-C',
    'geo.placename': 'Bishkek',
    'geo.position': '42.8746;74.5698',
    'ICBM': '42.8746, 74.5698',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Схематичные данные JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        
        {/* Предварительная загрузка шрифтов */}
        <link 
          rel="preload" 
          href="/fonts/inter-var.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        
        {/* Канонический тег дублируется */}
        <link rel="canonical" href="https://bulaksale.kg/" />
        
        {/* Версия для печати */}
        <link rel="alternate" media="print" href="https://bulaksale.kg/print" />
      </head>
      <body className={`font-sans antialiased bg-white text-gray-900`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}