"use client";

import { useCallback, useEffect, useState } from "react";
import { Flame } from "lucide-react";
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
  toggle: string;
  crmBadge: string;
};

type Plan = {
  id: string;
  name: string;
  tagline?: string;
  theme: PlanTheme;
  users: string;
  usersIcon?: "popular";
  storage: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  cta: string;
  enterpriseTier?: boolean;
  links?: { label: string; href: string }[];
};

const CURRENCY = "сом";
const WHATSAPP_URL = "https://wa.me/996222233002";

const enterpriseTiers = [
  { users: 250, storage: "3 ТБ", monthly: 37_400, yearly: 26_180 },
  { users: 500, storage: "5 ТБ", monthly: 65_990, yearly: 46_190 },
  { users: 1000, storage: "10 ТБ", monthly: 109_990, yearly: 76_990 },
];

const plans: Plan[] = [
  {
    id: "basic",
    name: "Базовый",
    tagline: "Базовый  для 5 сотрудников 14 784 (-30%)",
    theme: {
      header: "bg-[#D4EDFC]",
      headerText: "text-[#1a4d6d]",
      surface: "bg-[#EDF7FE]",
      button: "bg-[#6EC4F0]",
      buttonHover: "hover:bg-[#5ab8e8]",
      toggle: "bg-[#7EC8E8]",
      crmBadge: "bg-[#6EC4F0]",
    },
    users: "5 пользователей",
    storage: "24 ГБ",
    monthlyPrice: 2_750,
    yearlyPrice: 14_784,
    cta: "Купить",
  },
  {
    id: "standard",
    name: "Стандартный",
    tagline: "Стандартный для 50 сотрудников 45 696 (-30%)",
    theme: {
      header: "bg-[#B8E4FA]",
      headerText: "text-[#134d6e]",
      surface: "bg-[#E8F5FD]",
      button: "bg-[#3DB7F4]",
      buttonHover: "hover:bg-[#2da8e8]",
      toggle: "bg-[#3DB7F4]",
      crmBadge: "bg-[#3DB7F4]",
    },
    users: "50 пользователей",
    storage: "100 ГБ",
    monthlyPrice: 7_700,
    yearlyPrice: 45_696,
    cta: "Купить",
  },
  {
    id: "professional",
    name: "Профессиональный",
    tagline: "Профессиональный для 100 сотрудников 90 048 (-30%)",
    theme: {
      header: "bg-[#8FD0F5]",
      headerText: "text-[#0f3d5c]",
      surface: "bg-[#E3F3FC]",
      button: "bg-[#1E88C9]",
      buttonHover: "hover:bg-[#1577b8]",
      toggle: "bg-[#1E88C9]",
      crmBadge: "bg-[#3DB7F4]",
    },
    users: "100 пользователей",
    usersIcon: "popular",
    storage: "1 024 ГБ",
    monthlyPrice: 15_400,
    yearlyPrice: 90_048,
    popular: true,
    cta: "Купить",
  },
  {
    id: "enterprise",
    name: "Энтерпрайз",
    theme: {
      header: "bg-[#C9B8E8]",
      headerText: "text-[#3d2d66]",
      surface: "bg-[#F0EBFA]",
      button: "bg-[#9B7EDE]",
      buttonHover: "hover:bg-[#8a6dce]",
      toggle: "bg-[#9B7EDE]",
      crmBadge: "bg-[#9B7EDE]",
    },
    users: "250 пользователей",
    storage: "3 ТБ",
    monthlyPrice: 37_400,
    yearlyPrice: 26_180,
    enterpriseTier: true,
    cta: "Купить",
    links: [
      { label: "Почему Битрикс24 Энтерпрайз?", href: WHATSAPP_URL },
      { label: "Энтерпрайз Холдинг", href: WHATSAPP_URL },
    ],
  },
];

