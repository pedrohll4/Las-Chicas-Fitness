"use client";

import { MessageCircle, Sparkles, Check, ArrowRight } from "lucide-react";
import { useAcademy } from "@/context/AcademyContext";

export function CTA() {
  const { config, getWhatsAppUrl } = useAcademy();

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#070709]">
      {/* Dynamic Pink Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-pink/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl p-8 sm:p-14 lg:p-16 bg-gradient-to-b from-surface-light via-surface to-[#0A0A0C] border border-brand-pink/30 shadow-2xl overflow-hidden text-center">
          {/* Ambient Corner Flare */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-pink/30 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-pink/20 rounded-full blur-2xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-pink/15 border border-brand-pink/30 text-pink-200 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink animate-pulse" />
            <span>Matrículas Abertas</span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight mb-6">
            PRONTO PARA COMEÇAR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-brand-pink drop-shadow-[0_0_25px_rgba(255,46,147,0.4)]">
              SUA EVOLUÇÃO?
            </span>
          </h2>

          {/* Subtext */}
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-zinc-300 font-normal leading-relaxed mb-10">
            Seu próximo treino pode ser o primeiro passo para uma nova versão de você. Fale conosco
            diretamente no WhatsApp e garanta condições especiais na {config.name}.
          </p>

          {/* CTA Action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
            <a
              href={getWhatsAppUrl(`Olá! Quero me matricular na ${config.name} e começar minha evolução.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4.5 rounded-full bg-gradient-to-r from-brand-pink via-[#FF1493] to-[#E11D48] text-white font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-glow-pink hover:shadow-glow-pink-lg hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Quero me Matricular</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Guarantee Pills */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-pink" />
              <span>Atendimento Rápido</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-pink" />
              <span>Sem Burocracia</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-pink" />
              <span>Planos Flexíveis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
