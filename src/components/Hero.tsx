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
      {/* Fundo preto básico com o logo oficial Las Chicas Fitness */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-black pointer-events-none select-none">
        {/* Glow rosa sutil e moderno atrás do logo */}
        <div className="absolute w-[400px] sm:w-[600px] h-[400px] bg-brand-pink/10 rounded-full blur-[130px] pointer-events-none" />

        {/* Logo oficial no fundo preto básico */}
        <div className="relative w-[280px] sm:w-[460px] md:w-[600px] lg:w-[720px] aspect-[4/3] flex items-center justify-center opacity-30">
          <Image
            src="/logo.png"
            alt={`Logo ${config.name}`}
            fill
            priority
            quality={95}
            className="object-contain object-center filter brightness-95 contrast-110"
          />
        </div>

        {/* Gradiente sutil para acabamento perfeito no preto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
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
          {config.slogan.split(".").map((part, index) => {
            const trimmed = part.trim();
            if (!trimmed) return null;
            if (index === 1) {
              return (
                <span key={index} className="block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-brand-pink drop-shadow-[0_0_35px_rgba(255,46,147,0.5)]">
                    {trimmed}.
                  </span>
                </span>
              );
            }
            return (
              <span key={index} className="block">
                {trimmed}.
              </span>
            );
          })}
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