const planFeatures: {
  name: string;
  minPlan: number;
  crmBadgeFrom?: number;
}[] = [
  { name: "Совместная работа", minPlan: 0 },
  { name: "Мессенджер", minPlan: 0 },
  { name: "Коллабы", minPlan: 0 },
  { name: "Задачи и Проекты", minPlan: 0 },
  { name: "CRM", minPlan: 0, crmBadgeFrom: 2 },
  { name: "BitrixGPT", minPlan: 0 },
  { name: "Онлайн-подпись", minPlan: 0 },
  { name: "Диск", minPlan: 0 },
  { name: "Доски", minPlan: 0 },
  { name: "Контакт-центр", minPlan: 0 },
  { name: "Сайты", minPlan: 0 },
  { name: "Интернет-магазин", minPlan: 1 },
  { name: "Онлайн-запись", minPlan: 1 },
  { name: "Поддержка", minPlan: 1 },
  { name: "Маркетинг", minPlan: 2 },
  { name: "Документы Онлайн", minPlan: 2 },
  { name: "КЭДО + Госключ", minPlan: 2 },
  { name: "BI Конструктор", minPlan: 2 },
  { name: "Администрирование", minPlan: 2 },
  { name: "Сквозная аналитика", minPlan: 2 },
  { name: "Автоматизация", minPlan: 2 },
  { name: "HR: Компания", minPlan: 2 },
  { name: "Филиалы", minPlan: 3 },
  { name: "Энтерпрайз-кластер", minPlan: 3 },
  { name: "Энтерпрайз-пакет", minPlan: 3 },
];

function formatSom(value: number) {
  return value.toLocaleString("ru-RU");
}

function FeatureToggle({ trackClass }: { trackClass: string }) {
  return (
    <span
      className={cn("relative inline-flex h-5 w-9 shrink-0 rounded-full", trackClass)}
      aria-hidden
    >
      <span className="absolute right-0.5 top-0.5 size-4 rounded-full bg-white shadow-sm" />
    </span>
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
      className="inline-flex items-center p-1 rounded-full bg-white border border-gray-200 shadow-sm"
      role="tablist"
    >
      <button
        type="button"
        role="tab"
        aria-selected={billing === "month"}
        onClick={() => onChange("month")}
        className={cn(
          "px-5 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all",
          billing === "month" ? "bg-gray-100 text-gray-900" : "text-gray-500",
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
          "px-5 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all",
          billing === "year" ? "bg-[#3DB7F4] text-white shadow-md" : "text-gray-500",
        )}
      >
        Купить на год <span className="font-bold">−30%</span>
      </button>
    </div>
  );
}

function PriceBlock({
  monthly,
  yearly,
  billing,
}: {
  monthly: number;
  yearly: number;
  billing: BillingPeriod;
}) {
  const isYearly = billing === "year";
  const displayPrice = isYearly ? yearly : monthly;

  return (
    <div className="flex flex-col items-center justify-center min-h-[118px]">
      <div className="h-5 flex items-center justify-center gap-2 mb-1">
        {isYearly ? (
          <>
            <span className="text-xs text-gray-400 line-through whitespace-nowrap">
              {formatSom(monthly)} {CURRENCY}
            </span>
            <span className="text-[10px] font-bold text-white bg-[#FF8C42] rounded px-1.5 py-0.5 whitespace-nowrap">
              −30%
            </span>
          </>
        ) : (
          <span className="invisible text-xs">—</span>
        )}
      </div>
      <p className="text-[32px] font-bold text-gray-900 leading-none tracking-tight">
        {formatSom(displayPrice)}
      </p>
      <p className="text-sm font-medium text-gray-600 mt-1">{CURRENCY}</p>
      <p className="text-[11px] text-gray-500 mt-2 text-center leading-snug px-1">
        в месяц за всех пользователей
      </p>
    </div>
  );
}

