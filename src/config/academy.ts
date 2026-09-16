import { AcademyConfig } from "@/types";

/**
 * ========================================================================
 * CENTRAL DE CONFIGURAÇÕES - LAS CHICAS FITNESS
 * ========================================================================
 * Todos os textos, contatos, redes sociais, horários, fotos e estatísticas
 * estão centralizados aqui para facilitar a personalização.
 */

export const ACADEMY_CONFIG: AcademyConfig = {
  name: "Las Chicas Fitness",
  shortName: "Las Chicas",
  slogan: "MULHERES FORTES, RESULTADOS REAIS!",
  subSlogan:
    "Aqui na Las Chicas Fitness é onde a mágica acontece, venha viver essa experiência!",
  aboutHeadline: "Mais que um treino, uma revolução feminina!",
  aboutDescription:
    "A Las Chicas Fitness nasceu para proporcionar um ambiente premium onde treino, saúde, autoestima e evolução caminham juntos. Aqui, cada aluna possui seu próprio objetivo e cada treino representa um passo a mais nessa jornada extraordinária.",
  aboutSecondary:
    "Combinamos estrutura de alto padrão, acolhimento, energia contagiante e acompanhamento técnico para você superar seus limites com confiança, beleza e determinação.",
  aboutImageUrl: "/images/estrutura/equipamentos.png",
  aboutTag: "Sobre a Academia",
  aboutHighlights: [
    "Atendimento humanizado e focado em você",
    "Ambiente acolhedor e inspirador",
    "Metodologia pensada para resultados reais",
    "Equipamentos modernos e higienizados",
  ],
  aboutCardTitle: "Venha Evoluir Conosco",
  aboutCardSubtitle: "Agende uma visita e sinta a energia",
  aboutCtaText: "Agendar uma Visita",

  // ======================================================================
  // CONTATOS & REDES SOCIAIS OFICIAIS
  // ======================================================================
  contacts: {
    // WhatsApp Principal (Recepção & Matrículas) - Marta
    whatsappNumber: "556993603714",
    whatsappNumber2: "", // Segundo número para rodízio automático
    whatsappDisplay: "Marta",

    // WhatsApp da Lojinha & Moda Fitness - Alcy Loja
    whatsappShopNumber: "556999172367",
    whatsappShopDisplay: "Alcy Loja",

    // WhatsApp de Atendimento Adicional (Suporte / Central) - Katia
    whatsappExtraNumber: "556999655021",
    whatsappExtraDisplay: "Katia",

    phone: "+55 69 9917-2367",
    email: "contato@laschicasfitness.com.br",
    instagramHandle: "@las.chicasfitness",
    instagramUrl: "https://www.instagram.com/las.chicasfitness/",

    // Endereço físico
    address: {
      street: "R. Rio Grande do Sul - St. 5",
      neighborhood: "St. 5",
      city: "Ariquemes",
      state: "RO",
      zipCode: "76870-586",
      fullAddress: "R. Rio Grande do Sul - St. 5, Ariquemes - RO, 76870-586",
    },

    // Mapa interativo do Google Maps (iframe embed).
    googleMapsEmbedUrl: "https://maps.app.goo.gl/P5sa1TvFthnj8RnQ9",
  },

  // ======================================================================
  // HORÁRIOS DE FUNCIONAMENTO
  // ======================================================================
  hours: {
    weekdays: "Segunda a Sexta: 06:00 às 21:00",
    saturdays: "Sábados: 06:00 as 10:00",
    sundaysAndHolidays: "Fechado",
  },

  // ======================================================================
  // NÚMEROS E ESTATÍSTICAS
  // ======================================================================
  stats: [
    {
      value: "+1.200",
      label: "Alunas Ativas",
      suffix: "",
      description: "Mulheres transformando suas vidas",
    },
    {
      value: "15+",
      label: "Modalidades",
      suffix: "",
      description: "Treinos para todos os ritmos",
    },
    {
      value: "20+",
      label: "Profissionais",
      suffix: "",
      description: "Especialistas em performance",
    },
    {
      value: "+50k",
      label: "Treinos Realizados",
      suffix: "",
      description: "Metas superadas a cada mês",
    },
  ],

  // ======================================================================
  // MODALIDADES
  // ======================================================================
  modalities: [
    {
      id: "funcional",
      title: "Musculação ",
      subtitle: "Força e resistência ",
      description: "Treino preparado para oferecer força e resistência!",
      iconName: "Zap",
      tags: ["Força"],
      imageUrl: "",
      intensity: "Alta",
    },
    {
      id: "cardio-hiit",
      title: "Cardio & HIIT",
      subtitle: "Resistência & Aceleração Metabólica",
      description:
        "Treinos intervalados de alta intensidade e esteiras/bikes de última geração para maximizar o gasto calórico e saúde do coração.",
      iconName: "Flame",
      tags: ["Resistência", "Metabolismo", "Energia"],
      imageUrl: "",
      intensity: "Alta",
    },
  ],

  // ======================================================================
  // BENEFÍCIOS E DIFERENCIAIS
  // ======================================================================
  benefits: [
    {
      id: "b1",
      title: "Ambiente Moderno",
      description:
        "Design sofisticado, climatização perfeita, iluminação pensada e energia vibrante em cada detalhe.",
      iconName: "Sparkles",
    },
    {
      id: "b2",
      title: "Equipamentos de Ponta",
      description:
        "Maquinário moderno com biomecânica precisa para segurança articular e máxima eficiência nos exercícios.",
      iconName: "Layers",
    },
    {
      id: "b3",
      title: "Profissionais Preparados",
      description:
        "Equipe técnica qualificada, atenciosa e atualizada com as melhores metodologias do treinamento feminino.",
      iconName: "Award",
    },
    {
      id: "b4",
      title: "Acompanhamento de Perto",
      description:
        "Avaliação física detalhada e suporte constante para garantir evolução contínua e sem lesões.",
      iconName: "Target",
    },
    {
      id: "b5",
      title: "Variedade de Treinos",
      description:
        "Diversidade de modalidades e metodologias para manter sua motivação alta em todas as fases da rotina.",
      iconName: "Activity",
    },
    {
      id: "b6",
      title: "Comunidade Acolhedora",
      description:
        "Um espaço empático e inspirador onde mulheres se apoiam mutuamente para conquistar seus objetivos.",
      iconName: "Users",
    },
    {
      id: "b7",
      title: "Foco em Resultados",
      description:
        "Metodologias comprovadas cientificamente para você atingir seu melhor condicionamento e bem-estar.",
      iconName: "TrendingUp",
    },
    {
      id: "b8",
      title: "Qualidade de Vida",
      description:
        "Muito além da estética: ganhe disposição diária, redução do estresse, sono reparador e longevidade.",
      iconName: "HeartPulse",
    },
  ],

  // ======================================================================
  // LOJA & BOUTIQUE LAS CHICAS (ROUPAS & ACESSÓRIOS CADASTRADOS)
  // ======================================================================
  products: [
    {
      id: "prod-1789519393373",
      name: "Conjunto de short ",
      category: "Roupas & Conjuntos",
      price: "R$ 139,90",
      description: "Veste até um 42",
      sizes: ["M"],
      imageUrl: "",
      tag: "Novo",
      inStock: true,
    },
    {
      id: "prod-1789508860535",
      name: "Vestido Fitness",
      category: "Roupas & Conjuntos",
      price: "R$ 129,90",
      description: "Veste até um 42",
      sizes: ["M"],
      imageUrl: "",
      tag: "Lançamento ",
      inStock: true,
    },
    {
      id: "prod-1789508799346",
      name: "Conjunto de short",
      category: "Roupas & Conjuntos",
      price: "R$ 139,90",
      description: "Veste até um 42",
      sizes: ["M"],
      imageUrl: "",
      tag: "Lançamento ",
      inStock: true,
    },
    {
      id: "prod-1789496753854",
      name: "Macaquinho ",
      category: "Roupas & Conjuntos",
      price: "129,00",
      description: "Veste até um 40",
      sizes: ["M"],
      imageUrl: "",
      tag: "Novo",
      inStock: true,
    },
    {
      id: "prod-1",
      name: "Macaquinho ",
      category: "Roupas & Conjuntos",
      price: "R$ 129,90",
      description: "Veste até um 42",
      sizes: ["M"],
      imageUrl: "",
      tag: "Malha importada ",
      inStock: true,
    },
    {
      id: "prod-2",
      name: "Macaquinho ",
      category: "Roupas & Conjuntos",
      price: "R$ 129,90",
      description: "Modelagem anatômica que valoriza o corpo com tecido respirável ",
      sizes: ["M"],
      imageUrl: "",
      tag: "Lançamento",
      inStock: true,
    },
    {
      id: "prod-4",
      name: "Macaquinho ",
      category: "Roupas",
      price: "R$ 129,90",
      description: "Veste até um 40",
      sizes: ["M"],
      imageUrl: "",
      tag: "Exclusivo",
      inStock: true,
    },
    {
      id: "prod-5",
      name: "Conjunto short ",
      category: "Roupas",
      price: "R$ 139,90",
      description: "Super confortável ",
      sizes: ["G"],
      imageUrl: "",
      tag: "Malha importada ",
      inStock: true,
    },
  ],

  // ======================================================================
  // PLANOS E MENSALIDADES
  // ======================================================================
  plans: [
    {
      id: "plano-mensal",
      name: "Plano Mensal Flex",
      badge: "",
      price: "250",
      period: "/mês",
      billingInfo: "",
      description: "Ideal para quem busca total flexibilidade e liberdade na rotina.",
      features: [
        "Acesso livre à área de musculação",
        "Acesso completo ao estúdio cardio",
        "Orientação de treino com personal ",
      ],
      isPopular: true,
      ctaText: "Escolher ",
      customMessage: "Olá! Gostaria de me matricular no Plano Mensal Flex da Las Chicas Fitness.",
    },
  ],

  // ======================================================================
  // POSTAGENS E REELS OFICIAIS DO INSTAGRAM (@las.chicasfitness)
  // ======================================================================
  instagramPosts: [
    {
      id: "insta-real-1",
      type: "image",
      mediaUrl: "/images/instagram/reel_13.jpg",
      likes: "1.519",
      comments: "48",
      caption: "Espaço exclusivo feito para a sua evolução e força diária! 💖💪 #LasChicasFitness",
      permalink: "https://www.instagram.com/las.chicasfitness/",
    },
    {
      id: "insta-real-2",
      type: "image",
      mediaUrl: "/images/instagram/reel_10.jpg",
      likes: "2.113",
      comments: "62",
      caption: "Mulheres fortes, confiantes e determinadas! Treino de força concluído 🔥",
      permalink: "https://www.instagram.com/las.chicasfitness/",
    },
    {
      id: "insta-real-3",
      type: "image",
      mediaUrl: "/images/instagram/reel_15.jpg",
      likes: "1.988",
      comments: "74",
      caption: "Nossa comunidade reunida em frente ao mural Las Chicas! Energia incomparável ✨",
      permalink: "https://www.instagram.com/las.chicasfitness/",
    },
    {
      id: "insta-real-4",
      type: "image",
      mediaUrl: "/images/instagram/reel_11.jpg",
      likes: "2.324",
      comments: "55",
      caption: "Mais um dia de superação e constância na melhor academia feminina!",
      permalink: "https://www.instagram.com/las.chicasfitness/",
    },
    {
      id: "insta-real-5",
      type: "image",
      mediaUrl: "/images/instagram/reel_14.jpg",
      likes: "1.001",
      comments: "39",
      caption: "Aulão dinâmico com a energia lá em cima! Vem treinar com a gente 🏋️‍♀️",
      permalink: "https://www.instagram.com/las.chicasfitness/",
    },
    {
      id: "insta-real-6",
      type: "image",
      mediaUrl: "/images/instagram/reel_8.jpg",
      likes: "1.675",
      comments: "43",
      caption: "Treino no estilo Las Chicas! Foco, disciplina e autoestima lá no alto 🌸",
      permalink: "https://www.instagram.com/las.chicasfitness/",
    },
    {
      id: "insta-real-7",
      type: "image",
      mediaUrl: "/images/instagram/reel_17.jpg",
      likes: "4.196",
      comments: "89",
      caption: "Juntas somos mais fortes! Comunidade, amizade e foco nos resultados 💗",
      permalink: "https://www.instagram.com/las.chicasfitness/",
    },
    {
      id: "insta-real-8",
      type: "image",
      mediaUrl: "/images/instagram/reel_4.jpg",
      likes: "1.383",
      comments: "37",
      caption: "Amigas que treinam juntas evoluem juntas na Las Chicas Fitness! 👯‍♀️",
      permalink: "https://www.instagram.com/las.chicasfitness/",
    },
    {
      id: "insta-real-9",
      type: "image",
      mediaUrl: "/images/instagram/reel_9.jpg",
      likes: "786",
      comments: "28",
      caption: "Você não pode pular a parte difícil, porque é nela que você cresce! 💥",
      permalink: "https://www.instagram.com/las.chicasfitness/",
    },
    {
      id: "insta-real-10",
      type: "image",
      mediaUrl: "/images/instagram/reel_16.jpg",
      likes: "4.540",
      comments: "94",
      caption: "Eventos temáticos e muita comemoração com as nossas alunas queridas! 🎊",
      permalink: "https://www.instagram.com/las.chicasfitness/",
    },
    {
      id: "insta-real-11",
      type: "image",
      mediaUrl: "/images/instagram/reel_12.jpg",
      likes: "1.371",
      comments: "34",
      caption: "Evolução passo a passo com treinos pensados para o seu objetivo 💫",
      permalink: "https://www.instagram.com/las.chicasfitness/",
    },
    {
      id: "insta-real-12",
      type: "image",
      mediaUrl: "/images/instagram/reel_5.jpg",
      likes: "1.062",
      comments: "41",
      caption: "Mais um aulão que amamos com energia contagiante! ❤️🔥",
      permalink: "https://www.instagram.com/las.chicasfitness/",
    },
  ],

  // ======================================================================
  // ESTRUTURA DA ACADEMIA (CATEGORIZADA)
  // ======================================================================
  structure: [
    {
      id: "str-1",
      title: "Fachada Las Chicas Fitness",
      category: "Fachada",
      description:
        "Arquitetura moderna e imponente com o logo oficial da Las Chicas Fitness. Fácil acesso e estacionamento amplo.",
      imageUrl: "/images/estrutura/fachada.jpg",
    },
    {
      id: "str-2",
      title: "Nossa Comunidade",
      category: "Comunidade",
      description:
        "Mulheres unidas, fortes e inspiradoras. A Las Chicas é muito mais que uma academia - é família!",
      imageUrl: "/images/estrutura/comunidade.png",
    },
    {
      id: "str-3",
      title: "Equipamentos MV Machine",
      category: "Musculação",
      description:
        "Equipamentos de alta performance com design exclusivo pink & black para o treino feminino de resultado.",
      imageUrl: "/images/estrutura/equipamentos.png",
    },
    {
      id: "str-4",
      title: "Mural Las Chicas Fitness",
      category: "Ambiente",
      description:
        "Arte exclusiva que representa a força, determinação e estilo das nossas alunas. Um espaço feito para você.",
      imageUrl: "/images/estrutura/mural.jpg",
    },
    {
      id: "str-5",
      title: "Cantinho Fit Kids",
      category: "Família",
      description:
        "Espaço dedicado aos filhos das alunas! Treine com tranquilidade enquanto seus filhos se divertem com segurança.",
      imageUrl: "/images/estrutura/cantinho-kids.jpg",
    },
  ],

  // ======================================================================
  // GALERIA DINÂMICA
  // ======================================================================
  gallery: [
    {
      id: "gal-1",
      title: "Fachada Las Chicas Fitness",
      category: "Estrutura",
      imageUrl: "/images/estrutura/fachada.jpg",
      aspect: "tall",
    },
    {
      id: "gal-2",
      title: "Nossa Comunidade",
      category: "Comunidade",
      imageUrl: "/images/estrutura/comunidade.png",
      aspect: "wide",
    },
    {
      id: "gal-3",
      title: "Equipamentos MV Machine",
      category: "Musculação",
      imageUrl: "/images/estrutura/equipamentos.png",
      aspect: "wide",
    },
    {
      id: "gal-4",
      title: "Mural Las Chicas Fitness",
      category: "Ambiente",
      imageUrl: "/images/estrutura/mural.jpg",
      aspect: "square",
    },
    {
      id: "gal-5",
      title: "Cantinho Fit Kids",
      category: "Família",
      imageUrl: "/images/estrutura/cantinho-kids.jpg",
      aspect: "square",
    },
  ],

  // ======================================================================
  // DEPOIMENTOS E AVALIAÇÕES DAS ALUNAS
  // ======================================================================
  testimonials: [
    {
      id: "depo-1",
      name: "Mariana Silva",
      role: "Aluna há 1 ano",
      rating: 5,
      comment:
        "A Las Chicas mudou totalmente a minha relação com a academia! O ambiente 100% feminino me deixa super à vontade e as professoras são incríveis e atenciosas.",
      imageUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
      date: "Há 3 dias",
      isVerified: true,
    },
    {
      id: "depo-2",
      name: "Camila Rodrigues",
      role: "Aluna de Musculação & Funcional",
      rating: 5,
      comment:
        "Melhor decisão que tomei! Estrutura impecável, equipamentos modernos e uma energia maravilhosa. Sinto a diferença no meu corpo e na minha disposição todos os dias.",
      imageUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
      date: "Há 1 semana",
      isVerified: true,
    },
    {
      id: "depo-3",
      name: "Beatriz Oliveira",
      role: "Aluna do Plano VIP",
      rating: 5,
      comment:
        "Espaço acolhedor, limpo e com suporte de verdade. Não troco por nenhuma outra! Quem treina aqui realmente sente a diferença na saúde e na autoestima.",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
      date: "Há 2 semanas",
      isVerified: true,
    },
  ],

  // ======================================================================
  // MARCA D'ÁGUA NO FOOTER
  // ======================================================================
  author: {
    name: "Pedro",
    label: "Feito por Pedro",
    whatsappNumber: "5569992102965",
    url: "https://wa.me/5569992102965?text=Ol%C3%A1%20Pedro!%20Vi%20que%20voc%C3%AA%20fez%20o%20site%20da%20Las%20Chicas%20Fitness%2C%20como%20funciona%20para%20criar%20um%20site%3F",
  },
};

/**
 * Função utilitária para gerar link de WhatsApp com mensagem automática
 */
export function getWhatsAppUrl(customMessage?: string, targetNumber?: string): string {
  const phone = targetNumber || ACADEMY_CONFIG.contacts.whatsappNumber;
  const cleanPhone = phone.replace(/\D/g, "");
  const message =
    customMessage ||
    `Olá! Gostaria de saber mais sobre as matrículas e planos da ${ACADEMY_CONFIG.name}.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
