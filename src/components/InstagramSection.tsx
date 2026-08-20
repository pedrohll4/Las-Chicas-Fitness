"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Instagram,
  ArrowUpRight,
  Heart,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAcademy } from "@/context/AcademyContext";
import { InstagramPost } from "@/types";

// Helper para detectar links do Instagram
function isInstagramUrl(url: string | undefined): boolean {
  if (!url) return false;
  return url.includes("instagram.com/reel/") || url.includes("instagram.com/p/");
}

function isDirectVideo(url: string | undefined): boolean {
  if (!url) return false;
  return url.endsWith(".mp4") || url.endsWith(".webm") || url.startsWith("data:video");
}

// Componente para vídeo local em loop contínuo
function LoopingVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (v) {
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      v.play().catch(() => {});
    }
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="w-full h-full object-cover object-center pointer-events-none group-hover:scale-105 transition-transform duration-700 ease-out"
    />
  );
}

// Card individual no estilo limpo e oficial do Instagram
function InstagramCard({
  post,
  idx,
  handle,
  profileUrl,
}: {
  post: InstagramPost;
  idx: number;
  handle: string;
  profileUrl: string;
}) {
  const isInsta = isInstagramUrl(post.mediaUrl);
  const isVideo = isDirectVideo(post.mediaUrl);

  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Busca a imagem real via API se for link do Instagram
  useEffect(() => {
    if (!isInsta) return;

    let isMounted = true;
    setLoading(true);

    fetch(`/api/instagram-oembed?url=${encodeURIComponent(post.mediaUrl || "")}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.thumbnailUrl) {
          setThumbnailUrl(data.thumbnailUrl);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [post.mediaUrl, isInsta]);

  // Link de destino ao clicar no card
  const targetUrl =
    post.permalink && post.permalink.startsWith("http")
      ? post.permalink
      : isInsta
      ? post.mediaUrl
      : profileUrl;

  // Imagem de fallback oficial da academia
  const fallbackImage = `/images/instagram/reel_${(idx % 12) + 1}.jpg`;

  // URL final da imagem a exibir
  const finalImage = isInsta
    ? thumbnailUrl || fallbackImage
    : post.mediaUrl && !post.mediaUrl.includes("mixkit")
    ? post.mediaUrl
    : fallbackImage;

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] aspect-[4/5] sm:aspect-[9/13] rounded-2xl overflow-hidden bg-[#111116] border border-white/10 shadow-lg hover:border-brand-pink/60 hover:shadow-glow-pink transition-all duration-300 block"
    >
      {/* ── MÍDIA DO CARD (FOTO OU VÍDEO CENTRALIZADO) ── */}
      {isVideo ? (
        <div className="relative w-full h-full bg-black">
          <LoopingVideo src={post.mediaUrl!} />
        </div>
      ) : (
        <div className="relative w-full h-full bg-[#111116]">
          {loading && !thumbnailUrl && (
            <div className="absolute inset-0 bg-zinc-900 animate-pulse z-0" />
          )}
          <Image
            src={finalImage}
            alt={post.caption || `Postagem Las Chicas Fitness ${idx + 1}`}
            fill
            className="object-cover object-center group-hover:scale-105 filter brightness-95 group-hover:brightness-100 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            unoptimized
          />
        </div>
      )}

      {/* ── ÍCONE DISCRETO DO REEL / POST (CANTO SUPERIOR DIREITO) ── */}
      <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/50 backdrop-blur-md border border-white/10 text-white flex items-center gap-1 z-20 shadow-sm">
        {post.type === "video" || isInsta ? (
          <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
          </svg>
        ) : (
          <Instagram className="w-3.5 h-3.5 text-white" />
        )}
      </div>

      {/* ── GRADIENTE ESCURO INFERIOR ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none z-10" />

      {/* ── CONTEÚDO E DETALHES ── */}
      <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between pointer-events-none z-20">
        {/* Top: Tag de identificação */}
        <div>
          <span className="text-[11px] font-bold text-pink-200 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-sm">
            {handle}
          </span>
        </div>

        {/* Bottom: Legenda e Curtidas */}
        <div className="space-y-2 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
          {post.caption && (
            <p className="text-xs text-zinc-200 line-clamp-2 leading-relaxed font-medium">
              {post.caption}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs font-bold text-zinc-300 pt-1 border-t border-white/10">
            <div className="flex items-center gap-1.5 text-pink-300">
              <Heart className="w-3.5 h-3.5 fill-current text-brand-pink" />
              <span>{post.likes || "1.5k"}</span>
            </div>
            {post.comments && (
              <div className="flex items-center gap-1.5 text-zinc-400">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{post.comments}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}

// Seção principal do Instagram
export function InstagramSection() {
  const { config } = useAcademy();
  const posts = config.instagramPosts || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [perPage, setPerPage] = useState(4);

  useEffect(() => {
    const calc = () => {
      if (window.innerWidth < 640) {
        setPerPage(1);
      } else if (window.innerWidth < 1024) {
        setPerPage(2);
      } else {
        setPerPage(4);
      }
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const pages = Math.max(1, posts.length - perPage + 1);

  useEffect(() => {
    if (isPaused || posts.length <= perPage) return;
    const t = setInterval(() => {
      setCurrentIndex((p) => (p + 1 >= pages ? 0 : p + 1));
    }, 4500);
    return () => clearInterval(t);
  }, [isPaused, pages, posts.length, perPage]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? pages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1 >= pages ? 0 : prev + 1));
  };

  const handle = config.contacts?.instagramHandle || "@las.chicasfitness";
  const url = config.contacts?.instagramUrl || "https://www.instagram.com/las.chicasfitness/";

  if (!posts || posts.length === 0) return null;

  return (
    <section
      className="py-20 sm:py-28 bg-[#0A0A0C] border-t border-white/5 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-pink/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-pink/10 border border-brand-pink/30 text-brand-pink text-xs font-bold uppercase tracking-wider mb-3.5">
              <Instagram className="w-3.5 h-3.5" />
              <span>{handle}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
              ACOMPANHE A{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-pink-200 to-white">
                {config.name}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl">
              Veja nossos treinos, vídeos e a rotina inspiradora da nossa comunidade feminina.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 mr-2">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-surface hover:bg-brand-pink text-zinc-300 hover:text-white border border-white/10 transition-all"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-surface hover:bg-brand-pink text-zinc-300 hover:text-white border border-white/10 transition-all"
                aria-label="Próximo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-surface-card hover:bg-brand-pink border border-white/15 hover:border-brand-pink text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-md group"
            >
              <Instagram className="w-3.5 h-3.5 text-brand-pink group-hover:text-white" />
              <span>Seguir no Instagram</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            </a>
          </div>
        </div>

        {/* Carrossel */}
        <div className="relative overflow-hidden rounded-3xl p-1">
          <div
            className="flex transition-transform duration-700 ease-out gap-4 sm:gap-6"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / perPage + (perPage === 1 ? 0 : 1.5))
              }%)`,
            }}
          >
            {posts.map((post, i) => (
              <InstagramCard
                key={post.id || i}
                post={post}
                idx={i}
                handle={handle}
                profileUrl={url}
              />
            ))}
          </div>
        </div>

        {/* Paginação */}
        {pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === i
                    ? "w-8 bg-brand-pink shadow-glow-pink"
                    : "w-2 bg-zinc-700 hover:bg-zinc-500"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
