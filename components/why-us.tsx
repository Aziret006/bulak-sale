"use client";

import { useRef, useEffect, useState } from "react";
import {
  Zap,
  Server,
  Link2,
  BarChart3,
  Database,
  Code2,
  Cpu,
} from "lucide-react";

const features = [
  {
    icon: Server,
    title: "Высоконагруженные системы",
    description:
      "Опыт разработки проектов с аудиторией от 5 000 до 12 000 активных пользователей",
  },
  {
    icon: Link2,
    title: "Сложные интеграции",
    description:
      "Глубокие интеграции через D7 и REST API, кастомные модули и автоматизация",
  },
  {
    icon: BarChart3,
    title: "Сквозная аналитика",
    description:
      "Настройка сложных дашбордов для контроля показателей в реальном времени",
  },
  {
    icon: Database,
    title: "Миграция данных",
    description:
      "Безопасный перенос до сотен тысяч записей без остановки бизнес-процессов",
  },
  {
    icon: Code2,
    title: "Fullstack разработка",
    description:
      "PHP (Laravel), JavaScript (Vue.js), Python и мобильные приложения с нуля",
  },
  {
    icon: Cpu,
    title: "Связь с оборудованием",
    description:
      "Интеграция CRM с системами контроля доступа и специализированным оборудованием",
  },
];

const stats = [
  {
    value: "8",
    suffix: "/10",
    label: "клиентов видят результат в первый месяц",
  },
  { value: "180", suffix: "+", label: "выстроенных отделов продаж" },
  { value: "13", suffix: "+", label: "лет инженерного опыта" },
  { value: "12K", suffix: "+", label: "пользователей наших систем" },
];

export function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [countersStarted, setCountersStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setCountersStarted(true), 300);
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
      id="portfolio"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-[#f8fbfc]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#2f7cff_0%,transparent_50%)] opacity-5" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,#3d4f5f_0%,transparent_50%)] opacity-5" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="inline-block text-[#2f7cff] font-medium text-sm uppercase tracking-wider mb-4">
            Почему мы
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3d4f5f] mb-6 text-balance">
            Ваш проект в <span className="text-[#2f7cff]">надежных руках</span>
          </h2>
          <p className="text-lg text-[#5a6a7a] leading-relaxed">
            Мы не просто настраиваем поля и кнопки. Наша команда обладает
            13-летним инженерным опытом разработки систем, которыми ежедневно
            пользуются десятки тысяч человек.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`bg-white border border-[#e8eef1] rounded-2xl p-6 text-center transition-all duration-700 hover:shadow-lg hover:border-[#2f7cff]/30 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-4xl md:text-5xl font-bold text-[#3d4f5f]">
                  {countersStarted ? stat.value : "0"}
                </span>
                <span className="text-2xl md:text-3xl font-bold text-[#2f7cff]">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-sm text-[#5a6a7a]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative bg-white border border-[#e8eef1] rounded-2xl p-6 transition-all duration-700 hover:shadow-xl hover:border-[#2f7cff]/30 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100 + 400}ms` }}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2f7cff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#eef7fa] flex items-center justify-center mb-4 group-hover:bg-[#2f7cff]/20 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-[#2f7cff]" />
                </div>
                <h3 className="text-lg font-semibold text-[#3d4f5f] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#5a6a7a] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Banner */}
        <div
          className={`mt-16 md:mt-20 bg-[#3d4f5f] rounded-3xl p-8 md:p-12 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-[#2f7cff]" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            Вашу систему проектируют специалисты мирового уровня
          </h3>
          <p className="text-white/80 max-w-2xl mx-auto">
            От настройки CRM для малого отдела продаж до создания сложных
            корпоративных порталов для государственных ведомств и международных
            холдингов.
          </p>
        </div>
      </div>
    </section>
  );
}
