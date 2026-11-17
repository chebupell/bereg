"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Calendar } from "lucide-react";
import { restaurantData } from "@/data/restaurant";

interface ReservationSectionProps {
  onOpenModal?: () => void;
}

const emptySubscribe = () => () => {};

let cachedToday = "";
function getTodaySnapshot(): string {
  if (!cachedToday) {
    cachedToday = new Date().toISOString().split("T")[0];
  }
  return cachedToday;
}

const getServerTodaySnapshot = () => "";

function useTodayDate() {
  return useSyncExternalStore(
    emptySubscribe,
    getTodaySnapshot,
    getServerTodaySnapshot
  );
}

export function ReservationSection({ onOpenModal }: ReservationSectionProps) {
  const today = useTodayDate();
  const [userDate, setUserDate] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    time: "19:00",
    guests: "2 персоны",
    notes: "",
  });

  const currentDate = userDate || today;

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setUserDate("");
        setFormData({
          name: "",
          phone: "",
          time: "19:00",
          guests: "2 персоны",
          notes: "",
        });
      }, 5000);
    }, 600);
  };

  return (
    <section
      id="reservation"
      className="py-24 sm:py-32 lg:py-40 bg-sand-light/30 border-b thin-border"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Text & Rationale */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-3 text-muted-sage text-[11px] uppercase tracking-[0.25em] font-semibold">
              <span>05</span>
              <span className="w-8 h-[1px] bg-muted-sage inline-block"></span>
              <span>Бронирование стола</span>
            </div>

            <h2 className="serif-display text-4xl sm:text-6xl font-normal text-deep-olive leading-[1.08]">
              Ваш следующий <br />
              особенный вечер <br />
              <span className="italic text-olive-muted font-light">
                начинается здесь.
              </span>
            </h2>

            <p className="text-deep-olive/75 text-[15px] sm:text-[16px] leading-relaxed font-light">
              Забронируйте столик и проведите время в атмосфере {restaurantData.name}. Мы бережно относимся к каждому визиту и подберем для вас наилучшее расположение.
            </p>

            <div className="pt-4 space-y-3 text-xs text-deep-olive/70 font-light">
              {restaurantData.bookingRules.map((rule, idx) => (
                <div key={idx} className="flex items-center space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-sage shrink-0"></span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>

            {onOpenModal && (
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="inline-flex items-center space-x-2 text-[12px] uppercase tracking-[0.18em] font-medium text-deep-olive underline underline-offset-4 hover:text-muted-sage transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Открыть интерактивную схему бронирования</span>
                </button>
              </div>
            )}
          </div>

          {/* Right: Reservation Form Card */}
          <div className="lg:col-span-6 bg-ivory p-8 sm:p-12 border thin-border rounded-[4px] shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 mx-auto rounded-full bg-deep-olive text-ivory flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="serif-display text-3xl text-deep-olive">
                  Благодарим за визит
                </h3>
                <p className="text-sm text-deep-olive/75 max-w-sm mx-auto font-light leading-relaxed">
                  Ваша заявка принята. Администратор свяжется с вами по указанному телефону в течение 15 минут для подтверждения брони.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.16em] text-deep-olive/70 mb-2 font-medium">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Анна Ковалева"
                      className="w-full bg-ivory border thin-border px-4 py-3 text-sm text-deep-olive focus:outline-none focus:border-deep-olive transition-colors rounded-[2px]"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.16em] text-deep-olive/70 mb-2 font-medium">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+375 (29) 000-00-00"
                      className="w-full bg-ivory border thin-border px-4 py-3 text-sm text-deep-olive focus:outline-none focus:border-deep-olive transition-colors rounded-[2px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Date */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.16em] text-deep-olive/70 mb-2 font-medium">
                      Дата
                    </label>
                    <input
                      type="date"
                      required
                      value={currentDate}
                      onChange={(e) => setUserDate(e.target.value)}
                      className="w-full bg-ivory border thin-border px-4 py-3 text-sm text-deep-olive focus:outline-none focus:border-deep-olive transition-colors rounded-[2px]"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.16em] text-deep-olive/70 mb-2 font-medium">
                      Время
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      className="w-full bg-ivory border thin-border px-4 py-3 text-sm text-deep-olive focus:outline-none focus:border-deep-olive transition-colors rounded-[2px]"
                    >
                      <option>18:00</option>
                      <option>18:30</option>
                      <option>19:00</option>
                      <option>19:30</option>
                      <option>20:00</option>
                      <option>20:30</option>
                      <option>21:00</option>
                    </select>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.16em] text-deep-olive/70 mb-2 font-medium">
                      Гости
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({ ...formData, guests: e.target.value })
                      }
                      className="w-full bg-ivory border thin-border px-4 py-3 text-sm text-deep-olive focus:outline-none focus:border-deep-olive transition-colors rounded-[2px]"
                    >
                      <option>1 персона</option>
                      <option>2 персоны</option>
                      <option>3–4 персоны</option>
                      <option>5–8 персон</option>
                      <option>Мероприятие (9+)</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-deep-olive/70 mb-2 font-medium">
                    Пожелания (опционально)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Столик у окна, день рождения, аллергии..."
                    className="w-full bg-ivory border thin-border px-4 py-3 text-sm text-deep-olive focus:outline-none focus:border-deep-olive transition-colors rounded-[2px] resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-deep-olive text-ivory text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-olive-muted transition-colors rounded-[2px] cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Отправка..." : "Подтвердить бронирование"}
                </button>

                <p className="text-center text-xs text-muted-sage font-medium tracking-wide">
                  Администратор свяжется с вами в течение 15 минут для подтверждения столика.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
