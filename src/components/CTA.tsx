"use client";

import { MessageCircle, Sparkles, Check, ArrowRight, Star, ShieldCheck } from "lucide-react";
import { useAcademy } from "@/context/AcademyContext";

export function CTA() {
  const { config, getWhatsAppUrl } = useAcademy();
  const planCount = config.plans?.length || 0;

  // Grid / layout responsivo dinâmico dependendo da quantidade de planos cadastrados
  const getContainerLayoutClass = () => {
    if (planCount === 1) {
      return "max-w-lg w-full mx-auto flex justify-center";
    }
    if (planCount === 2) {
      return "max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch justify-center";
    }
    if (planCount === 3) {
      return "max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch justify-center";
    }
    return "max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch justify-center";
  };

  return (
    <section id="planos" className="py-20 sm:py-28 relative overflow-hidden bg-[#070709]">
      {/* Dynamic Pink Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-pink/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl p-6 sm:p-12 lg:p-14 bg-gradient-to-b from-surface-light via-surface to-[#0A0A0C] border border-brand-pink/30 shadow-2xl overflow-hidden">
          {/* Ambient Corner Flare */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-pink/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-pink/20 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-pink/15 border border-brand-pink/30 text-pink-200 text-xs font-bold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5 text-brand-pink animate-pulse" />
              <span>Matrículas Abertas • {planCount === 1 ? "Nosso Plano" : "Nossos Planos"}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight mb-5">
              PRONTO PARA COMEÇAR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-brand-pink drop-shadow-[0_0_25px_rgba(255,46,147,0.4)]">
                SUA EVOLUÇÃO?
              </span>
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed text-balance">
              {planCount === 1
                ? `Conheça nosso plano exclusivo e venha transformar sua saúde, autoestima e energia na ${config.name}.`
                : `Escolha o plano que melhor se adapta à sua rotina e venha transformar sua saúde, autoestima e energia na ${config.name}.`}
            </p>
          </div>

          {/* Dynamic Centered Plans Container */}
          <div className={`${getContainerLayoutClass()} mb-12`}>
            {config.plans && config.plans.map((plan) => {
              const isPopular = plan.isPopular || planCount === 1; // Se tiver só 1 plano, ganha o destaque premium completo
              const whatsappUrl = getWhatsAppUrl(
                plan.customMessage ||
                  `Olá! Gostaria de me matricular no ${plan.name} da ${config.name}.`
              );

              return (
                <div
                  key={plan.id}
                  className={`w-full relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-300 ${
                    planCount === 1 ? "max-w-md" : ""
                  } ${
                    isPopular
                      ? "bg-gradient-to-b from-[#1C131A] via-surface-card to-surface border-2 border-brand-pink shadow-glow-pink lg:-translate-y-2"
                      : "bg-surface-card/80 hover:bg-surface-card border border-white/10 hover:border-brand-pink/40 shadow-card-dark hover:-translate-y-1"
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                      <span
                        className={`inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-md whitespace-nowrap ${
                          isPopular
                            ? "bg-gradient-to-r from-brand-pink to-[#E11D48] text-white shadow-glow-pink"
                            : "bg-white/10 text-pink-200 border border-white/15"
                        }`}
                      >
                        <Star className="w-3 h-3 fill-current text-yellow-300" />
                        <span>{plan.badge}</span>
                      </span>
                    </div>
                  )}

                  <div>
                    {/* Plan Header */}
                    <div className="mb-6 pt-3 text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed min-h-[36px]">
                        {plan.description}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="p-5 rounded-2xl bg-black/50 border border-white/5 mb-6 text-center sm:text-left">
                      <div className="flex items-baseline justify-center sm:justify-start gap-1">
                        <span className="text-xs sm:text-sm font-bold text-zinc-400">R$</span>
                        <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                          {plan.price}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-zinc-400">
                          {plan.period}
                        </span>
                      </div>
                      {plan.billingInfo && (
                        <div className="text-xs font-medium text-brand-pink mt-1.5 flex items-center justify-center sm:justify-start gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-pink inline-block" />
                          <span>{plan.billingInfo}</span>
                        </div>
                      )}
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block text-left">
                        O que está incluso:
                      </span>
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 text-left">
                          <div className="p-0.5 rounded-full bg-brand-pink/15 text-brand-pink shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 px-6 rounded-2xl flex items-center justify-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider bg-gradient-to-r from-brand-pink via-[#FF1493] to-[#E11D48] text-white shadow-glow-pink hover:shadow-glow-pink-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{plan.ctaText || "Quero me Matricular"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Guarantee Pills */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-zinc-400">
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
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-pink" />
              <span>Matrícula Segura via WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
