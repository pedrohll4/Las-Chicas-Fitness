"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Dumbbell,
  ShoppingBag,
  Headphones,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useAcademy } from "@/context/AcademyContext";
import { WhatsAppContact } from "@/types";

export function WhatsAppButton() {
  const { config, getWhatsAppUrl } = useAcademy();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Fecha o popover ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Monta lista de canais disponíveis de forma única e limpa
  const channels: Array<{
    id: string;
    title: string;
    description: string;
    number: string;
    icon: any;
    defaultMsg: string;
  }> = [];

  const mainNumber = config.contacts.whatsappNumber?.trim();
  const shopNumber = config.contacts.whatsappShopNumber?.trim();
  const extraNumber = config.contacts.whatsappExtraNumber?.trim();

  // 1. Canal de Recepção / Planos (Principal)
  if (mainNumber) {
    channels.push({
      id: "recepcao",
      title: "Recepção & Matrículas",
      description: "Planos, horários, aulas e mensalidades",
      number: mainNumber,
      icon: Dumbbell,
      defaultMsg: `Olá! Gostaria de saber mais sobre as matrículas e planos da ${config.name}.`,
    });
  }

  // 2. Canal da Lojinha (somente se preenchido)
  if (shopNumber) {
    channels.push({
      id: "loja",
      title: "Lojinha & Moda Fitness",
      description: "Roupas, garrafas térmicas e encomendas",
      number: shopNumber,
      icon: ShoppingBag,
      defaultMsg: `Olá! Gostaria de informações sobre os produtos e roupas da Lojinha ${config.name}.`,
    });
  }

  // 3. Canal de Atendimento Adicional (Suporte / Central - somente se preenchido)
  if (extraNumber) {
    channels.push({
      id: "suporte",
      title: "Atendimento Personalizado",
      description: "Fale diretamente com a nossa equipe",
      number: extraNumber,
      icon: Headphones,
      defaultMsg: `Olá! Gostaria de falar com o atendimento da ${config.name}.`,
    });
  }

  const hasMultipleChannels = channels.length > 1;

  const handleButtonClick = (e: React.MouseEvent) => {
    if (hasMultipleChannels) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div ref={popoverRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover com Múltiplos Números / Setores */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-3xl bg-[#111116]/95 border border-white/15 p-5 shadow-2xl backdrop-blur-xl animate-scaleUp">
          {/* Header do Popover */}
          <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#25D366]/20 border border-[#25D366]/50 flex items-center justify-center text-[#25D366]">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-none">
                  Central WhatsApp
                </h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-zinc-400 font-medium">
                    Selecione o setor de atendimento:
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Lista de Canais */}
          <div className="space-y-2">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <a
                  key={channel.id}
                  href={getWhatsAppUrl(channel.defaultMsg, channel.number)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-surface-light border border-white/5 hover:border-brand-pink/40 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-pink/15 text-brand-pink border border-brand-pink/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white group-hover:text-pink-200 transition-colors">
                        {channel.title}
                      </h5>
                      <p className="text-[10px] text-zinc-400 leading-tight mt-0.5">
                        {channel.description}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-brand-pink group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Botão Flutuante Principal */}
      <div className="flex items-center gap-3">
        {/* Tooltip quando não está aberto */}
        {!isOpen && (
          <div
            className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-card/95 border border-white/10 text-xs font-semibold text-white shadow-2xl backdrop-blur-md transition-all duration-300 pointer-events-none ${
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>
              {hasMultipleChannels ? "Escolher Canal de Atendimento" : "Fale Conosco no WhatsApp"}
            </span>
          </div>
        )}

        <a
          href={
            hasMultipleChannels
              ? "#"
              : getWhatsAppUrl(`Olá! Gostaria de mais informações sobre a ${config.name}.`)
          }
          target={hasMultipleChannels ? undefined : "_blank"}
          rel={hasMultipleChannels ? undefined : "noopener noreferrer"}
          onClick={handleButtonClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative group p-4 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white shadow-[0_4px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_35px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/40 cursor-pointer"
          aria-label="Iniciar conversa no WhatsApp"
        >
          {/* Pulsing Ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />

          {isOpen ? (
            <X className="w-7 h-7 relative z-10 filter drop-shadow" />
          ) : (
            <MessageCircle className="w-7 h-7 relative z-10 filter drop-shadow" />
          )}
        </a>
      </div>
    </div>
  );
}
