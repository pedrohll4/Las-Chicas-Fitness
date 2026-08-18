import Image from "next/image";
import { Dumbbell, Zap, Flame, UserCheck, ArrowUpRight } from "lucide-react";
import { ACADEMY_CONFIG, getWhatsAppUrl } from "@/config/academy";

const ICON_MAP: Record<string, React.ElementType> = {
  Dumbbell,
  Zap,
  Flame,
  UserCheck,
};

export function Services() {
  return (
    <section id="modalidades" className="py-24 sm:py-32 bg-[#0C0C10] relative">
      {/* Subtle background ambient line */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-bold uppercase tracking-wider mb-4">
            <span>Nossas Modalidades</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
            ENCONTRE O TREINO QUE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-brand-pink">
              COMBINA COM VOCÊ
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400">
            Treinos desenvolvidos para diferentes níveis e objetivos, com orientação técnica e
            estímulos que aceleram seus resultados.
          </p>
        </div>

        {/* Modalities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACADEMY_CONFIG.modalities.map((item) => {
            const IconComponent = ICON_MAP[item.iconName] || Dumbbell;
            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-surface border border-white/10 overflow-hidden hover:border-brand-pink/50 hover:shadow-glow-pink transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Image Header with Gradient Overlay */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover object-center filter brightness-[0.75] group-hover:scale-110 group-hover:brightness-90 transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />

                  {/* Intensity Tag */}
                  {item.intensity && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-pink-300">
                      {item.intensity}
                    </div>
                  )}

                  {/* Icon Badge */}
                  <div className="absolute -bottom-4 left-5 p-3 rounded-xl bg-surface-card border border-brand-pink/30 text-brand-pink shadow-md group-hover:bg-brand-pink group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 pt-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide mb-1 group-hover:text-brand-pink transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-xs font-semibold text-brand-pink mb-3">
                      {item.subtitle}
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Tags & Action Link */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[11px] font-medium text-zinc-400 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={getWhatsAppUrl(`Olá! Gostaria de saber mais sobre a modalidade ${item.title} na Las Chicas Fitness.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full py-2.5 px-4 rounded-xl bg-surface-light hover:bg-brand-pink/20 text-xs font-bold text-zinc-200 hover:text-white border border-white/5 hover:border-brand-pink/40 transition-all group/btn"
                    >
                      <span>Saber mais sobre {item.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-brand-pink group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Bottom Pink Accent Indicator Line */}
                <div className="h-1 w-full bg-transparent group-hover:bg-gradient-to-r group-hover:from-brand-pink group-hover:to-pink-400 transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
