"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Sparkles, ShieldCheck, Dumbbell, Flame } from "lucide-react";
import { ACADEMY_CONFIG, getWhatsAppUrl } from "@/config/academy";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#070709]"
    >
      {/* Background Image with optimized dark overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
          alt="Ambiente Las Chicas Fitness"
          fill
          priority
          quality={90}
          className="object-cover object-center scale-105 filter brightness-[0.38] contrast-125 transition-transform duration-1000 ease-out"
        />

        {/* Multi-layered dark gradients for depth and contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C] via-[#0A0A0C]/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-pink/15 via-transparent to-transparent" />
      </div>

      {/* Decorative Glow Ambient Elements */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-brand-pink/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center mt-8 sm:mt-12">
        {/* Subtle Brand Tag Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-brand-pink/30 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(255,46,147,0.2)] animate-float">
          <span className="w-2 h-2 rounded-full bg-brand-pink animate-ping" />
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-pink-200 uppercase">
            Experiência Fitness Premium
          </span>
        </div>

        {/* Main Bold Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.08] uppercase mb-6 drop-shadow-2xl">
          SEU CORPO. <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-brand-pink drop-shadow-[0_0_35px_rgba(255,46,147,0.5)]">
            SUA FORÇA.
          </span>{" "}
          <br className="hidden sm:block" />
          SUA EVOLUÇÃO.
        </h1>

        {/* Secondary Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed mb-10 text-balance drop-shadow-md">
          {ACADEMY_CONFIG.subSlogan}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none mb-14">
          <a
            href={getWhatsAppUrl("Olá! Quero começar a treinar na Las Chicas Fitness.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-brand-pink via-[#FF1493] to-[#E11D48] text-white font-bold text-sm tracking-wider uppercase shadow-glow-pink hover:shadow-glow-pink-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <span>Quero Começar</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <Link
            href="#sobre"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-surface-card/90 hover:bg-surface-light border border-white/15 hover:border-brand-pink/50 text-white font-bold text-sm tracking-wider uppercase backdrop-blur-md hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <span>Conheça a Academia</span>
          </Link>
        </div>

        {/* 3 Key Feature Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 w-full max-w-4xl pt-6 border-t border-white/10">
          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
            <div className="p-2 rounded-xl bg-brand-pink/15 text-brand-pink">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Estrutura
              </span>
              <span className="text-sm font-bold text-white">Ambiente Completo</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
            <div className="p-2 rounded-xl bg-brand-pink/15 text-brand-pink">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Equipe
              </span>
              <span className="text-sm font-bold text-white">Profissionais Qualificados</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
            <div className="p-2 rounded-xl bg-brand-pink/15 text-brand-pink">
              <Flame className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Metodologia
              </span>
              <span className="text-sm font-bold text-white">Diferentes Objetivos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <Link
        href="#sobre"
        className="mt-8 relative z-10 flex flex-col items-center gap-1.5 text-zinc-400 hover:text-brand-pink transition-colors group cursor-pointer"
        aria-label="Rolar para a seção Sobre"
      >
        <span className="text-[11px] font-medium tracking-widest uppercase text-zinc-400 group-hover:text-pink-300">
          Role para explorar
        </span>
        <div className="p-1 rounded-full border border-zinc-700 group-hover:border-brand-pink animate-bounce">
          <ChevronDown className="w-4 h-4 text-brand-pink" />
        </div>
      </Link>
    </section>
  );
}
