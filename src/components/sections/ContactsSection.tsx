import { ArrowUpRight } from "lucide-react";
import { restaurantData } from "@/data/restaurant";

export function ContactsSection() {
  return (
    <section id="contacts" className="py-24 sm:py-32 border-b thin-border">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex items-center space-x-3 text-muted-sage text-[11px] uppercase tracking-[0.25em] font-semibold mb-6">
          <span>06</span>
          <span className="w-8 h-[1px] bg-muted-sage inline-block"></span>
          <span>Локация и часы работы</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Data */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <h2 className="serif-display text-4xl sm:text-5xl font-normal text-deep-olive mb-4">
                Будем рады видеть вас.
              </h2>
              <p className="text-deep-olive/70 text-sm font-light leading-relaxed">
                {restaurantData.name} расположен в историческом центре Гомеля, в
                шаговой доступности от набережной реки Сож и дворцово-паркового
                ансамбля.
              </p>
              {/* Concept Notice */}
              <div className="mt-4 p-4 bg-sand-light/50 border-l-2 border-muted-sage rounded-r-[2px]">
                <p className="text-xs text-deep-olive/80 font-light leading-relaxed">
                  {restaurantData.portfolioNotice}
                </p>
              </div>
            </div>

            {/* Information Blocks */}
            <div className="space-y-6 border-t thin-border pt-6">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-muted-sage font-semibold block mb-1">
                  Локация
                </span>
                <p className="text-base text-deep-olive font-medium">
                  г. {restaurantData.address.city}, {restaurantData.address.street}
                </p>
                <span className="text-[11px] text-deep-olive/50 font-light block mt-0.5">
                  Демонстрационный концепт-проект
                </span>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-muted-sage font-semibold block mb-1">
                  Время работы
                </span>
                <p className="text-sm text-deep-olive font-medium">
                  {restaurantData.schedule.weekdays}
                </p>
                <p className="text-sm text-deep-olive font-medium">
                  {restaurantData.schedule.weekends}
                </p>
                <p className="text-sm text-deep-olive font-medium">
                  {restaurantData.schedule.sunday}
                </p>
                <p className="text-xs text-muted-sage mt-1">
                  {restaurantData.schedule.breakfastNote}
                </p>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-muted-sage font-semibold block mb-1">
                  Связь & Резерв
                </span>
                <p className="text-base text-deep-olive font-medium tracking-wide">
                  {restaurantData.contacts.phoneDisplay}
                </p>
                <p className="text-sm text-deep-olive/70 mt-0.5 font-light">
                  {restaurantData.contacts.email}
                </p>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-muted-sage font-semibold block mb-2">
                  Медиа & Сообщество
                </span>
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] font-medium text-deep-olive/80">
                  {restaurantData.socials.map((social) => (
                    <span
                      key={social.name}
                      className="px-2.5 py-1 bg-ivory border thin-border rounded-[2px] text-[11px]"
                    >
                      {social.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stylized Minimal Map Graphic */}
          <div className="lg:col-span-7 bg-ivory-light border thin-border rounded-[4px] overflow-hidden p-8 sm:p-10 flex flex-col justify-between min-h-[440px]">
            <div className="flex items-center justify-between mb-8 border-b thin-border pb-4">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-sage font-medium">
                Карта концепта • {restaurantData.city}
              </span>
              <span className="text-xs text-deep-olive/60 font-light">
                Парковка для гостей ресторана
              </span>
            </div>

            {/* Stylized Minimal Vector Map Graphic */}
            <div className="relative w-full h-64 sm:h-72 bg-sand-light/50 border thin-border rounded-[2px] flex items-center justify-center overflow-hidden">
              {/* Decorative Map Grid Lines */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(#252823 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              ></div>
              <div className="absolute w-3/4 h-[1px] bg-deep-olive/15 rotate-12"></div>
              <div className="absolute w-full h-[1px] bg-deep-olive/15 -rotate-45"></div>
              <div className="absolute right-12 top-0 bottom-0 w-[1px] bg-muted-sage/30"></div>

              {/* Stylized River Sozh Contour */}
              <div
                className="absolute -right-8 bottom-0 top-0 w-36 bg-[#8C927E]/15 rounded-l-full pointer-events-none"
                title="Река Сож"
              ></div>

              {/* Location Marker */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-deep-olive text-ivory flex items-center justify-center shadow-lg ring-4 ring-ivory animate-pulse">
                  <span className="serif-display text-sm font-bold tracking-widest">
                    B
                  </span>
                </div>
                <div className="mt-2 bg-ivory px-3 py-1 border thin-border rounded-[2px] shadow-sm">
                  <span className="text-[11px] uppercase tracking-wider text-deep-olive font-semibold">
                    {restaurantData.name} Concept
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-deep-olive/70 font-light">
              <span>{restaurantData.address.landmark}</span>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 uppercase tracking-wider text-deep-olive font-medium hover:text-muted-sage transition-colors"
              >
                <span>Ориентир на карте</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
