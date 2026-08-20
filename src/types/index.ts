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
    whatsappNumber: string; // Formato internacional: 5511999999999 (apenas dígitos)
    whatsappDisplay: string;
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
  structure: StructureItem[];
  gallery: GalleryItem[];
  plans: PlanItem[];
  author: {
    name: string;
    label: string;
    url?: string;
  };
}
