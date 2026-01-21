"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, LayoutGrid, Smartphone } from "lucide-react";
import Link from "next/link";

const services = [
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
      price: "850 ",
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

export function Service() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleCards((prev) => [...new Set([...prev, index])]);
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
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
            Наши услуги и цены
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Выберите подходящее решение для вашего бизнеса
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8 max-w-8xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-index={index}
              className={`service-card relative bg-white border-2 rounded-3xl p-8 transition-all duration-700 hover:shadow-2xl ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              } ${
                service.popular
                  ? "border-[#3DB7F4] shadow-xl shadow-[#3DB7F4]/10"
                  : "border-gray-200 hover:border-[#3DB7F4]/50"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3DB7F4] text-white text-sm font-medium px-5 py-1.5 rounded-full">
                  Популярно
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                service.popular ? "bg-[#3DB7F4]/10" : "bg-gray-100"
              }`}>
                <service.icon className={`w-8 h-8 ${service.popular ? "text-[#3DB7F4]" : "text-[#3DB7F4]"}`} />
              </div>

              {/* Title */}
              <h3 className="text-xl lg:text-2xl font-bold text-black mb-6 text-center">
                {service.title}
              </h3>

              {/* Price */}
              <div className="text-center mb-4">
                <span className="text-gray-500 text-sm">от </span>
                <span className="text-4xl lg:text-5xl font-bold text-[#3DB7F4]">
                  {service.price}
                </span>
                <span className="text-gray-600 text-lg ml-2">{service.currency}</span>
              </div>

              {/* Duration */}
              <p className="text-center text-gray-500 text-sm mb-6">
                {service.duration}
              </p>

              {/* Description */}
              <p className="text-gray-600 text-center mb-8 leading-relaxed">
                {service.description}
              </p>

              {/* CTA */}
              <Button
                variant="outline"
                className={`w-full rounded-full h-12 font-medium transition-all duration-300 ${
                  service.popular
                    ? "border-[#3DB7F4] text-[#3DB7F4] hover:bg-[#3DB7F4] hover:text-white bg-transparent"
                    : "border-gray-300 text-black hover:border-[#3DB7F4] hover:text-[#3DB7F4] bg-transparent"
                }`}
              >
                <a href="https://wa.me/996222233002" target="_blank" rel="noopener noreferrer">Узнать подробнее</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}