# Las Chicas Fitness — Website Institucional

Website institucional moderno, profissional e responsivo para a academia **Las Chicas Fitness**, desenvolvido com Next.js (App Router), TypeScript e Tailwind CSS.

---

## 🚀 Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)** (App Router)
- **[React](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[Lucide React](https://lucide.dev/)** (Ícones modernos)
- **[Framer Motion](https://www.framer.com/motion/)**

---

## 📁 Estrutura do Projeto

```text
├── public/
│   ├── images/
│   │   └── logo.png              # Logo oficial da Las Chicas Fitness
│   ├── icon.png                  # Ícone / Favicon do site
│   └── logo.png
├── src/
│   ├── app/
│   │   ├── globals.css           # Estilos globais e efeitos glow/glassmorphism
│   │   ├── layout.tsx            # Metadados de SEO, OpenGraph e fontes
│   │   └── page.tsx              # Página principal (Landing Page)
│   ├── components/
│   │   ├── Header.tsx            # Navbar fixa com blur inteligente e menu mobile
│   │   ├── Hero.tsx              # Seção principal com tipografia forte e CTAs
│   │   ├── About.tsx             # Sobre a academia com métricas editáveis
│   │   ├── Services.tsx          # Modalidades com cards e detalhes
│   │   ├── Benefits.tsx          # 8 diferenciais da academia
│   │   ├── Structure.tsx         # Estrutura com categorias e Lightbox
│   │   ├── Gallery.tsx           # Galeria de fotos dinâmica
│   │   ├── LightboxModal.tsx     # Modal de ampliação de fotos
│   │   ├── CTA.tsx               # Banner de conversão para matrícula
│   │   ├── InstagramSection.tsx  # Chamada para seguir nas redes
│   │   ├── Location.tsx          # Endereço, horários de treino e mapa interativo
│   │   ├── Footer.tsx            # Rodapé com marca d'água "Feito por Pedro"
│   │   └── WhatsAppButton.tsx    # Botão flutuante de WhatsApp com tooltip
│   ├── config/
│   │   └── academy.ts            # Central de configurações e placeholders
│   └── types/
│       └── index.ts              # Tipagens TypeScript
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

---

## ⚙️ Como Personalizar os Dados da Academia

Todos os dados (WhatsApp, telefone, Instagram, endereço, horários, fotos e estatísticas) estão centralizados no arquivo:

👉 **`src/config/academy.ts`**

Para alterar o WhatsApp de matrícula, basta mudar o campo `whatsappNumber`:

```typescript
contacts: {
  whatsappNumber: "5511999999999", // Coloque o número com DDI e DDD (somente dígitos)
  whatsappDisplay: "(11) 99999-9999",
  phone: "(11) 99999-9999",
  instagramHandle: "@laschicasfitness",
  instagramUrl: "https://instagram.com/laschicasfitness",
  address: {
    fullAddress: "Av. Principal, 1000 - Bairro Nobre, Sua Cidade - UF",
  },
  ...
}
```

---

## 💻 Como Rodar Localmente

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Executar em ambiente de desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

3. **Gerar build de produção**:
   ```bash
   npm run build
   ```

4. **Executar o build de produção**:
   ```bash
   npm start
   ```

---

## 🌐 Publicação na Vercel

O projeto foi 100% otimizado para deploy instantâneo na **Vercel**:

1. Suba o código para um repositório no **GitHub**, **GitLab** ou **Bitbucket**.
2. Acesse [vercel.com](https://vercel.com) e clique em **"Add New Project"**.
3. Importe o repositório. O Next.js será detectado automaticamente.
4. Clique em **"Deploy"**.

Pronto! Seu site estará no ar em segundos com certificado SSL e CDN global.
