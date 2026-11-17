import { restaurantData } from "@/data/restaurant";

export function AtmosphereSection() {
  return (
    <section id="atmosphere" className="py-24 sm:py-32 lg:py-40 border-b thin-border">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <div className="flex items-center space-x-3 text-muted-sage text-[11px] uppercase tracking-[0.25em] font-semibold mb-4">
            <span>04</span>
            <span className="w-8 h-[1px] bg-muted-sage inline-block"></span>
            <span>Галерея и моменты</span>
          </div>
          <h2 className="serif-display text-4xl sm:text-6xl font-normal text-deep-olive leading-[1.08]">
            Атмосфера, которую <br className="hidden sm:inline" />
            <span className="italic text-olive-muted font-light">
              хочется разделить.
            </span>
          </h2>
          <p className="text-deep-olive/70 text-[15px] mt-4 font-light">
            Фрагменты дня в {restaurantData.name}: мягкие солнечные блики на льняных скатертях, звон тонкого стекла и неторопливая красота гастрономического процесса.
          </p>
        </div>

        {/* Asymmetrical Editorial Magazine Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Large Left Feature: Table & Light */}
          <div className="md:col-span-7 group relative overflow-hidden rounded-[3px] bg-warm-sand/20 aspect-[16/11]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqpzDnDJcnjaflA7BQv4LkBJOLP9KBF7Pe6cZFTsvld1jellp3N8mZgntBFAEsu4KdVssLBYb9H8CvjJ9OD6HM9b3dUa_kBNZWXTW_c7bs1uVo46QWiklp6h42Coh_6PSl9qn3QZwyrR-cicKIha1bBJ9_ThfWduS2H5uxzBcopqmsK7USFKtxCm-69P_RUctttqPo5pPEBIRt-2iwnCeFRUPlj2b4XHeBbb1cLIk"
              alt="Детали сервировки и бокал белого вина в лучах солнца"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-olive/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-6 left-6 text-ivory text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-light">
              Сервировка стола • Натуральный лен и керамика
            </div>
          </div>

          {/* Right Top Feature: Duck Breast Dish Detail */}
          <div className="md:col-span-5 group relative overflow-hidden rounded-[3px] bg-warm-sand/20 aspect-[4/3] md:aspect-auto">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9y6EmsgiCLrwv4v-Srej1_fVkZaPbKpnrJc_kJcguPfoi9trKFE77dbLnjiJwbHW9F0B95rg5BH-QgO4d4RqBUzXwvAcCj0pHxb37R6smq2v_UhK7WrSf8VVYIkKoMze7k9Xrz9tuu-U84DBfhS0Y1afjVbcL-AMVQC9aCEFzMFlKKXHRnji2TQ_xK9BxEt0GPrAXKfsVsuMTGhqHGl86wQZI2h7cLJnZVkbLJow"
              alt="Утиная грудка с ежевичным соусом"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-olive/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-6 left-6 text-ivory text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-light">
              Гастрономическая подача • Текстуры и цвет
            </div>
          </div>

          {/* Bottom Row Left: Poached Pear Dessert */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-[3px] bg-warm-sand/20 aspect-[4/3]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM-ZCProwvn7ByPR4z19K2-mEBzbmo48_PLyjfPyH34Q2APJ3WNFdpET38IkZ3cyzoe28_kE09lbYkuzEzA67_g9ikURHBl7DUAdxAUMp3D951_-xgNyTWzyDsDZZ78OaGHO-vB7rCEdWkBQLAvtxHIbO9XygWNxQ5hMv743oF_6_slssxWQjLqI0K_wFyEPhxEfJzb06CXIyArWSU5ygdRiEpLu9oDjJ_25QBr0w"
              alt="Десерт томленая груша с медовым тюилем"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-olive/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-6 left-6 text-ivory text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-light">
              Кондитерское искусство • Легкость
            </div>
          </div>

          {/* Bottom Row Right: Dining Hall Architecture */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-[3px] bg-warm-sand/20 aspect-[16/9]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg6jcX1DoxrGSB5S3McWAU50iDuOyZ7yWl3PrNezFm0j9eMQIJjqrC0wTs6UHSBc21lJEG66lW5DVQ4fQP-Lq7PuzHxcwaQtZFVTeoMDdBK5C8pqqvg8kkK3o4loJu61h5L3CHDdLnJ5av6UcnGVYr8Fw5ZJ0eImNiT1zWUjFHGGSNAejFmS4E_jBw2XeCTo8tlvU07HWURUnzs4E_uQpAO_wb65Povm9QS2Tfnso"
              alt="Панорама зала ресторана BÉRÉG"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-olive/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-6 left-6 text-ivory text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-light">
              Пространство встреч • {restaurantData.city}, {restaurantData.address.country}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
