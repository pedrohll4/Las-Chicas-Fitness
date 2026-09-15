"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Sparkles, ShieldCheck, Dumbbell, Flame } from "lucide-react";
import { useAcademy } from "@/context/AcademyContext";

export function Hero() {
  const { config, getWhatsAppUrl } = useAcademy();

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-center items-center pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black"
    >
      {/* Fundo Premium Dark: Não é preto baqueado/chapado, possui iluminação de palco, textura sutil e profundidade */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-[#070709] pointer-events-none select-none">
        {/* 1. Spotlight de palco no topo (efeito estúdio de luxo) */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(255,46,147,0.18)_0%,rgba(168,85,247,0.08)_40%,transparent_70%)] blur-2xl pointer-events-none" />

        {/* 2. Orbes atmosféricos de neon rosa nas laterais */}
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-brand-pink/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-brand-pink/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-48 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

        {/* 3. Micro-textura pontilhada moderna (sensação tátil e refinada) */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* 4. Logo oficial Las Chicas Fitness com presença e glow de contorno */}
        <div className="relative w-[300px] sm:w-[480px] md:w-[640px] lg:w-[740px] aspect-[4/3] flex items-center justify-center">
          <Image
            src="/logo.png"
            alt={`Logo ${config.name}`}
            fill
            priority
            quality={95}
            className="object-contain object-center opacity-35 filter brightness-105 contrast-125 drop-shadow-[0_0_80px_rgba(255,46,147,0.35)] transition-all duration-700"
          />
        </div>

        {/* 5. Vinheta e gradiente sutil para garantir 100% de nitidez nos textos */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/60 via-transparent to-[#070709]/90" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#070709]/30 to-[#070709]" />
      </div>

      {/* Decorative Glow Ambient Elements */}
      <div className="absolute top-1/4 -right-24 w-80 h-80 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Container - Compacto para ver tudo sem rolagem */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center mt-2 sm:mt-4">
        {/* Subtle Brand Tag Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-brand-pink/30 backdrop-blur-md mb-3 sm:mb-4 shadow-[0_0_20px_rgba(255,46,147,0.2)]">
          <span className="w-2 h-2 rounded-full bg-brand-pink animate-ping" />
          <span className="text-xs font-semibold tracking-wider text-pink-200 uppercase">
            Academia feminina • Ariquemes/RO
          </span>
        </div>

        {/* Main Bold Headline - Tamanho calibrado */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] uppercase mb-3 sm:mb-4 drop-shadow-2xl">
          {(() => {
            const raw = (config.slogan || "").trim();
            let parts: string[] = [];
            if (raw.includes(".")) {
              parts = raw.split(".").map((p) => p.trim()).filter(Boolean);
            } else if (raw.includes(",")) {
              parts = raw.split(",").map((p) => p.trim()).filter(Boolean);
            } else if (raw.includes("\n")) {
              parts = raw.split("\n").map((p) => p.trim()).filter(Boolean);
            } else {
              parts = [raw];
            }

            if (parts.length >= 2) {
              const first = parts[0];
              const second = parts.slice(1).join(" ");
              return (
                <>
                  <span className="block">{first}</span>
                  <span className="block">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-brand-pink drop-shadow-[0_0_35px_rgba(255,46,147,0.5)]">
                      {second}
                    </span>
                  </span>
                </>
              );
            }

            return <span className="block">{raw}</span>;
          })()}
        </h1>

        {/* Secondary Subtitle */}
        <p className="max-w-xl text-sm sm:text-base md:text-lg text-zinc-300 font-normal leading-relaxed mb-6 sm:mb-8 text-balance drop-shadow-md">
          {config.subSlogan}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mb-6 sm:mb-8">
          <a
            href={getWhatsAppUrl(`Olá! Quero começar a treinar na ${config.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-brand-pink via-[#FF1493] to-[#E11D48] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-glow-pink hover:shadow-glow-pink-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <span>Quero Começar</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <Link
            href="#sobre"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-surface-card/90 hover:bg-surface-light border border-white/15 hover:border-brand-pink/50 text-white font-bold text-xs sm:text-sm tracking-wider uppercase backdrop-blur-md hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <span>Conheça a Academia</span>
          </Link>
        </div>

        {/* 3 Key Feature Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 w-full max-w-3xl pt-4 border-t border-white/10">
          <div className="flex items-center justify-center sm:justify-start gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-brand-pink/15 text-brand-pink">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Estrutura
              </span>
              <span className="text-xs sm:text-sm font-bold text-white">Ambiente Completo</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-brand-pink/15 text-brand-pink">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Equipe
              </span>
              <span className="text-xs sm:text-sm font-bold text-white">Profissionais Qualificados</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-brand-pink/15 text-brand-pink">
              <Flame className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Metodologia
              </span>
              <span className="text-xs sm:text-sm font-bold text-white">Diferentes Objetivos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <Link
        href="#sobre"
        className="mt-4 relative z-10 flex flex-col items-center gap-1 text-zinc-400 hover:text-brand-pink transition-colors group cursor-pointer"
        aria-label="Rolar para a seção Sobre"
      >
        <span className="text-[10px] font-medium tracking-widest uppercase text-zinc-400 group-hover:text-pink-300">
          Role para explorar
        </span>
        <div className="p-1 rounded-full border border-zinc-700 group-hover:border-brand-pink animate-bounce">
          <ChevronDown className="w-3.5 h-3.5 text-brand-pink" />
        </div>
      </Link>
    </section>
  );
}
