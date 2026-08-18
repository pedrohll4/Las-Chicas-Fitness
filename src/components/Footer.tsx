import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Instagram, MapPin, Phone, Heart, Code2 } from "lucide-react";
import { ACADEMY_CONFIG, getWhatsAppUrl } from "@/config/academy";

export function Footer() {
  return (
    <footer className="bg-[#070709] border-t border-white/10 text-zinc-400 text-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="#hero" className="inline-block relative h-14 w-44">
              <Image
                src="/images/logo.png"
                alt="Logo Las Chicas Fitness"
                fill
                className="object-contain filter drop-shadow-[0_2px_10px_rgba(255,46,147,0.3)]"
                sizes="180px"
              />
            </Link>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {ACADEMY_CONFIG.aboutDescription}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-surface border border-white/10 hover:border-brand-pink text-zinc-300 hover:text-brand-pink transition-all shadow-sm"
                aria-label="WhatsApp Las Chicas Fitness"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={ACADEMY_CONFIG.contacts.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-surface border border-white/10 hover:border-brand-pink text-zinc-300 hover:text-brand-pink transition-all shadow-sm"
                aria-label="Instagram Las Chicas Fitness"
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
            </ul>
          </div>

          {/* Modalities */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Modalidades
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {ACADEMY_CONFIG.modalities.map((item) => (
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
                <span>{ACADEMY_CONFIG.contacts.address.fullAddress}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-pink shrink-0" />
                <span>{ACADEMY_CONFIG.contacts.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-brand-pink shrink-0" />
                <span>{ACADEMY_CONFIG.contacts.whatsappDisplay}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Watermark */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 {ACADEMY_CONFIG.name}. Todos os direitos reservados.</p>

          {/* Marca d'água discreta: Feito por Pedro */}
          <div className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02] hover:bg-brand-pink/10 border border-white/5 hover:border-brand-pink/30 text-zinc-400 hover:text-zinc-200 transition-all duration-300 cursor-default">
            <Code2 className="w-3.5 h-3.5 text-zinc-500 group-hover:text-brand-pink transition-colors" />
            <span>Feito por</span>
            <span className="font-semibold text-zinc-300 group-hover:text-brand-pink transition-colors">
              Pedro
            </span>
            <Heart className="w-3 h-3 text-brand-pink/40 group-hover:text-brand-pink group-hover:scale-125 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
}
