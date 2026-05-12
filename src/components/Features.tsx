import { Truck, CreditCard, ShieldCheck } from "lucide-react";

export default function Features() {
  return (
    <div className="bg-paper py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">

        {/* FRETE */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all border border-primary/5 flex items-center gap-6 min-h-[130px]">
          <div className="bg-primary/5 p-4 rounded-2xl text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:rotate-6 shadow-inner shrink-0">
            <Truck size={32} strokeWidth={2.5} />
          </div>

          <div className="flex flex-col justify-center">
            <h4 className="font-black text-ink leading-tight uppercase tracking-tight text-sm">
              Frete Grátis
            </h4>

            <p className="text-[12px] text-primary uppercase font-black tracking-[0.2em] mt-1">
              ACIMA DE R$ 30
            </p>
          </div>
        </div>

        {/* PARCELAMENTO */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all border border-primary/5 flex items-center gap-6 min-h-[130px]">
          <div className="bg-primary/5 p-4 rounded-2xl text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:rotate-6 shadow-inner shrink-0">
            <CreditCard size={32} strokeWidth={2.5} />
          </div>

          <div className="flex flex-col justify-center">
            <h4 className="font-black text-ink leading-tight uppercase tracking-tight text-sm">
              Parcele em
            </h4>

            <p className="text-[12px] text-primary uppercase font-black tracking-[0.2em] mt-1">
              Até 12x sem juros
            </p>
          </div>
        </div>

        {/* COMPRA SEGURA */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all border border-primary/5 flex items-center gap-6 min-h-[130px]">
          <div className="bg-primary/5 p-4 rounded-2xl text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:rotate-6 shadow-inner shrink-0">
            <ShieldCheck size={32} strokeWidth={2.5} />
          </div>

          <div className="flex flex-col justify-center">
            <h4 className="font-black text-ink leading-tight uppercase tracking-tight text-sm">
              Compra Segura
            </h4>

            <p className="text-[12px] text-primary uppercase font-black tracking-[0.2em] mt-1">
              Satisfação Garantida
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />

      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />
    </div>
  );
}