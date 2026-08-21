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
  slogan: "MULHERES FORTES. RESULTADOS REAIS.",
  subSlogan:
    "Treine na Las Chicas Fitness e transforme sua rotina através de movimento, disciplina e evolução.",
  aboutHeadline: "MAIS QUE UMA ACADEMIA. UM ESTILO DE VIDA.",
  aboutDescription:
    "A Las Chicas Fitness nasceu para proporcionar um ambiente premium onde treino, saúde, autoestima e evolução caminham juntos. Aqui, cada aluna possui seu próprio objetivo e cada treino representa um passo a mais nessa jornada extraordinária.",
  aboutSecondary:
    "Combinamos estrutura de alto padrão, acolhimento, energia contagiante e acompanhamento técnico para você superar seus limites com confiança, beleza e determinação.",

  // ======================================================================
  // CONTATOS & REDES SOCIAIS (PLACEHOLDERS EDITÁVEIS)
  // ======================================================================
  contacts: {
    // Altere para o WhatsApp real da academia (somente números com DDI + DDD)
    // Exemplo: "5511999998888"
    whatsappNumber: "5511999999999",
    whatsappDisplay: "(11) 99999-9999",
    phone: "(11) 99999-9999",
    email: "contato@laschicasfitness.com.br",
    instagramHandle: "@las.chicasfitness",
    instagramUrl: "https://www.instagram.com/las.chicasfitness/",

    // Endereço físico
    address: {
      street: "ACADEMY_ADDRESS", // Substitua pelo endereço real (ex: Av. Principal, 1500)
      neighborhood: "Centro",
      city: "Sua Cidade",
      state: "UF",
      zipCode: "00000-000",
      fullAddress: "Av. Principal, 1000 - Bairro Nobre, Sua Cidade - UF",
    },

    // Mapa interativo do Google Maps (iframe embed).
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.8!2d-63.035374!3d-9.8974622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93cc910fb352ce89%3A0xa57c491e89f17f29!2sLas%20Chicas%20Fitness!5e0!3m2!1spt-BR!2sbr!4v1787313800000!5m2!1spt-BR!2sbr",
  },

  // ======================================================================
  // HORÁRIOS DE FUNCIONAMENTO
  // ======================================================================
  hours: {
    weekdays: "Segunda a Sexta: 06:00 às 22:00",
    saturdays: "Sábados: 08:00 às 16:00",
    sundaysAndHolidays: "Domingos e Feriados: 08:00 às 13:00",
  },

  // ======================================================================
  // NÚMEROS E ESTATÍSTICAS (PLACEHOLDERS EDITÁVEIS)
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
  // MODALIDADES (PLACEHOLDERS EDITÁVEIS)
  // ======================================================================
  modalities: [
    {
      id: "musculacao",
      title: "Musculação",
      subtitle: "Força, Hipertrofia & Definição",
      description:
        "Treinos personalizados focados no desenvolvimento muscular, queima de gordura e fortalecimento com biomecânica avançada.",
      iconName: "Dumbbell",
      tags: ["Força", "Definição", "Postura"],
      imageUrl:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop",
      intensity: "Personalizada",
    },
    {
      id: "funcional",
      title: "Treinamento Funcional",
      subtitle: "Agilidade, Resistência & Mobilidade",
      description:
        "Movimentos dinâmicos com peso corporal e acessórios para melhorar condicionamento físico, estabilidade e capacidade cardiovascular.",
      iconName: "Zap",
      tags: ["Agilidade", "Cardio", "Queima Calórica"],
      imageUrl:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
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
      imageUrl:
        "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=1200&auto=format&fit=crop",
      intensity: "Alta",
    },
    {
      id: "personal",
      title: "Personal Trainer",
      subtitle: "Acompanhamento Exclusivo 1 a 1",
      description:
        "Supervisão individualizada com prescrição de treino direcionada aos seus objetivos, correção de movimentos e foco em resultados rápidos.",
      iconName: "UserCheck",
      tags: ["Exclusivo", "Resultados", "Foco"],
      imageUrl:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
      intensity: "Personalizada",
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
  // LOJA & BOUTIQUE LAS CHICAS (ROUPAS & ACESSÓRIOS)
  // ======================================================================
  products: [
    {
      id: "prod-1",
      name: "Conjunto Seamless Performance Rosa",
      category: "Roupas & Conjuntos",
      price: "R$ 149,90",
      description: "Top com sustentação premium + Legging cós alto com compressão zero transparência.",
      sizes: ["P", "M", "G"],
      imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80",
      tag: "Mais Vendido",
      inStock: true,
    },
    {
      id: "prod-2",
      name: "Legging Empina Bumbum Black Velvet",
      category: "Roupas & Conjuntos",
      price: "R$ 99,90",
      description: "Modelagem anatômica que valoriza o corpo com tecido respirável e toque macio.",
      sizes: ["P", "M", "G", "GG"],
      imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
      tag: "Lançamento",
      inStock: true,
    },
    {
      id: "prod-3",
      name: "Top Cruzado Strappy Pink Las Chicas",
      category: "Roupas & Conjuntos",
      price: "R$ 69,90",
      description: "Design moderno com costas cruzadas e bojo removível para máxima segurança no treino.",
      sizes: ["P", "M", "G"],
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80",
      tag: "Exclusivo",
      inStock: true,
    },
    {
      id: "prod-4",
      name: "Garrafa Térmica 1L Las Chicas Matte Pink",
      category: "Acessórios",
      price: "R$ 79,90",
      description: "Mantém sua água gelada por até 24h. Aço inox com acabamento aveludado e bico retrátil.",
      sizes: ["1 Litro"],
      imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80",
      tag: "Destaque",
      inStock: true,
    },
    {
      id: "prod-5",
      name: "Kit Mini Bands Las Chicas (5 Intensidades)",
      category: "Acessórios",
      price: "R$ 49,90",
      description: "Elásticos para ativação de glúteos e membros superiores com case exclusiva inclusa.",
      sizes: ["Kit 5 Níveis"],
      imageUrl: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&auto=format&fit=crop&q=80",
      tag: "Treino em Casa",
      inStock: true,
    },
    {
      id: "prod-6",
      name: "Boné Aba Curva Oficial Las Chicas Black & Pink",
      category: "Acessórios",
      price: "R$ 59,90",
      description: "Estilo e proteção para o dia a dia e treinos ao ar livre com bordado de alta definição.",
      sizes: ["Ajustável"],
      imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80",
      tag: "Coleção Oficial",
      inStock: true,
    },
  ],

  // ======================================================================
  // PLANOS E MENSALIDADES (PLACEHOLDERS EDITÁVEIS)
  // ======================================================================
  plans: [
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
      title: "Área de Musculação Premium",
      category: "Musculação",
      description:
        "Halteres emborrachados, estações de polias múltiplas e maquinário de alta precisão biomecânica.",
      imageUrl:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "str-2",
      title: "Espaço Funcional & Cross",
      category: "Funcional",
      description:
        "Piso emborrachado de absorção de impacto, kettlebells, cordas navais e caixas de salto.",
      imageUrl:
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "str-3",
      title: "Studio de Cardio Tecnológico",
      category: "Cardio",
      description:
        "Esteiras ergonômicas, escadas de alta performance e bikes de spinning com painéis digitais.",
      imageUrl:
        "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "str-4",
      title: "Recepção & Lounge de Convivência",
      category: "Recepção",
      description:
        "Atendimento acolhedor, área de shake bar e ambiente confortável para relaxar antes ou depois do treino.",
      imageUrl:
        "https://images.unsplash.com/photo-1623874514711-0f321325f318?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "str-5",
      title: "Ambiente Interno Climatizado",
      category: "Ambiente Interno",
      description:
        "Design acústico, iluminação cênica suave e ventilação cruzada para o máximo conforto térmico.",
      imageUrl:
        "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "str-6",
      title: "Fachada & Estacionamento",
      category: "Fachada",
      description:
        "Arquitetura imponente com segurança 24h, fácil acesso e comodidade para sua rotina.",
      imageUrl:
        "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1200&auto=format&fit=crop",
    },
  ],

  // ======================================================================
  // GALERIA DINÂMICA
  // ======================================================================
  gallery: [
    {
      id: "gal-1",
      title: "Treino de Força & Foco",
      category: "Superação",
      imageUrl:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
      aspect: "tall",
    },
    {
      id: "gal-2",
      title: "Ambiente Climatizado de Alta Energia",
      category: "Estrutura",
      imageUrl:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
      aspect: "wide",
    },
    {
      id: "gal-3",
      title: "Movimento & Disciplina Diária",
      category: "Performance",
      imageUrl:
        "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1200&auto=format&fit=crop",
      aspect: "square",
    },
    {
      id: "gal-4",
      title: "Conexão & Comunidade Fitness",
      category: "Comunidade",
      imageUrl:
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
      aspect: "square",
    },
    {
      id: "gal-5",
      title: "Acompanhamento Técnico Especializado",
      category: "Personal",
      imageUrl:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
      aspect: "wide",
    },
    {
      id: "gal-6",
      title: "Equipamentos com Biomecânica Perfeita",
      category: "Tecnologia",
      imageUrl:
        "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop",
      aspect: "tall",
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
    url: "#",
  },
};

/**
 * Função utilitária para gerar link de WhatsApp com mensagem automática
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const phone = ACADEMY_CONFIG.contacts.whatsappNumber;
  const message =
    customMessage ||
    `Olá! Gostaria de saber mais sobre as matrículas e planos da ${ACADEMY_CONFIG.name}.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
