"use client";

import React, { useState } from "react";
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
  AlertCircle,
  Key,
} from "lucide-react";
import { useAcademy } from "@/context/AcademyContext";
import { ImageUploader } from "@/components/admin/ImageUploader";
import {
  ModalityItem,
  StructureItem,
  GalleryItem,
  BenefitItem,
  StatItem,
  PlanItem,
} from "@/types";

type ActiveTab =
  | "geral"
  | "servicos"
  | "estrutura"
  | "galeria"
  | "planos"
  | "beneficios"
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
    updatePlans,
    updateStats,
    resetToDefaults,
    exportConfigJson,
    importConfigJson,
    isCustomizerOpen,
    closeCustomizer,
    logout,
    changePassword,
  } = useAcademy();

  const [activeTab, setActiveTab] = useState<ActiveTab>("geral");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState(config);
  const [jsonInput, setJsonInput] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
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
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveAll = () => {
    updateConfig(formData);
    showToast("Alterações salvas com sucesso!");
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
    { id: "servicos", label: "Serviços & Modalidades", icon: Dumbbell },
    { id: "estrutura", label: "Fotos da Estrutura", icon: Images },
    { id: "galeria", label: "Galeria de Fotos", icon: Camera },
    { id: "beneficios", label: "Diferenciais", icon: Award },
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
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-bold shadow-glow-pink transition-all"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Salvar Tudo</span>
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
                <button
                  type="button"
                  onClick={handleAddPlan}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-bold shadow-glow-pink transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Plano</span>
                </button>
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
          {/* TAB 3: MODALIDADES & SERVIÇOS */}
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
          {/* TAB 6: DIFERENCIAIS / BENEFÍCIOS */}
          {/* ========================================================================= */}
          {activeTab === "beneficios" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">Diferenciais e Benefícios</h3>
                <p className="text-xs text-zinc-400">
                  Edite os títulos e descrições dos 8 diferenciais da academia.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.benefits.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-surface border border-white/10 space-y-2"
                  >
                    <span className="text-xs font-bold text-brand-pink">Diferencial #{index + 1}</span>
                    <div>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const newBenefits = [...formData.benefits];
                          newBenefits[index].title = e.target.value;
                          setFormData({ ...formData, benefits: newBenefits });
                          updateBenefits(newBenefits);
                        }}
                        className="w-full px-3 py-1.5 text-xs font-bold bg-surface-card border border-white/10 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => {
                          const newBenefits = [...formData.benefits];
                          newBenefits[index].description = e.target.value;
                          setFormData({ ...formData, benefits: newBenefits });
                          updateBenefits(newBenefits);
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-surface-card border border-white/10 rounded-lg text-zinc-300"
                      />
                    </div>
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
                    URL do Iframe do Google Maps
                  </label>
                  <input
                    type="text"
                    value={formData.contacts.googleMapsEmbedUrl || ""}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        contacts: {
                          ...formData.contacts,
                          googleMapsEmbedUrl: e.target.value,
                        },
                      };
                      setFormData(updated);
                      updateConfig(updated);
                    }}
                    placeholder="https://www.google.com/maps/embed?pb=..."
                    className="w-full px-3.5 py-2 text-xs bg-surface-card border border-white/10 rounded-xl text-white font-mono text-[11px]"
                  />
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
