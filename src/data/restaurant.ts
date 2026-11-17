export interface RestaurantConfig {
  name: string;
  tagline: string;
  concept: string;
  city: string;
  establishedYear: number;
  portfolioNotice: string;
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
    label: string;
  }>;
  bookingRules: string[];
}

export const restaurantData: RestaurantConfig = {
  name: "BÉRÉG",
  tagline: "Вкус простых вещей. В новом прочтении",
  concept: "Contemporary European Cuisine",
  city: "Гомель",
  establishedYear: 2024,
  portfolioNotice:
    "BÉRÉG — концептуальный проект ресторана, созданный для демонстрации веб-дизайна и разработки.",
  address: {
    street: "ул. Советская, 14 (концептуальная локация)",
    city: "Гомель",
    country: "Беларусь",
    landmark: "Концептуальное пространство рядом с парком Румянцевых-Паскевичей и набережной реки Сож",
  },
  contacts: {
    phone: "+375290000000",
    phoneDisplay: "+375 (29) 000-00-00 (демо)",
    email: "welcome@bereg-concept.example",
  },
  schedule: {
    weekdays: "Пн — Чт: 10:00 — 23:00",
    weekends: "Пт — Сб: 10:00 — 00:00",
    sunday: "Вс: 10:00 — 23:00",
    breakfastNote: "Завтраки подаются ежедневно до 14:00",
  },
  socials: [
    { name: "Instagram", label: "Instagram (концепт)" },
    { name: "Telegram", label: "Telegram (концепт)" },
    { name: "TripAdvisor", label: "TripAdvisor (концепт)" },
  ],
  bookingRules: [
    "Предварительная заявка: стол подтверждается администратором",
    "Подтверждение деталей визита по телефону в течение 15 минут",
    "Возможность выбора столика у окна или в камерной зоне",
    "Для компаний от 6 гостей действует специальное сет-меню",
  ],
};
