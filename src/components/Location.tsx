"use client";

import { MapPin, Clock, Phone, MessageCircle, Instagram, Mail, Navigation } from "lucide-react";
import { useAcademy } from "@/context/AcademyContext";

export function Location() {
  const { config, getWhatsAppUrl } = useAcademy();

  return (
    <section id="localizacao" className="py-24 sm:py-32 bg-[#0C0C10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-bold uppercase tracking-wider mb-4">
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
                    {config.contacts.address.fullAddress}
                  </p>
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
              <span className="text-[11px] font-mono text-zinc-500">Google Maps</span>
            </div>

            {/* Map Frame */}
            <div className="flex-1 w-full h-full relative">
              {config.contacts.googleMapsEmbedUrl ? (
                <iframe
                  title="Mapa de Localização"
                  src={config.contacts.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[320px] filter grayscale contrast-125 invert-[0.9] hue-rotate-180 opacity-90"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-surface p-6 text-center text-zinc-500 text-xs">
                  Insira o link do iframe do Google Maps no painel de personalização
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
