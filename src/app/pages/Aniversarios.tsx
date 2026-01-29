import { motion } from 'motion/react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Phone, Mail, Calendar, Gift, User, Users, PartyPopper } from 'lucide-react';
import { useState } from 'react';

export function Aniversarios() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    telefone: '',
    email: '',
    unidadeDesejada: '',
    numConvidados: '',
    dataEvento: '',
    idadeAniversariante: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá! Gostaria de agendar uma festa!\n\nNome: ${formData.nome} ${formData.sobrenome}\nTelefone: ${formData.telefone}\nEmail: ${formData.email}\nUnidade: ${formData.unidadeDesejada}\nConvidados: ${formData.numConvidados}\nData: ${formData.dataEvento}\nIdade: ${formData.idadeAniversariante}`;
    const whatsappUrl = `https://wa.me/5585981752080?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Header />
      <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-4 px-8 py-4 bg-gradient-to-r from-[#9370DB] to-[#8A2BE2] rounded-3xl shadow-2xl transform rotate-[-2deg]">
              <h1 className="text-4xl md:text-5xl font-black text-white">PACOTE CELEBRE</h1>
            </div>
            <p className="text-xl text-gray-700 mt-6">
              Antes de seguir para o WhatsApp, preencha o formulário abaixo
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-[#9370DB]/20 to-[#8A2BE2]/10 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 border-2 border-[#9370DB] mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-gray-700 font-semibold flex items-center gap-2">
                  <User size={18} className="text-[#9370DB]" />
                  Nome
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-[#9370DB]/30 focus:border-[#9370DB] focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700 font-semibold flex items-center gap-2">
                  <User size={18} className="text-[#9370DB]" />
                  Sobrenome
                </label>
                <input
                  type="text"
                  value={formData.sobrenome}
                  onChange={(e) => setFormData({ ...formData, sobrenome: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-[#9370DB]/30 focus:border-[#9370DB] focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700 font-semibold flex items-center gap-2">
                  <Phone size={18} className="text-[#9370DB]" />
                  Indique seu telefone
                </label>
                <input
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-[#9370DB]/30 focus:border-[#9370DB] focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700 font-semibold flex items-center gap-2">
                  <Mail size={18} className="text-[#9370DB]" />
                  Email para contato
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-[#9370DB]/30 focus:border-[#9370DB] focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700 font-semibold flex items-center gap-2">
                  <Gift size={18} className="text-[#9370DB]" />
                  Unidade desejada
                </label>
                <select
                  value={formData.unidadeDesejada}
                  onChange={(e) => setFormData({ ...formData, unidadeDesejada: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-[#9370DB]/30 focus:border-[#9370DB] focus:outline-none transition-all"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Shopping Iguatemi">Shopping Iguatemi</option>
                  <option value="Shopping Riomar">Shopping Riomar</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-gray-700 font-semibold flex items-center gap-2">
                  <Users size={18} className="text-[#9370DB]" />
                  Número de convidados
                </label>
                <input
                  type="number"
                  value={formData.numConvidados}
                  onChange={(e) => setFormData({ ...formData, numConvidados: e.target.value })}
                  placeholder="Ex: 20"
                  className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-[#9370DB]/30 focus:border-[#9370DB] focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700 font-semibold flex items-center gap-2">
                  <Calendar size={18} className="text-[#9370DB]" />
                  Escolha a data desejada
                </label>
                <input
                  type="date"
                  value={formData.dataEvento}
                  onChange={(e) => setFormData({ ...formData, dataEvento: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-[#9370DB]/30 focus:border-[#9370DB] focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700 font-semibold flex items-center gap-2">
                  <PartyPopper size={18} className="text-[#9370DB]" />
                  Idade do aniversariante
                </label>
                <input
                  type="number"
                  value={formData.idadeAniversariante}
                  onChange={(e) => setFormData({ ...formData, idadeAniversariante: e.target.value })}
                  placeholder="Ex: 10"
                  className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-[#9370DB]/30 focus:border-[#9370DB] focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="mt-8 w-full py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 font-bold text-lg"
            >
              Enviar Solicitação
            </motion.button>
          </motion.form>

          {/* Package Inclusions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full shadow-lg">
                <Gift className="text-gray-800" size={24} />
                <h2 className="text-2xl font-black text-gray-800">INCLUSO NO PACOTE</h2>
                <Gift className="text-gray-800" size={24} />
              </div>
            </div>

            {/* Alimentação */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8E53]/10 rounded-2xl p-6 border-2 border-[#FF6B6B]"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">ALIMENTAÇÃO</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 01 REFRIGERANTE DE 600ML PARA CADA 03 CRIANÇAS</li>
                <li>• 01 SALGADINHO FRITO, 04 BILADINHOS E 4 DOCINHOS POR CRIANÇA</li>
                <li>• BEBIDAS OU OPÇÕES: SUCO OU REFRIGERANTE</li>
                <li>• BOLO INCLUIDO NO PACOTE</li>
                <li>• COPOS, TALHERES E GUARDANAPOS DESCARTÁVEIS</li>
              </ul>
            </motion.div>

            {/* Experiência */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gradient-to-r from-[#4ECDC4]/20 to-[#44A08D]/10 rounded-2xl p-6 border-2 border-[#4ECDC4]"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">EXPERIÊNCIA</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 1 MONITORA AUXILIAR</li>
                <li>• ESPAÇO PREMIUM PARA CONVIDADOS</li>
                <li>• PULSEIRA COM IDENTIFICAÇÃO</li>
                <li>• DURAÇÃO: 2 HORAS</li>
              </ul>
            </motion.div>

            {/* Recreação */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-gradient-to-r from-[#A8E6CF]/20 to-[#56AB2F]/10 rounded-2xl p-6 border-2 border-[#56AB2F]"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">RECREAÇÃO</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• MESA PRINCIPAL PARA BOLO E DOCINHOS</li>
                <li>• 04 MESASINHAS E 16 CADEIRINHAS (20 LUGARES)</li>
                <li>• BAÚ DE PINUS PARA PRESENTES</li>
                <li>• ARCO DE BALÕES BRANCO COM CORINHA E BOLO</li>
                <li>• PAINEL DE PINUS QUADRADO</li>
                <li>• CADEIRAS E MESAS (CONFORT LITE LIMITE)</li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <h2 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-[#FFB6C1] to-[#FF69B4] bg-clip-text text-transparent">
                GoBigger!
              </span>
              <span className="text-[#FF69B4]"> park</span>
            </h2>
            <p className="text-gray-600 mt-2">(85) 98175-2080</p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}