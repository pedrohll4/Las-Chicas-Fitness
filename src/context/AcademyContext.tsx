"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  AcademyConfig,
  ModalityItem,
  StructureItem,
  GalleryItem,
  BenefitItem,
  PlanItem,
  InstagramPost,
  StatItem,
} from "@/types";
import { ACADEMY_CONFIG } from "@/config/academy";

interface AcademyContextType {
  config: AcademyConfig;
  updateConfig: (newConfig: Partial<AcademyConfig>) => void;
  updateModalities: (modalities: ModalityItem[]) => void;
  updateStructure: (structure: StructureItem[]) => void;
  updateGallery: (gallery: GalleryItem[]) => void;
  updateBenefits: (benefits: BenefitItem[]) => void;
  updatePlans: (plans: PlanItem[]) => void;
  updateInstagramPosts: (posts: InstagramPost[]) => void;
  updateStats: (stats: StatItem[]) => void;
  resetToDefaults: () => void;
  exportConfigJson: () => string;
  importConfigJson: (jsonStr: string) => boolean;

  saveGlobalConfig: (overrideConfig?: AcademyConfig) => Promise<boolean>;
  isSavingGlobal: boolean;

  // Auth & UI state
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isCustomizerOpen: boolean;
  openCustomizer: () => void;
  closeCustomizer: () => void;
  getWhatsAppUrl: (customMessage?: string) => string;
}

const STORAGE_KEY_CONFIG = "las_chicas_fitness_config_v1";
const STORAGE_KEY_AUTH = "las_chicas_fitness_admin_auth";
const STORAGE_KEY_PASS = "las_chicas_fitness_admin_pass";
const DEFAULT_PASSWORD = "admin123";

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

