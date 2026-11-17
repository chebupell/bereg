export interface RestaurantConfig {
  name: string;
  tagline: string;
  concept: string;
  city: string;
  establishedYear: number;
  address: {
    street: string;
    city: string;
    country: string;
    landmark: string;
  };
  contacts: {
    phone: string;
    phoneDisplay: string;
    email: string;
  };
  schedule: {
    weekdays: string;
    weekends: string;
    sunday: string;
    breakfastNote: string;
  };
  socials: Array<{
    name: string;
    href: string;
  }>;
  bookingRules: string[];
}

export const restaurantData: RestaurantConfig = {
  name: "BÉRÉG",
  tagline: "Вкус простых вещей. В новом прочтении",
  concept: "Contemporary European Cuisine",
  city: "Гомель",
  establishedYear: 2024,
  address: {
    street: "ул. Советская, 14",
    city: "Гомель",
    country: "Беларусь",
    landmark: "5 минут пешком от парка Румянцевых-Паскевичей и набережной реки Сож",
  },
  contacts: {
    phone: "+375297148822",
    phoneDisplay: "+375 (29) 714-88-22",
    email: "welcome@bereg-restaurant.by",
  },
  schedule: {
    weekdays: "Пн — Чт: 10:00 — 23:00",
    weekends: "Пт — Сб: 10:00 — 00:00",
    sunday: "Вс: 10:00 — 23:00",
    breakfastNote: "Завтраки подаются ежедневно до 14:00",
  },
  socials: [
    { name: "Instagram", href: "https://instagram.com" },
    { name: "Telegram", href: "https://t.me" },
    { name: "TripAdvisor", href: "https://tripadvisor.com" },
  ],
  bookingRules: [
    "Подтверждение бронирования в течение 15 минут",
    "Возможность выбора столика у окна или в уединенной зоне",
    "Для компаний от 6 гостей действует специальное сет-меню",
  ],
};
