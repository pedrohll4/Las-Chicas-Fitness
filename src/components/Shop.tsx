"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Sparkles,
  MessageCircle,
  Tag,
  Eye,
  X,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { useAcademy } from "@/context/AcademyContext";
import { ProductItem } from "@/types";

export function Shop() {
  const { config, getShopWhatsAppUrl } = useAcademy();
  const products: ProductItem[] = config.products || [];

  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Categorias únicas encontradas nos produtos
  const categories = [
    "Todos",
    ...Array.from(new Set(products.map((p) => p.category).filter(Boolean))),
  ];

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleBuyWhatsApp = (product: ProductItem) => {
    const msg = `Olá! Vi o produto *${product.name}* (${product.price}) na Lojinha do site da ${config.name} e gostaria de saber sobre disponibilidade e tamanhos para comprar! 💕`;
    return getShopWhatsAppUrl(msg);
  };

  return (
    <section
      id="loja"
      className="py-20 sm:py-28 bg-[#09090D] border-t border-white/5 relative overflow-hidden"
    >
      {/* Luz ambiente rosa */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-pink/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-pink/10 border border-brand-pink/30 text-brand-pink text-xs font-bold uppercase tracking-wider mb-3.5 shadow-sm">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>BOUTIQUE & PRODUTOS EXCLUSIVOS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
            MODA FITNESS &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-pink-200 to-white">
              ACESSÓRIOS
            </span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-2xl mx-auto leading-relaxed">
            Treine com conforto, alta performance e muito estilo. Peças exclusivas, roupas de treino
            e acessórios oficiais para você arrasar todos os dias.
          </p>

          {/* Filtro de Categorias */}
          {categories.length > 2 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-brand-pink text-white shadow-glow-pink scale-105"
                      : "bg-surface-card/80 text-zinc-400 hover:text-white border border-white/10 hover:border-brand-pink/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grid de Produtos */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 text-sm">
            Nenhum produto cadastrado nesta categoria no momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product, idx) => (
              <div
                key={product.id || idx}
                className="group relative flex flex-col justify-between p-5 rounded-3xl bg-surface-card/90 border border-white/10 hover:border-brand-pink/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow-pink/20"
              >
                <div>
                  {/* Foto do Produto */}
                  <div
                    onClick={() => setSelectedImage(product.imageUrl)}
                    className="relative w-full aspect-[4/4.2] rounded-2xl overflow-hidden bg-black/40 border border-white/10 group-hover:border-brand-pink/40 transition-all cursor-pointer block mb-4"
                  >
                    <Image
                      src={product.imageUrl || "/images/gallery/foto_1.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      unoptimized
                    />

                    {/* Tag de Destaque */}
                    {product.tag && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-pink text-white text-[11px] font-bold uppercase tracking-wider shadow-glow-pink flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{product.tag}</span>
                      </div>
                    )}

                    {/* Botão Hover de Zoom */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver Foto Ampliada</span>
                      </div>
                    </div>
                  </div>

                  {/* Informações */}
                  <div className="space-y-2 mb-4">
                    <span className="text-[11px] font-bold text-brand-pink uppercase tracking-wider block">
                      {product.category || "Boutique"}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-pink-200 transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-2 font-normal">
                      {product.description}
                    </p>
                  </div>

                  {/* Tamanhos Disponíveis */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                      <span className="text-[10px] text-zinc-400 font-bold uppercase mr-1">
                        Tamanhos:
                      </span>
                      {product.sizes.map((sz, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-semibold text-zinc-300"
                        >
                          {sz}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Preço e Botão WhatsApp */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase font-medium block">
                      Valor
                    </span>
                    <span className="text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-pink-200">
                      {product.price}
                    </span>
                  </div>

                  <a
                    href={handleBuyWhatsApp(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-emerald-600/30 hover:scale-105 transition-all shrink-0"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Pedir no WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox para Foto Expandida do Produto */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-2xl max-h-[85vh] w-full h-[70vh] rounded-3xl overflow-hidden border border-white/20">
            <Image
              src={selectedImage}
              alt="Foto do produto"
              fill
              className="object-contain"
              unoptimized
            />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
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
