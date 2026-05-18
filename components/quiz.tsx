"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type QuizOption = {
  id: string;
  label: string;
  description?: string;
};

type QuizQuestion = {
  id: number;
  question: string;
  multiple?: boolean;
  options: QuizOption[];
};

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "Какой у вас размер бизнеса?",
    options: [
      {
        id: "small",
        label: "Малый бизнес",
        description: "Оборот в месяц до 1 млн сом · 1–10 сотрудников",
      },
      {
        id: "medium",
        label: "Средний бизнес",
        description: "Оборот в месяц до 5 млн сом · 11–50 сотрудников",
      },
      {
        id: "large",
        label: "Крупный бизнес",
        description: "Оборот в месяц более 5 млн сом · 50–150 и более сотрудников",
      },
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
        description: "Система не справляется с ростом",
      },
    ],
  },
  {
    id: 3,
    question:
      "Поставьте галочки: какие задачи для вас актуальны на данный момент?",
    multiple: true,
    options: [
      { id: "hiring", label: "Найм эффективных менеджеров" },
      { id: "audit", label: "Аудит отдела продаж" },
      { id: "scripts", label: "Составление скриптов и инструкций" },
      { id: "training", label: "Тренинги по продажам" },
      { id: "kpi", label: "KPI и отчётность" },
      { id: "sales-control", label: "Система контроля работы отдела продаж" },
      { id: "ai-sales", label: "ИИ вместо отдела продаж" },
      { id: "call-recording", label: "Запись звонков" },
      { id: "call-center", label: "Удалённый колл-центр" },
      { id: "analytics", label: "Сквозная аналитика" },
      { id: "dashboard", label: "Дашборд эффективности сотрудников" },
      { id: "edo", label: "Электронный документооборот" },
      { id: "1c", label: "Интеграция с 1С" },
      { id: "unified", label: "Интеграция всех подразделений в единую систему" },
      { id: "auto-reports", label: "Автоматическая отчётность" },
    ],
  },
  {
    id: 4,
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

function getOptionLabel(questionId: number, optionId: string): string {
  const question = questions.find((q) => q.id === questionId);
  const option = question?.options.find((opt) => opt.id === optionId);
  return option?.label ?? "";
}

function getMultiLabels(questionId: number, optionIds: string[]): string[] {
  return optionIds.map((id) => getOptionLabel(questionId, id)).filter(Boolean);
}

export function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [singleAnswers, setSingleAnswers] = useState<Record<number, string>>({});
  const [multiAnswers, setMultiAnswers] = useState<Record<number, string[]>>({});
  const [contactInfo, setContactInfo] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentStep];
  const isQuizComplete = currentStep === questions.length;
  const totalSteps = questions.length + 1;
  const progress =
    ((currentStep + (isQuizComplete ? 1 : 0)) / totalSteps) * 100;

  const selectedMulti = multiAnswers[currentQuestion?.id] ?? [];
  const isMultiStep = currentQuestion?.multiple === true;

  const handleSingleSelect = (questionId: number, optionId: string) => {
    setSingleAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else if (currentStep === questions.length - 1) {
        setCurrentStep(questions.length);
      }
    }, 300);
  };

  const toggleMultiSelect = (questionId: number, optionId: string) => {
    setMultiAnswers((prev) => {
      const current = prev[questionId] ?? [];
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      return { ...prev, [questionId]: next };
    });
  };

  const goNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const tasks = getMultiLabels(3, multiAnswers[3] ?? []);
    const tasksText =
      tasks.length > 0 ? tasks.map((t) => `• ${t}`).join("%0A") : "—";

    const message =
      `🎯 *Новая заявка с квиза*%0A%0A` +
      `👤 *Имя:* ${contactInfo.name}%0A` +
      `📱 *Телефон:* ${contactInfo.phone}%0A%0A` +
      `📊 *Ответы:*%0A` +
      `1. Размер бизнеса: ${getOptionLabel(1, singleAnswers[1])}%0A` +
      `2. Главная проблема: ${getOptionLabel(2, singleAnswers[2])}%0A` +
      `3. Актуальные задачи:%0A${tasksText}%0A` +
      `4. Когда начать: ${getOptionLabel(4, singleAnswers[4])}%0A%0A` +
      `🚀 _Готов к обсуждению решения_`;

    const whatsappUrl = `https://wa.me/996222233002?text=${message}`;
    window.open(whatsappUrl, "_blank");

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Ошибка при сохранении данных:", error);
    } finally {
      setIsSubmitting(false);
      setCurrentStep(0);
      setSingleAnswers({});
      setMultiAnswers({});
      setContactInfo({ name: "", phone: "" });
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#f8fbfc] to-white"
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3DB7F4]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3d4f5f]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block text-[#3DB7F4] font-medium text-sm uppercase tracking-wider mb-4">
            Бесплатный аудит
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#3d4f5f] mb-4 text-balance">
            Получите персональное решение
          </h2>
          <p className="text-[#5a6a7a]">
            Ответьте на 4 вопроса и мы подготовим индивидуальное предложение
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-[#5a6a7a] mb-2">
            <span>
              Шаг {Math.min(currentStep + 1, totalSteps)} из {totalSteps}
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

        <div className="bg-white border border-[#e8eef1] rounded-3xl p-6 md:p-10 shadow-2xl">
          {!isQuizComplete ? (
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold text-[#3d4f5f] text-center mb-2">
                {currentQuestion.question}
              </h3>
              {isMultiStep && (
                <p className="text-sm text-[#5a6a7a] text-center">
                  Можно выбрать несколько вариантов
                </p>
              )}

              <div
                className={cn(
                  "space-y-3",
                  isMultiStep && "max-h-[min(52vh,420px)] overflow-y-auto pr-1",
                )}
              >
                {currentQuestion.options.map((option) => {
                  const isSelected = isMultiStep
                    ? selectedMulti.includes(option.id)
                    : singleAnswers[currentQuestion.id] === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() =>
                        isMultiStep
                          ? toggleMultiSelect(currentQuestion.id, option.id)
                          : handleSingleSelect(currentQuestion.id, option.id)
                      }
                      className={cn(
                        "w-full rounded-xl border-2 text-left transition-all duration-300 group hover:shadow-lg",
                        isMultiStep ? "p-4" : "p-5",
                        isSelected
                          ? "border-[#3DB7F4] bg-[#3DB7F4]/10"
                          : "border-[#e8eef1] hover:border-[#3DB7F4]/50",
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "shrink-0 border-2 flex items-center justify-center transition-all",
                            isMultiStep
                              ? "w-5 h-5 rounded-md"
                              : "w-6 h-6 rounded-full",
                            isSelected
                              ? "border-[#3DB7F4] bg-[#3DB7F4]"
                              : "border-[#d0d7dc] bg-white",
                          )}
                        >
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-[#3d4f5f] group-hover:text-[#3DB7F4] transition-colors">
                            {option.label}
                          </p>
                          {option.description && (
                            <p className="text-sm text-[#5a6a7a] mt-1">
                              {option.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {currentStep > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="text-[#5a6a7a] hover:text-[#3d4f5f] sm:mr-auto"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Назад
                  </Button>
                )}
                {isMultiStep && (
                  <Button
                    type="button"
                    onClick={goNext}
                    disabled={selectedMulti.length === 0}
                    className="w-full sm:w-auto sm:ml-auto bg-[#3DB7F4] text-white hover:bg-[#4aa5c6] disabled:opacity-50"
                  >
                    Далее
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
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
                      Отправить в WhatsApp
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
