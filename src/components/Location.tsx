"use client";

import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Instagram,
  Mail,
  Navigation,
  ExternalLink,
} from "lucide-react";
import { useAcademy } from "@/context/AcademyContext";

export function Location() {
  const { config, getWhatsAppUrl } = useAcademy();

  // Endereço formatado para busca
  const fullAddress =
    config.contacts.address?.fullAddress ||
    `${config.contacts.address?.street || ""}, ${config.contacts.address?.city || ""}` ||
    "Las Chicas Fitness";

  // Gera URL do Iframe segura e 100% funcional do Google Maps
  const getMapEmbedUrl = () => {
    const raw = config.contacts.googleMapsEmbedUrl;
    if (raw && typeof raw === "string" && raw.trim().length > 0) {
      let trimmed = raw.trim();

      // 1. Se colou o código completo de <iframe>
      if (trimmed.includes("<iframe")) {
        const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
        if (srcMatch && srcMatch[1]) trimmed = srcMatch[1];
      }

      // 2. Se for link do local oficial Las Chicas Fitness ou encurtado maps.app.goo.gl
      if (
        trimmed.includes("ZNCfRiW2RgeY65cXA") ||
        trimmed.includes("0x93cc910fb352ce89") ||
        trimmed.includes("-9.8974622")
      ) {
        return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.8!2d-63.035374!3d-9.8974622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93cc910fb352ce89%3A0xa57c491e89f17f29!2sLas%20Chicas%20Fitness!5e0!3m2!1spt-BR!2sbr!4v1787313800000!5m2!1spt-BR!2sbr";
      }

      // 3. Se for uma URL oficial de embed (/maps/embed ou output=embed)
      if (
        (trimmed.includes("/maps/embed") || trimmed.includes("output=embed")) &&
        !trimmed.includes("0x0%3A0x0")
      ) {
        return trimmed;
      }

      // 4. Se tiver coordenadas na URL (ex: @-9.8974622,-63.035374)
      const coordMatch = trimmed.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (coordMatch) {
        return `https://maps.google.com/maps?q=${coordMatch[1]},${coordMatch[2]}&hl=pt-BR&z=17&output=embed`;
      }
    }

    // Embed Universal automático baseado no endereço / nome da academia
    return `https://maps.google.com/maps?q=${encodeURIComponent(
      fullAddress
    )}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  };

  // Link para abrir direto no app do Google Maps / Waze
  const directionsUrl =
    config.contacts.googleMapsEmbedUrl &&
    config.contacts.googleMapsEmbedUrl.includes("maps.app.goo.gl")
      ? config.contacts.googleMapsEmbedUrl
      : "https://maps.app.goo.gl/ZNCfRiW2RgeY65cXA";

  return (
    <section id="localizacao" className="py-24 sm:py-32 bg-[#0C0C10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span>Localização & Contato</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
            VENHA NOS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-pink-300">
              CONHECER
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400">
            Estamos de portas abertas para receber você. Confira nossos horários e localização ou
            entre em contato para tirar suas dúvidas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Info Cards Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Endereço & Horários Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-white/10 shadow-card-dark">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-brand-pink/10 text-brand-pink shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Nosso Endereço</h3>
                  <p className="text-sm text-zinc-300 leading-relaxed font-mono">
                    {fullAddress}
                  </p>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-pink hover:text-pink-300 mt-2.5 transition-colors"
                  >
                    <span>Como chegar pelo GPS</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-brand-pink/10 text-brand-pink shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Horários de Treino</h3>
                  <div className="space-y-1.5 text-xs sm:text-sm text-zinc-300">
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
                      <span>{config.hours.weekdays}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                      <span>{config.hours.saturdays}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-300" />
                      <span>{config.hours.sundaysAndHolidays}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Canais Rápidos Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-white/10 shadow-card-dark">
              <h3 className="text-base font-bold text-white mb-4 uppercase tracking-wider text-zinc-300">
                Canais de Atendimento
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-surface-light hover:bg-brand-pink/20 border border-white/5 hover:border-brand-pink/40 text-zinc-200 hover:text-white transition-all text-xs font-semibold"
                >
                  <MessageCircle className="w-4 h-4 text-brand-pink shrink-0" />
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase">WhatsApp</span>
                    <span>{config.contacts.whatsappDisplay}</span>
                  </div>
                </a>

                <a
                  href={`tel:${config.contacts.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-surface-light hover:bg-brand-pink/20 border border-white/5 hover:border-brand-pink/40 text-zinc-200 hover:text-white transition-all text-xs font-semibold"
                >
                  <Phone className="w-4 h-4 text-brand-pink shrink-0" />
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase">Telefone</span>
                    <span>{config.contacts.phone}</span>
                  </div>
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
                  className="flex items-center gap-3 p-3 rounded-xl bg-surface-light hover:bg-brand-pink/20 border border-white/5 hover:border-brand-pink/40 text-zinc-200 hover:text-white transition-all text-xs font-semibold"
                >
                  <Instagram className="w-4 h-4 text-brand-pink shrink-0" />
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase">Instagram</span>
                    <span>{config.contacts.instagramHandle}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${config.contacts.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-surface-light hover:bg-brand-pink/20 border border-white/5 hover:border-brand-pink/40 text-zinc-200 hover:text-white transition-all text-xs font-semibold"
                >
                  <Mail className="w-4 h-4 text-brand-pink shrink-0" />
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase">E-mail</span>
                    <span>{config.contacts.email}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Map Column */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 shadow-card-dark bg-surface flex flex-col min-h-[380px] lg:min-h-[460px] relative">
            {/* Top Bar on Map */}
            <div className="p-4 bg-surface-card border-b border-white/10 flex items-center justify-between z-10">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                <Navigation className="w-4 h-4 text-brand-pink" />
                <span>Mapa Interativo da Unidade</span>
              </div>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-light hover:bg-brand-pink border border-white/10 text-zinc-300 hover:text-white text-xs font-bold transition-all"
              >
                <span>Traçar Rota</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Map Frame */}
            <div className="flex-1 w-full h-full relative min-h-[340px] bg-[#1a1a24]">
              <iframe
                title="Mapa de Localização Las Chicas Fitness"
                src={getMapEmbedUrl()}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[340px] opacity-95"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
