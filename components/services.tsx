"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Building2,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "small",
    icon: Sparkles,
    title: "Малый бизнес",
    subtitle: "Быстрый старт и порядок",
    description: "Для тех, кто хочет выйти из хаоса тетрадей и WhatsApp.",
    price: '300 USD',
    benefits: [
      "Все заявки из Instagram и WhatsApp в одной системе",
      "AI-бот отвечает клиентам 24/7, пока вы отдыхаете",
      "Порядок в базе клиентов и ни одного пропущенного звонка",
    ],
  },
  {
    id: "medium",
    icon: TrendingUp,
    title: "Средний бизнес",
    subtitle: "Системные продажи и контроль",
    description: "Для тех, у кого уже есть команда, но нет прозрачности.",
    price: '500 USD',
    popular: true,
    benefits: [
      "Видите реальную работу каждого менеджера",
      "Отчетность в телефоне: касса, расходы и чистая прибыль",
      "Освобождаете до 10 часов в неделю",
    ],
  },
  {
    id: "enterprise",
    icon: Building2,
    title: "Крупный бизнес",
    subtitle: "Цифровая экосистема и масштаб",
    description: "Для корпораций с высокими требованиями к надежности.",
    price: '800 USD',
    benefits: [
      "Синхронизация CRM с 1С, складом и логистикой",
      "Архитектура для систем на 12 000+ пользователей",
      "Полная прозрачность и безопасность данных",
    ],
  },
];

export function Services() {
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
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-white"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="inline-block text-[#3DB7F4] font-medium text-sm uppercase tracking-wider mb-4">
            Наши услуги
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3d4f5f] mb-6 text-balance">
            Как мы облегчаем вашу жизнь:{" "}
            <span className="text-[#3DB7F4]">3 уровня</span> автоматизации
          </h2>
          <p className="text-lg text-[#5a6a7a] leading-relaxed">
            Выберите решение, подходящее для вашего масштаба бизнеса
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-index={index}
              className={`service-card group relative bg-white border border-[#e8eef1] rounded-2xl p-6 lg:p-8 transition-all duration-700 hover:shadow-xl hover:border-[#3DB7F4]/30 ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              } ${service.popular ? "ring-2 ring-[#3DB7F4]" : ""}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#3DB7F4] text-white text-xs font-medium px-4 py-1 rounded-full">
                  Популярный выбор
                </div>
              )}

              {/* Hover Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3DB7F4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#eef7fa] flex items-center justify-center mb-6 group-hover:bg-[#3DB7F4]/20 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-[#3DB7F4]" />
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-[#3d4f5f] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[#3DB7F4] font-medium mb-3">
                  {service.subtitle}
                </p>
                <p className="text-[#5a6a7a] mb-6">{service.description}</p>

                {/* Benefits */}
                <ul className="space-y-3 mb-8">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#3DB7F4] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#5a6a7a]">{benefit}</span>
                      
                    </li>
                  ))}
                </ul>
                <h3 className="text-xl lg:text-2xl font-bold text-center text-[#5a6a7a] mb-8">{service.price}</h3>

                {/* CTA */}
                <Link href="#contact">
                  <Button
                    variant="outline"
                    className="w-full group/btn border-[#e8eef1] hover:bg-[#3DB7F4] hover:text-white hover:border-[#3DB7F4] transition-all duration-300 bg-transparent text-[#3d4f5f]"
                  >
                    Хочу такую систему
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
