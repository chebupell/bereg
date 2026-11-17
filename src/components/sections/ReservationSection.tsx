"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Calendar, AlertCircle } from "lucide-react";
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
  const [confirmedId, setConfirmedId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const guestsCount = parseInt(formData.guests, 10) || 2;
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          date: currentDate,
          time: formData.time,
          guests: guestsCount,
          zone: "Основной зал",
          comment: formData.notes,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Не удалось отправить заявку на бронирование");
      }

      setConfirmedId(data.bookingId || "BRG-ONLINE");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Произошла ошибка при отправке заявки");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setConfirmedId("");
    setError(null);
    setUserDate("");
    setFormData({
      name: "",
      phone: "",
      time: "19:00",
      guests: "2 персоны",
      notes: "",
    });
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
                  <span>Открыть интерактивную схему с выбором зон стола</span>
                </button>
              </div>
            )}
          </div>

          {/* Right: Reservation Form Card */}
          <div className="lg:col-span-6 bg-ivory p-8 sm:p-12 border thin-border rounded-[4px] shadow-sm">
            {submitted ? (
              <div className="py-10 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 mx-auto rounded-full bg-deep-olive text-ivory flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted-sage font-semibold block">
                  Заявка № {confirmedId}
                </span>
                <h3 className="serif-display text-3xl text-deep-olive">
                  Ваша заявка принята
                </h3>
                <p className="text-sm text-deep-olive/75 max-w-sm mx-auto font-light leading-relaxed">
                  Благодарим за выбор {restaurantData.name}. Обратите внимание: столик не бронируется автоматически — администратор свяжется с вами по телефону в течение 15 минут для подтверждения брони.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs uppercase tracking-[0.16em] text-deep-olive underline underline-offset-4 hover:text-muted-sage transition-colors cursor-pointer font-medium"
                  >
                    Отправить ещё одну заявку
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.16em] text-deep-olive/70 mb-2 font-medium">
                      Ваше имя *
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
                      Телефон для связи *
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
                    placeholder="Столик у окна, аллергии, повод для визита..."
                    className="w-full bg-ivory border thin-border px-4 py-3 text-sm text-deep-olive focus:outline-none focus:border-deep-olive transition-colors rounded-[2px] resize-none"
                  ></textarea>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-[2px] flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-deep-olive text-ivory text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-olive-muted transition-colors rounded-[2px] cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Отправка заявки..." : "Отправить заявку на бронь"}
                </button>

                <p className="text-center text-[11px] text-muted-sage font-normal tracking-wide">
                  Бронирование является предварительной заявкой. Хостес подтвердит столик по телефону в течение 15 минут.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
