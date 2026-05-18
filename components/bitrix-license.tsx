"use client";

import { useCallback, useEffect, useState } from "react";
import { Flame, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BillingPeriod = "month" | "year";

type PlanTheme = {
  header: string;
  headerText: string;
  surface: string;
  button: string;
  buttonHover: string;
  bar: string;
  ring?: string;
};

type Plan = {
  id: string;
  name: string;
  theme: PlanTheme;
  users: string;
  usersIcon?: "unlimited" | "popular";
  storage: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  priceLabel?: string;
  learnMore?: boolean;
  popular?: boolean;
  cta: string;
  enterpriseTier?: boolean;
};

const CURRENCY = "сом";

const enterpriseTiers = [
  { users: 250, storage: "3 ТБ", monthly: 37_400, yearly: 26_180 },
  { users: 500, storage: "5 ТБ", monthly: 65_990, yearly: 46_190 },
  { users: 1000, storage: "10 ТБ", monthly: 109_990, yearly: 76_990 },
];

const plans: Plan[] = [
  {
    id: "free",
    name: "Бесплатный",
    theme: {
      header: "bg-[#6BCB77]",
      headerText: "text-white",
      surface: "bg-[#F0FAF2]",
      button: "bg-[#6BCB77]",
      buttonHover: "hover:bg-[#5ab868]",
      bar: "bg-[#6BCB77]",
    },
    users: "Неограниченно",
    usersIcon: "unlimited",
    storage: "5 ГБ",
    monthlyPrice: null,
    yearlyPrice: null,
    priceLabel: "Бесплатно",
    learnMore: true,
    cta: "Создать",
  },
  {
    id: "basic",
    name: "Базовый",
    theme: {
      header: "bg-[#A8D8F0]",
      headerText: "text-[#1a4d6d]",
      surface: "bg-[#F3FAFE]",
      button: "bg-[#7EC8E8]",
      buttonHover: "hover:bg-[#6ab8dc]",
      bar: "bg-[#7EC8E8]",
    },
    users: "5 пользователей",
    storage: "24 ГБ",
    monthlyPrice: 2_750,
    yearlyPrice: 1_925,
    cta: "Купить",
  },
  {
    id: "standard",
    name: "Стандартный",
    theme: {
      header: "bg-[#5BC0EB]",
      headerText: "text-white",
      surface: "bg-[#EFF8FD]",
      button: "bg-[#3DB7F4]",
      buttonHover: "hover:bg-[#2da8e8]",
      bar: "bg-[#3DB7F4]",
    },
    users: "50 пользователей",
    storage: "100 ГБ",
    monthlyPrice: 7_700,
    yearlyPrice: 5_390,
    cta: "Купить",
  },
  {
    id: "professional",
    name: "Профессиональный",
    theme: {
      header: "bg-[#1E88C9]",
      headerText: "text-white",
      surface: "bg-[#E8F4FC]",
      button: "bg-[#1577B8]",
      buttonHover: "hover:bg-[#1269a3]",
      bar: "bg-[#1577B8]",
      ring: "ring-[#3DB7F4]",
    },
    users: "100 пользователей",
    usersIcon: "popular",
    storage: "1 024 ГБ",
    monthlyPrice: 15_400,
    yearlyPrice: 10_780,
    popular: true,
    cta: "Купить",
  },
  {
    id: "enterprise",
    name: "Энтерпрайз",
    theme: {
      header: "bg-[#9B7EDE]",
      headerText: "text-white",
      surface: "bg-[#F5F0FC]",
      button: "bg-[#8B6FD4]",
      buttonHover: "hover:bg-[#7a5fc4]",
      bar: "bg-[#8B6FD4]",
    },
    users: "250 пользователей",
    storage: "3 ТБ",
    monthlyPrice: 37_400,
    yearlyPrice: 26_180,
    enterpriseTier: true,
    cta: "Купить",
  },
];

const featureMatrix: { name: string; levels: number[]; badge?: string }[] = [
  { name: "Совместная работа", levels: [3, 4, 5, 5, 5] },
  { name: "Мессенджер", levels: [4, 5, 5, 5, 5] },
  { name: "Коллабы", levels: [2, 3, 4, 5, 5] },
  { name: "Задачи и Проекты", levels: [3, 4, 5, 5, 5] },
  { name: "CRM", levels: [2, 4, 5, 5, 5], badge: "CRM №1" },
  { name: "BitrixGPT", levels: [1, 2, 3, 4, 5] },
  { name: "Онлайн-подпись", levels: [1, 2, 3, 4, 5] },
  { name: "Диск", levels: [3, 4, 5, 5, 5] },
  { name: "Доски", levels: [2, 3, 4, 5, 5] },
  { name: "Контакт-центр", levels: [1, 2, 3, 4, 5] },
  { name: "Сайты", levels: [2, 3, 4, 5, 5] },
  { name: "Интернет-магазин", levels: [0, 1, 2, 4, 5] },
  { name: "Онлайн-запись", levels: [0, 1, 3, 4, 5] },
  { name: "Маркетинг", levels: [0, 2, 3, 5, 5] },
  { name: "Документы Онлайн", levels: [0, 1, 3, 4, 5] },
  { name: "КЭДО + Госключ", levels: [0, 0, 2, 3, 5] },
  { name: "BI Конструктор", levels: [0, 0, 2, 4, 5] },
  { name: "Поддержка", levels: [1, 2, 3, 4, 5] },
  { name: "Администрирование", levels: [1, 2, 3, 4, 5] },
  { name: "Сквозная аналитика", levels: [0, 0, 2, 4, 5] },
  { name: "Автоматизация", levels: [0, 1, 3, 5, 5] },
  { name: "HR: Компания", levels: [0, 0, 1, 3, 5] },
  { name: "Филиалы", levels: [0, 0, 0, 2, 5] },
  { name: "Энтерпрайз-кластер", levels: [0, 0, 0, 0, 5] },
  { name: "Энтерпрайз-пакет", levels: [0, 0, 0, 0, 5] },
];

const WHATSAPP_URL = "https://wa.me/996222233002";

function formatSom(value: number) {
  return value.toLocaleString("ru-RU");
}

function StrengthBars({ level, barClass }: { level: number; barClass: string }) {
  if (level === 0) {
    return <span className="text-gray-300 text-xs">—</span>;
  }
  return (
    <div className="flex items-end justify-center gap-[3px] h-5" aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={cn(
            "w-[5px] rounded-[2px] transition-all",
            i <= level ? barClass : "bg-gray-200/90",
          )}
          style={{ height: i <= level ? 4 + i * 2.5 : 4 }}
        />
      ))}
    </div>
  );
}

