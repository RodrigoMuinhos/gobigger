import { Header } from '@/app/components/Header';
import { Hero } from '@/app/components/Hero';
import { ImageGallery } from '@/app/components/ImageGallery';
import { Features } from '@/app/components/Features';
import { BookingForm } from '@/app/components/BookingForm';
import { InfoSection } from '@/app/components/InfoSection';
import { Footer } from '@/app/components/Footer';

export function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ImageGallery />
      <Features />
      <BookingForm />
      <InfoSection />
      <Footer />
    </>
  );
}