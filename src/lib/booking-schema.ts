import { z } from "zod";

export const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Имя должно содержать не менее 2 символов")
    .max(50, "Имя не должно превышать 50 символов"),
  phone: z
    .string()
    .trim()
    .min(7, "Пожалуйста, введите корректный номер телефона")
    .max(25, "Номер телефона слишком длинный"),
  email: z
    .string()
    .trim()
    .email("Некорректный адрес электронной почты")
    .optional()
    .or(z.literal("")),
  date: z.string().min(1, "Пожалуйста, выберите дату"),
  time: z.string().min(1, "Пожалуйста, выберите время"),
  guests: z
    .union([z.number(), z.string()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
    .pipe(
      z
        .number()
        .min(1, "Минимум 1 гость")
        .max(20, "Для бронирования более 20 гостей свяжитесь с нами напрямую")
    ),
  zone: z.string().default("У окон"),
  occasion: z.string().optional().default(""),
  comment: z.string().max(500, "Комментарий не должен превышать 500 символов").optional().default(""),
});

export type BookingInput = z.infer<typeof bookingSchema>;
