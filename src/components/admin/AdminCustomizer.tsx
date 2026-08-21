"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  LogOut,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Trash2,
  Check,
  Building2,
  Dumbbell,
  Images,
  Camera,
  Award,
  PhoneCall,
  Settings,
  Sparkles,
  CreditCard,
  Star,
  Instagram,
  Video,
  AlertCircle,
  Key,
  MessageSquareHeart,
  Quote,
  ShoppingBag,
  Tag,
} from "lucide-react";
import { useAcademy } from "@/context/AcademyContext";
import { ImageUploader } from "@/components/admin/ImageUploader";
import {
  AcademyConfig,
  ModalityItem,
  StructureItem,
  GalleryItem,
  BenefitItem,
  StatItem,
  PlanItem,
  InstagramPost,
  TestimonialItem,
  ProductItem,
} from "@/types";

function AdminInstagramMediaPreview({ url }: { url: string }) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!url || (!url.includes("instagram.com/p/") && !url.includes("instagram.com/reel/"))) {
      setThumbnail(null);
      setLoading(false);
      setError(false);
      return;
    }

    setLoading(true);
    setError(false);

    fetch(`/api/instagram-oembed?url=${encodeURIComponent(url)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.thumbnailUrl) {
          setThumbnail(data.thumbnailUrl);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [url]);

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#181820] text-zinc-400 text-xs gap-2 p-4 animate-pulse">
        <div className="w-5 h-5 border-2 border-brand-pink border-t-transparent rounded-full animate-spin" />
        <span className="text-[11px] font-medium text-pink-200">Carregando capa do Instagram...</span>
      </div>
    );
  }

  if (thumbnail && !error) {
    return (
      <img
        src={thumbnail}
        alt="Preview do Instagram"
        className="w-full h-full object-cover object-center"
      />
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#181820] text-zinc-400 text-xs p-4 text-center">
      <Instagram className="w-6 h-6 text-brand-pink mb-1.5" />
      <span className="font-bold text-white text-xs">Post do Instagram Reconhecido</span>
      <span className="text-[10px] text-zinc-400 mt-0.5">A foto oficial aparecerá no carrossel do site</span>
    </div>
  );
}

type ActiveTab =
  | "geral"
  | "planos"
  | "loja"
  | "depoimentos"
  | "instagram"
  | "servicos"
  | "estrutura"
  | "galeria"
  | "contatos"
  | "sistema";

export function AdminCustomizer() {
  const {
    config,
    updateConfig,
    updateModalities,
    updateStructure,
    updateGallery,
    updateBenefits,
    updateProducts,
    updatePlans,
    updateInstagramPosts,
    updateTestimonials,
    updateStats,
    resetToDefaults,
    exportConfigJson,
    importConfigJson,
    saveGlobalConfig,
    isSavingGlobal,
    logout,
    changePassword,
    isCustomizerOpen,
    closeCustomizer,
  } = useAcademy();

  const [activeTab, setActiveTab] = useState<ActiveTab>("geral");
  const [formData, setFormData] = useState<AcademyConfig>(config);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [jsonInput, setJsonInput] = useState<string>("");
  const [oldPass, setOldPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [passMessage, setPassMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Sincronizar formData sempre que o customizer abrir
  React.useEffect(() => {
    if (isCustomizerOpen) {
      setFormData(config);
      setPassMessage(null);
      setOldPass("");
      setNewPass("");
    }
  }, [isCustomizerOpen, config]);

  if (!isCustomizerOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveAll = async () => {
    updateConfig(formData);
    const ok = await saveGlobalConfig(formData);
    if (ok) {
      showToast("✅ Publicado com sucesso para todos os visitantes do site!");
    } else {
      showToast("✅ Alterações salvas com sucesso!");
    }
  };

  // Modality handlers
  const handleAddModality = () => {
    const newModality: ModalityItem = {
      id: `modalidade-${Date.now()}`,
      title: "Nova Modalidade",
      subtitle: "Foco e Resultados",
      description: "Descreva os benefícios e dinâmica desta modalidade aqui.",
      iconName: "Dumbbell",
      tags: ["Nova", "Treino"],
      imageUrl:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
      intensity: "Personalizada",
    };
    const updated = [...formData.modalities, newModality];
    setFormData({ ...formData, modalities: updated });
    updateModalities(updated);
    showToast("Nova modalidade adicionada!");
  };

  const handleRemoveModality = (id: string) => {
    const updated = formData.modalities.filter((m) => m.id !== id);
    setFormData({ ...formData, modalities: updated });
    updateModalities(updated);
    showToast("Modalidade removida!");
  };

  const handleUpdateModality = (id: string, partial: Partial<ModalityItem>) => {
    const updated = formData.modalities.map((m) => (m.id === id ? { ...m, ...partial } : m));
    setFormData({ ...formData, modalities: updated });
    updateModalities(updated);
  };

  // Structure handlers
  const handleAddStructure = () => {
    const newItem: StructureItem = {
      id: `str-${Date.now()}`,
      title: "Nova Área da Academia",
      category: "Musculação",
      description: "Descrição detalhada do espaço e maquinários.",
      imageUrl:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    };
    const updated = [...formData.structure, newItem];
    setFormData({ ...formData, structure: updated });
    updateStructure(updated);
    showToast("Nova área adicionada à estrutura!");
  };

  const handleRemoveStructure = (id: string) => {
    const updated = formData.structure.filter((s) => s.id !== id);
    setFormData({ ...formData, structure: updated });
    updateStructure(updated);
    showToast("Foto da estrutura removida!");
  };

  const handleUpdateStructure = (id: string, partial: Partial<StructureItem>) => {
    const updated = formData.structure.map((s) => (s.id === id ? { ...s, ...partial } : s));
    setFormData({ ...formData, structure: updated });
    updateStructure(updated);
  };

  // Gallery handlers
  const handleAddGallery = () => {
    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: "Novo Momento Fitness",
      category: "Comunidade",
      imageUrl:
        "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1200&auto=format&fit=crop",
      aspect: "square",
    };
    const updated = [...formData.gallery, newItem];
    setFormData({ ...formData, gallery: updated });
    updateGallery(updated);
    showToast("Nova foto adicionada à galeria!");
  };

  const handleRemoveGallery = (id: string) => {
    const updated = formData.gallery.filter((g) => g.id !== id);
    setFormData({ ...formData, gallery: updated });
    updateGallery(updated);
    showToast("Foto da galeria removida!");
  };

  const handleUpdateGallery = (id: string, partial: Partial<GalleryItem>) => {
    const updated = formData.gallery.map((g) => (g.id === id ? { ...g, ...partial } : g));
    setFormData({ ...formData, gallery: updated });
    updateGallery(updated);
  };

  // Plan handlers
  const handleAddPlan = () => {
    const newPlan: PlanItem = {
      id: `plano-${Date.now()}`,
      name: "Novo Plano",
      badge: "Opção Flex",
      price: "120",
      period: "/mês",
      billingInfo: "Mensalidade padrão",
      description: "Descrição dos benefícios e do perfil ideal para este plano.",
      features: [
        "Acesso à musculação e cardio",
        "Acompanhamento com instrutores",
        "Sem taxa de adesão",
      ],
      isPopular: false,
      ctaText: "Escolher Plano",
      customMessage: "Olá! Gostaria de me matricular neste plano da Las Chicas Fitness.",
    };
    const updated = [...formData.plans, newPlan];
    setFormData({ ...formData, plans: updated });
    updatePlans(updated);
    showToast("Novo plano adicionado!");
  };

  const handleRemovePlan = (id: string) => {
    const updated = formData.plans.filter((p) => p.id !== id);
    setFormData({ ...formData, plans: updated });
    updatePlans(updated);
    showToast("Plano removido!");
  };

  const handleUpdatePlan = (id: string, partial: Partial<PlanItem>) => {
    const updated = formData.plans.map((p) => (p.id === id ? { ...p, ...partial } : p));
    setFormData({ ...formData, plans: updated });
    updatePlans(updated);
  };

  // Instagram handlers
  const handleAddInstagramPost = () => {
    const newPost: InstagramPost = {
      id: `insta-${Date.now()}`,
      type: "image",
      mediaUrl:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
      likes: "350",
      comments: "25",
      caption: "Superação e energia na Las Chicas Fitness! ✨",
    };
    const updated = [...(formData.instagramPosts || []), newPost];
    setFormData({ ...formData, instagramPosts: updated });
    updateInstagramPosts(updated);
    showToast("Nova postagem do Instagram adicionada!");
  };

  const handleRemoveInstagramPost = (id: string) => {
    const updated = (formData.instagramPosts || []).filter((p) => p.id !== id);
    setFormData({ ...formData, instagramPosts: updated });
    updateInstagramPosts(updated);
    showToast("Postagem removida do carrossel!");
  };

  const handleUpdateInstagramPost = (id: string, partial: Partial<InstagramPost>) => {
    const updated = (formData.instagramPosts || []).map((p) =>
      p.id === id ? { ...p, ...partial } : p
    );
    setFormData({ ...formData, instagramPosts: updated });
    updateInstagramPosts(updated);
  };

  // Testimonials handlers
  const handleAddTestimonial = () => {
    const newTestimonial: TestimonialItem = {
      id: `depo-${Date.now()}`,
      name: "Nova Aluna",
      role: "Aluna Las Chicas",
      rating: 5,
      comment: "Conte a experiência da aluna aqui...",
      imageUrl: "",
      date: "Hoje",
      isVerified: true,
    };
    const updated = [newTestimonial, ...(formData.testimonials || [])];
    setFormData({ ...formData, testimonials: updated });
    updateTestimonials(updated);
    showToast("Novo depoimento adicionado!");
  };

  const handleRemoveTestimonial = (id: string) => {
    const updated = (formData.testimonials || []).filter((t) => t.id !== id);
    setFormData({ ...formData, testimonials: updated });
    updateTestimonials(updated);
    showToast("Depoimento removido!");
  };

  const handleUpdateTestimonial = (id: string, partial: Partial<TestimonialItem>) => {
    const updated = (formData.testimonials || []).map((t) =>
      t.id === id ? { ...t, ...partial } : t
    );
    setFormData({ ...formData, testimonials: updated });
    updateTestimonials(updated);
  };

  // Products handlers
  const handleAddProduct = () => {
    const newProduct: ProductItem = {
      id: `prod-${Date.now()}`,
      name: "Novo Produto / Roupa",
      category: "Roupas & Conjuntos",
      price: "R$ 99,90",
      description: "Descrição da peça ou acessório oficial...",
      sizes: ["P", "M", "G"],
      imageUrl: "",
      tag: "Novo",
      inStock: true,
    };
    const updated = [newProduct, ...(formData.products || [])];
    setFormData({ ...formData, products: updated });
    updateProducts(updated);
    showToast("Novo produto adicionado à loja!");
  };

  const handleRemoveProduct = (id: string) => {
    const updated = (formData.products || []).filter((p) => p.id !== id);
    setFormData({ ...formData, products: updated });
    updateProducts(updated);
    showToast("Produto removido da loja!");
  };

  const handleUpdateProduct = (id: string, partial: Partial<ProductItem>) => {
    const updated = (formData.products || []).map((p) =>
      p.id === id ? { ...p, ...partial } : p
    );
    setFormData({ ...formData, products: updated });
    updateProducts(updated);
  };

  // Export JSON
  const handleDownloadBackup = () => {
    const jsonStr = exportConfigJson();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `las_chicas_fitness_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Backup baixado com sucesso!");
  };

  // Import JSON
  const handleImportJson = () => {
    if (!jsonInput.trim()) return;
    const ok = importConfigJson(jsonInput);
    if (ok) {
      showToast("Configurações importadas e aplicadas!");
      setJsonInput("");
    } else {
      alert("JSON inválido! Verifique o formato e tente novamente.");
    }
  };

  // Password change
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const success = changePassword(oldPass, newPass);
    if (success) {
      setPassMessage({ type: "success", text: "Senha alterada com sucesso!" });
      setOldPass("");
      setNewPass("");
    } else {
      setPassMessage({ type: "error", text: "Senha atual incorreta ou nova senha com menos de 4 dígitos." });
    }
  };

  const TABS = [
    { id: "geral", label: "Geral & Textos", icon: Building2 },
    { id: "planos", label: "Planos & Mensalidades", icon: CreditCard },
    { id: "loja", label: "Lojinha & Roupas", icon: ShoppingBag },
    { id: "depoimentos", label: "Depoimentos", icon: MessageSquareHeart },
    { id: "instagram", label: "Instagram & Vídeos", icon: Instagram },
    { id: "servicos", label: "Serviços & Modalidades", icon: Dumbbell },
    { id: "estrutura", label: "Fotos da Estrutura", icon: Images },
    { id: "galeria", label: "Galeria de Fotos", icon: Camera },
    { id: "contatos", label: "Contatos & Horários", icon: PhoneCall },
    { id: "sistema", label: "Sistema & Backup", icon: Settings },
  ] as const;

  return (
    <div className="fixed inset-0 z-[110] flex justify-end bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[130] flex items-center gap-2 px-5 py-3 rounded-full bg-surface-card border border-brand-pink text-white text-xs font-bold shadow-glow-pink animate-bounce">
          <Check className="w-4 h-4 text-brand-pink" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Drawer Container */}
      <div className="relative w-full max-w-4xl h-full bg-[#0E0E13] border-l border-white/15 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-surface-card border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-pink/15 text-brand-pink border border-brand-pink/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-brand-pink uppercase tracking-wider block">
                Painel de Controle Admin
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                Personalizar Site
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAll}
              disabled={isSavingGlobal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-bold shadow-glow-pink transition-all disabled:opacity-50"
            >
              {isSavingGlobal ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{isSavingGlobal ? "Publicando..." : "Publicar no Site (Salvar)"}</span>
            </button>

            <button
              onClick={logout}
              className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
              title="Sair do Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>

            <button
              onClick={closeCustomizer}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              aria-label="Fechar painel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 bg-surface border-b border-white/10 flex items-center gap-1 overflow-x-auto scrollbar-none shrink-0 py-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-brand-pink text-white shadow-glow-pink"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* ========================================================================= */}
          {/* TAB 1: GERAL & TEXTOS */}
          {/* ========================================================================= */}
          {activeTab === "geral" && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-surface border border-white/5 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-pink-300">
                  Identidade Principal
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Nome da Academia
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        const updated = { ...formData, name: e.target.value };
                        setFormData(updated);
                        updateConfig(updated);
                      }}
                      className="w-full px-3.5 py-2.5 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Nome Curto
                    </label>
                    <input
                      type="text"
                      value={formData.shortName}
                      onChange={(e) => {
                        const updated = { ...formData, shortName: e.target.value };
                        setFormData(updated);
                        updateConfig(updated);
                      }}
                      className="w-full px-3.5 py-2.5 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Slogan Principal (Hero)
                  </label>
                  <input
                    type="text"
                    value={formData.slogan}
                    onChange={(e) => {
                      const updated = { ...formData, slogan: e.target.value };
                      setFormData(updated);
                      updateConfig(updated);
                    }}
                    className="w-full px-3.5 py-2.5 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Subtítulo do Hero
                  </label>
                  <textarea
                    rows={2}
                    value={formData.subSlogan}
                    onChange={(e) => {
                      const updated = { ...formData, subSlogan: e.target.value };
                      setFormData(updated);
                      updateConfig(updated);
                    }}
                    className="w-full px-3.5 py-2.5 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                  />
                </div>
              </div>

              {/* Seção Sobre */}
              <div className="p-4 rounded-2xl bg-surface border border-white/5 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-pink-300">
                  Seção Sobre a Academia
                </h3>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Título da Seção Sobre
                  </label>
                  <input
                    type="text"
                    value={formData.aboutHeadline}
                    onChange={(e) => {
                      const updated = { ...formData, aboutHeadline: e.target.value };
                      setFormData(updated);
                      updateConfig(updated);
                    }}
                    className="w-full px-3.5 py-2.5 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Descrição Principal
                  </label>
                  <textarea
                    rows={3}
                    value={formData.aboutDescription}
                    onChange={(e) => {
                      const updated = { ...formData, aboutDescription: e.target.value };
                      setFormData(updated);
                      updateConfig(updated);
                    }}
                    className="w-full px-3.5 py-2.5 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Texto Secundário
                  </label>
                  <textarea
                    rows={2}
                    value={formData.aboutSecondary}
                    onChange={(e) => {
                      const updated = { ...formData, aboutSecondary: e.target.value };
                      setFormData(updated);
                      updateConfig(updated);
                    }}
                    className="w-full px-3.5 py-2.5 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                  />
                </div>
              </div>

              {/* Estatísticas */}
              <div className="p-4 rounded-2xl bg-surface border border-white/5 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-pink-300">
                  Estatísticas e Números
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formData.stats.map((stat, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-surface-card border border-white/5 space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...formData.stats];
                            newStats[idx].value = e.target.value;
                            setFormData({ ...formData, stats: newStats });
                            updateStats(newStats);
                          }}
                          placeholder="Valor (ex: +1.200)"
                          className="w-1/2 px-3 py-1.5 text-xs font-bold bg-surface border border-white/10 rounded-lg text-white"
                        />
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...formData.stats];
                            newStats[idx].label = e.target.value;
                            setFormData({ ...formData, stats: newStats });
                            updateStats(newStats);
                          }}
                          placeholder="Rótulo (ex: Alunas)"
                          className="w-1/2 px-3 py-1.5 text-xs bg-surface border border-white/10 rounded-lg text-white"
                        />
                      </div>
                      <input
                        type="text"
                        value={stat.description || ""}
                        onChange={(e) => {
                          const newStats = [...formData.stats];
                          newStats[idx].description = e.target.value;
                          setFormData({ ...formData, stats: newStats });
                          updateStats(newStats);
                        }}
                        placeholder="Subtexto descritivo"
                        className="w-full px-3 py-1.5 text-[11px] bg-surface border border-white/10 rounded-lg text-zinc-400"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: PLANOS & MENSALIDADES */}
          {/* ========================================================================= */}
          {activeTab === "planos" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Planos e Preços</h3>
                  <p className="text-xs text-zinc-400">
                    Edite valores, benefícios inclusos e o plano em destaque.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [
                        {
                          id: "plano-mensal",
                          name: "Plano Mensal Flex",
                          badge: "Sem Fidelidade",
                          price: "139",
                          period: "/mês",
                          billingInfo: "Sem taxa de cancelamento",
                          description: "Ideal para quem busca total flexibilidade e liberdade na rotina.",
                          features: [
                            "Acesso livre à área de musculação",
                            "Acesso completo ao estúdio cardio",
                            "Orientação de treino com professores",
                            "Vestiários modernos com armários rotativos",
                            "Sem taxa de matrícula",
                          ],
                          isPopular: false,
                          ctaText: "Escolher Mensal",
                          customMessage: "Olá! Gostaria de me matricular no Plano Mensal Flex da Las Chicas Fitness.",
                        },
                        {
                          id: "plano-anual",
                          name: "Plano Anual VIP",
                          badge: "MAIS ESCOLHIDO",
                          price: "89",
                          period: "/mês",
                          billingInfo: "Economize mais de 35% ao ano",
                          description: "O plano favorito das nossas alunas com a melhor experiência completa.",
                          features: [
                            "Acesso ilimitado a todas as áreas e equipamentos",
                            "Aulas coletivas e Treinamento Funcional inclusos",
                            "Avaliação física e bioimpedância periódica",
                            "1 convidada gratuita por mês (Free Pass)",
                            "Zero taxa de matrícula e anuidade",
                            "Kit de boas-vindas exclusivo Las Chicas",
                          ],
                          isPopular: true,
                          ctaText: "Garantir Plano VIP",
                          customMessage: "Olá! Gostaria de garantir minha vaga no Plano Anual VIP da Las Chicas Fitness.",
                        },
                        {
                          id: "plano-semestral",
                          name: "Plano Semestral Evolution",
                          badge: "Melhor Custo-Benefício",
                          price: "109",
                          period: "/mês",
                          billingInfo: "Compromisso de 6 meses",
                          description: "Constância perfeita para você atingir seus objetivos de evolução.",
                          features: [
                            "Acesso completo a todas as modalidades",
                            "Montagem de treino personalizado",
                            "Avaliação física completa inicial",
                            "Armários e chuveiros premium",
                            "Desconto em eventos e workshops",
                          ],
                          isPopular: false,
                          ctaText: "Escolher Semestral",
                          customMessage: "Olá! Gostaria de me matricular no Plano Semestral Evolution da Las Chicas Fitness.",
                        },
                      ];
                      setFormData({ ...formData, plans: updated });
                      updatePlans(updated);
                      showToast("3 Planos padrões restaurados!");
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-card hover:bg-surface-light border border-white/10 text-zinc-300 hover:text-white text-xs font-semibold transition-all"
                    title="Restaurar os 3 planos sugeridos (Mensal, Semestral, Anual)"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-brand-pink" />
                    <span className="hidden sm:inline">Restaurar 3 Planos</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleAddPlan}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-bold shadow-glow-pink transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar Plano</span>
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                {formData.plans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className={`p-5 rounded-2xl bg-surface border space-y-4 relative ${
                      plan.isPopular
                        ? "border-brand-pink shadow-glow-pink"
                        : "border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-brand-pink uppercase tracking-wider">
                          Plano #{index + 1}
                        </span>
                        {plan.isPopular && (
                          <span className="px-2 py-0.5 rounded-full bg-brand-pink/20 border border-brand-pink/40 text-[10px] font-extrabold text-pink-300 uppercase">
                            Destaque
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-1.5 text-xs text-zinc-300 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={!!plan.isPopular}
                            onChange={(e) =>
                              handleUpdatePlan(plan.id, { isPopular: e.target.checked })
                            }
                            className="rounded border-white/20 text-brand-pink focus:ring-brand-pink accent-brand-pink"
                          />
                          <span>Marcar como Destaque</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => handleRemovePlan(plan.id)}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors ml-2"
                          title="Excluir plano"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                          Nome do Plano
                        </label>
                        <input
                          type="text"
                          value={plan.name}
                          onChange={(e) => handleUpdatePlan(plan.id, { name: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                          Selo / Badge
                        </label>
                        <input
                          type="text"
                          value={plan.badge || ""}
                          onChange={(e) => handleUpdatePlan(plan.id, { badge: e.target.value })}
                          placeholder="Ex: MAIS ESCOLHIDO, Sem Fidelidade"
                          className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                          Preço (apenas número)
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3 text-xs text-zinc-400 font-bold">R$</span>
                          <input
                            type="text"
                            value={plan.price}
                            onChange={(e) => handleUpdatePlan(plan.id, { price: e.target.value })}
                            placeholder="89"
                            className="w-full pl-9 pr-3 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white font-bold focus:outline-none focus:border-brand-pink"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                          Período
                        </label>
                        <input
                          type="text"
                          value={plan.period}
                          onChange={(e) => handleUpdatePlan(plan.id, { period: e.target.value })}
                          placeholder="/mês, /ano"
                          className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                          Info de Cobrança
                        </label>
                        <input
                          type="text"
                          value={plan.billingInfo || ""}
                          onChange={(e) => handleUpdatePlan(plan.id, { billingInfo: e.target.value })}
                          placeholder="Ex: Economize 35%"
                          className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                        Descrição Curta
                      </label>
                      <input
                        type="text"
                        value={plan.description}
                        onChange={(e) => handleUpdatePlan(plan.id, { description: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                        Benefícios Inclusos (1 por linha)
                      </label>
                      <textarea
                        rows={4}
                        value={plan.features.join("\n")}
                        onChange={(e) =>
                          handleUpdatePlan(plan.id, {
                            features: e.target.value.split("\n").filter((f) => f.trim().length > 0),
                          })
                        }
                        placeholder="Acesso livre à musculação&#10;Aulas coletivas inclusas&#10;Sem taxa de matrícula"
                        className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                          Texto do Botão
                        </label>
                        <input
                          type="text"
                          value={plan.ctaText || "Quero me Matricular"}
                          onChange={(e) => handleUpdatePlan(plan.id, { ctaText: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                          Mensagem Automática do WhatsApp
                        </label>
                        <input
                          type="text"
                          value={plan.customMessage || ""}
                          onChange={(e) => handleUpdatePlan(plan.id, { customMessage: e.target.value })}
                          placeholder="Olá! Gostaria de me matricular no..."
                          className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB: LOJINHA & ROUPAS */}
          {/* ========================================================================= */}
          {activeTab === "loja" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Lojinha & Roupas Fitness</h3>
                  <p className="text-xs text-zinc-400">
                    Cadastre roupas, garrafas e acessórios com fotos, valores e botão de compra direta no WhatsApp.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-bold shadow-glow-pink transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Produto</span>
                </button>
              </div>

              <div className="space-y-5">
                {(formData.products || []).map((prod, idx) => (
                  <div
                    key={prod.id || idx}
                    className="p-5 rounded-2xl bg-surface border border-white/5 space-y-4 relative group hover:border-white/15 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-brand-pink/15 text-brand-pink font-bold flex items-center justify-center text-xs">
                          #{idx + 1}
                        </div>
                        <span className="text-sm font-bold text-white">
                          {prod.name || "Produto sem nome"}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(prod.id)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                        title="Remover produto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                          Nome do Produto / Roupa
                        </label>
                        <input
                          type="text"
                          value={prod.name}
                          onChange={(e) =>
                            handleUpdateProduct(prod.id, { name: e.target.value })
                          }
                          placeholder="Ex: Conjunto Seamless Rosa"
                          className="w-full px-3 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                          Categoria
                        </label>
                        <input
                          type="text"
                          value={prod.category}
                          onChange={(e) =>
                            handleUpdateProduct(prod.id, { category: e.target.value })
                          }
                          placeholder="Ex: Roupas & Conjuntos, Acessórios"
                          className="w-full px-3 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                          Preço / Valor
                        </label>
                        <input
                          type="text"
                          value={prod.price}
                          onChange={(e) =>
                            handleUpdateProduct(prod.id, { price: e.target.value })
                          }
                          placeholder="Ex: R$ 99,90"
                          className="w-full px-3 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink font-semibold text-brand-pink"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                          Tag de Destaque (Opcional)
                        </label>
                        <input
                          type="text"
                          value={prod.tag || ""}
                          onChange={(e) =>
                            handleUpdateProduct(prod.id, { tag: e.target.value })
                          }
                          placeholder="Ex: Mais Vendido, Lançamento, Exclusivo"
                          className="w-full px-3 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                          Tamanhos Disponíveis (separados por vírgula)
                        </label>
                        <input
                          type="text"
                          value={(prod.sizes || []).join(", ")}
                          onChange={(e) =>
                            handleUpdateProduct(prod.id, {
                              sizes: e.target.value
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean),
                            })
                          }
                          placeholder="Ex: P, M, G, GG ou Tamanho Único"
                          className="w-full px-3 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Descrição do Produto
                      </label>
                      <textarea
                        rows={2}
                        value={prod.description}
                        onChange={(e) =>
                          handleUpdateProduct(prod.id, { description: e.target.value })
                        }
                        placeholder="Detalhes sobre o tecido, sustentação, material ou benefícios da peça..."
                        className="w-full px-3 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink resize-none"
                      />
                    </div>

                    <ImageUploader
                      label="Foto do Produto (Roupa / Acessório)"
                      value={prod.imageUrl || ""}
                      onChange={(url) =>
                        handleUpdateProduct(prod.id, { imageUrl: url })
                      }
                      aspectRatio="square"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB: DEPOIMENTOS DAS ALUNAS */}
          {/* ========================================================================= */}
          {activeTab === "depoimentos" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Depoimentos & Avaliações</h3>
                  <p className="text-xs text-zinc-400">
                    Gerencie os depoimentos enviados pelas alunas ou adicione novas histórias de sucesso.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddTestimonial}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-bold shadow-glow-pink transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Depoimento</span>
                </button>
              </div>

              <div className="space-y-4">
                {(formData.testimonials || []).map((t, idx) => (
                  <div
                    key={t.id || idx}
                    className="p-5 rounded-2xl bg-surface border border-white/5 space-y-4 relative group hover:border-white/15 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-brand-pink/15 text-brand-pink font-bold flex items-center justify-center text-xs">
                          #{idx + 1}
                        </div>
                        <span className="text-sm font-bold text-white">
                          {t.name || "Aluna sem nome"}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveTestimonial(t.id)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                        title="Remover depoimento"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                          Nome da Aluna / Assinatura
                        </label>
                        <input
                          type="text"
                          value={t.name}
                          onChange={(e) =>
                            handleUpdateTestimonial(t.id, { name: e.target.value })
                          }
                          placeholder="Ex: Mariana Silva"
                          className="w-full px-3 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                          Tempo / Modalidade
                        </label>
                        <input
                          type="text"
                          value={t.role || ""}
                          onChange={(e) =>
                            handleUpdateTestimonial(t.id, { role: e.target.value })
                          }
                          placeholder="Ex: Aluna há 1 ano"
                          className="w-full px-3 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                          Avaliação (Estrelas: 1 a 5)
                        </label>
                        <select
                          value={t.rating || 5}
                          onChange={(e) =>
                            handleUpdateTestimonial(t.id, {
                              rating: parseInt(e.target.value, 10),
                            })
                          }
                          className="w-full px-3 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                        >
                          <option value="5">★★★★★ (5 Estrelas - Excelente)</option>
                          <option value="4">★★★★☆ (4 Estrelas)</option>
                          <option value="3">★★★☆☆ (3 Estrelas)</option>
                          <option value="2">★★☆☆☆ (2 Estrelas)</option>
                          <option value="1">★☆☆☆☆ (1 Estrela)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Texto do Depoimento
                      </label>
                      <textarea
                        rows={3}
                        value={t.comment}
                        onChange={(e) =>
                          handleUpdateTestimonial(t.id, { comment: e.target.value })
                        }
                        placeholder="Depoimento da aluna..."
                        className="w-full px-3 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink resize-none"
                      />
                    </div>

                    <ImageUploader
                      label="Foto da Aluna ou Resultado (Opcional)"
                      value={t.imageUrl || ""}
                      onChange={(url) =>
                        handleUpdateTestimonial(t.id, { imageUrl: url })
                      }
                      aspectRatio="square"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: INSTAGRAM & VÍDEOS */}
          {/* ========================================================================= */}
          {activeTab === "instagram" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Carrossel do Instagram</h3>
                  <p className="text-xs text-zinc-400">
                    Adicione vídeos em loop (sem som) e fotos que aparecem no carrossel dinâmico.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const defaultPosts: InstagramPost[] = [
                        {
                          id: "insta-real-1",
                          type: "video",
                          mediaUrl: "/images/instagram/reel_13.jpg",
                          likes: "1.519",
                          comments: "48",
                          caption: "Espaço exclusivo feito para a sua evolução e força diária! 💖💪 #LasChicasFitness",
                          permalink: "https://www.instagram.com/las.chicasfitness/",
                        },
                        {
                          id: "insta-real-2",
                          type: "video",
                          mediaUrl: "/images/instagram/reel_10.jpg",
                          likes: "2.113",
                          comments: "62",
                          caption: "Mulheres fortes, confiantes e determinadas! Treino de força concluído 🔥",
                          permalink: "https://www.instagram.com/las.chicasfitness/",
                        },
                        {
                          id: "insta-real-3",
                          type: "video",
                          mediaUrl: "/images/instagram/reel_15.jpg",
                          likes: "1.988",
                          comments: "74",
                          caption: "Nossa comunidade reunida em frente ao mural Las Chicas! Energia incomparável ✨",
                          permalink: "https://www.instagram.com/las.chicasfitness/",
                        },
                        {
                          id: "insta-real-4",
                          type: "video",
                          mediaUrl: "/images/instagram/reel_11.jpg",
                          likes: "2.324",
                          comments: "55",
                          caption: "Mais um dia de superação e constância na melhor academia feminina!",
                          permalink: "https://www.instagram.com/las.chicasfitness/",
                        },
                        {
                          id: "insta-real-5",
                          type: "video",
                          mediaUrl: "/images/instagram/reel_14.jpg",
                          likes: "1.001",
                          comments: "39",
                          caption: "Aulão dinâmico com a energia lá em cima! Vem treinar com a gente 🏋️‍♀️",
                          permalink: "https://www.instagram.com/las.chicasfitness/",
                        },
                        {
                          id: "insta-real-6",
                          type: "video",
                          mediaUrl: "/images/instagram/reel_8.jpg",
                          likes: "1.675",
                          comments: "43",
                          caption: "Treino no estilo Las Chicas! Foco, disciplina e autoestima lá no alto 🌸",
                          permalink: "https://www.instagram.com/las.chicasfitness/",
                        },
                        {
                          id: "insta-real-7",
                          type: "video",
                          mediaUrl: "/images/instagram/reel_17.jpg",
                          likes: "4.196",
                          comments: "89",
                          caption: "Juntas somos mais fortes! Comunidade, amizade e foco nos resultados 💗",
                          permalink: "https://www.instagram.com/las.chicasfitness/",
                        },
                        {
                          id: "insta-real-8",
                          type: "video",
                          mediaUrl: "/images/instagram/reel_4.jpg",
                          likes: "1.383",
                          comments: "37",
                          caption: "Amigas que treinam juntas evoluem juntas na Las Chicas Fitness! 👯‍♀️",
                          permalink: "https://www.instagram.com/las.chicasfitness/",
                        },
                        {
                          id: "insta-real-9",
                          type: "video",
                          mediaUrl: "/images/instagram/reel_9.jpg",
                          likes: "786",
                          comments: "28",
                          caption: "Você não pode pular a parte difícil, porque é nela que você cresce! 💥",
                          permalink: "https://www.instagram.com/las.chicasfitness/",
                        },
                        {
                          id: "insta-real-10",
                          type: "video",
                          mediaUrl: "/images/instagram/reel_16.jpg",
                          likes: "4.540",
                          comments: "94",
                          caption: "Eventos temáticos e muita comemoração com as nossas alunas queridas! 🎊",
                          permalink: "https://www.instagram.com/las.chicasfitness/",
                        },
                      ];
                      setFormData({ ...formData, instagramPosts: defaultPosts });
                      updateInstagramPosts(defaultPosts);
                      showToast("10 Postagens e vídeos reais do Instagram restaurados!");
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-card hover:bg-surface-light border border-white/10 text-zinc-300 hover:text-white text-xs font-semibold transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-brand-pink" />
                    <span className="hidden sm:inline">Restaurar Mídias</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleAddInstagramPost}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-bold shadow-glow-pink transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar Mídia</span>
                  </button>
                </div>
              </div>

              {/* Informações do Perfil */}
              <div className="p-4 rounded-2xl bg-surface border border-white/5 space-y-4">
                <h4 className="text-xs font-bold text-brand-pink uppercase tracking-wider">
                  Configurações do Perfil do Instagram
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Nome de Usuário (@arroba)
                    </label>
                    <input
                      type="text"
                      value={formData.contacts.instagramHandle}
                      onChange={(e) => {
                        const updated = {
                          ...formData,
                          contacts: { ...formData.contacts, instagramHandle: e.target.value },
                        };
                        setFormData(updated);
                        updateConfig(updated);
                      }}
                      placeholder="@las.chicasfitness"
                      className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Link Direto do Perfil
                    </label>
                    <input
                      type="text"
                      value={formData.contacts.instagramUrl}
                      onChange={(e) => {
                        const updated = {
                          ...formData,
                          contacts: { ...formData.contacts, instagramUrl: e.target.value },
                        };
                        setFormData(updated);
                        updateConfig(updated);
                      }}
                      placeholder="https://www.instagram.com/las.chicasfitness/"
                      className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Lista de Postagens e Vídeos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(formData.instagramPosts || []).map((post, index) => (
                  <div
                    key={post.id}
                    className="p-5 rounded-2xl bg-surface border border-white/10 space-y-3 relative"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-brand-pink">
                          Mídia #{index + 1}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-zinc-300">
                          {post.type === "video" ? "🎬 Vídeo sem som" : "📷 Foto"}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveInstagramPost(post.id)}
                        className="p-1 rounded text-zinc-500 hover:text-red-400 transition-colors"
                        title="Excluir mídia"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                          Tipo de Mídia
                        </label>
                        <select
                          value={post.type}
                          onChange={(e) =>
                            handleUpdateInstagramPost(post.id, {
                              type: e.target.value as "image" | "video",
                            })
                          }
                          className="w-full px-3 py-1.5 text-xs bg-surface-card border border-white/10 rounded-lg text-white"
                        >
                          <option value="image">Foto</option>
                          <option value="video">Vídeo (Reels / MP4)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                          Curtidas (exibição)
                        </label>
                        <input
                          type="text"
                          value={post.likes}
                          onChange={(e) =>
                            handleUpdateInstagramPost(post.id, { likes: e.target.value })
                          }
                          placeholder="482"
                          className="w-full px-3 py-1.5 text-xs bg-surface-card border border-white/10 rounded-lg text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Legenda do Post
                      </label>
                      <input
                        type="text"
                        value={post.caption || ""}
                        onChange={(e) =>
                          handleUpdateInstagramPost(post.id, { caption: e.target.value })
                        }
                        placeholder="Texto descritivo do treino..."
                        className="w-full px-3 py-1.5 text-xs bg-surface-card border border-white/10 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Link de Destino do Instagram (ao clicar)
                      </label>
                      <input
                        type="text"
                        value={post.permalink || ""}
                        onChange={(e) =>
                          handleUpdateInstagramPost(post.id, { permalink: e.target.value })
                        }
                        placeholder="https://www.instagram.com/reel/... ou https://www.instagram.com/las.chicasfitness/"
                        className="w-full px-3 py-1.5 text-xs bg-surface-card border border-white/10 rounded-lg text-white font-mono text-[11px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Mídia do Post (cole link do Instagram, MP4, ou faça upload)
                      </label>
                      <input
                        type="text"
                        value={post.mediaUrl || ""}
                        onChange={(e) =>
                          handleUpdateInstagramPost(post.id, { mediaUrl: e.target.value })
                        }
                        placeholder="https://www.instagram.com/reel/... ou https://www.instagram.com/p/..."
                        className="w-full px-3 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white font-mono text-[11px] focus:outline-none focus:border-brand-pink"
                      />

                      {/* Preview de Mídia */}
                      {post.mediaUrl && (
                        <div className="mt-2 rounded-xl overflow-hidden bg-black border border-white/10 aspect-[4/5] max-h-60 w-full relative flex items-center justify-center">
                          {post.mediaUrl.endsWith(".mp4") ||
                          post.mediaUrl.endsWith(".webm") ||
                          post.mediaUrl.startsWith("data:video") ? (
                            <video
                              src={post.mediaUrl}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover"
                            />
                          ) : post.mediaUrl.includes("instagram.com") ? (
                            <AdminInstagramMediaPreview url={post.mediaUrl} />
                          ) : (
                            <img
                              src={post.mediaUrl}
                              alt="Preview"
                              className="w-full h-full object-cover object-center"
                            />
                          )}
                        </div>
                      )}

                      {/* Upload de arquivo de imagem/vídeo */}
                      <div className="flex items-center gap-2 mt-1">
                        <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-card border border-white/10 text-xs text-zinc-300 hover:border-brand-pink hover:text-white transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                          Upload do Arquivo
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  handleUpdateInstagramPost(post.id, {
                                    mediaUrl: ev.target?.result as string,
                                  });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                        {post.mediaUrl && !post.mediaUrl.includes("instagram.com") && (
                          <button
                            type="button"
                            onClick={() => handleUpdateInstagramPost(post.id, { mediaUrl: "" })}
                            className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
                          >
                            Limpar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: MODALIDADES & SERVIÇOS */}
          {/* ========================================================================= */}
          {activeTab === "servicos" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Modalidades Oferecidas</h3>
                  <p className="text-xs text-zinc-400">
                    Gerencie os treinos, fotos, tags e descrições exibidas no site.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddModality}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-bold shadow-glow-pink transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Modalidade</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.modalities.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-surface border border-white/10 space-y-4 relative group"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-xs font-bold text-brand-pink uppercase tracking-wider">
                        Modalidade #{index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveModality(item.id)}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Excluir modalidade"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                          Nome da Modalidade
                        </label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleUpdateModality(item.id, { title: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                          Subtítulo
                        </label>
                        <input
                          type="text"
                          value={item.subtitle}
                          onChange={(e) => handleUpdateModality(item.id, { subtitle: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                        Descrição
                      </label>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) =>
                          handleUpdateModality(item.id, { description: e.target.value })
                        }
                        className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                          Tags (separadas por vírgula)
                        </label>
                        <input
                          type="text"
                          value={item.tags.join(", ")}
                          onChange={(e) =>
                            handleUpdateModality(item.id, {
                              tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                            })
                          }
                          className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                          Intensidade
                        </label>
                        <select
                          value={item.intensity || "Personalizada"}
                          onChange={(e) =>
                            handleUpdateModality(item.id, {
                              intensity: e.target.value as any,
                            })
                          }
                          className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-pink"
                        >
                          <option value="Leve">Leve</option>
                          <option value="Média">Média</option>
                          <option value="Alta">Alta</option>
                          <option value="Personalizada">Personalizada</option>
                        </select>
                      </div>
                    </div>

                    {/* Foto da Modalidade */}
                    <ImageUploader
                      label="Foto da Modalidade"
                      value={item.imageUrl}
                      onChange={(url) => handleUpdateModality(item.id, { imageUrl: url })}
                      aspectRatio="wide"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: FOTOS DA ESTRUTURA */}
          {/* ========================================================================= */}
          {activeTab === "estrutura" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Fotos dos Ambientes</h3>
                  <p className="text-xs text-zinc-400">
                    Altere fotos, categorias e legendas dos espaços da academia.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddStructure}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-bold shadow-glow-pink transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Foto</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.structure.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-surface border border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-xs font-bold text-brand-pink">Área #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveStructure(item.id)}
                        className="p-1 rounded text-zinc-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Título do Espaço
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleUpdateStructure(item.id, { title: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-surface-card border border-white/10 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Categoria
                      </label>
                      <select
                        value={item.category}
                        onChange={(e) =>
                          handleUpdateStructure(item.id, { category: e.target.value as any })
                        }
                        className="w-full px-3 py-1.5 text-xs bg-surface-card border border-white/10 rounded-lg text-white"
                      >
                        <option value="Musculação">Musculação</option>
                        <option value="Cardio">Cardio</option>
                        <option value="Funcional">Funcional</option>
                        <option value="Recepção">Recepção</option>
                        <option value="Ambiente Interno">Ambiente Interno</option>
                        <option value="Fachada">Fachada</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Descrição
                      </label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) =>
                          handleUpdateStructure(item.id, { description: e.target.value })
                        }
                        className="w-full px-3 py-1.5 text-xs bg-surface-card border border-white/10 rounded-lg text-white"
                      />
                    </div>

                    <ImageUploader
                      label="Foto do Espaço"
                      value={item.imageUrl}
                      onChange={(url) => handleUpdateStructure(item.id, { imageUrl: url })}
                      aspectRatio="wide"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: GALERIA DE FOTOS */}
          {/* ========================================================================= */}
          {activeTab === "galeria" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Galeria Dinâmica</h3>
                  <p className="text-xs text-zinc-400">
                    Adicione ou substitua fotos de treinos e comunidade.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddGallery}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-bold shadow-glow-pink transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Foto</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.gallery.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-surface border border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-xs font-bold text-brand-pink">Foto #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveGallery(item.id)}
                        className="p-1 rounded text-zinc-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Título / Legenda
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleUpdateGallery(item.id, { title: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-surface-card border border-white/10 rounded-lg text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                          Categoria
                        </label>
                        <input
                          type="text"
                          value={item.category}
                          onChange={(e) =>
                            handleUpdateGallery(item.id, { category: e.target.value })
                          }
                          className="w-full px-3 py-1.5 text-xs bg-surface-card border border-white/10 rounded-lg text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                          Formato
                        </label>
                        <select
                          value={item.aspect || "square"}
                          onChange={(e) =>
                            handleUpdateGallery(item.id, { aspect: e.target.value as any })
                          }
                          className="w-full px-3 py-1.5 text-xs bg-surface-card border border-white/10 rounded-lg text-white"
                        >
                          <option value="square">Quadrado</option>
                          <option value="tall">Vertical</option>
                          <option value="wide">Horizontal</option>
                        </select>
                      </div>
                    </div>

                    <ImageUploader
                      label="Foto"
                      value={item.imageUrl}
                      onChange={(url) => handleUpdateGallery(item.id, { imageUrl: url })}
                      aspectRatio="square"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: CONTATOS & HORÁRIOS */}
          {/* ========================================================================= */}
          {activeTab === "contatos" && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-surface border border-white/5 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-pink-300">
                  Canais de Contato
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                      WhatsApp (Número internacional - apenas dígitos)
                    </label>
                    <input
                      type="text"
                      value={formData.contacts.whatsappNumber}
                      onChange={(e) => {
                        const updated = {
                          ...formData,
                          contacts: { ...formData.contacts, whatsappNumber: e.target.value },
                        };
                        setFormData(updated);
                        updateConfig(updated);
                      }}
                      placeholder="Ex: 5511999998888"
                      className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                      WhatsApp (Texto Exibido)
                    </label>
                    <input
                      type="text"
                      value={formData.contacts.whatsappDisplay}
                      onChange={(e) => {
                        const updated = {
                          ...formData,
                          contacts: { ...formData.contacts, whatsappDisplay: e.target.value },
                        };
                        setFormData(updated);
                        updateConfig(updated);
                      }}
                      placeholder="Ex: (11) 99999-9999"
                      className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Telefone Fixo / Comercial
                    </label>
                    <input
                      type="text"
                      value={formData.contacts.phone}
                      onChange={(e) => {
                        const updated = {
                          ...formData,
                          contacts: { ...formData.contacts, phone: e.target.value },
                        };
                        setFormData(updated);
                        updateConfig(updated);
                      }}
                      className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                      E-mail de Contato
                    </label>
                    <input
                      type="email"
                      value={formData.contacts.email}
                      onChange={(e) => {
                        const updated = {
                          ...formData,
                          contacts: { ...formData.contacts, email: e.target.value },
                        };
                        setFormData(updated);
                        updateConfig(updated);
                      }}
                      className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Instagram (@arroba)
                    </label>
                    <input
                      type="text"
                      value={formData.contacts.instagramHandle}
                      onChange={(e) => {
                        const updated = {
                          ...formData,
                          contacts: { ...formData.contacts, instagramHandle: e.target.value },
                        };
                        setFormData(updated);
                        updateConfig(updated);
                      }}
                      placeholder="@laschicasfitness"
                      className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Link do Perfil do Instagram
                    </label>
                    <input
                      type="text"
                      value={formData.contacts.instagramUrl}
                      onChange={(e) => {
                        const updated = {
                          ...formData,
                          contacts: { ...formData.contacts, instagramUrl: e.target.value },
                        };
                        setFormData(updated);
                        updateConfig(updated);
                      }}
                      placeholder="https://instagram.com/seu-perfil"
                      className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Endereço Completo
                  </label>
                  <input
                    type="text"
                    value={formData.contacts.address.fullAddress}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        contacts: {
                          ...formData.contacts,
                          address: { ...formData.contacts.address, fullAddress: e.target.value },
                        },
                      };
                      setFormData(updated);
                      updateConfig(updated);
                    }}
                    placeholder="Av. Principal, 1000 - Centro, Cidade - UF"
                    className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Link ou Iframe do Google Maps
                  </label>
                  <input
                    type="text"
                    value={formData.contacts.googleMapsEmbedUrl || ""}
                    onChange={(e) => {
                      let val = e.target.value.trim();
                      if (val.includes("<iframe")) {
                        const m = val.match(/src=["']([^"']+)["']/i);
                        if (m && m[1]) val = m[1];
                      } else if (
                        val.includes("ZNCfRiW2RgeY65cXA") ||
                        val.includes("0x93cc910fb352ce89")
                      ) {
                        val =
                          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.8!2d-63.035374!3d-9.8974622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93cc910fb352ce89%3A0xa57c491e89f17f29!2sLas%20Chicas%20Fitness!5e0!3m2!1spt-BR!2sbr!4v1787313800000!5m2!1spt-BR!2sbr";
                      }
                      const updated = {
                        ...formData,
                        contacts: {
                          ...formData.contacts,
                          googleMapsEmbedUrl: val,
                        },
                      };
                      setFormData(updated);
                      updateConfig(updated);
                    }}
                    placeholder="https://maps.app.goo.gl/... ou https://www.google.com/maps/embed..."
                    className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white font-mono text-[11px]"
                  />
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Aceita link encurtado (maps.app.goo.gl), link do local ou código de incorporação (iframe).
                  </p>
                </div>
              </div>

              {/* Horários */}
              <div className="p-4 rounded-2xl bg-surface border border-white/5 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-pink-300">
                  Horários de Funcionamento
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                      Segunda a Sexta
                    </label>
                    <input
                      type="text"
                      value={formData.hours.weekdays}
                      onChange={(e) => {
                        const updated = {
                          ...formData,
                          hours: { ...formData.hours, weekdays: e.target.value },
                        };
                        setFormData(updated);
                        updateConfig(updated);
                      }}
                      className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                      Sábados
                    </label>
                    <input
                      type="text"
                      value={formData.hours.saturdays}
                      onChange={(e) => {
                        const updated = {
                          ...formData,
                          hours: { ...formData.hours, saturdays: e.target.value },
                        };
                        setFormData(updated);
                        updateConfig(updated);
                      }}
                      className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                      Domingos e Feriados
                    </label>
                    <input
                      type="text"
                      value={formData.hours.sundaysAndHolidays}
                      onChange={(e) => {
                        const updated = {
                          ...formData,
                          hours: { ...formData.hours, sundaysAndHolidays: e.target.value },
                        };
                        setFormData(updated);
                        updateConfig(updated);
                      }}
                      className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 8: SISTEMA & BACKUP */}
          {/* ========================================================================= */}
          {activeTab === "sistema" && (
            <div className="space-y-6">
              {/* Alterar Senha de Admin */}
              <div className="p-5 rounded-2xl bg-surface border border-white/5 space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Key className="w-4 h-4 text-brand-pink" />
                  <span>Alterar Senha do Administrador</span>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Senha Atual
                      </label>
                      <input
                        type="password"
                        value={oldPass}
                        onChange={(e) => setOldPass(e.target.value)}
                        placeholder="Senha atual..."
                        required
                        className="w-full px-3 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Nova Senha
                      </label>
                      <input
                        type="password"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        placeholder="Mínimo 4 caracteres..."
                        required
                        className="w-full px-3 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white"
                      />
                    </div>
                  </div>

                  {passMessage && (
                    <p
                      className={`text-xs font-semibold ${
                        passMessage.type === "success" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {passMessage.text}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-surface-card hover:bg-brand-pink/20 border border-white/15 hover:border-brand-pink text-white text-xs font-bold transition-all"
                  >
                    Atualizar Senha
                  </button>
                </form>
              </div>

              {/* Sincronização Global na Nuvem (Vercel / Todos os PCs) */}
              <div className="p-5 rounded-2xl bg-surface border border-brand-pink/30 space-y-4 shadow-glow-pink/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-brand-pink" />
                    <span>Publicação Global na Nuvem</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveAll}
                    disabled={isSavingGlobal}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-bold shadow-glow-pink transition-all disabled:opacity-50"
                  >
                    {isSavingGlobal ? (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Save className="w-3.5 h-3.5" />
                    )}
                    <span>{isSavingGlobal ? "Sincronizando..." : "Sincronizar com a Nuvem"}</span>
                  </button>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Ao clicar em <strong>Publicar no Site</strong>, suas alterações são salvas na nuvem e ficam visíveis instantaneamente para <span className="text-white font-semibold">todos os computadores, celulares e visitantes do site</span> (mesmo na Vercel).
                </p>
              </div>

              {/* Exportar / Importar Backup */}
              <div className="p-5 rounded-2xl bg-surface border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Download className="w-4 h-4 text-brand-pink" />
                    <span>Backup e Migração (JSON)</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownloadBackup}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-card hover:bg-surface-light border border-white/10 text-white text-xs font-semibold transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-brand-pink" />
                    <span>Baixar Backup</span>
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                    Importar Backup JSON
                  </label>
                  <textarea
                    rows={3}
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder="Cole o código JSON do backup aqui..."
                    className="w-full px-3 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white font-mono text-[11px]"
                  />
                  <button
                    type="button"
                    onClick={handleImportJson}
                    disabled={!jsonInput.trim()}
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-pink/20 hover:bg-brand-pink border border-brand-pink/40 text-white text-xs font-bold disabled:opacity-40 transition-all"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Aplicar Backup JSON</span>
                  </button>
                </div>
              </div>

              {/* Restaurar Padrões */}
              <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/20 space-y-3">
                <div className="flex items-center gap-2 text-red-300 font-bold text-sm">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span>Zona de Perigo</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Deseja restaurar todos os textos, fotos e dados para os padrões originais do
                  site? Todas as personalizações salvas no navegador serão resetadas.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      confirm(
                        "Tem certeza que deseja restaurar os dados originais? Suas edições serão perdidas."
                      )
                    ) {
                      resetToDefaults();
                      setFormData(config);
                      showToast("Dados restaurados para os padrões originais!");
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar Padrões Originais</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
