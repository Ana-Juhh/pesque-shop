import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Como comprar na Pesque Shop?",
      answer: "Para comprar, basta navegar pelo nosso site, escolher os produtos desejados e clicar em 'COMPRAR AGORA'. O item será adicionado ao seu carrinho. Após escolher tudo, clique no ícone do carrinho, confira os itens e clique em 'Finalizar Compra'. Siga os passos para cadastro, escolha do frete e forma de pagamento."
    },
    {
      question: "Quais as formas de pagamento aceitas?",
      answer: "Aceitamos pagamentos via PIX (com desconto), Boleto Bancário e Cartões de Crédito (Visa, Mastercard, Elo, American Express) em até 10x sem juros."
    },
    {
      question: "Qual o valor do frete e prazo de entrega?",
      answer: "O valor do frete e o prazo de entrega são calculados automaticamente no carrinho de compras, variando de acordo com o peso dos produtos e o CEP de destino. Trabalhamos com as melhores transportadoras para garantir rapidez e segurança."
    },
    {
      question: "Como acompanhar o status do meu pedido?",
      answer: "Você pode acompanhar seu pedido clicando em 'Status do Pedido' no rodapé do site ou através do link enviado para o seu e-mail após a postagem da mercadoria."
    },
    {
      question: "Os produtos possuem garantia?",
      answer: "Sim, todos os produtos comercializados pela Pesque Shop possuem garantia contra defeitos de fabricação, conforme estabelecido pelo Código de Defesa do Consumidor e pelos fabricantes."
    },
    {
      question: "É seguro comprar na Pesque Shop?",
      answer: "Totalmente seguro. Nosso site utiliza certificados de segurança SSL que criptografam todas as informações transmitidas, garantindo que seus dados pessoais e de pagamento estejam sempre protegidos."
    }
  ];

  return (
    <div className="py-16 bg-paper min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-6 text-primary">
            <HelpCircle size={32} />
          </div>
          <h2 className="text-4xl font-black text-primary uppercase tracking-tighter italic">DÚVIDAS FREQUENTES</h2>
          <p className="text-ink mt-4 font-bold uppercase text-xs tracking-widest opacity-60">Tudo o que você precisa saber para sua próxima pescaria.</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-[2rem] shadow-xl border transition-all duration-500 overflow-hidden ${
                openIndex === index ? "border-primary ring-4 ring-primary/5" : "border-primary/5"
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-8 text-left group"
              >
                <span className={`font-black uppercase tracking-tight text-lg transition-colors ${
                  openIndex === index ? "text-primary" : "text-ink"
                }`}>
                  {faq.question}
                </span>
                <div className={`p-2 rounded-xl transition-all ${
                  openIndex === index ? "bg-primary text-white rotate-180" : "bg-primary/5 text-primary"
                }`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-8 pt-0 text-ink font-bold uppercase text-xs tracking-widest leading-relaxed opacity-60 border-t border-primary/5 bg-primary/5">
                      <div className="py-6">
                        {faq.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center bg-white p-12 rounded-[3rem] shadow-2xl border border-primary/5 max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8">
            <MessageCircle size={40} className="text-primary" />
          </div>
          <h3 className="text-2xl font-black text-primary uppercase tracking-tighter italic mb-4">Ainda tem dúvidas?</h3>
          <p className="text-ink font-bold uppercase text-xs tracking-widest opacity-60 leading-relaxed mb-10">
            Nossa equipe de especialistas está pronta para te ajudar a escolher o melhor equipamento.
          </p>
          <button className="bg-primary text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary/80 transition-all shadow-xl transform active:scale-95 flex items-center justify-center gap-3 mx-auto">
            Falar com Especialista
          </button>
        </div>
      </div>
    </div>
  );
}
