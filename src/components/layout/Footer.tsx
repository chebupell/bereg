"use client";

import { useSyncExternalStore } from "react";
import { restaurantData } from "@/data/restaurant";

const emptySubscribe = () => () => {};
const getYearSnapshot = () => new Date().getFullYear();
const getServerYearSnapshot = () => 2024;

export function Footer() {
  const currentYear = useSyncExternalStore(
    emptySubscribe,
    getYearSnapshot,
    getServerYearSnapshot
  );

  return (
    <footer className="bg-deep-olive text-ivory py-16 sm:py-20 border-t border-deep-olive">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start pb-16 border-b border-ivory/15">
          {/* Brand Wordmark & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <span className="serif-display text-3xl sm:text-4xl tracking-[0.2em] font-light text-ivory uppercase block">
              {restaurantData.name}
            </span>
            <p className="serif-display text-lg text-ivory/70 italic font-light max-w-sm">
              «{restaurantData.tagline}.»
            </p>
            <p className="text-xs text-ivory/50 font-light uppercase tracking-widest pt-1">
              {restaurantData.concept} • {restaurantData.city}, {restaurantData.address.country}
            </p>
            {/* Conceptual Portfolio Notice */}
            <p className="text-xs text-warm-sand/80 font-light leading-relaxed pt-2 max-w-md border-l-2 border-muted-sage pl-3">
              {restaurantData.portfolioNotice}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-sage font-semibold block mb-4">
              Навигация
            </span>
            <ul className="space-y-2.5 text-xs uppercase tracking-[0.16em] text-ivory/80 font-light">
              <li>
                <a href="#about" className="hover:text-ivory transition-colors">
                  О ресторане
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-ivory transition-colors">
                  Гастрономическое меню
                </a>
              </li>
              <li>
                <a href="#atmosphere" className="hover:text-ivory transition-colors">
                  Атмосфера & Галерея
                </a>
              </li>
              <li>
                <a href="#reservation" className="hover:text-ivory transition-colors">
                  Забронировать стол
                </a>
              </li>
              <li>
                <a href="#contacts" className="hover:text-ivory transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Working Hours & Direct Reserve */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-sage font-semibold block mb-4">
              Прием гостей
            </span>
            <p className="text-xs text-ivory/80 leading-relaxed font-light">
              {restaurantData.address.city}, {restaurantData.address.street}
              <br />
              {restaurantData.schedule.weekdays}
              <br />
              {restaurantData.schedule.weekends}
            </p>
            <div className="pt-2">
              <span className="text-sm font-medium text-ivory tracking-wider block">
                {restaurantData.contacts.phoneDisplay}
              </span>
              <span className="text-[11px] text-ivory/50">
                Заявки принимаются онлайн через форму бронирования
              </span>
            </div>
          </div>
        </div>

        {/* Copyright & Portfolio Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ivory/50 font-light tracking-wide gap-4">
          <div>
            © {currentYear} {restaurantData.name} Restaurant. Все права защищены.
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2 text-center sm:text-right">
            <span>{restaurantData.portfolioNotice}</span>
            <span className="hidden sm:inline">•</span>
            <span>A Thoughtful Approach to Dining</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
