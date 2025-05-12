import Contacts from '@/components/body/Contacts';
import DiagonalSection from '@/components/body/DiagonalSection';
import EventsSection from '@/components/body/EventsSection';
import ImageSlider from '@/components/body/ImageSlider';
import ProductsSection from '@/components/body/ProductsSection';
import React from 'react';


export default function HomePage() {
  

  return (
    <div>
   <ImageSlider />
   <ProductsSection />
   <DiagonalSection />
   <EventsSection />
   <Contacts />
   </div>
  );
}