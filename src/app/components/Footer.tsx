import { motion } from 'motion/react';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">
                GoBigger!
              </span>
              <span className="text-[#FF69B4]"> park</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Diversão sem limites para toda a família. Venha viver momentos inesquecíveis!
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://facebook.com/gobiggerbrasil"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
              >
                <Facebook size={20} className="text-gray-900" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/gobiggerbrasil/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-r from-[#FF69B4] to-[#FFB6C1] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
              >
                <Instagram size={20} className="text-white" />
              </motion.a>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-4 text-[#FFD700]">Contato</h4>
            <div className="space-y-3">
              <a
                href="tel:+5585981752080"
                className="flex items-center gap-3 text-gray-400 hover:text-[#FFD700] transition-colors"
              >
                <Phone size={18} />
                <span>(85) 98175-2080</span>
              </a>
              <a
                href="mailto:gobigger@gobiggerbrasil.com.br"
                className="flex items-center gap-3 text-gray-400 hover:text-[#FFD700] transition-colors break-all"
              >
                <Mail size={18} />
                <span>gobigger@gobiggerbrasil.com.br</span>
              </a>
            </div>
          </motion.div>

          {/* Locations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-4 text-[#FFD700]">Nossas Unidades</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin size={18} className="flex-shrink-0 mt-1" />
                <span>Shopping Iguatemi Fortaleza - Piso L2</span>
              </div>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin size={18} className="flex-shrink-0 mt-1" />
                <span>Shopping Riomar Fortaleza</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 pt-8 text-center"
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} GoBigger! park. Todos os direitos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}