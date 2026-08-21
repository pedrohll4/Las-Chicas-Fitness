"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  Instagram,
  MapPin,
  Phone,
  Heart,
  Code2,
  SlidersHorizontal,
  Lock,
} from "lucide-react";
import { useAcademy } from "@/context/AcademyContext";

export function Footer() {
  const { config, getWhatsAppUrl, openCustomizer, isAdmin } = useAcademy();

  return (
    <footer className="bg-[#070709] border-t border-white/10 text-zinc-400 text-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="#hero" className="inline-block relative h-14 w-44">
              <Image
                src="/images/logo.png"
                alt={`Logo ${config.name}`}
                fill
                className="object-contain filter drop-shadow-[0_2px_10px_rgba(255,46,147,0.3)]"
                sizes="180px"
              />
            </Link>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {config.aboutDescription}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-surface border border-white/10 hover:border-brand-pink text-zinc-300 hover:text-brand-pink transition-all shadow-sm"
                aria-label={`WhatsApp ${config.name}`}
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={
                  config.contacts.instagramUrl &&
                  config.contacts.instagramUrl.includes("las.chicasfitness")
                    ? config.contacts.instagramUrl
                    : "https://www.instagram.com/las.chicasfitness/"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-surface border border-white/10 hover:border-brand-pink text-zinc-300 hover:text-brand-pink transition-all shadow-sm"
                aria-label={`Instagram ${config.name}`}
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="#hero" className="hover:text-brand-pink transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="#sobre" className="hover:text-brand-pink transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="#modalidades" className="hover:text-brand-pink transition-colors">
                  Modalidades
                </Link>
              </li>
              <li>
                <Link href="#beneficios" className="hover:text-brand-pink transition-colors">
                  Diferenciais
                </Link>
              </li>
              <li>
                <Link href="#estrutura" className="hover:text-brand-pink transition-colors">
                  Estrutura
                </Link>
              </li>
              <li>
                <Link href="#galeria" className="hover:text-brand-pink transition-colors">
                  Galeria
                </Link>
              </li>
              <li>
                <Link href="#planos" className="hover:text-brand-pink transition-colors">
                  Planos
                </Link>
              </li>
            </ul>
          </div>

          {/* Modalities */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Modalidades
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {config.modalities.map((item) => (
                <li key={item.id}>
                  <Link href="#modalidades" className="hover:text-brand-pink transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Atendimento
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                <span>{config.contacts.address.fullAddress}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-pink shrink-0" />
                <span>{config.contacts.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-brand-pink shrink-0" />
                <span>{config.contacts.whatsappDisplay}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Watermark & Personalizar Button */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 {config.name}. Todos os direitos reservados.</p>

          <div className="flex items-center gap-3">
            {/* Botão Personalizar Solicitado pelo Usuário */}
            <button
              type="button"
              onClick={openCustomizer}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface hover:bg-brand-pink/15 border border-white/10 hover:border-brand-pink/50 text-zinc-300 hover:text-white transition-all shadow-sm group cursor-pointer"
              title="Acessar painel de personalização do site"
            >
              {isAdmin ? (
                <SlidersHorizontal className="w-3.5 h-3.5 text-brand-pink group-hover:rotate-45 transition-transform" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-brand-pink" />
              )}
              <span className="font-semibold text-xs text-zinc-200 group-hover:text-white">
                Personalizar
              </span>
              {isAdmin && (
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              )}
            </button>

            {/* Marca d'água: Feito por Pedro com link direto para WhatsApp */}
            <a
              href="https://wa.me/5569992102965?text=Ol%C3%A1%20Pedro!%20Vi%20que%20voc%C3%AA%20fez%20o%20site%20da%20Las%20Chicas%20Fitness.%20Gostaria%20de%20saber%20mais%20sobre%20como%20funciona%20para%20criar%20um%20site%20para%20o%20meu%20neg%C3%B3cio!"
              target="_blank"
              rel="noopener noreferrer"
              title="Falar com Pedro (Desenvolvedor)"
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-brand-pink/10 border border-white/10 hover:border-brand-pink/30 text-zinc-400 hover:text-zinc-200 transition-all duration-300 hover:scale-105"
            >
              <Code2 className="w-3.5 h-3.5 text-zinc-500 group-hover:text-brand-pink transition-colors" />
              <span>Feito por</span>
              <span className="font-semibold text-zinc-300 group-hover:text-brand-pink transition-colors">
                Pedro
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
