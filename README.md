# Las Chicas Fitness — Website Institucional & Painel de Personalização

Website institucional moderno, profissional e responsivo para a academia **Las Chicas Fitness**, desenvolvido com Next.js (App Router), TypeScript, Tailwind CSS e sistema integrado de **Personalização em Tempo Real (Admin CMS)**.

---

## ✨ Funcionalidades Principais

- **Identidade Visual Premium**: Paleta Preto Profundo (`#0A0A0C`) + Rosa Vibrante (`#FF2E93`), logo oficial integrada, microefeitos de vidro e iluminação suave (*glow*).
- **Painel de Personalização Admin**:
  - Acesso protegido por senha de administrador via botão **"Personalizar"** no rodapé.
  - Edição ao vivo de fotos da estrutura, galeria e modalidades com suporte a URLs e **upload direto do computador**.
  - Edição de textos, slogans, estatísticas, diferenciais, horários de funcionamento e canais de contato.
  - **Backup & Restauração**: Exportar e importar configurações em formato JSON e restaurar padrões originais.
  - Troca de senha do administrador.
- **Seções Completas**: Header com blur dinâmico, Hero, Sobre, Modalidades, Benefícios, Estrutura com categorias, Galeria com Lightbox em tela cheia, CTA de Matrícula, Instagram, Localização com Google Maps, Rodapé com marca d'água e Botão Flutuante de WhatsApp.

---

## 🔐 Acesso ao Painel de Personalização

1. No final do rodapé da página, clique no botão **"Personalizar"** (ao lado de *"Feito por Pedro"*).
2. Digite a senha de administrador:
   - **Senha Padrão Inicial**: `admin123`
3. O painel se abrirá na lateral da tela permitindo editar qualquer informação do site em tempo real!

*(Você pode alterar a senha a qualquer momento na aba **Sistema & Backup** dentro do painel)*.

---

## 🚀 Como Rodar Localmente

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Executar em desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000).

3. **Gerar build de produção**:
   ```bash
   npm run build
   ```

4. **Executar o build**:
   ```bash
   npm start
   ```

---

## 🌐 Publicação na Vercel

O projeto está 100% pronto para deploy na **Vercel**:
1. Faça o push para o seu repositório no GitHub (`main`).
2. Conecte o repositório na [Vercel](https://vercel.com).
3. Clique em **Deploy**.
