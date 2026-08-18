"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/config/academy";

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip */}
      <div
        className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-card/95 border border-white/10 text-xs font-semibold text-white shadow-2xl backdrop-blur-md transition-all duration-300 pointer-events-none ${
          isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-3"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span>Fale Conosco no WhatsApp</span>
      </div>

      {/* Floating Action Button */}
      <a
        href={getWhatsAppUrl("Olá! Gostaria de mais informações sobre os planos da Las Chicas Fitness.")}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group p-4 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white shadow-[0_4px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_35px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/40"
        aria-label="Iniciar conversa no WhatsApp"
      >
        {/* Pulsing Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />

        <MessageCircle className="w-7 h-7 relative z-10 filter drop-shadow" />
      </a>
    </div>
  );
}
