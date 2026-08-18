"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxImage {
  imageUrl: string;
  title: string;
  category?: string;
  description?: string;
}

interface LightboxModalProps {
  images: LightboxImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function LightboxModal({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  const isOpen = currentIndex !== null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onNavigate(newIndex);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    onNavigate(newIndex);
  }, [currentIndex, images.length, onNavigate]);

  // Teclado: Esc para fechar, setas para navegar
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Bloquear scroll do body quando modal está aberto
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || currentIndex === null) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 transition-all duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visualizador de Imagens"
    >
      {/* Botão Fechar */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 p-3 rounded-full bg-surface-card/80 hover:bg-brand-pink text-white hover:text-white border border-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-pink"
        aria-label="Fechar visualizador"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Botão Anterior */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-surface-card/80 hover:bg-brand-pink text-white hover:text-white border border-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-pink"
          aria-label="Imagem anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Container Principal da Imagem */}
      <div
        className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-surface">
          <Image
            src={currentImage.imageUrl}
            alt={currentImage.title}
            fill
            className="object-contain"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>

        {/* Legenda e Contador */}
        <div className="mt-4 w-full flex items-center justify-between px-2 text-zinc-300">
          <div>
            {currentImage.category && (
              <span className="inline-block text-xs font-semibold text-brand-pink uppercase tracking-wider mb-0.5">
                {currentImage.category}
              </span>
            )}
            <h4 className="text-base sm:text-lg font-bold text-white">
              {currentImage.title}
            </h4>
            {currentImage.description && (
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                {currentImage.description}
              </p>
            )}
          </div>

          <div className="text-xs sm:text-sm font-mono font-medium text-zinc-400 bg-surface-card px-3 py-1.5 rounded-full border border-white/10">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Botão Próximo */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-surface-card/80 hover:bg-brand-pink text-white hover:text-white border border-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-pink"
          aria-label="Próxima imagem"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
