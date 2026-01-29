import { motion } from 'motion/react';
import { Calendar, Users, Mail, User } from 'lucide-react';
import { useState } from 'react';

export function BookingForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    data: '',
    pessoas: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de envio do formulário
    console.log('Dados do formulário:', formData);
    alert('Agendamento enviado! Em breve entraremos em contato.');
  };

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">
              Agende sua visita
            </span>
          </h2>
          <p className="text-lg text-gray-600">Preencha o formulário e garanta sua diversão</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-[#FFB6C1]/20 to-[#FF69B4]/10 backdrop-blur-sm rounded-3xl shadow-2xl p-5 sm:p-8 border border-[#FFB6C1]/30"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="mb-2 text-gray-700 font-semibold flex items-center gap-2">
                <User size={18} className="text-[#FFD700]" />
                Nome Completo
              </label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-[#FFB6C1]/30 focus:border-[#FFD700] focus:outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="mb-2 text-gray-700 font-semibold flex items-center gap-2">
                <Mail size={18} className="text-[#FFD700]" />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-[#FFB6C1]/30 focus:border-[#FFD700] focus:outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="mb-2 text-gray-700 font-semibold flex items-center gap-2">
                <Calendar size={18} className="text-[#FFD700]" />
                Data da Visita
              </label>
              <input
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-[#FFB6C1]/30 focus:border-[#FFD700] focus:outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="mb-2 text-gray-700 font-semibold flex items-center gap-2">
                <Users size={18} className="text-[#FFD700]" />
                Número de Pessoas
              </label>
              <input
                type="number"
                value={formData.pessoas}
                onChange={(e) => setFormData({ ...formData, pessoas: e.target.value })}
                placeholder="Ex: 4"
                className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-[#FFB6C1]/30 focus:border-[#FFD700] focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-8 w-full py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all font-black text-lg"
          >
            Enviar Agendamento
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}