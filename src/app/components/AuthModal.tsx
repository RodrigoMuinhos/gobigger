import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useState } from 'react';
import imgUser from '@/assets/61affbeca047c281fcf1b274ef05384ac021106b.png';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden pointer-events-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
              >
                <X size={24} className="text-gray-500" />
              </button>

              {/* Content */}
              <div className="p-8 pt-12">
                {/* User Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="flex justify-center mb-6"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFB6C1] to-[#FF69B4] flex items-center justify-center shadow-lg">
                    <img src={imgUser} alt="User" className="w-12 h-12" />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-center text-gray-800 mb-2"
                >
                  {isLogin ? 'Login' : 'Registre-se'}
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-gray-600 mb-8"
                >
                  {isLogin ? (
                    <>
                      Não tem conta?{' '}
                      <button
                        onClick={() => setIsLogin(false)}
                        className="text-[#FF69B4] font-semibold hover:underline"
                      >
                        Registre-se
                      </button>
                    </>
                  ) : (
                    <>
                      Já é membro?{' '}
                      <button
                        onClick={() => setIsLogin(true)}
                        className="text-[#FF69B4] font-semibold hover:underline"
                      >
                        Login
                      </button>
                    </>
                  )}
                </motion.p>

                {/* Social Login Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  {/* Google */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 bg-white border-2 border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-3 shadow-sm"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M19.8055 10.2292C19.8055 9.55167 19.7494 8.86834 19.6302 8.19751H10.2002V12.0492H15.6014C15.3766 13.2908 14.6569 14.3901 13.6153 15.0875V17.5867H16.8251C18.7176 15.8449 19.8055 13.2725 19.8055 10.2292Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M10.2 20C12.9562 20 15.2726 19.1042 16.8289 17.5867L13.6191 15.0875C12.7361 15.6975 11.5801 16.0425 10.2038 16.0425C7.54164 16.0425 5.28827 14.2833 4.52241 11.9167H1.2168V14.4925C2.81528 17.6817 6.34555 20 10.2 20Z"
                        fill="#34A853"
                      />
                      <path
                        d="M4.51881 11.9167C4.0777 10.6751 4.0777 9.32994 4.51881 8.08828V5.51245H1.21689C-0.173548 8.28411 -0.173548 11.7209 1.21689 14.4925L4.51881 11.9167Z"
                        fill="#FBBC04"
                      />
                      <path
                        d="M10.2 3.95833C11.6583 3.93583 13.0661 4.47417 14.1153 5.45917L16.9608 2.60417C15.1857 0.990833 12.7391 0.0808332 10.2 0.1025C6.34555 0.1025 2.81528 2.42083 1.2168 5.61249L4.51873 8.18833C5.2808 5.81583 7.53789 3.95833 10.2 3.95833Z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span>{isLogin ? 'Login' : 'Registrar-se'} com Google</span>
                  </motion.button>

                  {/* Facebook */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 bg-[#1877F2] rounded-xl font-medium text-white hover:bg-[#1565C0] transition-all flex items-center justify-center gap-3 shadow-sm"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 14.9912 3.65684 19.1283 8.4375 19.8785V12.8906H5.89844V10H8.4375V7.79688C8.4375 5.29063 9.93047 3.90625 12.2146 3.90625C13.3084 3.90625 14.4531 4.10156 14.4531 4.10156V6.5625H13.1922C11.95 6.5625 11.5625 7.3334 11.5625 8.125V10H14.3359L13.8926 12.8906H11.5625V19.8785C16.3432 19.1283 20 14.9912 20 10Z"
                        fill="white"
                      />
                    </svg>
                    <span>{isLogin ? 'Login' : 'Registrar-se'} com Facebook</span>
                  </motion.button>
                </motion.div>

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-4 my-6"
                >
                  <div className="flex-1 h-px bg-gray-300" />
                  <span className="text-sm text-gray-500">ou</span>
                  <div className="flex-1 h-px bg-gray-300" />
                </motion.div>

                {/* Email Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 bg-white border-2 border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                >
                  {isLogin ? 'Login' : 'Registrar-se'} com email
                </motion.button>

                {/* Privacy Notice */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-xs text-gray-500 text-center mt-6 leading-relaxed"
                >
                  Seu perfil será automaticamente definido como público ao se registrar. Você pode alterar
                  isso depois nas configurações do seu perfil.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
