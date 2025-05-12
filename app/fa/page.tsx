// app/fa/page.tsx (همچنین برای en و ar)
import Contacts from "@/components/body/Contacts";
import DiagonalSection from "@/components/body/DiagonalSection";
import EventsSection from "@/components/body/EventsSection";
import ImageSlider from "@/components/body/ImageSlider";
import React from "react";

export default function HomePage() {
  return (
    <div>
      <ImageSlider />
      <DiagonalSection />
      <EventsSection />
      <Contacts />
    </div>
  );
}
