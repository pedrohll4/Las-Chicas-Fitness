"use client";

import React, { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, X, ArrowRight, ShieldCheck } from "lucide-react";
import { useAcademy } from "@/context/AcademyContext";

export function AdminLoginModal() {
  const { isLoginModalOpen, closeLoginModal, login } = useAcademy();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoginModalOpen) {
      setPassword("");
      setError(false);
      setShowPassword(false);
    }
  }, [isLoginModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isLoginModalOpen) {
        closeLoginModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoginModalOpen, closeLoginModal]);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    setTimeout(() => {
      const success = login(password);
      setIsLoading(false);
      if (!success) {
        setError(true);
      }
    }, 200);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={closeLoginModal}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-surface border border-brand-pink/30 shadow-2xl shadow-black/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-pink/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeLoginModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-brand-pink/15 text-brand-pink border border-brand-pink/30 shadow-glow-pink">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-brand-pink uppercase tracking-widest block">
              Acesso Restrito
            </span>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">
              Painel de Personalização
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
          Digite sua senha de administrador para personalizar textos, fotos, modalidades e
          informações da academia em tempo real.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
              Senha de Admin
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Digite a senha..."
                required
                autoFocus
                className={`w-full px-4 py-3.5 pr-11 bg-surface-card border rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none transition-all ${
                  error
                    ? "border-red-500 ring-2 ring-red-500/30"
                    : "border-white/15 focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/30"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 p-1 text-zinc-400 hover:text-zinc-200 focus:outline-none"
                aria-label={showPassword ? "Ocultar senha" : "Ver senha"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-xs text-red-400 mt-2 flex items-center gap-1.5 font-medium">
                <span>Senha incorreta. Tente novamente ou use a senha padrão.</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-pink via-[#FF1493] to-[#E11D48] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-glow-pink hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>{isLoading ? "Verificando..." : "Entrar no Painel"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security hint footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-pink" />
            <span>Senha padrão inicial: <strong className="text-zinc-300">admin123</strong></span>
          </span>
        </div>
      </div>
    </div>
  );
}
