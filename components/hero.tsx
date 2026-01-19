"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const benefits = [
  "Автоматизация продаж",
  "Прозрачная аналитика",
  "Интеграция WhatsApp",
  "Чат-боты 24/7",
];

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-[#f8fbfc] to-[#eef7fa]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 right-10 w-72 h-72 bg-[#2f7cff]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-[#2f7cff]/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#2f7cff]/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#3d4f5f 1px, transparent 1px), linear-gradient(90deg, #3d4f5f 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 pt-28 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-[#2f7cff]/10 text-[#3d4f5f] rounded-full px-4 py-2 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-[#2f7cff] rounded-full animate-pulse" />
              Официальный партнер Битрикс24
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3d4f5f] leading-tight mb-6">
              Автоматизируем
              <span className="relative">
                <span className="text-[#2f7cff]"> ваш бизнес</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 8C50 2 150 2 198 8"
                    stroke="#2f7cff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 200,
                      strokeDashoffset: isVisible ? 0 : 200,
                      transition: "stroke-dashoffset 1.5s ease-out 0.5s",
                    }}
                  />
                </svg>
              </span>
              <br />с Битрикс24
            </h1>

            <p className="text-lg text-[#5a6a7a] mb-8 max-w-lg leading-relaxed">
              Внедряем CRM-системы для малого, среднего и крупного бизнеса. Вы
              получите прозрачный учет клиентов, автоматизацию продаж и рост
              прибыли уже через 30 дней.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button
                asChild
                size="lg"
                className="bg-[#2f7cff] hover:bg-[#4aa5c6] text-white rounded-full px-8 h-14 text-base font-medium group shadow-lg shadow-[#2f7cff]/25 hover:shadow-xl hover:shadow-[#2f7cff]/30 transition-all duration-300"
              >
                <Link href="#contact" className="flex items-center gap-2">
                  Бесплатная консультация
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-14 text-base font-medium border-[#3d4f5f]/20 text-[#3d4f5f] hover:bg-[#3d4f5f]/5 bg-transparent"
              >
                <Link href="#services">Наши услуги</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2 text-[#5a6a7a]"
                  style={{
                    transitionDelay: `${800 + index * 100}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(-10px)",
                    transition: "all 0.5s ease-out",
                  }}
                >
                  <CheckCircle2 className="w-5 h-5 text-[#2f7cff] flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Stats cards */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative">
              {/* Main card */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-[#3d4f5f]/10 border border-[#e8eef1]">
                <div className="grid grid-cols-2 gap-6">
                  <StatCard
                    number="13+"
                    label="лет опыта"
                    delay={500}
                    isVisible={isVisible}
                  />
                  <StatCard
                    number="500+"
                    label="проектов"
                    delay={600}
                    isVisible={isVisible}
                  />
                  <StatCard
                    number="98%"
                    label="довольных клиентов"
                    delay={700}
                    isVisible={isVisible}
                  />
                  <StatCard
                    number="30"
                    label="дней до результата"
                    delay={800}
                    isVisible={isVisible}
                  />
                </div>

                {/* Chart visualization */}
                <div className="mt-8 pt-6 border-t border-[#e8eef1]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-[#3d4f5f]">
                      Рост конверсии после внедрения
                    </span>
                    <span className="text-sm font-bold text-[#2f7cff]">
                      +47%
                    </span>
                  </div>
                  <div className="h-24 flex items-end gap-2">
                    {[35, 42, 38, 55, 62, 58, 75, 82].map((height, index) => (
                      <div
                        key={index}
                        className="flex-1 bg-gradient-to-t from-[#2f7cff] to-[#8ad4ed] rounded-t-lg transition-all duration-700"
                        style={{
                          height: isVisible ? `${height}%` : "0%",
                          transitionDelay: `${1000 + index * 100}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div
                className="absolute -top-4 -right-4 bg-[#2f7cff] text-white rounded-2xl px-5 py-3 shadow-lg shadow-[#2f7cff]/30 animate-float"
              >
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-xs opacity-90">Поддержка</div>
              </div>

              {/* Floating element left */}
              <div
                className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white rounded-xl p-4 shadow-lg border border-[#e8eef1] hidden md:block animate-float-delayed"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-[#5a6a7a]">Новая сделка</div>
                    <div className="text-sm font-semibold text-[#3d4f5f]">
                      +150,000 сом
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 4s ease-in-out infinite 1s;
        }
      `}</style>
    </section>
  );
}

function StatCard({
  number,
  label,
  delay,
  isVisible,
}: {
  number: string;
  label: string;
  delay: number;
  isVisible: boolean;
}) {
  return (
    <div
      className="text-center p-4 rounded-2xl bg-[#f8fbfc] hover:bg-[#eef7fa] transition-colors duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.9)",
        transition: `all 0.5s ease-out ${delay}ms`,
      }}
    >
      <div className="text-3xl lg:text-4xl font-bold text-[#3d4f5f] mb-1">
        {number}
      </div>
      <div className="text-sm text-[#5a6a7a]">{label}</div>
    </div>
  );
}