export function AcademyProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<AcademyConfig>(ACADEMY_CONFIG);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isSavingGlobal, setIsSavingGlobal] = useState<boolean>(false);

  // 1. Carregar dados do localStorage e sincronizar com a nuvem/servidor ao iniciar
  useEffect(() => {
    // A) Carregamento rápido inicial do localStorage
    try {
      const savedConfig = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        setConfig((prev) => ({
          ...ACADEMY_CONFIG,
          ...prev,
          ...parsed,
          contacts: {
            ...ACADEMY_CONFIG.contacts,
            ...(parsed.contacts || {}),
          },
          plans:
            Array.isArray(parsed.plans) && parsed.plans.length > 0
              ? parsed.plans
              : ACADEMY_CONFIG.plans,
          instagramPosts:
            Array.isArray(parsed.instagramPosts) && parsed.instagramPosts.length > 0
              ? parsed.instagramPosts
              : ACADEMY_CONFIG.instagramPosts,
        }));
      }

      const savedAuth = sessionStorage.getItem(STORAGE_KEY_AUTH);
      if (savedAuth === "true") {
        setIsAdmin(true);
      }
    } catch (e) {
      console.error("Erro ao carregar dados do localStorage:", e);
    } finally {
      setIsInitialized(true);
    }

    // B) Sincronização em segundo plano com a API global na nuvem (sempre busca a versão fresca)
    fetch("/api/config", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data?.config && data.source !== "default") {
          const freshConfig: AcademyConfig = {
            ...ACADEMY_CONFIG,
            ...data.config,
            contacts: {
              ...ACADEMY_CONFIG.contacts,
              ...(data.config.contacts || {}),
            },
          };
          setConfig(freshConfig);
          try {
            localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(freshConfig));
          } catch (err) {}
        }
      })
      .catch((err) => {
        console.warn("Não foi possível sincronizar da nuvem:", err);
      });
  }, []);

  // Salvar no localStorage e atualizar estado
  const persistConfig = (newConfig: AcademyConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(newConfig));
    } catch (e) {
      console.error("Erro ao salvar configuração no localStorage:", e);
    }
  };

  // Salvar na Nuvem / Servidor para todos os visitantes do site
  const saveGlobalConfig = async (overrideConfig?: AcademyConfig): Promise<boolean> => {
    setIsSavingGlobal(true);
    const configToSave = overrideConfig || config;
    try {
      const res = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config: configToSave }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        try {
          localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(configToSave));
        } catch (e) {}
        return true;
      }
      return false;
    } catch (e) {
      console.error("Erro ao salvar na nuvem:", e);
      return false;
    } finally {
      setIsSavingGlobal(false);
    }
  };

  const updateConfig = (partial: Partial<AcademyConfig>) => {
    const updated = { ...config, ...partial };
    persistConfig(updated);
  };

  const updateModalities = (modalities: ModalityItem[]) => {
    const updated = { ...config, modalities };
    persistConfig(updated);
  };

  const updateStructure = (structure: StructureItem[]) => {
    const updated = { ...config, structure };
    persistConfig(updated);
  };

  const updateGallery = (gallery: GalleryItem[]) => {
    const updated = { ...config, gallery };
    persistConfig(updated);
  };

  const updateBenefits = (benefits: BenefitItem[]) => {
    const updated = { ...config, benefits };
    persistConfig(updated);
  };

  const updatePlans = (plans: PlanItem[]) => {
    const updated = { ...config, plans };
    persistConfig(updated);
  };

  const updateInstagramPosts = (instagramPosts: InstagramPost[]) => {
    const updated = { ...config, instagramPosts };
    persistConfig(updated);
  };

  const updateStats = (stats: StatItem[]) => {
    const updated = { ...config, stats };
    persistConfig(updated);
  };

  const resetToDefaults = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_CONFIG);
      setConfig(ACADEMY_CONFIG);
    } catch (e) {
      console.error("Erro ao resetar para os padrões:", e);
    }
  };

  const exportConfigJson = (): string => {
    return JSON.stringify(config, null, 2);
  };

  const importConfigJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === "object" && parsed.name) {
        persistConfig(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Auth functions
  const getStoredPassword = (): string => {
    try {
      return localStorage.getItem(STORAGE_KEY_PASS) || DEFAULT_PASSWORD;
    } catch {
      return DEFAULT_PASSWORD;
    }
  };

  const login = (password: string): boolean => {
    const actualPass = getStoredPassword();
    if (password.trim() === actualPass.trim()) {
      setIsAdmin(true);
      try {
        sessionStorage.setItem(STORAGE_KEY_AUTH, "true");
      } catch (e) {
        console.error(e);
      }
      setIsLoginModalOpen(false);
      setIsCustomizerOpen(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    setIsCustomizerOpen(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY_AUTH);
    } catch (e) {
      console.error(e);
    }
  };

  const changePassword = (oldPass: string, newPass: string): boolean => {
    const currentPass = getStoredPassword();
    if (oldPass.trim() === currentPass.trim() && newPass.trim().length >= 4) {
      try {
        localStorage.setItem(STORAGE_KEY_PASS, newPass.trim());
        return true;
      } catch {
        return false;
      }
    }
    return false;
  };

  const openLoginModal = () => {
    if (isAdmin) {
      setIsCustomizerOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openCustomizer = () => {
    if (isAdmin) {
      setIsCustomizerOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };
  const closeCustomizer = () => setIsCustomizerOpen(false);

  const getWhatsAppUrl = (customMessage?: string): string => {
    const phone = config.contacts.whatsappNumber.replace(/\D/g, "");
    const message =
      customMessage ||
      `Olá! Gostaria de saber mais sobre as matrículas e planos da ${config.name}.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <AcademyContext.Provider
      value={{
        config,
        updateConfig,
        updateModalities,
        updateStructure,
        updateGallery,
        updateBenefits,
        updatePlans,
        updateInstagramPosts,
        updateStats,
        resetToDefaults,
        exportConfigJson,
        importConfigJson,
        saveGlobalConfig,
        isSavingGlobal,
        isAdmin,
        login,
        logout,
        changePassword,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        isCustomizerOpen,
        openCustomizer,
        closeCustomizer,
        getWhatsAppUrl,
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
}

export function useAcademy() {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error("useAcademy deve ser usado dentro de um AcademyProvider");
  }
  return context;
}