function PlanTopSection({
  plan,
  billing,
  enterpriseUsers,
  onEnterpriseUsersChange,
  columnIndex,
}: {
  plan: Plan;
  billing: BillingPeriod;
  enterpriseUsers: number;
  onEnterpriseUsersChange: (v: number) => void;
  columnIndex: number;
}) {
  const tier =
    plan.enterpriseTier && enterpriseTiers.find((t) => t.users === enterpriseUsers);
  const monthly = tier?.monthly ?? plan.monthlyPrice;
  const yearly = tier?.yearly ?? plan.yearlyPrice;
  const storage = tier?.storage ?? plan.storage;
  const usersLabel = tier ? `${tier.users} пользователей` : plan.users;
  const isFirst = columnIndex === 0;
  const isLast = columnIndex === 3;

  return (
    <div className={cn("flex flex-col text-center", plan.popular && "relative z-10")}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-full flex justify-center">
          <span className="bg-[#3DB7F4] text-white text-[11px] font-semibold px-4 py-1 rounded-full shadow">
            Популярный
          </span>
        </div>
      )}

      {/* Шапка: название + описание — одинаковая высота */}
      <div
        className={cn(
          "px-3 pt-5 pb-3",
          plan.theme.header,
          plan.theme.headerText,
          isFirst && "rounded-tl-2xl",
          isLast && "rounded-tr-2xl",
        )}
      >
        <h3 className="text-base font-bold mb-2">{plan.name}</h3>
        <div className="min-h-[48px] flex items-center justify-center">
          {plan.links ? (
            <div className="flex flex-col gap-1 text-[11px] leading-snug">
              {plan.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3DB7F4] hover:underline underline-offset-2"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : (
            <p className="text-[11px] leading-snug opacity-90 px-1">{plan.tagline}</p>
          )}
        </div>
      </div>

      {/* Пользователи и диск */}
      <div className={cn("px-3 py-3 min-h-[76px] flex flex-col justify-center", plan.theme.surface)}>
        <div className="flex items-center justify-center gap-1 mb-1">
          {plan.usersIcon === "popular" && (
            <Flame className="w-4 h-4 text-orange-500 shrink-0 fill-orange-400" />
          )}
          {plan.enterpriseTier ? (
            <Select
              value={String(enterpriseUsers)}
              onValueChange={(v) => onEnterpriseUsersChange(Number(v))}
            >
              <SelectTrigger className="h-8 text-xs border-violet-200/80 bg-white w-full max-w-[175px] mx-auto">
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
            <p className="text-sm font-semibold text-gray-800">{usersLabel}</p>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          <span className="font-medium text-gray-700">{storage}</span> диск
        </p>
      </div>

      {/* Цена — одинаковая высота во всех колонках */}
      <div className={cn("px-3 pt-2 pb-3", plan.theme.surface, plan.popular && "ring-2 ring-inset ring-[#3DB7F4]")}>
        <PriceBlock monthly={monthly} yearly={yearly} billing={billing} />
        <Button
          asChild
          className={cn(
            "w-full rounded-xl text-white font-semibold h-11 text-sm border-0 mt-1 shadow-sm",
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
  );
}

function AlignedFeatureGrid() {
  return (
    <div className="grid grid-cols-4 border-t border-gray-200/60">
      {plans.map((plan, planIndex) => (
        <ul
          key={plan.id}
          className={cn(
            "flex flex-col",
            plan.theme.surface,
            planIndex > 0 && "border-l border-white/80",
          )}
        >
          {planFeatures.map((feature) => {
            const included = feature.minPlan <= planIndex;
            return (
              <li
                key={feature.name}
                className={cn(
                  "flex items-center justify-between gap-2 px-2.5 min-h-[40px] border-b border-white/50 last:border-0",
                  !included && "invisible pointer-events-none",
                )}
                aria-hidden={!included}
              >
                <span className="text-[12px] leading-tight text-gray-700 text-left flex items-center flex-wrap gap-1 min-w-0">
                  {feature.name}
                  {feature.name === "CRM" &&
                    feature.crmBadgeFrom !== undefined &&
                    planIndex >= feature.crmBadgeFrom && (
                      <span
                        className={cn(
                          "inline-flex items-center gap-0.5 text-[9px] font-bold text-white rounded px-1.5 py-px shrink-0",
                          plan.theme.crmBadge,
                        )}
                      >
                        CRM №1
                        <span className="opacity-80 font-normal">ⓘ</span>
                      </span>
                    )}
                </span>
                <FeatureToggle trackClass={plan.theme.toggle} />
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
}

function MobileFeaturesList({ plan, planIndex }: { plan: Plan; planIndex: number }) {
  const items = planFeatures.filter((f) => f.minPlan <= planIndex);
  return (
    <ul className={cn("px-2 pb-3 pt-1 border-t border-white/50", plan.theme.surface)}>
      {items.map((feature) => (
        <li
          key={feature.name}
          className="flex items-center justify-between gap-2 py-2.5 px-2 border-b border-white/60 last:border-0"
        >
          <span className="text-[12px] text-gray-700 flex items-center flex-wrap gap-1">
            {feature.name}
            {feature.name === "CRM" &&
              feature.crmBadgeFrom !== undefined &&
              planIndex >= feature.crmBadgeFrom && (
                <span
                  className={cn(
                    "text-[9px] font-bold text-white rounded px-1.5 py-px",
                    plan.theme.crmBadge,
                  )}
                >
                  CRM №1
                </span>
              )}
          </span>
          <FeatureToggle trackClass={plan.theme.toggle} />
        </li>
      ))}
    </ul>
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
      className="relative py-20 md:py-28 bg-gradient-to-b from-white via-[#f7fbfe] to-white"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-3">Лицензии Bitrix24</h2>
          <p className="text-gray-600">Сравните тарифы и выберите подходящий план</p>
        </div>

        <div className="flex justify-center mb-8 sm:mb-10">
          <BillingToggle billing={billing} onChange={setBilling} />
        </div>

        {/* Десктоп */}
        <div className="hidden lg:block rounded-2xl border border-gray-200/90 shadow-[0_4px_32px_rgba(61,183,244,0.1)] overflow-hidden bg-white">
          <div className="grid grid-cols-4">
            {plans.map((plan, i) => (
              <PlanTopSection
                key={plan.id}
                plan={plan}
                billing={billing}
                enterpriseUsers={enterpriseUsers}
                onEnterpriseUsersChange={setEnterpriseUsers}
                columnIndex={i}
              />
            ))}
          </div>
          <AlignedFeatureGrid />
        </div>

        {/* Мобильный */}
        <div className="lg:hidden">
          <Carousel setApi={setCarouselApi} opts={{ align: "center", loop: false }}>
            <CarouselContent className="-ml-3">
              {plans.map((plan, i) => (
                <CarouselItem key={plan.id} className="pl-3 basis-[88%] sm:basis-[72%]">
                  <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white">
                    <PlanTopSection
                      plan={plan}
                      billing={billing}
                      enterpriseUsers={enterpriseUsers}
                      onEnterpriseUsersChange={setEnterpriseUsers}
                      columnIndex={i}
                    />
                    <MobileFeaturesList plan={plan} planIndex={i} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-3 mt-5">
              <CarouselPrevious className="static translate-y-0 h-9 w-9" />
              <div className="flex gap-1.5">
                {plans.map((plan, i) => (
                  <button
                    key={plan.id}
                    type="button"
                    aria-label={plan.name}
                    onClick={() => carouselApi?.scrollTo(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      activeSlide === i ? "w-7 bg-[#3DB7F4]" : "w-1.5 bg-gray-300",
                    )}
                  />
                ))}
              </div>
              <CarouselNext className="static translate-y-0 h-9 w-9" />
            </div>
          </Carousel>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8 max-w-md mx-auto">
          Цены в сомах. Поможем подключить лицензию и настроить Bitrix24 — напишите в WhatsApp.
        </p>
      </div>
    </section>
  );
}
