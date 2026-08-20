"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2, Camera } from "lucide-react";
import { useAcademy } from "@/context/AcademyContext";
import { LightboxModal, LightboxImage } from "@/components/LightboxModal";

export function Gallery() {
  const { config } = useAcademy();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxImages: LightboxImage[] = config.gallery.map((item) => ({
    imageUrl: item.imageUrl,
    title: item.title,
    category: item.category,
  }));

  return (
    <section id="galeria" className="py-24 sm:py-32 bg-[#0A0A0C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-bold uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Nossa Galeria</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
            VIVA A ENERGIA DA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-pink-300">
              {config.name}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400">
            Confira momentos reais, treinos e a vibração inspiradora de quem treina e evolui todos
            os dias com a gente.
          </p>
        </div>

        {/* Dynamic Asymmetric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {config.gallery.map((item, index) => {
            const aspectClass =
              item.aspect === "tall"
                ? "sm:row-span-2 aspect-[3/4] sm:aspect-auto"
                : item.aspect === "wide"
                ? "sm:col-span-2 aspect-[16/9]"
                : "aspect-square";

            return (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className={`group relative rounded-2xl overflow-hidden bg-surface border border-white/10 cursor-pointer shadow-lg hover:border-brand-pink/60 hover:shadow-glow-pink transition-all duration-300 ${aspectClass}`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover object-center filter brightness-90 contrast-105 group-hover:scale-110 group-hover:brightness-100 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized={item.imageUrl.startsWith("data:")}
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  {/* Top Category Tag */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-pink-300">
                      {item.category}
                    </span>

                    <div className="p-2 rounded-full bg-brand-pink text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-glow-pink">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Title */}
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-pink transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
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
