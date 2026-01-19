"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "Какой у вас размер бизнеса?",
    options: [
      { id: "small", label: "Малый бизнес", description: "1-10 сотрудников" },
      {
        id: "medium",
        label: "Средний бизнес",
        description: "11-50 сотрудников",
      },
      { id: "large", label: "Крупный бизнес", description: "50+ сотрудников" },
    ],
  },
  {
    id: 2,
    question: "Какая главная проблема сейчас?",
    options: [
      {
        id: "leads",
        label: "Теряем заявки",
        description: "Клиенты уходят без ответа",
      },
      {
        id: "control",
        label: "Нет контроля",
        description: "Не вижу работу менеджеров",
      },
      {
        id: "scale",
        label: "Сложно масштабировать",
        description: "Системы не справляются с ростом",
      },
    ],
  },
  {
    id: 3,
    question: "Когда хотите начать?",
    options: [
      { id: "urgent", label: "Срочно", description: "В ближайшую неделю" },
      {
        id: "month",
        label: "В этом месяце",
        description: "Есть время подготовиться",
      },
      {
        id: "research",
        label: "Изучаю варианты",
        description: "Пока собираю информацию",
      },
    ],
  },
];

export function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [contactInfo, setContactInfo] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isQuizComplete = currentStep === questions.length;
  const progress =
    ((currentStep + (isQuizComplete ? 1 : 0)) / (questions.length + 1)) * 100;

  const handleSelect = (questionId: number, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    setTimeout(() => {
      if (currentStep < questions.length) {
        setCurrentStep((prev) => prev + 1);
      }
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <section
        id="contact"
        className="relative py-24 md:py-32 overflow-hidden bg-white"
      >
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white border border-[#e8eef1] rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#3d4f5f] mb-4">
              Спасибо за заявку!
            </h3>
            <p className="text-[#5a6a7a] mb-6">
              Наш специалист свяжется с вами в течение 30 минут в рабочее время
              и подготовит бесплатный аудит вашего бизнеса.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/996222233002"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Написать в WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#f8fbfc] to-white"
    >
      {/* Background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3DB7F4]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3d4f5f]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-[#3DB7F4] font-medium text-sm uppercase tracking-wider mb-4">
            Бесплатный аудит
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#3d4f5f] mb-4 text-balance">
            Получите персональное решение
          </h2>
          <p className="text-[#5a6a7a]">
            Ответьте на 3 вопроса и мы подготовим индивидуальное предложение
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-[#5a6a7a] mb-2">
            <span>
              Шаг {Math.min(currentStep + 1, questions.length + 1)} из{" "}
              {questions.length + 1}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-[#e8eef1] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#3DB7F4] transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Quiz Card */}
        <div className="bg-white border border-[#e8eef1] rounded-3xl p-6 md:p-10 shadow-2xl">
          {!isQuizComplete ? (
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold text-[#3d4f5f] text-center mb-8">
                {questions[currentStep].question}
              </h3>

              <div className="space-y-4">
                {questions[currentStep].options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      handleSelect(questions[currentStep].id, option.id)
                    }
                    className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-300 group hover:shadow-lg ${
                      answers[questions[currentStep].id] === option.id
                        ? "border-[#3DB7F4] bg-[#3DB7F4]/10"
                        : "border-[#e8eef1] hover:border-[#3DB7F4]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[#3d4f5f] group-hover:text-[#3DB7F4] transition-colors">
                          {option.label}
                        </p>
                        <p className="text-sm text-[#5a6a7a] mt-1">
                          {option.description}
                        </p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          answers[questions[currentStep].id] === option.id
                            ? "border-[#3DB7F4] bg-[#3DB7F4]"
                            : "border-[#d0d7dc]"
                        }`}
                      >
                        {answers[questions[currentStep].id] === option.id && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              {currentStep > 0 && (
                <div className="pt-4">
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="text-[#5a6a7a] hover:text-[#3d4f5f]"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Назад
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl md:text-2xl font-semibold text-[#3d4f5f] mb-2">
                  Отлично! Последний шаг
                </h3>
                <p className="text-[#5a6a7a]">
                  Оставьте контакты и мы подготовим персональное решение
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#3d4f5f] mb-2"
                  >
                    Ваше имя
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={contactInfo.name}
                    onChange={(e) =>
                      setContactInfo((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#e8eef1] bg-white text-[#3d4f5f] focus:outline-none focus:ring-2 focus:ring-[#3DB7F4]/50 focus:border-[#3DB7F4] transition-all"
                    placeholder="Как вас зовут?"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-[#3d4f5f] mb-2"
                  >
                    Телефон
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={contactInfo.phone}
                    onChange={(e) =>
                      setContactInfo((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#e8eef1] bg-white text-[#3d4f5f] focus:outline-none focus:ring-2 focus:ring-[#3DB7F4]/50 focus:border-[#3DB7F4] transition-all"
                    placeholder="+996 XXX XXX XXX"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="flex-1 border-[#e8eef1] text-[#3d4f5f] bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#3DB7F4] text-white hover:bg-[#4aa5c6]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      Получить решение
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-[#5a6a7a] text-center pt-4">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
