"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FileText,
  LayoutGrid,
  Smartphone,
  Settings2,
  MessageCircle,
  BarChart3,
  Phone,
  type LucideIcon,
} from "lucide-react";

type ServiceItem = {
  id: string;
  icon: LucideIcon;
  title: string;
  price: string;
  currency: string;
  duration: string;
  description: string;
  popular?: boolean;
  features?: string[];
  /** если false — без приставки «от» (фиксированные пакеты) */
  showPriceFrom?: boolean;
  /** текст перед суммой, напр. «до » для телефонии */
  pricePrefix?: string;
};

const webServices: ServiceItem[] = [
  {
    id: "landing",
    icon: FileText,
    title: "Одностраничный Сайт",
    price: "100",
    currency: "USD",
    duration: "Срок: от 10 дней",
    description:
      "Продающая лендинг-страница с формой обратной связи и интеграцией с мессенджерами.",
  },
  {
    id: "corporate",
    icon: LayoutGrid,
    title: "Корпоративный Сайт",
    price: "300",
    currency: "USD",
    duration: "Срок: от 15 дней",
    description:
      "Многостраничный сайт с админ-панелью, каталогом товаров/услуг и системой управления контентом.",
    popular: true,
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Мобильное Приложение",
    price: "500",
    currency: "USD",
    duration: "Срок: 8-12 недель",
    description:
      "Нативное мобильное приложение для iOS и Android с синхронизацией данных и push-уведомлениями.",
  },
  {
    id: "marketing",
    icon: Smartphone,
    title: "Маркетинг и продвижение",
    price: "850",
    currency: "USD",
    duration: "Срок: от 2 недель",
    description:
      "Маркетинговое продвижение через социальные сети и поиски в поиске Gaze.kg",
    features: [
      "Контент: 25 публикаций и 4 сторис ежедневно",
      "Таргет: постоянные тесты рекламных гипотез",
      "Съёмки: 2 выезда в неделю",
      "Стратегия: анализ ЦА и конкурентов на старте",
    ],
  },
];

/** Пакеты настройки Bitrix24 — гибкая модель внедрения (аналог типовых пакетов на рынке). */
const bitrixPackages: ServiceItem[] = [
  {
    id: "bitrix-basic",
    icon: Settings2,
    title: "Битрикс24 — Базовый",
    price: "62 500",
    currency: "сом",
    duration: "Срок: по договорённости",
    showPriceFrom: false,
    description:
      "Подключение пользователей и стандартная настройка CRM под ваши процессы.",
    features: [
      "Пользователи CRM, фильтры и карточки сделок",
      "Воронки продаж, email и мессенджеры",
      "Формы обратной связи, соцсети, загрузка базы",
    ],
  },
  {
    id: "bitrix-standard",
    icon: Settings2,
    title: "Битрикс24 — Стандартный",
    price: "119 400",
    currency: "сом",
    duration: "Срок: по договорённости",
    showPriceFrom: false,
    popular: true,
    description:
      "Корпоративный портал и CRM с ролями, автоматизацией и двунаправленными воронками.",
    features: [
      "Всё из пакета «Базовый»",
      "Права CRM до 4 ролей",
      "Роботы до 10, триггеры до 5",
      "Шаблоны уведомлений, воронка в 2 направлениях",
    ],
  },
  {
    id: "bitrix-pro",
    icon: Settings2,
    title: "Битрикс24 — Профессиональный",
    price: "181 000",
    currency: "сом",
    duration: "Срок: по договорённости",
    showPriceFrom: false,
    description:
      "Почти полная настройка системы под продажи: отчёты, телефония, процессы, аналитика.",
    features: [
      "Всё из пакетов «Базовый» и «Стандартный»",
      "Отчёты до 3 шт.",
      "Облачная или внешняя IP-телефония в Б24",
      "Бизнес-процессы до 4, сквозная аналитика",
    ],
  },
];

