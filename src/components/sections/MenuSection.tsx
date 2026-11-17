"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { menuCategories, type MenuCategory } from "@/data/menu";

interface MenuSectionProps {
  onOpenBooking?: () => void;
}

export function MenuSection({ onOpenBooking }: MenuSectionProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<MenuCategory["id"]>("mains");

  const currentCategory =
    menuCategories.find((cat) => cat.id === activeCategoryId) || menuCategories[0];

  const handleBookingClick = (e: React.MouseEvent) => {
    if (onOpenBooking) {
      e.preventDefault();
      onOpenBooking();
    }
  };

  return (
    <section id="menu" className="py-24 sm:py-32 lg:py-40 bg-ivory-light border-b thin-border">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Title & Narrative */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8">
          <div>
            <div className="flex items-center space-x-3 text-muted-sage text-[11px] uppercase tracking-[0.25em] font-semibold mb-4">
              <span>03</span>
              <span className="w-8 h-[1px] bg-muted-sage inline-block"></span>
              <span>Гастрономическая карта</span>
            </div>
            <h2 className="serif-display text-4xl sm:text-6xl font-normal text-deep-olive leading-[1.08]">
              Меню, созданное <br className="hidden sm:inline" />
              <span className="italic text-olive-muted font-light">
                с вниманием к деталям.
              </span>
            </h2>
          </div>
          <p className="text-deep-olive/75 text-[15px] max-w-md font-light leading-relaxed">
            Знакомые вкусы, новые сочетания и продукты, выбранные с особым вниманием. Все блюда подаются a la minute в авторской керамике.
          </p>
        </div>

        {/* Minimal Category Tabs Navigation */}
        <div
          className="flex flex-wrap items-center justify-start gap-3 sm:gap-4 mb-14 border-b thin-border pb-6"
          role="tablist"
          aria-label="Категории меню"
        >
          {menuCategories.map((category) => {
            const isActive = category.id === activeCategoryId;
            return (
              <button
                key={category.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategoryId(category.id)}
                className={`px-6 py-2.5 text-[13px] uppercase tracking-[0.16em] font-medium rounded-[2px] transition-all cursor-pointer ${
                  isActive
                    ? "bg-deep-olive text-ivory shadow-sm"
                    : "border border-deep-olive/20 text-deep-olive hover:border-deep-olive"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div
          role="tabpanel"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 animate-in fade-in-50 duration-300"
        >
          {currentCategory.items.map((item) => (
            <article
              key={item.id}
              className="group bg-ivory border thin-border rounded-[3px] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-deep-olive/40 hover:shadow-sm"
            >
              {item.image && (
                <div className="overflow-hidden aspect-[4/3] bg-warm-sand/20 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {item.badge && (
                    <div className="absolute top-3 right-3 bg-ivory/90 backdrop-blur-sm text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 text-deep-olive font-medium rounded-[2px]">
                      {item.badge}
                    </div>
                  )}
                </div>
              )}

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="serif-display text-2xl font-medium text-deep-olive group-hover:text-muted-sage transition-colors">
                      {item.name}
                    </h3>
                    <span className="serif-display text-2xl text-deep-olive font-normal whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-[13px] text-deep-olive/70 leading-relaxed font-light mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t thin-border flex items-center justify-between text-[11px] text-muted-sage uppercase tracking-wider">
                  <span>{item.weight}</span>
                  {item.note && <span>{item.note}</span>}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Menu Footer Note */}
        <div className="mt-16 pt-8 border-t thin-border flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-deep-olive/60 font-light gap-4">
          <p>
            Все цены указаны в белорусских рублях (BYN). Пожалуйста, сообщите официанту об индивидуальных аллергиях.
          </p>
          <a
            href="#reservation"
            onClick={handleBookingClick}
            className="inline-flex items-center space-x-1.5 underline underline-offset-4 hover:text-deep-olive font-medium transition-colors"
          >
            <span>Забронировать столик к ужину</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
