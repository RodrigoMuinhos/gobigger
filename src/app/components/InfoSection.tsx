import { motion } from 'motion/react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

export function InfoSection() {
  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F0F8FF] to-[#FFF9E6]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">
              Visite-nos
            </span>
          </h2>
          <p className="text-lg text-gray-600">Encontre a unidade mais próxima de você</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Iguatemi */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-[#FFB6C1]/20"
          >
            <h3 className="text-2xl font-bold text-[#FF69B4] mb-6">Shopping Iguatemi</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={24} className="text-[#FFD700] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Localização</p>
                  <p className="text-gray-600">Rua Desembargador Lauro Nogueira, 1500 - Piso L2</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={24} className="text-[#FFD700] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Horário</p>
                  <p className="text-gray-600">Seg - Dom: 10h às 22h</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Riomar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-[#FFB6C1]/20"
          >
            <h3 className="text-2xl font-bold text-[#FF69B4] mb-6">Shopping Riomar</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={24} className="text-[#FFD700] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Localização</p>
                  <p className="text-gray-600">Shopping Riomar Fortaleza</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={24} className="text-[#FFD700] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Horário</p>
                  <p className="text-gray-600">Seg - Dom: 10h às 22h</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-[#FFB6C1]/20"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Entre em Contato</h3>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="tel:+5585981752080"
              className="flex items-center gap-3 text-gray-700 hover:text-[#FFD700] transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center">
                <Phone size={20} className="text-gray-900" />
              </div>
              <span className="font-semibold">(85) 98175-2080</span>
            </a>
            <a
              href="mailto:gobigger@gobiggerbrasil.com.br"
              className="flex items-center gap-3 text-gray-700 hover:text-[#FFD700] transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-[#87CEEB] to-[#4682B4] rounded-full flex items-center justify-center">
                <Mail size={20} className="text-white" />
              </div>
              <span className="font-semibold">gobigger@gobiggerbrasil.com.br</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}