const bitrixAddons: ServiceItem[] = [
  {
    id: "bitrix-contact-center",
    icon: MessageCircle,
    title: "Контакт-центр",
    price: "34 400",
    currency: "сом",
    duration: "Блок настроек",
    showPriceFrom: false,
    description:
      "Единая точка входящих обращений из мессенджеров и соцсетей в CRM.",
    features: [
      "WhatsApp, Telegram, Instagram, Facebook, ВКонтакте",
      "Формы и виджеты обратной связи в CRM",
    ],
  },
  {
    id: "bitrix-analytics",
    icon: BarChart3,
    title: "Сквозная аналитика",
    price: "34 400",
    currency: "сом",
    duration: "Блок настроек",
    showPriceFrom: false,
    description:
      "Подключение рекламных каналов и мониторинг эффективности в Битрикс24.",
    features: [
      "До 5 рекламных каналов на выбор",
      "Подменные номера до 5 (после телефонии)",
      "Подменные email, открытые линии до 3 каналов",
    ],
  },
  {
    id: "bitrix-telephony",
    icon: Phone,
    title: "Телефония",
    price: "42 500",
    currency: "сом",
    duration: "Срок: по договорённости",
    showPriceFrom: false,
    pricePrefix: "до ",
    description:
      "Облачная или IP-телефония, маршрутизация и сценарии для отдела продаж.",
    features: [
      "Облачная / внешняя IP-телефония в Б24",
      "Карточки звонков, IVR, приветствия",
    ],
  },
];

function ServiceCard({
  service,
  visible,
  delayMs,
}: {
  service: ServiceItem;
  visible: boolean;
  delayMs: number;
}) {
  const showFrom = service.showPriceFrom !== false;

  return (
    <div
      data-service-id={service.id}
      className={`service-card relative bg-white border-2 rounded-3xl p-8 transition-all duration-700 hover:shadow-2xl ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${
        service.popular
          ? "border-[#3DB7F4] shadow-xl shadow-[#3DB7F4]/10"
          : "border-gray-200 hover:border-[#3DB7F4]/50"
      }`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {service.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3DB7F4] text-white text-sm font-medium px-5 py-1.5 rounded-full">
          Популярно
        </div>
      )}

      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
          service.popular ? "bg-[#3DB7F4]/10" : "bg-gray-100"
        }`}
      >
        <service.icon
          className={`w-8 h-8 ${service.popular ? "text-[#3DB7F4]" : "text-[#3DB7F4]"}`}
        />
      </div>

      <h3 className="text-xl lg:text-2xl font-bold text-black mb-6 text-center">
        {service.title}
      </h3>

      <div className="text-center mb-4">
        {showFrom && <span className="text-gray-500 text-sm">от </span>}
        {service.pricePrefix && (
          <span className="text-gray-500 text-sm">{service.pricePrefix}</span>
        )}
        <span className="text-4xl lg:text-5xl font-bold text-[#3DB7F4]">
          {service.price}
        </span>
        <span className="text-gray-600 text-lg ml-2">{service.currency}</span>
      </div>

      <p className="text-center text-gray-500 text-sm mb-6">{service.duration}</p>

      <p className="text-gray-600 text-center mb-6 leading-relaxed">{service.description}</p>

      {service.features && service.features.length > 0 && (
        <ul className="text-gray-600 text-sm mb-8 space-y-2 text-left list-disc list-inside leading-relaxed">
          {service.features.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}

      <Button
        variant="outline"
        className={`w-full rounded-full h-12 font-medium transition-all duration-300 ${
          service.popular
            ? "border-[#3DB7F4] text-[#3DB7F4] hover:bg-[#3DB7F4] hover:text-white bg-transparent"
            : "border-gray-300 text-black hover:border-[#3DB7F4] hover:text-[#3DB7F4] bg-transparent"
        }`}
      >
        <a href="https://wa.me/996222233002" target="_blank" rel="noopener noreferrer">
          Узнать подробнее
        </a>
      </Button>
    </div>
  );
}

export function Service() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleIds, setVisibleIds] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-service-id");
            if (id) {
              setVisibleIds((prev) => [...new Set([...prev, id])]);
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    const cards = sectionRef.current?.querySelectorAll(".service-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-white"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
            Наши услуги и цены
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Выберите подходящее решение для вашего бизнеса
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8 max-w-8xl mx-auto">
          {webServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              visible={visibleIds.includes(service.id)}
              delayMs={index * 150}
            />
          ))}
        </div>

        <div className="mt-20 md:mt-28 pt-16 md:pt-20 border-t border-gray-200">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
              Настройка Bitrix24
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Гибкие пакеты внедрения и донастройки отдельных блоков — подберём состав работ под
              ваши цели и бюджет.
            </p>
          </div>

          <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6">
            Пакетная настройка
          </p>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 lg:gap-8 max-w-6xl mx-auto mb-14">
            {bitrixPackages.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                visible={visibleIds.includes(service.id)}
                delayMs={index * 150}
              />
            ))}
          </div>

          <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6">
            Отдельные блоки
          </p>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 lg:gap-8 max-w-6xl mx-auto">
            {bitrixAddons.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                visible={visibleIds.includes(service.id)}
                delayMs={index * 150}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
