import { restaurantData } from "@/data/restaurant";

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 lg:py-40 border-b thin-border">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex items-center space-x-3 text-muted-sage text-[11px] uppercase tracking-[0.25em] font-semibold mb-6">
          <span>02</span>
          <span className="w-8 h-[1px] bg-muted-sage inline-block"></span>
          <span>Философия и пространство</span>
        </div>

        {/* Main Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Storytelling Content */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="serif-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-deep-olive">
              Больше, чем <br />
              <span className="italic text-olive-muted font-light">
                просто ужин.
              </span>
            </h2>

            <div className="space-y-5 text-[15px] sm:text-[16px] leading-relaxed text-deep-olive/80 font-light">
              <p>
                Мы верим, что особенные впечатления рождаются из простых вещей: качественных продуктов, внимательного приготовления и атмосферы, в которой хочется остаться подольше.
              </p>
              <p className="text-deep-olive/70 text-[14px]">
                В {restaurantData.name} мы отсекаем всё лишнее, концентрируясь на сути блюда. Наш шеф-повар работает с фермерскими хозяйствами Беларуси и отборными европейскими ингредиентами, создавая гастрономический диалог традиций и современности.
              </p>
            </div>

            {/* Key Principles Grid */}
            <div className="pt-6 border-t thin-border grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <span className="serif-display text-2xl text-deep-olive block mb-1">
                  01. Сезонность
                </span>
                <p className="text-xs text-deep-olive/60 leading-relaxed font-light">
                  Обновление меню каждые три месяца в согласии с природным циклом.
                </p>
              </div>
              <div>
                <span className="serif-display text-2xl text-deep-olive block mb-1">
                  02. Чистый вкус
                </span>
                <p className="text-xs text-deep-olive/60 leading-relaxed font-light">
                  Минимум термообработки для сохранения естественной органолептики.
                </p>
              </div>
            </div>

            {/* Detail Quote */}
            <div className="p-6 bg-sand-light/40 border-l-2 border-deep-olive rounded-r-[2px]">
              <p className="serif-display text-xl sm:text-2xl italic text-deep-olive font-normal leading-snug">
                «Гастрономия — это форма гостеприимства, где уважение к гостю выражается через безупречную честность продукта.»
              </p>
              <span className="block mt-3 text-[11px] uppercase tracking-[0.18em] text-muted-sage font-medium">
                — Команда {restaurantData.name}
              </span>
            </div>
          </div>

          {/* Right Column: Asymmetric Image Collage */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-6 items-end">
            <div className="sm:col-span-8 group overflow-hidden rounded-[3px] aspect-[4/5] bg-warm-sand/20">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg6jcX1DoxrGSB5S3McWAU50iDuOyZ7yWl3PrNezFm0j9eMQIJjqrC0wTs6UHSBc21lJEG66lW5DVQ4fQP-Lq7PuzHxcwaQtZFVTeoMDdBK5C8pqqvg8kkK3o4loJu61h5L3CHDdLnJ5av6UcnGVYr8Fw5ZJ0eImNiT1zWUjFHGGSNAejFmS4E_jBw2XeCTo8tlvU07HWURUnzs4E_uQpAO_wb65Povm9QS2Tfnso"
                alt="Зал ресторана BÉRÉG"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="sm:col-span-4 space-y-6">
              <div className="group overflow-hidden rounded-[3px] aspect-[3/4] bg-warm-sand/20">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqpzDnDJcnjaflA7BQv4LkBJOLP9KBF7Pe6cZFTsvld1jellp3N8mZgntBFAEsu4KdVssLBYb9H8CvjJ9OD6HM9b3dUa_kBNZWXTW_c7bs1uVo46QWiklp6h42Coh_6PSl9qn3QZwyrR-cicKIha1bBJ9_ThfWduS2H5uxzBcopqmsK7USFKtxCm-69P_RUctttqPo5pPEBIRt-2iwnCeFRUPlj2b4XHeBbb1cLIk"
                  alt="Сервировка стола и детали"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="p-5 border thin-border bg-ivory rounded-[2px]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-sage font-semibold block mb-1">
                  Архитектура вкуса
                </span>
                <p className="text-xs text-deep-olive/70 leading-relaxed font-light">
                  Интерьер спроектирован с использованием необработанного светлого дерева, известковой штукатурки и авторской керамики.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
