import { motion } from 'motion/react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { MapPin, Clock, Check } from 'lucide-react';
import { useState } from 'react';

export function ComprarOnline() {
  const [selectedUnit, setSelectedUnit] = useState<'park' | 'tube'>('park');
  const [selectedLocation, setSelectedLocation] = useState<'iguatemi' | 'riomar'>('iguatemi');

  const passaportes = [
    {
      nome: 'Passaporte 30 minutos',
      tempo: '30 minutos',
      valor: 'R$ 50',
      inclusos: ['Acesso a todas as atrações', 'Monitor dedicado'],
    },
    {
      nome: 'Combo 01 hora*',
      tempo: '60 minutos',
      valor: 'R$ 65',
      inclusos: ['Acesso a todas as atrações', 'Monitor dedicado', '1 bebida'],
    },
    {
      nome: 'Passaporte 01 hora',
      tempo: '60 minutos',
      valor: 'R$ 65',
      inclusos: ['Acesso a todas as atrações', 'Monitor dedicado'],
    },
    {
      nome: 'Passaporte Tempo Livre',
      tempo: 'Tempo livre***',
      valor: 'R$ 90',
      inclusos: ['Acesso ilimitado', 'Monitor dedicado', 'Área VIP'],
    },
  ];

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
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">
                Escolha a unidade
              </span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-black text-[#FF69B4]">GoBigger! park</h2>
          </motion.div>

          {/* Unit Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedUnit('park');
                  setSelectedLocation('iguatemi');
                }}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  selectedUnit === 'park'
                    ? 'bg-gradient-to-br from-[#FFB6C1]/30 to-[#FF69B4]/20 border-[#FF69B4]'
                    : 'bg-white/50 border-gray-200 hover:border-[#FFB6C1]'
                }`}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">GoBigger! Park</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#FF69B4]" />
                    <span>Shopping Iguatemi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#FF69B4]" />
                    <span>Shopping Riomar</span>
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedUnit('tube');
                  setSelectedLocation('iguatemi');
                }}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  selectedUnit === 'tube'
                    ? 'bg-gradient-to-br from-[#87CEEB]/30 to-[#4682B4]/20 border-[#4682B4]'
                    : 'bg-white/50 border-gray-200 hover:border-[#87CEEB]'
                }`}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">GoBigger! TUBE</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#4682B4]" />
                    <span>Shopping Iguatemi</span>
                  </div>
                </div>
              </motion.button>
            </div>

            {/* Location Selection for Park */}
            {selectedUnit === 'park' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedLocation('iguatemi')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    selectedLocation === 'iguatemi'
                      ? 'bg-gradient-to-r from-[#FFB6C1] to-[#FF69B4] text-white shadow-lg'
                      : 'bg-white/70 text-gray-700 hover:bg-white'
                  }`}
                >
                  Shopping Iguatemi
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedLocation('riomar')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    selectedLocation === 'riomar'
                      ? 'bg-gradient-to-r from-[#FFB6C1] to-[#FF69B4] text-white shadow-lg'
                      : 'bg-white/70 text-gray-700 hover:bg-white'
                  }`}
                >
                  Shopping Riomar
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Passaportes Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-[#FFB6C1]/20"
          >
            <div className="bg-gradient-to-r from-[#FFE4B5] to-[#FFB6C1] p-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">PASSAPORTES</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#FFB6C1]/20 to-[#FF69B4]/10">
                    <th className="px-6 py-4 text-left font-semibold text-gray-800">Tipo</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-800">Tempo</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-800">Valor</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-800">Validade</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-800">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {passaportes.map((passaporte, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-[#FFF9E6] hover:to-[#FFF0F5] transition-all"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-800">{passaporte.nome}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {passaporte.inclusos.map((item, i) => (
                              <span key={i} className="flex items-center gap-1 text-xs text-gray-600">
                                <Check size={12} className="text-green-500" />
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Clock size={16} className="text-[#FF69B4]" />
                          <span className="font-medium text-gray-700">{passaporte.tempo}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-xl font-bold text-[#FF69B4]">{passaporte.valor}</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">Vendas até 48h</td>
                      <td className="px-6 py-4 text-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-2 bg-gradient-to-r from-[#90EE90] to-[#32CD32] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                        >
                          Comprar
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-gradient-to-r from-[#F0F8FF] to-[#FFF9E6] text-sm text-gray-600 space-y-2">
              <p>* Crianças até 5 anos não pagam. Menores de 5 anos só poderão brincar acompanhados de um adulto responsável.</p>
              <p>
                ** <strong>Combo 01 hora</strong>: Permite combo somente com bebidas ou opção de suco do
                refrigerante.
              </p>
              <p>
                *** <strong>Passaporte Tempo Livre</strong>: Crianças até 5 anos ou PcD devem vir acompanhadas de um
                acompanhante adulto responsável que não irá utilizar os brinquedos e que a rede pode solicitar.
              </p>
              <p className="font-semibold mt-4">
                Observações: a compra dos passaportes online pode ser feita até 30 minutos antes do
                horário desejado.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}