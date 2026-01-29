import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import img1 from '@/assets/4c7bbdb7001d821c2c27bde9bb53a16ce642e0ee.png';
import img2 from '@/assets/74d8de03cd89ce0d4eeb83befd9e58a514ad25e8.png';
import img3 from '@/assets/77d23dcdf4cc1227c1a6ab9b0fcee041d634fbf3.png';

export function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: img1,
      title: 'NÃO FIQUE DE FORA DA DIVERSÃO!',
      subtitle: 'Ambiente colorido e cheio de alegria',
    },
    {
      src: img2,
      title: 'Checklist GO BIGGER',
      subtitle: 'Roupas confortáveis • Meias • Muita vontade de se divertir!',
    },
    {
      src: img3,
      title: 'Descubra todos os ambientes',
      subtitle: 'Viva a experiência GO Bigger!',
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">
              Viva a experiência
            </span>
          </h2>
          <p className="text-xl text-gray-600">Momentos inesquecíveis te esperam!</p>
        </motion.div>

        {/* Gallery */}
        <div className="relative">
          {/* Main Image */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[4/3] md:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img src={images[currentIndex].src} alt={images[currentIndex].title} className="w-full h-full object-cover" />
            
            {/* Overlay with text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
              <div className="p-6 md:p-10 w-full">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-4xl font-black text-white mb-2"
                >
                  {images[currentIndex].title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-base md:text-xl text-white/90"
                >
                  {images[currentIndex].subtitle}
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110"
          >
            <ChevronLeft size={24} className="text-gray-800" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110"
          >
            <ChevronRight size={24} className="text-gray-800" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {images.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-video rounded-xl overflow-hidden transition-all ${
                index === currentIndex ? 'ring-4 ring-[#FFD700] shadow-xl' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img src={image.src} alt={image.title} className="w-full h-full object-cover" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
