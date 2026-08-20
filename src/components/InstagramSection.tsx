"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Instagram,
  ArrowUpRight,
  Heart,
  MessageCircle,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAcademy } from "@/context/AcademyContext";
import { InstagramPost } from "@/types";

// ─── Helpers ────────────────────────────────────────────────────────────────

function getInstagramEmbedUrl(url: string): string | null {
  if (!url) return null;
  const reelMatch = url.match(/instagram\.com\/reel\/([A-Za-z0-9_-]+)/);
  if (reelMatch) return `https://www.instagram.com/reel/${reelMatch[1]}/embed/`;
  const postMatch = url.match(/instagram\.com\/p\/([A-Za-z0-9_-]+)/);
  if (postMatch) return `https://www.instagram.com/p/${postMatch[1]}/embed/`;
  return null;
}

function isDirectVideo(url: string | undefined): boolean {
  if (!url) return false;
  return url.endsWith(".mp4") || url.endsWith(".webm") || url.startsWith("data:video");
}

function isInstagramLink(url: string | undefined): boolean {
  if (!url) return false;
  return url.includes("instagram.com/reel/") || url.includes("instagram.com/p/");
}

// ─── Componente: Vídeo MP4 em loop ─────────────────────────────────────────

function LoopingVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (v) { v.muted = true; v.play().catch(() => {}); }
  }, [src]);
  return (
    <video ref={ref} src={src} autoPlay loop muted playsInline preload="auto"
      className="w-full h-full object-cover pointer-events-none" />
  );
}

// ─── Componente: Card individual ────────────────────────────────────────────

function PostCard({
  post, idx, handle, profileUrl,
}: {
  post: InstagramPost; idx: number; handle: string; profileUrl: string;
}) {
  const embedUrl = getInstagramEmbedUrl(post.mediaUrl || "");
  const isInsta = isInstagramLink(post.mediaUrl);
  const isVid = isDirectVideo(post.mediaUrl);
  const fallback = `/images/instagram/reel_${(idx % 18) + 1}.jpg`;

  // Ao clicar → abre o permalink ou o próprio link do Instagram
  const href =
    post.permalink?.startsWith("http")
      ? post.permalink
      : isInsta
      ? post.mediaUrl!
      : profileUrl;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] aspect-[4/5] rounded-2xl overflow-hidden bg-[#111] border border-white/10 shadow-lg hover:border-brand-pink/60 hover:shadow-glow-pink transition-all duration-300"
    >
      {/* ══════════ MÍDIA ══════════ */}

      {isVid ? (
        /* Vídeo MP4 direto em loop */
        <LoopingVideo src={post.mediaUrl!} />

      ) : isInsta && embedUrl ? (
        /* Link do Instagram → embed real do Reel/Post */
        <div className="relative w-full h-full bg-black overflow-hidden">
          <iframe
            src={embedUrl}
            className="absolute border-0 pointer-events-none"
            scrolling="no"
            loading="lazy"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(2)",
              width: "100%",
              height: "100%",
              transformOrigin: "center center",
            }}
          />
          {/* Overlay play para indicar que é clicável */}
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors z-[5]" />
          <div className="absolute inset-0 flex items-center justify-center z-[6] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-xl">
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </div>
          </div>
        </div>

      ) : (
        /* Foto normal (upload ou fallback da academia) */
        <Image
          src={post.mediaUrl && !post.mediaUrl.includes("mixkit") && !isInsta ? post.mediaUrl : fallback}
          alt={post.caption || `Las Chicas Fitness ${idx + 1}`}
          fill
          className="object-cover brightness-90 group-hover:scale-105 transition-transform duration-700"
          unoptimized
        />
      )}

      {/* ══════════ BADGE ══════════ */}
      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-bold text-pink-300 flex items-center gap-1.5 z-20 shadow-md">
        {isInsta || post.type === "video" ? (
          <><Play className="w-3 h-3 fill-current text-brand-pink" /><span>Reels</span></>
        ) : (
          <Instagram className="w-3.5 h-3.5 text-brand-pink" />
        )}
      </div>

      {/* ══════════ GRADIENTE ══════════ */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity pointer-events-none z-10" />

      {/* ══════════ TEXTO ══════════ */}
      <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between pointer-events-none z-20">
        <div>
          <span className="text-[11px] font-bold text-pink-200 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            {handle}
          </span>
        </div>
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

// ─── Seção principal ────────────────────────────────────────────────────────

export function InstagramSection() {
  const { config } = useAcademy();
  const posts = config.instagramPosts || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [perPage, setPerPage] = useState(4);

  useEffect(() => {
    const calc = () => setPerPage(innerWidth < 640 ? 1 : innerWidth < 1024 ? 2 : 4);
    calc();
    addEventListener("resize", calc);
    return () => removeEventListener("resize", calc);
  }, []);

  const pages = Math.max(1, posts.length - perPage + 1);

  useEffect(() => {
    if (isPaused || posts.length <= perPage) return;
    const t = setInterval(() => setCurrentIndex((p) => (p + 1 >= pages ? 0 : p + 1)), 4500);
    return () => clearInterval(t);
  }, [isPaused, pages, posts.length, perPage]);

  const handle = config.contacts?.instagramHandle || "@las.chicasfitness";
  const url = config.contacts?.instagramUrl || "https://www.instagram.com/las.chicasfitness/";

  if (!posts.length) return null;

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
              <Instagram className="w-3.5 h-3.5" /><span>{handle}</span>
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
              <button onClick={() => setCurrentIndex((p) => (p === 0 ? pages - 1 : p - 1))}
                className="p-2.5 rounded-xl bg-surface hover:bg-brand-pink text-zinc-300 hover:text-white border border-white/10 transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => setCurrentIndex((p) => (p + 1 >= pages ? 0 : p + 1))}
                className="p-2.5 rounded-xl bg-surface hover:bg-brand-pink text-zinc-300 hover:text-white border border-white/10 transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <a href={url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-surface-card hover:bg-brand-pink border border-white/15 hover:border-brand-pink text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-md group">
              <Instagram className="w-4 h-4 text-brand-pink group-hover:text-white" />
              <span>Seguir no Instagram</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            </a>
          </div>
        </div>

        {/* Carrossel */}
        <div className="relative overflow-hidden rounded-3xl p-1">
          <div className="flex transition-transform duration-700 ease-out gap-4 sm:gap-6"
            style={{ transform: `translateX(-${currentIndex * (100 / perPage + (perPage === 1 ? 0 : 1.5))}%)` }}>
            {posts.map((post, i) => (
              <PostCard key={post.id || i} post={post} idx={i} handle={handle} profileUrl={url} />
            ))}
          </div>
        </div>

        {/* Paginação */}
        {pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: pages }).map((_, i) => (
              <button key={i} onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === i ? "w-8 bg-brand-pink shadow-glow-pink" : "w-2 bg-zinc-700 hover:bg-zinc-500"
                }`} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
