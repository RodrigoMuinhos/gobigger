import { motion } from 'motion/react';
import { Shield, Users, Clock, Sparkles, Heart, Trophy } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Shield,
      title: 'Ambiente Seguro',
      description: 'Monitores treinados e equipamentos certificados para total tranquilidade',
      color: 'from-[#90EE90] to-[#32CD32]',
      bgColor: 'from-[#90EE90]/20 to-[#32CD32]/10',
    },
    {
      icon: Users,
      title: 'Para Toda Família',
      description: 'Diversão garantida para crianças de todas as idades em um espaço amplo',
      color: 'from-[#FFD700] to-[#FFA500]',
      bgColor: 'from-[#FFD700]/20 to-[#FFA500]/10',
    },
    {
      icon: Clock,
      title: 'Horário Flexível',
      description: 'Funcionamento de segunda a domingo com horários estendidos',
      color: 'from-[#87CEEB] to-[#4682B4]',
      bgColor: 'from-[#87CEEB]/20 to-[#4682B4]/10',
    },
    {
      icon: Sparkles,
      title: 'Atrações Incríveis',
      description: 'Piscina de bolinhas, tobogãs, jogos e muitas outras atrações',
      color: 'from-[#FF69B4] to-[#FFB6C1]',
      bgColor: 'from-[#FF69B4]/20 to-[#FFB6C1]/10',
    },
    {
      icon: Heart,
      title: 'Festas Especiais',
      description: 'Pacotes completos para celebrar aniversários inesquecíveis',
      color: 'from-[#9370DB] to-[#8A2BE2]',
      bgColor: 'from-[#9370DB]/20 to-[#8A2BE2]/10',
    },
    {
      icon: Trophy,
      title: 'Experiência Premium',
      description: 'Instalações modernas em shoppings de primeira linha',
      color: 'from-[#FFD700] to-[#FFA500]',
      bgColor: 'from-[#FFD700]/20 to-[#FFA500]/10',
    },
  ];

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#FFD700] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#FF69B4] to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">
              Por que escolher
            </span>
            <br />
            <span className="text-[#FF69B4]">o GoBigger! park?</span>
          </motion.h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Oferecemos a melhor experiência de diversão e entretenimento para toda a família
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div
                className={`h-full p-6 rounded-3xl bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm border-2 border-white/50 shadow-lg hover:shadow-2xl transition-all`}
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}
                >
                  <feature.icon size={32} className="text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#FFD700] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                {/* Hover Effect */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`h-1 bg-gradient-to-r ${feature.color} rounded-full mt-4 origin-left`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-2xl border-2 border-[#FFD700]/50">
            <p className="text-lg font-bold text-gray-800">
              🎯 Mais de <span className="text-[#FFD700] text-2xl">10.000+</span> crianças felizes!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
