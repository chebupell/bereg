import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BÉRÉG — Ресторан современной европейской кухни | Гомель",
  description:
    "Вкус простых вещей. В новом прочтении. Ресторан современной европейской кухни в историческом центре Гомеля на набережной реки Сож.",
  keywords: [
    "BÉRÉG",
    "ресторан Гомель",
    "европейская кухня Гомель",
    "гастрономия Гомель",
    "бронирование стола Гомель",
  ],
  openGraph: {
    title: "BÉRÉG — Ресторан современной европейской кухни",
    description: "Вкус простых вещей. В новом прочтении. Гомель, ул. Советская, 14",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  themeColor: "#252823",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${cormorant.variable} ${manrope.variable} scroll-smooth h-full`}
    >
      <body className="min-h-full flex flex-col font-sans bg-ivory text-deep-olive selection:bg-warm-sand selection:text-deep-olive antialiased">
        {children}
      </body>
    </html>
  );
}
