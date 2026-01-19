import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin", "cyrillic"] });
const _playfair = Playfair_Display({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: 'Внедрение Битрикс24 в Бишкеке | Bulaksale — автоматизация бизнеса',
  description: 'Профессиональное внедрение CRM Bitrix24 в Кыргызстане. Вы получите автоматизацию отдела продаж, интеграцию WhatsApp и прозрачную аналитику прибыли. Опыт инженеров 13+ лет.',
  keywords: 'Битрикс24 Бишкек, внедрение CRM Кыргызстан, автоматизация бизнеса, чат-бот для бизнеса, разработка мобильных приложений Бишкек',
  // icons: {
  //   icon: [
  //     {
  //       url: '/icon-light-32x32.png',
  //       media: '(prefers-color-scheme: light)',
  //     },
  //     {
  //       url: '/icon-dark-32x32.png',
  //       media: '(prefers-color-scheme: dark)',
  //     },
  //     {
  //       url: '/icon.svg',
  //       type: 'image/svg+xml',
  //     },
  //   ],
  //   apple: '/apple-icon.png',
  // },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
