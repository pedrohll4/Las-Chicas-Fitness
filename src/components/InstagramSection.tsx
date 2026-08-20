"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Instagram,
  ArrowUpRight,
  Heart,
  MessageCircle,
  Play,
  ChevronLeft,
  ChevronRight,
  VolumeX,
} from "lucide-react";
import { useAcademy } from "@/context/AcademyContext";

function getInstagramEmbedInfo(url: string) {
  if (!url || typeof url !== "string") return null;
  if (!url.includes("instagram.com/reel/") && !url.includes("instagram.com/p/")) return null;

  let type = "reel";
  let id = "";

  if (url.includes("/reel/")) {
    type = "reel";
    id = url.split("/reel/")[1]?.split("/")[0]?.split("?")[0] || "";
  } else if (url.includes("/p/")) {
    type = "p";
    id = url.split("/p/")[1]?.split("/")[0]?.split("?")[0] || "";
  }

  if (!id) return null;

  return {
    id,
    type,
    embedUrl: `https://www.instagram.com/${type}/${id}/embed/`,
    permalink: `https://www.instagram.com/${type}/${id}/`,
  };
}

export function InstagramSection() {
  const { config } = useAcademy();
  const posts = config.instagramPosts || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Ajusta quantidade de itens visíveis por tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.max(1, posts.length - itemsPerPage + 1);

  // Auto-avanço do carrossel a cada 4 segundos (pausa ao passar o mouse)
  useEffect(() => {
    if (isPaused || posts.length <= itemsPerPage) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1 >= totalPages ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, totalPages, posts.length, itemsPerPage]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1 >= totalPages ? 0 : prev + 1));
  };

  if (!posts || posts.length === 0) return null;

  return (
    <section
      className="py-20 sm:py-28 bg-[#0A0A0C] border-t border-white/5 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-pink/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-pink/10 border border-brand-pink/30 text-brand-pink text-xs font-bold uppercase tracking-wider mb-3.5">
              <Instagram className="w-3.5 h-3.5" />
              <span>{config.contacts.instagramHandle || "@las.chicasfitness"}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
              ACOMPANHE A <br className="sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-pink-200 to-white">
                {config.name}
              </span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl">
              Veja nossos treinos, vídeos, dicas e a rotina inspiradora da nossa comunidade feminina
              no Instagram oficial.
            </p>
          </div>

          {/* Right Action & Carousel Controls */}
          <div className="flex items-center gap-3">
            {/* Carousel navigation arrows */}
            <div className="flex items-center gap-1.5 mr-2">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-surface hover:bg-brand-pink text-zinc-300 hover:text-white border border-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-brand-pink"
                aria-label="Postagens anteriores"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-surface hover:bg-brand-pink text-zinc-300 hover:text-white border border-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-brand-pink"
                aria-label="Próximas postagens"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <a
              href="https://www.instagram.com/las.chicasfitness/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-surface-card hover:bg-brand-pink border border-white/15 hover:border-brand-pink text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-md group"
            >
              <Instagram className="w-4 h-4 text-brand-pink group-hover:text-white group-hover:rotate-12 transition-transform" />
              <span>Seguir no Instagram</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            </a>
          </div>
        </div>

        {/* Carousel Slider Window */}
        <div className="relative overflow-hidden rounded-3xl p-1">
          <div
            className="flex transition-transform duration-700 ease-out gap-4 sm:gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage + (itemsPerPage === 1 ? 0 : 1.5))}%)`,
            }}
          >
            {posts.map((post, idx) => {
              const instaEmbed = getInstagramEmbedInfo(post.mediaUrl || "");
              const isMp4Video =
                !instaEmbed &&
                (post.mediaUrl?.endsWith(".mp4") ||
                  post.mediaUrl?.endsWith(".webm") ||
                  post.mediaUrl?.includes("video"));
              const isReel = post.type === "video" || isMp4Video || !!instaEmbed;

              const targetUrl =
                instaEmbed?.permalink ||
                (post.permalink && post.permalink.startsWith("http")
                  ? post.permalink
                  : "https://www.instagram.com/las.chicasfitness/");

              return (
                <a
                  key={post.id || idx}
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] aspect-[4/5] rounded-2xl overflow-hidden bg-surface border border-white/10 shadow-lg hover:border-brand-pink/60 hover:shadow-glow-pink transition-all duration-300"
                >
                  {/* Option 1: Instagram Embed iframe (quando cola link do instagram.com/reel/...) */}
                  {instaEmbed ? (
                    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
                      <iframe
                        src={instaEmbed.embedUrl}
                        className="w-full h-full border-0 pointer-events-none scale-105"
                        scrolling="no"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-bold text-pink-300 flex items-center gap-1.5 z-20">
                        <Play className="w-3 h-3 fill-current" />
                        <span>Reels</span>
                      </div>
                    </div>
                  ) : isMp4Video ? (
                    /* Option 2: Direct MP4 Video */
                    <div className="relative w-full h-full bg-black">
                      <video
                        src={post.mediaUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-bold text-pink-300 flex items-center gap-1.5 z-20">
                        <Play className="w-3 h-3 fill-current" />
                        <span>Reels</span>
                        <VolumeX className="w-3 h-3 text-zinc-400 ml-0.5" />
                      </div>
                    </div>
                  ) : (
                    /* Option 3: Image / Snapshot */
                    <div className="relative w-full h-full bg-surface-card">
                      <Image
                        src={post.mediaUrl || "/images/instagram/reel_13.jpg"}
                        alt={post.caption || `Postagem Instagram ${idx + 1}`}
                        fill
                        className="object-cover object-center group-hover:scale-105 filter brightness-95 group-hover:brightness-100 transition-transform duration-700 ease-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        unoptimized={true}
                      />
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-pink-300 flex items-center gap-1 z-20">
                        {isReel ? (
                          <>
                            <Play className="w-3 h-3 fill-current" />
                            <span className="text-[10px] font-bold">Reels</span>
                          </>
                        ) : (
                          <Instagram className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </div>
                  )}

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-75 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none" />

                  {/* Hover & Details Content */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between pointer-events-none">
                    {/* Top: Handle */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-pink-200 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                        {config.contacts.instagramHandle || "@las.chicasfitness"}
                      </span>
                    </div>

                    {/* Bottom: Caption & Engagement Stats */}
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
            })}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "w-8 bg-brand-pink shadow-glow-pink"
                    : "w-2 bg-zinc-700 hover:bg-zinc-500"
                }`}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
