"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, MessageCircle, ChevronRight, SlidersHorizontal } from "lucide-react";
import { useAcademy } from "@/context/AcademyContext";
import { NavItem } from "@/types";

const NAV_LINKS: NavItem[] = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#sobre" },
  { label: "Modalidades", href: "#modalidades" },
  { label: "Lojinha", href: "#loja" },
  { label: "Estrutura", href: "#estrutura" },
  { label: "Galeria", href: "#galeria" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Planos", href: "#planos" },
  { label: "Localização", href: "#localizacao" },
];

export function Header() {
  const { config, getWhatsAppUrl, isAdmin, openCustomizer } = useAcademy();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A0A0C]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/50 py-3.5"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo Oficial */}
        <Link
          href="#hero"
          className="group flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02]"
          aria-label={`${config.name} - Início`}
        >
          <div className="relative h-12 w-36 sm:h-14 sm:w-44 flex items-center">
            <Image
              src="/images/logo.png"
              alt={`Logo ${config.name}`}
              fill
              priority
              className="object-contain filter drop-shadow-[0_2px_12px_rgba(255,46,147,0.3)] transition-all duration-300 group-hover:drop-shadow-[0_4px_20px_rgba(255,46,147,0.6)]"
              sizes="(max-width: 640px) 150px, 200px"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-brand-pink scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center rounded-full shadow-[0_0_8px_#FF2E93]" />
            </Link>
          ))}
        </nav>

        {/* CTA Button & Admin Indicator Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          {isAdmin && (
            <button
              type="button"
              onClick={openCustomizer}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-brand-pink/15 hover:bg-brand-pink border border-brand-pink/40 text-pink-200 hover:text-white text-xs font-bold transition-all shadow-sm"
              title="Abrir painel de personalização"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Painel Admin</span>
            </button>
          )}

          <a
            href={getWhatsAppUrl(`Olá! Gostaria de me matricular na ${config.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-brand-pink"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#FF2E93] via-[#FF5CA8] to-[#FF2E93] animate-pulse-subtle rounded-full" />
            <span className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-card transition-all duration-300 group-hover:bg-opacity-80 text-white text-xs xl:text-sm font-bold tracking-wider uppercase">
              <MessageCircle className="w-4 h-4 text-brand-pink group-hover:scale-110 transition-transform" />
              <span>Quero me Matricular</span>
            </span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-surface border border-white/10 text-zinc-200 hover:text-brand-pink focus:outline-none focus:ring-2 focus:ring-brand-pink/50 transition-colors"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[70px] bg-[#0C0C10]/95 backdrop-blur-2xl border-b border-white/10 transition-all duration-300 ease-in-out shadow-2xl ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-6 py-6 space-y-3 max-w-lg mx-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-zinc-200 hover:text-white hover:bg-surface-light border border-transparent hover:border-brand-pink/30 transition-all"
            >
              <span>{link.label}</span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </Link>
          ))}

          <div className="pt-4 border-t border-white/10 space-y-3">
            {isAdmin && (
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openCustomizer();
                }}
                className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-surface-card border border-brand-pink/40 text-pink-200 font-bold text-xs tracking-wider uppercase"
              >
                <SlidersHorizontal className="w-4 h-4 text-brand-pink" />
                <span>Abrir Painel Admin</span>
              </button>
            )}

            <a
              href={getWhatsAppUrl(`Olá! Gostaria de me matricular na ${config.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-pink to-[#E11D48] text-white font-bold text-sm tracking-wider uppercase shadow-glow-pink hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Quero me Matricular</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
