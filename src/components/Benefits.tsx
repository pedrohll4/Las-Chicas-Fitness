"use client";

import {
  Sparkles,
  Layers,
  Award,
  Target,
  Activity,
  Users,
  TrendingUp,
  HeartPulse,
} from "lucide-react";
import { useAcademy } from "@/context/AcademyContext";

const BENEFIT_ICONS: Record<string, React.ElementType> = {
  Sparkles,
  Layers,
  Award,
  Target,
  Activity,
  Users,
  TrendingUp,
  HeartPulse,
};

export function Benefits() {
  const { config } = useAcademy();

  return (
    <section id="beneficios" className="py-24 sm:py-32 bg-[#0A0A0C] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-brand-pink/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-pink/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-bold uppercase tracking-wider mb-4">
            <span>Diferenciais Exclusivos</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
            POR QUE TREINAR NA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-pink-300">
              {config.name}?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400">
            Muito mais que equipamentos: oferecemos uma experiência de treino completa,
            motivadora e desenhada para acelerar seus objetivos com segurança.
          </p>
        </div>

        {/* 8 Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.benefits.map((benefit, index) => {
            const Icon = BENEFIT_ICONS[benefit.iconName] || Sparkles;
            return (
              <div
                key={benefit.id}
                className="group relative p-6 rounded-2xl bg-surface/80 hover:bg-surface-card border border-white/5 hover:border-brand-pink/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card-dark flex flex-col justify-between"
              >
                <div>
                  {/* Top indicator & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-brand-pink/10 text-brand-pink group-hover:bg-brand-pink group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-600 group-hover:text-pink-400/80 transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-pink-200 transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Subtle bottom hover line */}
                <div className="mt-5 pt-3 border-t border-white/[0.04] flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider group-hover:text-brand-pink transition-colors">
                    Padrão Premium
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-brand-pink transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
