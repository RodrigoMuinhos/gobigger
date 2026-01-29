import { motion } from 'motion/react';
import { Ticket, Sparkles, Zap, PartyPopper } from 'lucide-react';
import { Link } from 'react-router';

export function Hero() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-12 md:py-24 px-4 sm:px-6 lg:px-8 [@media(max-height:500px)]:py-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-[#FF69B4]/20 to-[#FFB6C1]/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          {/* Animated Icons */}
          <div className="flex justify-center gap-8 mb-6">
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles size={40} className="text-[#FFD700]" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <PartyPopper size={40} className="text-[#FF69B4]" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            >
              <Zap size={40} className="text-[#FFD700]" />
            </motion.div>
          </div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <motion.h1
              animate={{
                textShadow: [
                  '0 0 20px rgba(255, 215, 0, 0.5)',
                  '0 0 40px rgba(255, 215, 0, 0.8)',
                  '0 0 20px rgba(255, 215, 0, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl [@media(max-height:500px)]:text-4xl font-black mb-4"
            >
              <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">
                GoBigger!
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl [@media(max-height:500px)]:text-2xl font-black text-[#FF69B4] drop-shadow-lg"
            >
              park
            </motion.p>
          </motion.div>

          {/* Subtitle with animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8"
          >
            <p className="text-xl sm:text-2xl md:text-3xl [@media(max-height:500px)]:text-lg font-bold text-gray-800 mb-2">
              🎉 Diversão sem limites para toda a família! 🎉
            </p>
            <p className="text-base sm:text-lg md:text-xl [@media(max-height:500px)]:text-sm text-gray-600">
              Brinquedos, piscina de bolinhas, jogos e muito mais!
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 md:mb-12 [@media(max-height:500px)]:mb-6"
          >
            <Link to="/compre-online">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: [
                    '0 10px 30px rgba(255, 215, 0, 0.3)',
                    '0 15px 40px rgba(255, 215, 0, 0.5)',
                    '0 10px 30px rgba(255, 215, 0, 0.3)',
                  ],
                }}
                transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                className="inline-flex items-center gap-3 px-7 sm:px-8 md:px-12 py-3.5 sm:py-4 md:py-5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-gray-900 rounded-full shadow-2xl font-black text-base sm:text-lg md:text-xl"
              >
                <Ticket size={28} />
                <span>COMPRAR PASSAPORTE</span>
                <Sparkles size={24} />
              </motion.button>
            </Link>

            <Link to="/aniversarios">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-7 sm:px-8 md:px-12 py-3.5 sm:py-4 md:py-5 bg-gradient-to-r from-[#FF69B4] to-[#FFB6C1] text-white rounded-full shadow-2xl font-black text-base sm:text-lg md:text-xl"
              >
                <PartyPopper size={28} />
                <span>FAÇA SUA FESTA</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Features Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto"
          >
            {[
              '✓ Roupas confortáveis',
              '✓ Meias obrigatórias',
              '✓ Muita diversão',
              '✓ Monitores treinados',
              '✓ Ambiente seguro',
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 bg-gradient-to-r from-[#90EE90] to-[#32CD32] text-white rounded-full text-sm font-bold shadow-md"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ opacity: { delay: 1.2 }, y: { duration: 1.5, repeat: Infinity } }}
            className="mt-12 [@media(max-height:500px)]:hidden"
          >
            <p className="text-sm text-gray-500 mb-2">Role para descobrir mais</p>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-3 bg-gradient-to-b from-[#FFD700] to-[#FFA500] rounded-full mt-2"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
