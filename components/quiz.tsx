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

// Функция для получения текста ответа по ID
const getAnswerText = (questionId: number, answerId: string): string => {
  const question = questions.find(q => q.id === questionId);
  if (!question) return "";
  
  const option = question.options.find(opt => opt.id === answerId);
  return option ? option.label : "";
};

export function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [contactInfo, setContactInfo] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Формируем сообщение для WhatsApp
    const message = `🎯 *Новая заявка с квиза*%0A%0A` +
      `👤 *Имя:* ${contactInfo.name}%0A` +
      `📱 *Телефон:* ${contactInfo.phone}%0A%0A` +
      `📊 *Ответы на вопросы:*%0A` +
      `1. Размер бизнеса: ${getAnswerText(1, answers[1])}%0A` +
      `2. Главная проблема: ${getAnswerText(2, answers[2])}%0A` +
      `3. Когда начать: ${getAnswerText(3, answers[3])}%0A%0A` +
      `🚀 _Готов к обсуждению решения_`;
    
    // Формируем ссылку WhatsApp
    const whatsappUrl = `https://wa.me/996708772844?text=${message}`;
    
    // Открываем WhatsApp в новом окне
    window.open(whatsappUrl, '_blank');
    
    // Можем также сохранить данные локально или отправить на сервер
    try {
      // Здесь можно добавить отправку данных на ваш бэкенд
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    } finally {
      setIsSubmitting(false);
      
      // Сброс формы (опционально)
      setCurrentStep(0);
      setAnswers({});
      setContactInfo({ name: "", phone: "" });
    }
  };

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