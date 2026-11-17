import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/booking-schema";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = bookingSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
          message: "Некорректные данные бронирования",
        },
        { status: 400 }
      );
    }

    const booking = result.data;
    const bookingId = `BRG-${Date.now().toString().slice(-6)}`;

    // Format notification text
    const message = [
      `🔔 *Новая заявка на бронирование — BÉRÉG*`,
      `*Номер заявки:* \`${bookingId}\``,
      ``,
      `👤 *Гость:* ${booking.name}`,
      `📞 *Телефон:* ${booking.phone}`,
      booking.email ? `✉️ *Email:* ${booking.email}` : null,
      `📅 *Дата:* ${booking.date}`,
      `⏰ *Время:* ${booking.time}`,
      `👥 *Количество гостей:* ${booking.guests} персон(ы)`,
      `🪑 *Зона посадки:* ${booking.zone}`,
      booking.occasion ? `🎉 *Повод:* ${booking.occasion}` : null,
      booking.comment ? `💬 *Пожелания:* ${booking.comment}` : null,
      ``,
      `⚠️ *Внимание:* Заявка требует ручного подтверждения хостес по телефону.`,
    ]
      .filter(Boolean)
      .join("\n");

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      try {
        const tgRes = await fetch(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
              parse_mode: "Markdown",
            }),
          }
        );

        if (!tgRes.ok) {
          const errData = await tgRes.text();
          console.error("[Telegram API Error]", errData);
        }
      } catch (tgError) {
        console.error("[Telegram Network Error]", tgError);
      }
    } else {
      // In development or when tokens are not set, log to console for debugging
      console.log("[New Booking Received (Telegram Env Not Configured)]", {
        bookingId,
        ...booking,
      });
    }

    return NextResponse.json({
      success: true,
      bookingId,
      status: "pending_confirmation",
      data: {
        name: booking.name,
        date: booking.date,
        time: booking.time,
        guests: booking.guests,
        zone: booking.zone,
      },
      message:
        "Заявка успешно принята. Администратор свяжется с вами для подтверждения.",
    });
  } catch (error) {
    console.error("[Booking API Route Error]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Произошла ошибка при обработке заявки на бронирование",
      },
      { status: 500 }
    );
  }
}
