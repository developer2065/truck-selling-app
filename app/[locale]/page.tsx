import { getProducts } from '@/lib/getProducts'
import ProductsSection from '@/components/body/ProductsSection'

import DiagonalSection from '@/components/body/DiagonalSection'
import EventsSection from '@/components/body/EventsSection'
import Contacts from '@/components/body/Contacts'
import ImageSlider from '@/components/body/ImageSlider'


export default function HomePage({ params }: { params: { locale: string } }) {
  const products = getProducts(params.locale)

  return (
    <main>
    <ImageSlider/>
      <ProductsSection products={products} />
      <DiagonalSection />
      <EventsSection />
      <Contacts />
    </main>
  )
}

