export interface MenuItem {
  id: string;
  name: string;
  price: string;
  weight: string;
  description: string;
  badge?: string;
  note?: string;
  image?: string;
}

export interface MenuCategory {
  id: "mains" | "breakfast" | "desserts" | "drinks";
  label: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "mains",
    label: "Основные блюда",
    items: [
      {
        id: "duck-breast",
        name: "Утиная грудка Магре",
        price: "46 BYN",
        weight: "280 г",
        description:
          "Крем из томленого пастернака, терпкий ежевичный демигляс, лесные орехи и свежие побеги тимьяна.",
        note: "Рекомендация сомелье: Pinot Noir",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuB9y6EmsgiCLrwv4v-Srej1_fVkZaPbKpnrJc_kJcguPfoi9trKFE77dbLnjiJwbHW9F0B95rg5BH-QgO4d4RqBUzXwvAcCj0pHxb37R6smq2v_UhK7WrSf8VVYIkKoMze7k9Xrz9tuu-U84DBfhS0Y1afjVbcL-AMVQC9aCEFzMFlKKXHRnji2TQ_xK9BxEt0GPrAXKfsVsuMTGhqHGl86wQZI2h7cLJnZVkbLJow",
      },
      {
        id: "seabass-crudo",
        name: "Крудо из сибаса",
        price: "38 BYN",
        weight: "190 г",
        description:
          "Тончайшие слайсы дикого сибаса, капли травяного эстрагонового масла, цедра калабрийского лимона и флер-де-сель.",
        note: "Raw bar • Холодные стартеры",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuATxyZK_iWgNFAKUT2-DBLNZNkXkmCblgykm92Zgs_pXn8nI-Q7Cv4Cg6c0qmhYKtbjnSx_p3ZDBWIMZ0kZa91aPoWZYI_CTZaBjEB6h3mwUFvwJ8Ty_5lsHABKYXQGdf33Li9gXcaAaEAdNSpe4Ua137sIotixwDkpmAkRfsx8RR4cSFBc7AX-R3vdI-1v9ZrIryr5D5rNsRswfJvJScq9H5slOdKJ9_ZSAPnr53E",
      },
      {
        id: "veal-cheeks",
        name: "Телячьи щёчки конфи",
        price: "42 BYN",
        weight: "320 г",
        badge: "Шеф-выбор",
        description:
          "12 часов томления в красном сухом вине, шелковистый крем из белых грибов, хрустящий лук шалот.",
        note: "Signature Main Course",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDg6jcX1DoxrGSB5S3McWAU50iDuOyZ7yWl3PrNezFm0j9eMQIJjqrC0wTs6UHSBc21lJEG66lW5DVQ4fQP-Lq7PuzHxcwaQtZFVTeoMDdBK5C8pqqvg8kkK3o4loJu61h5L3CHDdLnJ5av6UcnGVYr8Fw5ZJ0eImNiT1zWUjFHGGSNAejFmS4E_jBw2XeCTo8tlvU07HWURUnzs4E_uQpAO_wb65Povm9QS2Tfnso",
      },
    ],
  },
  {
    id: "breakfast",
    label: "Завтраки",
    items: [
      {
        id: "brioche-benedict",
        name: "Бенедикт на бриоши",
        price: "24 BYN",
        weight: "260 г",
        description:
          "Воздушная ремесленная бриошь, яйца пашот, гравлакс из лосося собственного посола, голландский соус с эстрагоном.",
        note: "Подаётся до 14:00",
      },
      {
        id: "cottage-cheese-pancakes",
        name: "Сырники из фермерского творога",
        price: "19 BYN",
        weight: "210 г",
        description:
          "Томленый крем из белого шоколада, соус из лесной черники и хрустящая карамелизированная гречиха.",
        note: "Подаётся до 14:00",
      },
      {
        id: "green-buckwheat",
        name: "Зеленая гречка с яйцом су-вид",
        price: "21 BYN",
        weight: "250 г",
        description:
          "Авокадо, молодой шпинат, спаржа на гриле, стружка выдержанного пармезана и нерафинированное тыквенное масло.",
        note: "Healthy Morning",
      },
    ],
  },
  {
    id: "desserts",
    label: "Десерты",
    items: [
      {
        id: "poached-pear",
        name: "Томленая груша BÉRÉG",
        price: "22 BYN",
        weight: "180 г",
        description:
          "Груша, сваренная в пряном сиропе со специями, крем из маскарпоне с мадагаскарской ванилью, тончайший медовый тюиль.",
        note: "Десертная карта",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCM-ZCProwvn7ByPR4z19K2-mEBzbmo48_PLyjfPyH34Q2APJ3WNFdpET38IkZ3cyzoe28_kE09lbYkuzEzA67_g9ikURHBl7DUAdxAUMp3D951_-xgNyTWzyDsDZZ78OaGHO-vB7rCEdWkBQLAvtxHIbO9XygWNxQ5hMv743oF_6_slssxWQjLqI0K_wFyEPhxEfJzb06CXIyArWSU5ygdRiEpLu9oDjJ_25QBr0w",
      },
      {
        id: "chocolate-ganache",
        name: "Шоколадный ганаш с солью",
        price: "20 BYN",
        weight: "150 г",
        description:
          "Горький эквадорский шоколад 72%, оливковое масло холодного отжима, хлопья морской соли Maldon и миндальный сабле.",
        note: "Rich & Intense",
      },
      {
        id: "raspberry-millefeuille",
        name: "Миллефолье с малиной",
        price: "23 BYN",
        weight: "170 г",
        description:
          "Хрустящее карамелизированное слоеное тесто, заварной крем дипломат с бобами тонка и свежая садовая малина.",
        note: "Классика кондитерской",
      },
    ],
  },
  {
    id: "drinks",
    label: "Напитки & Вино",
    items: [
      {
        id: "chablis-premier-cru",
        name: "Chablis Premier Cru",
        price: "35 BYN / бокал",
        weight: "150 мл",
        description:
          "Бургундия, Франция. Минеральное, сухое, с оттенками белых цветов, зеленого яблока и морского бриза.",
        note: "Белое сухое",
      },
      {
        id: "cocktail-bereg",
        name: "Авторский коктейль «Берег»",
        price: "22 BYN",
        weight: "160 мл",
        description:
          "Дистиллят на смородиновом листе, кордиал из белого чая и бергамота, сухое игристое вино.",
        note: "Signature Mixology",
      },
      {
        id: "specialty-coffee-tea",
        name: "Спешелти кофе & Травяные чаи",
        price: "от 8 BYN",
        weight: "200–450 мл",
        description:
          "Фильтр-кофе Эфиопия Иргачефф натуральной обработки или сбор дикорастущих трав Полесья.",
        note: "Горячие напитки",
      },
    ],
  },
];
