"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { MenuSection } from "@/components/sections/MenuSection";
import { AtmosphereSection } from "@/components/sections/AtmosphereSection";
import { ReservationSection } from "@/components/sections/ReservationSection";
import { ContactsSection } from "@/components/sections/ContactsSection";
import { ReservationModal } from "@/components/booking/ReservationModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header onOpenBooking={handleOpenBooking} />

      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <MenuSection onOpenBooking={handleOpenBooking} />
        <AtmosphereSection />
        <ReservationSection onOpenModal={handleOpenBooking} />
        <ContactsSection />
      </main>

      <Footer />

      <ReservationModal isOpen={isModalOpen} onClose={handleCloseBooking} />
    </>
  );
}
