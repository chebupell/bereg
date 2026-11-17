import { ArrowRight } from "lucide-react";
import { restaurantData } from "@/data/restaurant";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] pt-28 sm:pt-36 lg:pt-40 pb-20 flex flex-col justify-center border-b thin-border">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
        {/* Top Eyebrow & Subtitle Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10 sm:mb-14">
          <div className="md:col-span-8">
            <div className="flex items-center space-x-3 text-muted-sage text-[11px] sm:text-[12px] tracking-[0.25em] uppercase font-semibold mb-4">
              <span className="w-6 h-[1px] bg-muted-sage inline-block"></span>
              <span>{restaurantData.concept} • {restaurantData.city}</span>
            </div>
            <h1 className="serif-display text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-normal leading-[1.05] tracking-[-0.01em] text-deep-olive max-w-4xl">
              Вкус простых вещей. <br className="hidden sm:inline" />
              <span className="italic font-light text-olive-muted">
                В новом прочтении.
              </span>
            </h1>
          </div>
          <div className="md:col-span-4 flex flex-col justify-end h-full pt-2 md:pt-14 space-y-6">
            <p className="text-deep-olive/80 text-[15px] sm:text-[16px] leading-relaxed font-light pl-4 border-l border-warm-sand">
              Современная европейская кухня, в которой важна каждая деталь. Мы
              переосмысливаем локальные и сезонные продукты сквозь призму
              лаконичной гастрономии.
            </p>
            <div className="flex items-center space-x-6 pt-2">
              <a
                href="#menu"
                className="group inline-flex items-center space-x-2 text-[13px] uppercase tracking-[0.16em] font-medium text-deep-olive hover:text-muted-sage transition-colors"
              >
                <span>Открыть меню</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
              <span className="text-warm-sand text-sm">/</span>
              <a
                href="#about"
                className="text-[13px] uppercase tracking-[0.16em] font-medium text-deep-olive/70 hover:text-deep-olive transition-colors"
              >
                О ресторане
              </a>
            </div>
          </div>
        </div>

        {/* Asymmetrical Editorial Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mt-6">
          {/* Main Hero Image (Large Cinematic Crudo Dish) */}
          <div className="lg:col-span-8 group relative overflow-hidden rounded-[4px] bg-warm-sand/30 aspect-[16/10] sm:aspect-[16/9]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATxyZK_iWgNFAKUT2-DBLNZNkXkmCblgykm92Zgs_pXn8nI-Q7Cv4Cg6c0qmhYKtbjnSx_p3ZDBWIMZ0kZa91aPoWZYI_CTZaBjEB6h3mwUFvwJ8Ty_5lsHABKYXQGdf33Li9gXcaAaEAdNSpe4Ua137sIotixwDkpmAkRfsx8RR4cSFBc7AX-R3vdI-1v9ZrIryr5D5rNsRswfJvJScq9H5slOdKJ9_ZSAPnr53E"
              alt="Крудо из сибаса с цитрусовым дрессингом — ресторан BÉRÉG"
              className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-olive/30 via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-ivory text-xs tracking-wider uppercase">
              <span className="bg-deep-olive/80 backdrop-blur-md px-3 py-1.5 rounded-[2px] font-light">
                Фирменная подача • Сезонное меню {restaurantData.establishedYear}
              </span>
              <span className="hidden sm:inline font-mono opacity-80">
                01 / SIGNATURE
              </span>
            </div>
          </div>

          {/* Secondary Hero Image (Atmospheric Dining Room) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="group relative overflow-hidden rounded-[4px] bg-warm-sand/30 aspect-[4/3] lg:aspect-auto lg:h-[72%]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg6jcX1DoxrGSB5S3McWAU50iDuOyZ7yWl3PrNezFm0j9eMQIJjqrC0wTs6UHSBc21lJEG66lW5DVQ4fQP-Lq7PuzHxcwaQtZFVTeoMDdBK5C8pqqvg8kkK3o4loJu61h5L3CHDdLnJ5av6UcnGVYr8Fw5ZJ0eImNiT1zWUjFHGGSNAejFmS4E_jBw2XeCTo8tlvU07HWURUnzs4E_uQpAO_wb65Povm9QS2Tfnso"
                alt="Интерьер ресторана BÉRÉG в Гомеле"
                className="w-full h-full object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-deep-olive/10 group-hover:bg-transparent transition-colors"></div>
            </div>
            {/* Editorial Caption Card */}
            <div className="p-6 bg-ivory-light border thin-border rounded-[2px] flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-sage font-semibold mb-1.5">
                A Thoughtful Approach to Dining
              </span>
              <p className="text-[13px] leading-relaxed text-deep-olive/75">
                Теплый натуральный дуб, льняной текстиль и мягкий свет. Пространство, созданное для неспешных бесед и чистого вкуса.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
