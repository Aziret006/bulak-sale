"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
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
  /** старая цена до скидки (зачёркнутая) */
  originalPrice?: string;
  /** процент скидки, напр. 20 */
  discountPercent?: number;
  /** срок действия акции, напр. «только в мае» */
  promoPeriod?: string;
};

function parsePrice(value: string): number {
  return Number.parseInt(value.replace(/\s/g, ""), 10);
}

function formatPrice(value: number): string {
  return value.toLocaleString("ru-RU");
}

function applyDiscount(original: string, percent: number): string {
  const discounted = Math.round(parsePrice(original) * (1 - percent / 100));
  return formatPrice(discounted);
}

const bitrixPackages: ServiceItem[] = [
  {
    id: "bitrix-basic",
    icon: Settings2,
    title: "Битрикс24 — Базовый",
    originalPrice: "65 000",
    price: applyDiscount("65 000 ", 5),
    discountPercent: 5,
    promoPeriod: "только в мае",
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
    originalPrice: "104 900",
    price: applyDiscount("104 900",5),
    discountPercent: 5,
    promoPeriod: "только в мае",
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
    originalPrice: "154 900",
    price: applyDiscount("154 900", 5),
    discountPercent: 5,
    promoPeriod: "только в мае",
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

const webServices: ServiceItem[] = [
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

];

/** Пакеты настройки Bitrix24 — гибкая модель внедрения (аналог типовых пакетов на рынке). */


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
      className={cn(
        "service-card relative bg-white border-2 rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 transition-all duration-700 hover:shadow-2xl",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
        service.popular
          ? "border-[#3DB7F4] shadow-xl shadow-[#3DB7F4]/10"
          : "border-gray-200 hover:border-[#3DB7F4]/50",
      )}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {service.popular && (
        <div className="absolute -top-3 lg:-top-4 left-1/2 -translate-x-1/2 bg-[#3DB7F4] text-white text-xs sm:text-sm font-medium px-4 py-1 lg:px-5 lg:py-1.5 rounded-full">
          Популярно
        </div>
      )}

      <div
        className={cn(
          "w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6",
          service.popular ? "bg-[#3DB7F4]/10" : "bg-gray-100",
        )}
      >
        <service.icon className="w-6 h-6 lg:w-8 lg:h-8 text-[#3DB7F4]" />
      </div>

      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-4 lg:mb-6 text-center">
        {service.title}
      </h3>

      <div className="text-center mb-3 lg:mb-4">
        {service.originalPrice && service.discountPercent ? (
          <div className="space-y-1.5">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {showFrom && (
                <span className="text-gray-500 text-sm basis-full">от </span>
              )}
              <span className="relative inline-block text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3DB7F4]/75 leading-none tracking-tight">
                {service.originalPrice}
                <span
                  className="absolute left-[-3%] right-[-3%] top-1/2 h-[3px] sm:h-1 bg-[#3DB7F4] -translate-y-1/2 rounded-full pointer-events-none"
                  aria-hidden
                />
              </span>
              <span className="text-gray-600 text-base lg:text-lg">{service.currency}</span>
              <span className="rounded-full bg-[#3DB7F4] text-white text-xs font-semibold px-2.5 py-0.5">
                −{service.discountPercent}%
              </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              {service.pricePrefix && (
                <span className="text-gray-500 text-sm">{service.pricePrefix}</span>
              )}
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-none">
                {service.price}
              </span>
              <span className="text-gray-600 text-base lg:text-lg font-medium">
                {service.currency}
              </span>
            </div>
            {service.promoPeriod && (
              <p className="text-xs sm:text-sm text-[#3DB7F4] font-medium pt-0.5">
                Действует {service.promoPeriod}
              </p>
            )}
          </div>
        ) : (
          <>
            {showFrom && <span className="text-gray-500 text-sm">от </span>}
            {service.pricePrefix && (
              <span className="text-gray-500 text-sm">{service.pricePrefix}</span>
            )}
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3DB7F4]">
              {service.price}
            </span>
            <span className="text-gray-600 text-base lg:text-lg ml-1.5 lg:ml-2">
              {service.currency}
            </span>
          </>
        )}
      </div>

      <p className="text-center text-gray-500 text-sm mb-4 lg:mb-6">{service.duration}</p>

      <p className="text-gray-600 text-center mb-4 lg:mb-6 leading-relaxed text-sm sm:text-base">
        {service.description}
      </p>

      {service.features && service.features.length > 0 && (
        <ul className="text-gray-600 text-sm mb-5 lg:mb-8 space-y-1.5 lg:space-y-2 text-left list-disc list-inside leading-relaxed">
          {service.features.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}

      <Button
        variant="outline"
        className={`w-full rounded-full h-11 lg:h-12 font-medium transition-all duration-300 ${
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

function ServiceCardsList({
  services,
  gridClassName,
  visibleIds,
}: {
  services: ServiceItem[];
  gridClassName: string;
  visibleIds: string[];
}) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);

  const onCarouselSelect = useCallback(() => {
    if (!carouselApi) return;
    setActiveSlide(carouselApi.selectedScrollSnap());
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;
    onCarouselSelect();
    carouselApi.on("select", onCarouselSelect);
    return () => {
      carouselApi.off("select", onCarouselSelect);
    };
  }, [carouselApi, onCarouselSelect]);

  return (
    <>
      <div className={cn("hidden lg:grid", gridClassName)}>
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            visible={visibleIds.includes(service.id)}
            delayMs={index * 150}
          />
        ))}
      </div>

      <div className="lg:hidden">
        <Carousel
          setApi={setCarouselApi}
          opts={{ align: "center", loop: false }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {services.map((service, index) => (
              <CarouselItem
                key={service.id}
                className="pl-2 basis-[92%] sm:basis-[85%] md:basis-[70%]"
              >
                <ServiceCard
                  service={service}
                  visible={visibleIds.includes(service.id)}
                  delayMs={index * 150}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-3 mt-4">
            <CarouselPrevious className="static translate-y-0 left-auto top-auto" />
            <div className="flex gap-2">
              {services.map((service, i) => (
                <button
                  key={service.id}
                  type="button"
                  aria-label={service.title}
                  onClick={() => carouselApi?.scrollTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    activeSlide === i ? "w-6 bg-[#3DB7F4]" : "w-2 bg-gray-300",
                  )}
                />
              ))}
            </div>
            <CarouselNext className="static translate-y-0 right-auto top-auto" />
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">
            {services[activeSlide]?.title}
          </p>
        </Carousel>
      </div>
    </>
  );
}

function Service() {
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
      className="relative py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden bg-white"
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        {/* <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-6">
            Наши услуги и цены
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Выберите подходящее решение для вашего бизнеса
          </p>
        </div> */}

        <div id="bitrix-licenses">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
              Настройка Bitrix24
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Гибкие пакеты внедрения и донастройки отдельных блоков — подберём состав работ под
              ваши цели и бюджет.
            </p>
          </div>

          <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 md:mb-3">
            Пакетная настройка
          </p>
          <p className="text-center text-sm text-[#3DB7F4] font-medium mb-4 md:mb-6">
            Скидка действует только в мае
          </p>
          <div className="mb-8 md:mb-14">
            <ServiceCardsList
              services={bitrixPackages}
              gridClassName="sm:grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 lg:gap-8 max-w-6xl mx-auto"
              visibleIds={visibleIds}
            />
          </div>

          <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 md:mb-6">
            Отдельные блоки
          </p>
          <ServiceCardsList
            services={bitrixAddons}
            gridClassName="sm:grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 lg:gap-8 max-w-6xl mx-auto"
            visibleIds={visibleIds}
          />
        </div>

        <div className="mt-12 sm:mt-16 md:mt-24 lg:mt-28 pt-10 sm:pt-12 md:pt-16 lg:pt-20 border-t border-gray-200">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
              Веб-разработка и маркетинг
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Сайты, приложения и продвижение под ключ
            </p>
          </div>
          <ServiceCardsList
            services={webServices}
            gridClassName="sm:grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8 max-w-8xl mx-auto"
            visibleIds={visibleIds}
          />
        </div>
      </div>
    </section>
  );
}

export { Service };