function BillingToggle({
  billing,
  onChange,
}: {
  billing: BillingPeriod;
  onChange: (v: BillingPeriod) => void;
}) {
  return (
    <div
      className="inline-flex items-center p-1 rounded-full bg-white border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
      role="tablist"
    >
      <button
        type="button"
        role="tab"
        aria-selected={billing === "month"}
        onClick={() => onChange("month")}
        className={cn(
          "px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
          billing === "month"
            ? "bg-gray-100 text-gray-900 shadow-inner"
            : "text-gray-500 hover:text-gray-700",
        )}
      >
        Купить на месяц
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={billing === "year"}
        onClick={() => onChange("year")}
        className={cn(
          "px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5",
          billing === "year"
            ? "bg-[#3DB7F4] text-white shadow-md"
            : "text-gray-500 hover:text-gray-700",
        )}
      >
        Купить на год
        <span
          className={cn(
            "font-bold text-xs px-1.5 py-0.5 rounded",
            billing === "year" ? "bg-white/25" : "text-[#3DB7F4]",
          )}
        >
          −30%
        </span>
      </button>
    </div>
  );
}

function PlanColumn({
  plan,
  billing,
  enterpriseUsers,
  onEnterpriseUsersChange,
  className,
}: {
  plan: Plan;
  billing: BillingPeriod;
  enterpriseUsers: number;
  onEnterpriseUsersChange: (v: number) => void;
  className?: string;
}) {
  const tier =
    plan.enterpriseTier && enterpriseTiers.find((t) => t.users === enterpriseUsers);
  const monthly = tier?.monthly ?? plan.monthlyPrice;
  const yearly = tier?.yearly ?? plan.yearlyPrice;
  const storage = tier?.storage ?? plan.storage;
  const usersLabel = tier ? `${tier.users} пользователей` : plan.users;
  const isYearly = billing === "year";
  const displayPrice = isYearly ? yearly : monthly;
  const strikePrice = isYearly ? monthly : null;

  return (
    <div
      className={cn(
        "flex flex-col min-w-0 h-full",
        plan.popular && "relative z-10 lg:-mt-2 lg:mb-[-8px]",
        className,
      )}
    >
      {plan.popular && (
        <div className="flex justify-center mb-1 lg:mb-2">
          <span className="bg-[#3DB7F4] text-white text-[11px] font-semibold tracking-wide uppercase px-4 py-1 rounded-full shadow-sm">
            Популярный
          </span>
        </div>
      )}

      <div
        className={cn(
          "flex flex-col flex-1 rounded-t-[20px] overflow-hidden",
          plan.popular && "ring-2 ring-[#3DB7F4] shadow-xl shadow-[#3DB7F4]/15",
        )}
      >
        <div
          className={cn(
            "px-3 py-4 text-center min-h-[56px] flex items-center justify-center",
            plan.theme.header,
            plan.theme.headerText,
          )}
        >
          <h3 className="text-[15px] sm:text-base font-bold leading-tight">{plan.name}</h3>
        </div>

        <div
          className={cn(
            "flex flex-col flex-1 px-3 sm:px-4 py-5 text-center border-x border-b border-gray-100/80",
            plan.theme.surface,
            "rounded-b-[20px]",
          )}
        >
          <div className="flex items-center justify-center gap-1 min-h-[32px] mb-1">
            {plan.usersIcon === "unlimited" && (
              <ThumbsUp className="w-4 h-4 text-[#6BCB77] shrink-0" strokeWidth={2.5} />
            )}
            {plan.usersIcon === "popular" && (
              <Flame className="w-4 h-4 text-orange-500 shrink-0 fill-orange-400" />
            )}
            {plan.enterpriseTier ? (
              <Select
                value={String(enterpriseUsers)}
                onValueChange={(v) => onEnterpriseUsersChange(Number(v))}
              >
                <SelectTrigger className="h-8 text-xs sm:text-sm border-violet-200/80 bg-white shadow-none px-2 w-full max-w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {enterpriseTiers.map((t) => (
                    <SelectItem key={t.users} value={String(t.users)}>
                      {t.users} пользователей
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
                {usersLabel}
              </p>
            )}
          </div>

          <p className="text-[11px] sm:text-xs text-gray-500 mb-5">
            на диске{" "}
            <span className="font-medium text-gray-700">{storage}</span>
          </p>

          <div className="flex-1 flex flex-col items-center justify-center min-h-[108px] mb-5">
            {plan.priceLabel ? (
              <>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{plan.priceLabel}</p>
                {plan.learnMore && (
                  <button
                    type="button"
                    className="text-xs sm:text-sm text-[#3DB7F4] mt-2 hover:underline underline-offset-2"
                  >
                    узнать больше
                  </button>
                )}
              </>
            ) : (
              <>
                {isYearly && strikePrice != null && (
                  <p className="text-xs text-gray-400 line-through mb-1">
                    {formatSom(strikePrice)} {CURRENCY}
                  </p>
                )}
                {isYearly && (
                  <span className="inline-flex items-center text-[10px] font-bold text-white bg-[#FF8C42] rounded-md px-2 py-0.5 mb-2">
                    −30%
                  </span>
                )}
                <p className="text-[26px] sm:text-[28px] font-bold text-gray-900 leading-none tracking-tight">
                  {displayPrice != null ? formatSom(displayPrice) : "—"}
                </p>
                <p className="text-sm font-medium text-gray-600 mt-1">{CURRENCY}</p>
                <p className="text-[10px] sm:text-[11px] text-gray-500 mt-2 leading-snug max-w-[140px]">
                  {isYearly
                    ? "в месяц при оплате за год за всех пользователей"
                    : "в месяц за всех пользователей"}
                </p>
              </>
            )}
          </div>

          <Button
            asChild
            className={cn(
              "w-full rounded-xl text-white font-semibold h-10 sm:h-11 text-sm border-0 shadow-sm",
              plan.theme.button,
              plan.theme.buttonHover,
            )}
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              {plan.cta}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function FeatureRow({
  name,
  levels,
  activePlanIndex,
  badge,
}: {
  name: string;
  levels: number[];
  activePlanIndex: number;
  badge?: string;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] lg:grid-cols-[minmax(180px,1.2fr)_repeat(5,minmax(0,1fr))] gap-3 lg:gap-2 items-center py-3 border-b border-gray-100/90 last:border-0 hover:bg-gray-50/50 transition-colors">
      <div className="flex items-center gap-2 min-w-0 pl-1">
        <span className="text-[13px] sm:text-sm text-gray-700">{name}</span>
        {badge && (
          <span className="text-[9px] font-bold text-white bg-[#3DB7F4] rounded px-1.5 py-0.5 shrink-0">
            {badge}
          </span>
        )}
      </div>
      <div className="flex justify-end pr-1 lg:hidden">
        <StrengthBars
          level={levels[activePlanIndex] ?? 0}
          barClass={plans[activePlanIndex]?.theme.bar ?? "bg-gray-400"}
        />
      </div>
      {levels.map((level, i) => (
        <div key={plans[i].id} className="hidden lg:flex justify-center">
          <StrengthBars level={level} barClass={plans[i].theme.bar} />
        </div>
      ))}
    </div>
  );
}

export function BitrixLicense() {
  const [billing, setBilling] = useState<BillingPeriod>("year");
  const [enterpriseUsers, setEnterpriseUsers] = useState(250);
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
    <section
      id="bitrix-license"
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white via-[#f7fbfe] to-white"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-[1280px]">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-3 tracking-tight">
            Лицензии Bitrix24
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Облачные тарифы — сравните планы и выберите подходящий для команды
          </p>
        </div>

        <div className="flex justify-center mb-8 sm:mb-10">
          <BillingToggle billing={billing} onChange={setBilling} />
        </div>

        {/* Десктоп: единая таблица как на bitrix24 */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-[28px] border border-gray-200/80 shadow-[0_8px_40px_rgba(61,183,244,0.08)] overflow-hidden">
            <div className="grid grid-cols-5 gap-2 p-4 pb-0 bg-white">
              {plans.map((plan) => (
                <PlanColumn
                  key={plan.id}
                  plan={plan}
                  billing={billing}
                  enterpriseUsers={enterpriseUsers}
                  onEnterpriseUsersChange={setEnterpriseUsers}
                />
              ))}
            </div>

            <div className="mt-2 mx-4 mb-4 rounded-2xl bg-[#FAFBFC] border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-[minmax(180px,1.2fr)_repeat(5,minmax(0,1fr))] gap-2 px-5 py-3 border-b border-gray-200/60 bg-white/80">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Возможности
                </span>
                {plans.map((p) => (
                  <span
                    key={p.id}
                    className="text-[11px] font-semibold text-center text-gray-500 truncate"
                  >
                    {p.name}
                  </span>
                ))}
              </div>
              <div className="px-4 py-1 max-h-[520px] overflow-y-auto">
                {featureMatrix.map((feature) => (
                  <FeatureRow
                    key={feature.name}
                    name={feature.name}
                    levels={feature.levels}
                    badge={feature.badge}
                    activePlanIndex={0}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Мобильный слайдер */}
        <div className="lg:hidden">
          <Carousel setApi={setCarouselApi} opts={{ align: "center", loop: false }} className="w-full">
            <CarouselContent className="-ml-4">
              {plans.map((plan) => (
                <CarouselItem key={plan.id} className="pl-4 basis-[86%] sm:basis-[70%]">
                  <PlanColumn
                    plan={plan}
                    billing={billing}
                    enterpriseUsers={enterpriseUsers}
                    onEnterpriseUsersChange={setEnterpriseUsers}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-3 mt-6">
              <CarouselPrevious className="static translate-y-0 h-9 w-9 border-gray-200" />
              <div className="flex gap-1.5">
                {plans.map((plan, i) => (
                  <button
                    key={plan.id}
                    type="button"
                    aria-label={plan.name}
                    onClick={() => carouselApi?.scrollTo(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      activeSlide === i ? "w-7 bg-[#3DB7F4]" : "w-1.5 bg-gray-300",
                    )}
                  />
                ))}
              </div>
              <CarouselNext className="static translate-y-0 h-9 w-9 border-gray-200" />
            </div>
          </Carousel>

          <div className="mt-8 bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase">Возможности</span>
              <span className="text-sm font-medium text-[#3DB7F4]">{plans[activeSlide]?.name}</span>
            </div>
            <div className="px-3 py-1 max-h-[360px] overflow-y-auto">
              {featureMatrix.map((feature) => (
                <FeatureRow
                  key={feature.name}
                  name={feature.name}
                  levels={feature.levels}
                  badge={feature.badge}
                  activePlanIndex={activeSlide}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8 max-w-lg mx-auto leading-relaxed">
          Цены указаны в сомах. Точная стоимость лицензии зависит от курса и условий поставщика.
          Поможем подключить и настроить — напишите в WhatsApp.
        </p>
      </div>
    </section>
  );
}
