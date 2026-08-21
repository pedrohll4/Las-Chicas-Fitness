export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
  suffix?: string;
  description?: string;
}

export interface ModalityItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  tags: string[];
  imageUrl: string;
  intensity?: "Leve" | "Média" | "Alta" | "Personalizada";
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface StructureItem {
  id: string;
  title: string;
  category: "Musculação" | "Cardio" | "Funcional" | "Recepção" | "Ambiente Interno" | "Fachada";
  description: string;
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  aspect?: "tall" | "wide" | "square";
}

export interface PlanItem {
  id: string;
  name: string;
  badge?: string;
  price: string;
  period: string; // ex: "/mês", "/ano"
  billingInfo?: string; // ex: "Cobrado mensalmente", "Economize 30%"
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
  customMessage?: string;
}

export interface InstagramPost {
  id: string;
  type: "image" | "video";
  mediaUrl: string;
  likes: string;
  comments?: string;
  caption?: string;
  permalink?: string;
}

export interface TestimonialItem {
  id: string;
  name: string; // Nome da aluna / assinatura
  role?: string; // Ex: "Aluna há 1 ano" ou "Musculação & Funcional"
  rating: number; // 1 a 5 estrelas
  comment: string; // Depoimento da aluna
  imageUrl?: string; // Foto anexada da aluna ou resultado (opcional)
  date?: string; // Data de exibição (ex: "Há 2 dias")
  createdAt?: string;
  isVerified?: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string; // Ex: "Roupas", "Acessórios", "Suplementos"
  price: string; // Ex: "R$ 89,90"
  description: string;
  sizes?: string[]; // Ex: ["P", "M", "G"] ou ["Tamanho Único"]
  imageUrl: string;
  tag?: string; // Ex: "Lançamento", "Mais Vendido", "Exclusivo"
  inStock?: boolean;
}

export interface WhatsAppContact {
  id: string;
  label: string; // Ex: "Recepção & Matrículas", "Lojinha & Moda Fitness", "Atendimento Personalizado"
  number: string; // Formato internacional (somente números, ex: "5511999999999")
  display?: string; // Formato legível (ex: "(11) 99999-9999")
  description?: string; // Ex: "Dúvidas de planos, aulas e horários"
  icon?: "reception" | "shop" | "support" | "custom";
}

export interface AcademyHours {
  weekdays: string;
  saturdays: string;
  sundaysAndHolidays: string;
}

export interface AcademyConfig {
  name: string;
  shortName: string;
  slogan: string;
  subSlogan: string;
  aboutHeadline: string;
  aboutDescription: string;
  aboutSecondary: string;
  contacts: {
    whatsappNumber: string; // WhatsApp Principal (Recepção & Planos)
    whatsappDisplay: string;
    whatsappShopNumber?: string; // WhatsApp da Lojinha & Boutique
    whatsappShopDisplay?: string;
    whatsappExtraNumber?: string; // WhatsApp de Atendimento Adicional
    whatsappExtraDisplay?: string;
    whatsappContacts?: WhatsAppContact[]; // Lista dinâmica de múltiplos canais
    phone: string;
    email: string;
    instagramHandle: string;
    instagramUrl: string;
    address: {
      street: string;
      neighborhood: string;
      city: string;
      state: string;
      zipCode: string;
      fullAddress: string;
    };
    googleMapsEmbedUrl?: string;
  };
  hours: AcademyHours;
  stats: StatItem[];
  modalities: ModalityItem[];
  benefits: BenefitItem[];
  products?: ProductItem[];
  structure: StructureItem[];
  gallery: GalleryItem[];
  plans: PlanItem[];
  instagramPosts: InstagramPost[];
  testimonials: TestimonialItem[];
  author: {
    name: string;
    label: string;
    url?: string;
  };
}
