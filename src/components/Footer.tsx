import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  onNavigate: (page: any) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t-4 border-secondary">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* About */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white p-1 rounded-full border-2 border-primary shadow-md">
              <img 
                src="public/img/logo.png" 
                alt="Logo" 
                className="w-18 h-18 object-contain rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black text-secondary tracking-tighter uppercase italic drop-shadow-sm">PESQUE</span>
              <span className="text-2xl font-black text-highlight tracking-tighter uppercase drop-shadow-sm">SHOP</span>
            </div>
          </div>
          <p className="text-sm text-white/80 leading-relaxed font-medium">
            A Pesque e Shop é a sua loja especializada em artigos de pesca de alta performance. Oferecemos os melhores equipamentos para tornar sua pescaria inesquecível.
          </p>
          <div className="flex gap-4 mt-8">
            <div className="bg-primary/50 p-2 rounded-full hover:bg-secondary transition-colors cursor-pointer shadow-lg">
              <Facebook size={18} className="text-white" />
            </div>
            <div className="bg-primary/50 p-2 rounded-full hover:bg-secondary transition-colors cursor-pointer shadow-lg">
              <Instagram size={18} className="text-white" />
            </div>
            <div className="bg-primary/50 p-2 rounded-full hover:bg-secondary transition-colors cursor-pointer shadow-lg">
              <Youtube size={18} className="text-white" />
            </div>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-black uppercase text-[10px] mb-8 border-b-2 border-secondary pb-2 inline-block tracking-[0.2em] text-highlight">Institucional</h4>
          <ul className="text-xs text-white/90 space-y-4 font-bold uppercase tracking-widest">
            <li onClick={() => onNavigate("sobre")} className="hover:text-highlight cursor-pointer transition-colors flex items-center gap-2 group">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full group-hover:scale-150 transition-transform"></span>
              Sobre Nós
            </li>
            <li onClick={() => onNavigate("privacidade")} className="hover:text-highlight cursor-pointer transition-colors flex items-center gap-2 group">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full group-hover:scale-150 transition-transform"></span>
              Políticas de Privacidade
            </li>
            <li className="hover:text-highlight cursor-pointer transition-colors flex items-center gap-2 group">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full group-hover:scale-150 transition-transform"></span>
              Termos de Uso
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-black uppercase text-[10px] mb-8 border-b-2 border-secondary pb-2 inline-block tracking-[0.2em] text-highlight">Atendimento</h4>
          <ul className="text-xs text-white/90 space-y-4 font-bold uppercase tracking-widest">
            <li onClick={() => onNavigate("contato")} className="hover:text-highlight cursor-pointer transition-colors flex items-center gap-2 group">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full group-hover:scale-150 transition-transform"></span>
              Fale Conosco
            </li>
            <li onClick={() => onNavigate("faq")} className="hover:text-highlight cursor-pointer transition-colors flex items-center gap-2 group">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full group-hover:scale-150 transition-transform"></span>
              Dúvidas Frequentes
            </li>
            <li onClick={() => onNavigate("trocas")} className="hover:text-highlight cursor-pointer transition-colors flex items-center gap-2 group">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full group-hover:scale-150 transition-transform"></span>
              Trocas e Devoluções
            </li>
            <li onClick={() => onNavigate("status")} className="hover:text-highlight cursor-pointer transition-colors flex items-center gap-2 group">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full group-hover:scale-150 transition-transform"></span>
              Status do Pedido
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-black uppercase text-[10px] mb-8 border-b-2 border-secondary pb-2 inline-block tracking-[0.2em] text-highlight">Contato</h4>
          <ul className="text-xs text-white/90 space-y-6 font-bold uppercase tracking-widest">
            <li className="flex items-start gap-4 group">
              <div className="bg-primary/50 p-2 rounded-xl group-hover:bg-secondary transition-colors shadow-md">
                <Phone size={16} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/60 mb-1">WhatsApp</span>
                <span className="group-hover:text-white transition-colors">(11) 99649-2175</span>
              </div>
            </li>
            <li className="flex items-start gap-4 group">
              <div className="bg-primary/50 p-2 rounded-xl group-hover:bg-secondary transition-colors shadow-md">
                <Mail size={16} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/60 mb-1">E-mail</span>
                <span className="group-hover:text-white transition-colors">contato@pesqueshop.com.br</span>
              </div>
            </li>
            <li className="flex items-start gap-4 group">
              <div className="bg-primary/50 p-2 rounded-xl group-hover:bg-secondary transition-colors shadow-md">
                <MapPin size={16} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/60 mb-1">Endereço</span>
                <span className="group-hover:text-white transition-colors">Av. Paulista, 1000 - SP</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-center">
        <p className="text-[10px] text-white/50 font-black uppercase tracking-[0.3em] mb-2">© 2026 Pesque e Shop - Todos os direitos reservados</p>
        <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest">CNPJ: 51.220.315/0001-85</p>
      </div>

    </footer>
  );
}
