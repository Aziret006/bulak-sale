"use client";

import { useRef, useEffect, useState } from "react";
import { Search, Settings, Rocket, HeadphonesIcon } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Аудит и анализ",
    description:
      "Изучаем текущие бизнес-процессы, выявляем узкие места и определяем точки роста для вашей компании.",
    duration: "1-2 дня",
  },
  {
    number: "02",
    icon: Settings,
    title: "Настройка системы",
    description:
      "Внедряем CRM Bitrix24, настраиваем воронки продаж, автоматизации, интеграции с WhatsApp и мессенджерами.",
    duration: "5-14 дней",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Запуск и обучение",
    description:
      "Запускаем систему в работу, обучаем вашу команду и следим за первыми результатами.",
    duration: "3-5 дней",
  },
  {
    number: "04",
    icon: HeadphonesIcon,
    title: "Поддержка 24/7",
    description:
      "Оказываем техническую поддержку, дорабатываем систему под новые задачи бизнеса.",
    duration: "Постоянно",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-white"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="inline-block text-[#2f7cff] font-medium text-sm uppercase tracking-wider mb-4">
            Как мы работаем
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3d4f5f] mb-6 text-balance">
            От первого звонка до{" "}
            <span className="text-[#2f7cff]">результата</span>
          </h2>
          <p className="text-lg text-[#5a6a7a] leading-relaxed">
            Прозрачный процесс внедрения: вы всегда знаете на каком этапе мы
            находимся
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#2f7cff]/30 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-white border border-[#e8eef1] rounded-2xl p-6 hover:shadow-xl hover:border-[#2f7cff]/30 transition-all duration-300 group h-full">
                  {/* Number badge */}
                  <div className="absolute -top-4 left-6 bg-[#2f7cff] text-white text-sm font-bold px-3 py-1 rounded-full">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-[#eef7fa] flex items-center justify-center mb-4 mt-2 group-hover:bg-[#2f7cff]/20 transition-colors duration-300">
                    <step.icon className="w-7 h-7 text-[#2f7cff]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#3d4f5f] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#5a6a7a] text-sm mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Duration */}
                  <div className="inline-flex items-center gap-2 text-xs font-medium text-[#2f7cff] bg-[#eef7fa] px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 bg-[#2f7cff] rounded-full" />
                    {step.duration}
                  </div>
                </div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 bg-white border border-[#e8eef1] rounded-full flex items-center justify-center shadow-sm">
                      <svg
                        className="w-4 h-4 text-[#2f7cff]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div
          className={`mt-16 md:mt-20 bg-gradient-to-r from-[#2f7cff] to-[#4aa5c6] rounded-3xl p-8 md:p-12 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            Готовы начать автоматизацию?
          </h3>
          <p className="text-white/90 max-w-xl mx-auto mb-6">
            Первичный аудит бесплатно. Узнайте, как CRM может увеличить ваши
            продажи уже в первый месяц.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-white text-[#3d4f5f] font-medium px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Получить бесплатный аудит
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
