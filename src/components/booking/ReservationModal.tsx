"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import {
  X,
  Calendar as CalendarIcon,
  Users,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { restaurantData } from "@/data/restaurant";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DateSlot {
  dateStr: string;
  dayName: string;
  dayNumber: string;
}

const emptySubscribe = () => () => {};

let cachedClientDates: DateSlot[] | null = null;
function getClientDates(): DateSlot[] {
  if (!cachedClientDates) {
    const list: DateSlot[] = [];
    const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const base = new Date();
    for (let i = 0; i < 5; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      list.push({
        dateStr: d.toISOString().split("T")[0],
        dayName: days[d.getDay()],
        dayNumber: d.getDate().toString(),
      });
    }
    cachedClientDates = list;
  }
  return cachedClientDates;
}

const SERVER_DATES: DateSlot[] = [];
const getServerSnapshot = () => SERVER_DATES;

function useUpcomingDates(): DateSlot[] {
  return useSyncExternalStore(
    emptySubscribe,
    getClientDates,
    getServerSnapshot
  );
}

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const availableDates = useUpcomingDates();

  // Form State
  const [guests, setGuests] = useState<number>(2);
  const [userSelectedDate, setUserSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("19:30");
  const [selectedZone, setSelectedZone] = useState<string>("У окон");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [occasion, setOccasion] = useState<string>("Романтический ужин");
  const [comment, setComment] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(true);

  // Active date resolves to user selection or first available
  const activeDate = userSelectedDate || (availableDates[0]?.dateStr ?? "");

  // Submission State
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    id: string;
    name: string;
    date: string;
    time: string;
    guests: number;
    zone: string;
  } | null>(null);

  // Lock body scroll when modal is open and handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const timeSlots = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];

  const seatingZones = [
    {
      id: "У окон",
      label: "У окон",
      desc: "Мягкий свет, вид на исторический сквер",
    },
    {
      id: "Основной зал",
      label: "Основной зал",
      desc: "Атмосфера зала и вид на открытый бар",
    },
    {
      id: "Камерный угол",
      label: "Камерный угол",
      desc: "Приватность для неспешных бесед",
    },
  ];

  const occasions = [
    "Романтический ужин",
    "День рождения",
    "Деловая встреча",
    "Семейный вечер",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError("Необходимо согласие с правилами бронирования");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          date: activeDate,
          time: selectedTime,
          guests,
          zone: selectedZone,
          occasion,
          comment,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Ошибка при оформлении бронирования");
      }

      setConfirmedBooking({
        id: data.bookingId,
        name: data.data.name,
        date: data.data.date,
        time: data.data.time,
        guests: data.data.guests,
        zone: data.data.zone,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Не удалось отправить заявку");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      className="fixed inset-0 z-50 bg-[#252823]/75 backdrop-blur-[10px] flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative z-20 w-full max-w-[1020px] max-h-[92vh] bg-[#FCF9F3] border border-[#D8D0C3]/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row my-auto">
        {/* Left Column: Live Summary and Atmosphere */}
        <aside className="w-full md:w-[38%] bg-[#F5F1E8] border-b md:border-b-0 md:border-r border-[#D8D0C3]/70 flex flex-col justify-between p-6 sm:p-8 relative overflow-hidden">
          {/* Ambient Banner Photo */}
          <div className="absolute top-0 left-0 right-0 h-44 overflow-hidden pointer-events-none opacity-30 mix-blend-multiply">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIKGdzLiCetOY2ooeDQPNjpqGhjNIVAD6mN9VBEClugsmteeQpSTxqARPv4I4pSOgqIOdIeDbDflTDOn2wlQGMZTlCI_-eIevgvYms4rmJ8pci8Su1MHaA0WKDP-vY4Yc8DjkJ7Fwyf8RHjd8fKc7nvTP64OoazhmdpC52s0MA8_Ffy2ClaHX08Ka28DmOmrHHDvQVli13wg3JVy3f37zGsQMrz51NQ-yP-gtb15o"
              alt="Интерьер BÉRÉG"
              className="w-full h-full object-cover filter contrast-[0.9] saturate-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F5F1E8]/70 to-[#F5F1E8]"></div>
          </div>

          {/* Top Brand Area */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center space-x-2 text-[10px] tracking-[0.28em] text-[#8C927E] uppercase font-semibold">
              <span>{restaurantData.name}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8C927E]/40"></span>
              <span>{restaurantData.city}</span>
            </div>
            <div>
              <h2
                id="modal-headline"
                className="serif-display text-2xl lg:text-3xl font-normal text-[#252823] leading-snug"
              >
                Ваш особенный вечер <br />
                <span className="italic font-light">в {restaurantData.name}</span>
              </h2>
              <p className="text-xs text-[#7A7E74] mt-1 font-light leading-relaxed">
                Премиальный гастрономический опыт в историческом центре набережной Сожа.
              </p>
            </div>

            {/* Live Dynamic Summary Card */}
            <div className="mt-6 pt-5 pb-5 px-4 bg-white/70 backdrop-blur-sm rounded-xl border border-[#D8D0C3]/80 shadow-sm space-y-3.5">
              <div className="text-[10px] uppercase tracking-wider text-[#8C927E] font-medium border-b border-[#D8D0C3]/50 pb-2 flex justify-between items-center">
                <span>Детали вашей брони</span>
                <span className="flex items-center space-x-1.5 text-emerald-800 text-[10px] font-normal">
                  <span className="h-2 w-2 rounded-full bg-emerald-700 animate-pulse"></span>
                  <span>Заявка онлайн</span>
                </span>
              </div>

              {/* Date & Time Preview */}
              <div className="flex items-start space-x-3">
                <CalendarIcon className="w-4 h-4 text-[#252823] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-[#252823]">
                    {activeDate || "Выберите дату"} • {selectedTime}
                  </p>
                  <p className="text-[11px] text-[#7A7E74]">Длительность визита: ~2.5 ч</p>
                </div>
              </div>

              {/* Guests & Zone Preview */}
              <div className="flex items-start space-x-3">
                <Users className="w-4 h-4 text-[#252823] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-[#252823]">
                    {guests} {guests === 1 ? "персона" : guests < 5 ? "персоны" : "персон"}
                  </p>
                  <p className="text-[11px] text-[#7A7E74]">Зона: {selectedZone}</p>
                </div>
              </div>

              {/* House Rules */}
              <div className="bg-[#F5F2EC]/90 p-2.5 rounded-lg border border-[#D8D0C3]/60 text-[11px] text-[#565B51] leading-relaxed">
                <p className="font-medium text-[#252823] mb-0.5">Правила дома:</p>
                <p>• Бронь удерживается 15 минут</p>
                <p>• Дресс-код: Smart Casual</p>
              </div>
            </div>
          </div>

          {/* Quote & Direct Contact */}
          <div className="relative z-10 mt-6 pt-5 border-t border-[#D8D0C3]/70 space-y-4">
            <blockquote className="italic serif-display text-[15px] text-[#474B42] leading-snug">
              «Каждая деталь вашего визита — от бокала сухого вина до мягкого света заката над Сожем — продумана с заботой.»
            </blockquote>
            <div className="flex items-center justify-between text-xs pt-1">
              <div className="text-[#7A7E74]">
                <span className="block text-[10px] uppercase tracking-wider text-[#8C927E]">
                  Прямая связь с хостес
                </span>
                <a
                  href={`tel:${restaurantData.contacts.phone}`}
                  className="font-medium text-[#252823] hover:text-[#8C927E] transition-colors"
                >
                  {restaurantData.contacts.phoneDisplay}
                </a>
              </div>
              <span className="text-[11px] px-2 py-0.5 bg-[#EBE7DF] text-[#4A4E45] rounded border border-[#D8D0C3]/60">
                {restaurantData.address.street}
              </span>
            </div>
          </div>
        </aside>

        {/* Right Column: Interactive Form or Confirmation */}
        <main className="w-full md:w-[62%] bg-[#FCF9F3] flex flex-col justify-between overflow-y-auto max-h-[82vh] md:max-h-[92vh] custom-scroll p-6 sm:p-8 lg:p-9 relative">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть окно бронирования"
            className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full flex items-center justify-center text-[#252823] hover:bg-[#EFECE5] border border-transparent hover:border-[#D8D0C3] transition-all duration-200 group focus:outline-none cursor-pointer z-10"
          >
            <X className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
          </button>

          {confirmedBooking ? (
            /* Confirmation Screen */
            <div className="my-auto py-8 text-center space-y-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#252823] text-ivory flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C927E] font-semibold block mb-2">
                  Заявка № {confirmedBooking.id}
                </span>
                <h3 className="serif-display text-3xl sm:text-4xl text-[#252823] font-normal">
                  Ваша заявка принята
                </h3>
                <p className="text-sm text-[#7A7E74] max-w-md mx-auto mt-2 font-light">
                  Благодарим вас, {confirmedBooking.name}. Администратор ресторана свяжется с вами по телефону в течение 15 минут для подтверждения бронирования.
                </p>
              </div>

              <div className="bg-[#F5F1E8] border border-[#D8D0C3] rounded-xl p-6 max-w-md mx-auto text-left space-y-3 text-xs text-[#252823]">
                <div className="flex justify-between border-b border-[#D8D0C3]/60 pb-2">
                  <span className="text-[#7A7E74]">Дата и время:</span>
                  <span className="font-semibold">
                    {confirmedBooking.date} в {confirmedBooking.time}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#D8D0C3]/60 pb-2">
                  <span className="text-[#7A7E74]">Персоны:</span>
                  <span className="font-semibold">{confirmedBooking.guests} персоны</span>
                </div>
                <div className="flex justify-between border-b border-[#D8D0C3]/60 pb-2">
                  <span className="text-[#7A7E74]">Зона стола:</span>
                  <span className="font-semibold">{confirmedBooking.zone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A7E74]">Статус заявки:</span>
                  <span className="text-amber-800 font-medium">Ожидает подтверждения хостес</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="py-3 px-8 bg-[#252823] text-ivory text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-olive-muted transition-colors cursor-pointer"
              >
                Вернуться на сайт
              </button>
            </div>
          ) : (
            /* Interactive 2-Step Form */
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Header / Title */}
              <div className="pr-10 border-b border-[#E9E4DC] pb-4">
                <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#8C927E] uppercase font-semibold">
                  <span>Параметры стола и контакты</span>
                </div>
                <h3 className="serif-display text-2xl text-[#252823] font-medium mt-0.5">
                  Бронирование стола
                </h3>
              </div>

              {/* SECTION 1: Visit Details */}
              <div className="space-y-6">
                {/* 1.1 Number of Guests */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#3E4239]">
                    1. Количество гостей
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {[1, 2, 3, 4, 5, 6].map((num) => {
                      const isSelected = guests === num;
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuests(num)}
                          className={`py-2.5 text-xs rounded-lg transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#252823] text-[#FCF9F3] font-semibold border border-[#252823] shadow-sm"
                              : "border border-[#D8D0C3] hover:border-[#252823] text-[#252823]"
                          }`}
                        >
                          {num === 6 ? "6+" : num}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 1.2 Date Selector */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#3E4239]">
                      2. Дата визита
                    </label>
                    <span className="text-[11px] text-[#7A7E74]">Ближайшие дни</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2 text-center">
                    {availableDates.map((d) => {
                      const isSelected = activeDate === d.dateStr;
                      return (
                        <button
                          key={d.dateStr}
                          type="button"
                          onClick={() => setUserSelectedDate(d.dateStr)}
                          className={`p-2 rounded-lg transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#252823] text-white border border-[#252823] shadow-sm"
                              : "border border-[#D8D0C3] hover:border-[#252823] text-[#252823]"
                          }`}
                        >
                          <span
                            className={`block text-[10px] uppercase ${
                              isSelected ? "text-[#D8D0C3]" : "text-[#8C927E]"
                            }`}
                          >
                            {d.dayName}
                          </span>
                          <span
                            className={`block text-sm font-semibold ${
                              isSelected ? "text-[#FCF9F3]" : "text-[#252823]"
                            }`}
                          >
                            {d.dayNumber}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 1.3 Time Slots */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#3E4239]">
                      3. Доступное время
                    </label>
                    <span className="text-[11px] text-[#8C927E]">Вечерняя посадка</span>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 px-1 text-xs rounded-lg transition text-center cursor-pointer ${
                            isSelected
                              ? "bg-[#252823] text-white font-semibold border border-[#252823] shadow-sm"
                              : "border border-[#D8D0C3] hover:border-[#252823] text-[#252823]"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 1.4 Seating Zone Cards */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#3E4239]">
                    4. Желаемая зона посадки
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {seatingZones.map((zone) => {
                      const isSelected = selectedZone === zone.id;
                      return (
                        <div
                          key={zone.id}
                          onClick={() => setSelectedZone(zone.id)}
                          className={`relative flex flex-col p-3 rounded-xl cursor-pointer transition ${
                            isSelected
                              ? "border-2 border-[#252823] bg-[#F6F3ED] shadow-sm"
                              : "border border-[#D8D0C3] bg-white/70 hover:border-[#8C927E]"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold text-[#252823]">
                              {zone.label}
                            </span>
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isSelected ? "bg-[#252823]" : "border border-[#D8D0C3]"
                              }`}
                            ></span>
                          </div>
                          <p className="text-[11px] text-[#6E7368] leading-tight">
                            {zone.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* SECTION 2: Guest Details & Preferences */}
              <div className="space-y-4 pt-4 border-t border-[#E9E4DC]">
                <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#8C927E] uppercase font-semibold">
                  <span>Контактные данные</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#565B51] mb-1">
                      Имя и фамилия *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Александр Васильев"
                      className="w-full text-xs bg-white border border-[#D8D0C3] rounded-lg px-3.5 py-2.5 text-[#252823] placeholder-[#A0A49B] focus:ring-1 focus:ring-[#252823] focus:border-[#252823] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#565B51] mb-1">
                      Телефон для подтверждения *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+375 (29) 000-00-00"
                      className="w-full text-xs bg-white border border-[#D8D0C3] rounded-lg px-3.5 py-2.5 text-[#252823] placeholder-[#A0A49B] focus:ring-1 focus:ring-[#252823] focus:border-[#252823] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#565B51] mb-1">
                    Электронная почта
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alexander@example.com"
                    className="w-full text-xs bg-white border border-[#D8D0C3] rounded-lg px-3.5 py-2.5 text-[#252823] placeholder-[#A0A49B] focus:ring-1 focus:ring-[#252823] focus:border-[#252823] outline-none"
                  />
                </div>

                {/* Occasion Selector */}
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#565B51] mb-1.5">
                    Повод для визита
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {occasions.map((occ) => {
                      const isSelected = occasion === occ;
                      return (
                        <button
                          key={occ}
                          type="button"
                          onClick={() => setOccasion(occ)}
                          className={`text-[11px] px-3 py-1 rounded-full transition cursor-pointer ${
                            isSelected
                              ? "bg-[#EBE7DF] border border-[#252823] text-[#252823] font-medium"
                              : "border border-[#D8D0C3] hover:border-[#252823] bg-white text-[#4A4E45]"
                          }`}
                        >
                          {occ}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#565B51] mb-1">
                    Особые пожелания или аллергии
                  </label>
                  <textarea
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Стол с мягкими креслами, аллергия на орехи, подготовка десерта со свечой..."
                    className="w-full text-xs bg-white border border-[#D8D0C3] rounded-lg px-3.5 py-2 text-[#252823] placeholder-[#A0A49B] focus:ring-1 focus:ring-[#252823] focus:border-[#252823] resize-none outline-none"
                  ></textarea>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                  {error}
                </div>
              )}

              {/* Agreement & CTA */}
              <div className="pt-2 space-y-4">
                <div className="flex items-start space-x-2.5">
                  <input
                    type="checkbox"
                    id="terms-check"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-[#D8D0C3] text-[#252823] focus:ring-[#252823] cursor-pointer"
                  />
                  <label
                    htmlFor="terms-check"
                    className="text-[11px] text-[#6E7368] leading-tight select-none cursor-pointer"
                  >
                    Я согласен с правилами бронирования ресторана {restaurantData.name} и подтверждаю корректность данных для связи.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 bg-[#252823] hover:bg-[#343831] text-[#FCF9F3] text-xs uppercase tracking-[0.22em] font-medium rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group focus:outline-none cursor-pointer disabled:opacity-50"
                >
                  <span>{loading ? "Отправка заявки..." : "Подтвердить бронирование"}</span>
                  <Sparkles className="w-4 h-4 transform group-hover:scale-110 transition-transform" />
                </button>

                <p className="text-center text-[11px] text-[#8C927E]">
                  Бронирование отправляется как предварительная заявка. Хостес подтвердит стол в течение 15 минут.
                </p>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
