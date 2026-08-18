"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2, Sparkles } from "lucide-react";
import { ACADEMY_CONFIG } from "@/config/academy";
import { LightboxModal, LightboxImage } from "@/components/LightboxModal";

const CATEGORIES = [
  "Todas",
  "Musculação",
  "Cardio",
  "Funcional",
  "Recepção",
  "Ambiente Interno",
  "Fachada",
] as const;

export function Structure() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    selectedCategory === "Todas"
      ? ACADEMY_CONFIG.structure
      : ACADEMY_CONFIG.structure.filter((item) => item.category === selectedCategory);

  const lightboxImages: LightboxImage[] = filteredItems.map((item) => ({
    imageUrl: item.imageUrl,
    title: item.title,
    category: item.category,
    description: item.description,
  }));

  return (
    <section id="estrutura" className="py-24 sm:py-32 bg-[#0C0C10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-bold uppercase tracking-wider mb-4">
            <span>Ambiente e Equipamentos</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
            CONHEÇA NOSSO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-pink-300">
              ESPAÇO
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400">
            Cada detalhe foi planejado para oferecer conforto, segurança, higiene e uma atmosfera
            motivadora para você atingir seu melhor rendimento.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-brand-pink text-white shadow-glow-pink scale-105"
                    : "bg-surface hover:bg-surface-light text-zinc-400 hover:text-zinc-200 border border-white/5"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative rounded-2xl overflow-hidden bg-surface border border-white/10 cursor-pointer hover:border-brand-pink/50 hover:shadow-card-dark transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="aspect-[4/3] relative w-full overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 filter brightness-90 group-hover:brightness-100 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-semibold text-pink-300">
                  {item.category}
                </div>

                {/* Hover Expand Icon */}
                <div className="absolute top-4 right-4 p-2 rounded-full bg-brand-pink text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-glow-pink">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-brand-pink transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(index) => setLightboxIndex(index)}
      />
    </section>
  );
}
