"use client";

import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useAcademy } from "@/context/AcademyContext";

export function About() {
  const { config, getWhatsAppUrl } = useAcademy();

  return (
    <section id="sobre" className="py-24 sm:py-32 bg-[#0A0A0C] relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-pink/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-bold uppercase tracking-wider w-fit mb-4">
              <span>Sobre a Academia</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mb-6">
              {config.aboutHeadline.includes(".") ? (
                <>
                  {config.aboutHeadline.split(".")[0]}. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-pink-300">
                    {config.aboutHeadline.split(".")[1]}
                  </span>
                </>
              ) : (
                config.aboutHeadline
              )}
            </h2>

            {/* Text description */}
            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed mb-4">
              {config.aboutDescription}
            </p>

            <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed mb-8">
              {config.aboutSecondary}
            </p>

            {/* Highlights bullet points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
              <div className="flex items-center gap-2.5 text-zinc-200 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-brand-pink flex-shrink-0" />
                <span>Atendimento humanizado e focado em você</span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-200 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-brand-pink flex-shrink-0" />
                <span>Ambiente acolhedor e inspirador</span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-200 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-brand-pink flex-shrink-0" />
                <span>Metodologia pensada para resultados reais</span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-200 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-brand-pink flex-shrink-0" />
                <span>Equipamentos modernos e higienizados</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href={getWhatsAppUrl(`Olá! Gostaria de agendar uma visita e conhecer a ${config.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-dark text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-glow-pink hover:scale-105 transition-all duration-300"
              >
                <span>Agendar uma Visita</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Composition with Pink Glow Accent */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative glowing border */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-brand-pink/40 via-purple-600/20 to-transparent blur-xl opacity-75" />

              {/* Main Image Card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-surface">
                <div className="aspect-[4/5] relative">
                  <Image
                    src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop"
                    alt={`Treino na ${config.name}`}
                    fill
                    className="object-cover object-center filter brightness-95 contrast-105"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent" />
                </div>

                {/* Floating Experience Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-surface-card/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-semibold text-brand-pink uppercase tracking-wider">
                      Venha Evoluir Conosco
                    </span>
                    <span className="text-sm font-bold text-white">
                      Agende uma visita e sinta a energia
                    </span>
                  </div>
                  <a
                    href={getWhatsAppUrl(`Olá! Gostaria de agendar uma visita na ${config.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-brand-pink text-white hover:bg-brand-pink-dark transition-colors shadow-glow-pink"
                    aria-label="Agendar visita via WhatsApp"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
