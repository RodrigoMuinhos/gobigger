import { motion } from 'motion/react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/components/ui/accordion';
import { Search } from 'lucide-react';
import { useState } from 'react';

export function DuvidasFrequentes() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      id: '01',
      question: 'Qual o horário de funcionamento dos parques?',
      answer:
        'Nossos parques funcionam de segunda a domingo, das 10h às 22h. Em feriados, o horário pode ser estendido. Recomendamos verificar nosso site ou redes sociais para atualizações específicas de horários.',
    },
    {
      id: '02',
      question: 'Onde fica o Go Bigger Park do Shopping Iguatemi?',
      answer:
        'O Go Bigger Park está localizado no Shopping Iguatemi Fortaleza, no piso L2, próximo à praça de alimentação. Endereço: Rua Desembargador Lauro Nogueira, 1500, Fortaleza - CE.',
    },
    {
      id: '03',
      question: 'O acompanhante no Go Bigger Park paga?',
      answer:
        'Não, os acompanhantes não pagam ingresso. Apenas as crianças que irão utilizar as atrações precisam adquirir o passaporte. Os pais ou responsáveis podem acompanhar gratuitamente.',
    },
    {
      id: '04',
      question: 'Existe restrição de idade, peso ou altura para entrar no Go Bigger Park do Shopping Iguatemi?',
      answer:
        'Sim, nossas atrações têm restrições por questões de segurança. Crianças menores de 3 anos não podem utilizar as atrações. Para atrações específicas, há limites de peso (até 70kg) e altura mínima de 1,00m. Menores de 12 anos devem estar acompanhados de um responsável.',
    },
    {
      id: '05',
      question: 'O parque possui armários para os visitantes?',
      answer:
        'Sim, disponibilizamos armários gratuitos para guardar seus pertences durante a visita. Recomendamos que traga apenas o essencial e utilize os armários para maior segurança e conforto.',
    },
    {
      id: '06',
      question: 'Qual a diferença entre o Parque do Shopping Iguatemi e o do Shopping Riomar?',
      answer:
        'Ambas as unidades oferecem experiências incríveis! O parque do Shopping Iguatemi é maior e conta com mais atrações, enquanto o do Shopping Riomar tem um formato mais compacto mas igualmente divertido. Ambos mantêm o mesmo padrão de qualidade e segurança.',
    },
    {
      id: '07',
      question: 'Tenho que obrigatoriamente acompanhar meu filho?',
      answer:
        'Crianças menores de 12 anos devem estar acompanhadas de um adulto responsável no parque. Para crianças maiores, é necessário que haja um responsável nas dependências do shopping, disponível para contato imediato.',
    },
    {
      id: '08',
      question: 'O que é importante levar para o Go Bigger Park?',
      answer:
        'Recomendamos trazer: meias antiderrapantes (obrigatório), roupas confortáveis, garrafa de água, e o voucher de compra (caso tenha comprado online). Não é permitido entrar com alimentos ou bebidas de fora.',
    },
    {
      id: '09',
      question: 'O parque aceita animais de estimação?',
      answer:
        'Não, por questões de segurança e higiene, não é permitida a entrada de animais de estimação, com exceção de cães-guia devidamente identificados acompanhando pessoas com deficiência visual.',
    },
    {
      id: '10',
      question: 'Como faço para realizar a minha festa no Go Bigger?',
      answer:
        'Oferecemos pacotes especiais para festas de aniversário! Entre em contato conosco pelo WhatsApp (85) 98175-2080 ou preencha o formulário na página de Aniversários. Nossa equipe entrará em contato para apresentar os pacotes disponíveis e auxiliar no planejamento.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Dúvidas Frequentes</h1>
            <p className="text-lg text-gray-600">Encontre respostas para as perguntas mais comuns</p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Qual a sua dúvida?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-[#FFB6C1]/30 focus:border-[#FF69B4] focus:outline-none transition-all shadow-lg"
              />
            </div>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 border border-[#FFB6C1]/20"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                >
                  <AccordionItem value={faq.id} className="border-b border-gray-200">
                    <AccordionTrigger className="hover:no-underline py-6 group">
                      <div className="flex items-start gap-4 text-left w-full">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFE4B5] to-[#FFB6C1] flex items-center justify-center font-bold text-gray-800 group-hover:scale-110 transition-transform">
                          {faq.id}
                        </div>
                        <span className="font-semibold text-gray-800 group-hover:text-[#FF69B4] transition-colors">
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-6 pl-16 pr-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Nenhuma pergunta encontrada. Tente outro termo de busca.</p>
              </div>
            )}
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center bg-gradient-to-r from-[#87CEEB]/20 to-[#4682B4]/10 rounded-2xl p-8 border border-[#87CEEB]/30"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ainda tem dúvidas?</h3>
            <p className="text-gray-600 mb-6">Entre em contato conosco</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+5585981752080"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-gray-900 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <span>Telefone: (85) 98175-2080</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:gobigger@gobiggerbrasil.com.br"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#87CEEB] to-[#4682B4] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <span>gobigger@gobiggerbrasil.com.br</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}