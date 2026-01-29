import { motion } from 'motion/react';
import { User, Menu } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { AuthModal } from '@/app/components/AuthModal';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-[#FFE4B5]/30 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
              <Link to="/">
                <h1 className="text-2xl md:text-3xl font-black">
                  <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent drop-shadow-lg">
                    GoBigger!
                  </span>
                  <span className="text-[#FF69B4] ml-1">park</span>
                </h1>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-[#FFD700] transition-colors font-medium">
                Home
              </Link>
              <Link to="/compre-online" className="text-gray-700 hover:text-[#FFD700] transition-colors font-medium">
                Compre Online
              </Link>
              <Link to="/aniversarios" className="text-gray-700 hover:text-[#FFD700] transition-colors font-medium">
                Aniversários
              </Link>
              <Link to="/duvidas-frequentes" className="text-gray-700 hover:text-[#FFD700] transition-colors font-medium">
                Dúvidas Frequentes
              </Link>
            </nav>

            {/* User Icon */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAuthModalOpen(true)}
                className="flex w-10 h-10 rounded-full bg-gradient-to-r from-[#FFB6C1] to-[#FF69B4] items-center justify-center text-white shadow-md"
              >
                <User size={20} />
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu size={24} className="text-gray-700" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4 space-y-2"
            >
              <Link
                to="/"
                className="block py-2 text-gray-700 hover:text-[#FF69B4] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/compre-online"
                className="block py-2 text-gray-700 hover:text-[#FF69B4] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Compre Online
              </Link>
              <Link
                to="/aniversarios"
                className="block py-2 text-gray-700 hover:text-[#FF69B4] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Aniversários
              </Link>
              <Link
                to="/duvidas-frequentes"
                className="block py-2 text-gray-700 hover:text-[#FF69B4] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dúvidas Frequentes
              </Link>
            </motion.nav>
          )}
        </div>
      </motion.header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}