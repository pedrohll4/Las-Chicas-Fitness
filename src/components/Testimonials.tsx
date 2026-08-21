"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Star,
  Quote,
  MessageSquareHeart,
  Plus,
  X,
  Camera,
  CheckCircle2,
  Sparkles,
  Heart,
  UploadCloud,
} from "lucide-react";
import { useAcademy } from "@/context/AcademyContext";
import { TestimonialItem } from "@/types";

export function Testimonials() {
  const { config, addTestimonial } = useAcademy();
  const testimonials = config.testimonials || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Manipulador de upload de imagem com compressão automática via Canvas
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxDim = 800;
        let width = img.width;
        let height = img.height;

        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.82);
        setImagePreview(compressedDataUrl);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    setIsSubmitting(true);
    try {
      await addTestimonial({
        name: name.trim(),
        role: role.trim() || "Aluna Las Chicas",
        rating,
        comment: comment.trim(),
        imageUrl: imagePreview || undefined,
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsModalOpen(false);
        setName("");
        setRole("");
        setRating(5);
        setComment("");
        setImagePreview(null);
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="depoimentos"
      className="py-20 sm:py-28 bg-[#0B0B0F] border-t border-white/5 relative overflow-hidden"
    >
      {/* Luz ambiente rosa */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-pink/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-pink/10 border border-brand-pink/30 text-brand-pink text-xs font-bold uppercase tracking-wider mb-3.5 shadow-sm">
              <MessageSquareHeart className="w-3.5 h-3.5" />
              <span>DEPOIMENTOS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
              QUEM TREINA,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-pink-200 to-white">
                SENTE A DIFERENÇA
              </span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2.5 max-w-xl">
              Histórias e avaliações reais de alunas que transformam seus corpos, mentes e autoestima na Las Chicas.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-dark text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-glow-pink hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              <span>Deixar Meu Depoimento</span>
            </button>
          </div>
        </div>

        {/* Grid de Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={item.id || idx}
              className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-surface-card/90 border border-white/10 hover:border-brand-pink/50 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-pink/20"
            >
              <div>
                {/* Topo do Card: Estrelas & Ícone */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-brand-pink">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (item.rating || 5)
                            ? "fill-brand-pink text-brand-pink filter drop-shadow-[0_0_6px_rgba(236,72,153,0.6)]"
                            : "text-zinc-700"
                        }`}
                      />
                    ))}
                  </div>

                  {item.date && (
                    <span className="text-[11px] font-medium text-zinc-400">
                      {item.date}
                    </span>
                  )}
                </div>

                {/* Texto do Depoimento */}
                <div className="relative mb-5">
                  <Quote className="w-6 h-6 text-brand-pink/25 absolute -top-2 -left-1 pointer-events-none" />
                  <p className="text-sm sm:text-base text-zinc-200 italic leading-relaxed pl-5 font-normal">
                    &ldquo;{item.comment}&rdquo;
                  </p>
                </div>

                {/* Foto Anexada (se houver) */}
                {item.imageUrl && (
                  <div className="mb-5">
                    <button
                      type="button"
                      onClick={() => setSelectedPhoto(item.imageUrl!)}
                      className="relative w-full h-44 rounded-2xl overflow-hidden border border-white/10 group-hover:border-brand-pink/40 transition-all cursor-pointer block"
                    >
                      <Image
                        src={item.imageUrl}
                        alt={`Foto do depoimento de ${item.name}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                      <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-[10px] font-bold text-pink-200 flex items-center gap-1">
                        <Camera className="w-3 h-3" />
                        <span>Ver Foto</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Assinatura da Aluna */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-brand-pink transition-colors">
                    — {item.name}
                  </h4>
                  {item.role && (
                    <p className="text-xs text-zinc-400 font-medium mt-0.5">
                      {item.role}
                    </p>
                  )}
                </div>

                <div className="w-8 h-8 rounded-full bg-brand-pink/10 border border-brand-pink/30 flex items-center justify-center text-brand-pink shrink-0 shadow-sm">
                  <Heart className="w-4 h-4 fill-brand-pink/30" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL DE ENVIO DE DEPOIMENTO (SEM LOGIN NECESSÁRIO) */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#111116] border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden animate-scaleUp">
            {/* Botão Fechar */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-brand-pink/20 border border-brand-pink flex items-center justify-center mx-auto text-brand-pink shadow-glow-pink">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  Depoimento Publicado!
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-xs mx-auto leading-relaxed">
                  Muito obrigada por compartilhar sua história e inspirar a nossa comunidade feminina! 💕
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-pink/15 text-brand-pink text-[11px] font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Sua Voz na Las Chicas</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    Deixar Meu Depoimento
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Não é preciso login. Preencha seu nome e conte como está sendo sua experiência!
                  </p>
                </div>

                {/* Seleção de Estrelas Interativa */}
                <div>
                  <label className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Sua Avaliação
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 text-zinc-600 hover:text-brand-pink transition-colors focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 transition-all ${
                            star <= rating
                              ? "fill-brand-pink text-brand-pink scale-110 drop-shadow-[0_0_8px_rgba(236,72,153,0.7)]"
                              : "text-zinc-700"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-brand-pink ml-2">
                      {rating === 5
                        ? "Excelente (5 estrelas)"
                        : `${rating} estrelas`}
                    </span>
                  </div>
                </div>

                {/* Nome / Assinatura */}
                <div>
                  <label className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Seu Nome ou Apelido *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Juliana Santos ou Ju"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-card border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all"
                  />
                </div>

                {/* Modalidade ou Tempo de Academia */}
                <div>
                  <label className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Tempo ou Modalidade (Opcional)
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Ex: Aluna há 6 meses, Musculação & Jump"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-card border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all"
                  />
                </div>

                {/* Mensagem / Depoimento */}
                <div>
                  <label className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Seu Depoimento *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Conte como a academia mudou sua rotina, disposição e resultados..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-card border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all resize-none"
                  />
                </div>

                {/* Foto Opcional */}
                <div>
                  <label className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Adicionar Foto (Opcional)
                  </label>
                  {imagePreview ? (
                    <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-brand-pink/50">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-red-500 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center p-4 rounded-2xl border border-dashed border-white/20 hover:border-brand-pink cursor-pointer bg-surface-card hover:bg-surface-light transition-all">
                      <UploadCloud className="w-6 h-6 text-brand-pink mb-1" />
                      <span className="text-xs font-semibold text-zinc-200">
                        Clique para anexar uma foto
                      </span>
                      <span className="text-[10px] text-zinc-500 mt-0.5">
                        PNG, JPG ou WEBP
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Botão Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || !name.trim() || !comment.trim()}
                  className="w-full py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-dark text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-glow-pink hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Publicar Meu Depoimento</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Lightbox para Foto Expandida */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-3xl max-h-[85vh] w-full h-[70vh] rounded-3xl overflow-hidden border border-white/20">
            <Image
              src={selectedPhoto}
              alt="Foto do depoimento"
              fill
              className="object-contain"
              unoptimized
            />
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-brand-pink transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
