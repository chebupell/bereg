"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { restaurantData } from "@/data/restaurant";

interface HeaderProps {
  onOpenBooking?: () => void;
}

export function Header({ onOpenBooking }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "О ресторане", href: "#about" },
    { label: "Меню", href: "#menu" },
    { label: "Атмосфера", href: "#atmosphere" },
    { label: "Контакты", href: "#contacts" },
  ];

  const handleBookingClick = (e: React.MouseEvent) => {
    if (onOpenBooking) {
      e.preventDefault();
      onOpenBooking();
      setMobileMenuOpen(false);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-nav border-b thin-border">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 h-20 sm:h-24 flex items-center justify-between">
        {/* Brand Wordmark */}
        <Link
          href="#"
          className="group flex flex-col tracking-tight focus:outline-none"
          aria-label={`${restaurantData.name} главная`}
        >
          <span className="serif-display text-2xl sm:text-3xl font-medium tracking-[0.2em] text-deep-olive uppercase group-hover:opacity-80 transition-opacity">
            {restaurantData.name}
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-muted-sage font-medium -mt-1 hidden sm:block">
            {restaurantData.city} • Est. {restaurantData.establishedYear}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center space-x-10 text-[13px] uppercase tracking-[0.18em] font-medium text-deep-olive/80"
          aria-label="Основная навигация"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-deep-olive transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-deep-olive hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Trigger */}
        <div className="flex items-center space-x-4">
          <a
            href="#reservation"
            onClick={handleBookingClick}
            className="hidden sm:inline-flex items-center px-6 py-3 border border-deep-olive text-[12px] uppercase tracking-[0.18em] font-medium text-deep-olive hover:bg-deep-olive hover:text-ivory transition-all duration-300 rounded-[2px]"
          >
            Забронировать стол
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 text-deep-olive hover:opacity-75 transition-opacity focus:outline-none"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ivory border-b thin-border px-6 py-8 space-y-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-4 text-[14px] uppercase tracking-[0.2em] font-medium text-deep-olive">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="py-1 hover:text-muted-sage transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-4 border-t thin-border">
            <a
              href="#reservation"
              onClick={handleBookingClick}
              className="block text-center w-full py-3.5 bg-deep-olive text-ivory text-[12px] uppercase tracking-[0.2em] font-medium rounded-[2px] hover:bg-olive-muted transition-colors"
            >
              Забронировать стол
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
