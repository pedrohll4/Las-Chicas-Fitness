import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ACADEMY_CONFIG } from "@/config/academy";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#0A0A0C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://laschicasfitness.com.br"),
  title: `${ACADEMY_CONFIG.name} | Academia Feminina Premium`,
  description:
    "Treine, evolua e cuide da sua saúde na Las Chicas Fitness. Conheça nossa estrutura de alto padrão, modalidades exclusivas e venha fazer parte dessa comunidade.",
  keywords: [
    "Las Chicas Fitness",
    "Academia Feminina",
    "Musculação Feminina",
    "Treino Feminino",
    "Academia Premium",
    "Personal Trainer",
    "Treinamento Funcional",
    "Saúde e Bem-estar",
  ],
  authors: [{ name: ACADEMY_CONFIG.author.name }],
  creator: ACADEMY_CONFIG.author.name,
  publisher: ACADEMY_CONFIG.name,
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://laschicasfitness.com.br",
    title: `${ACADEMY_CONFIG.name} | Academia Feminina Premium`,
    description:
      "Seu corpo. Sua força. Sua evolução. Treine na Las Chicas Fitness e transforme sua rotina com alto padrão e energia.",
    siteName: ACADEMY_CONFIG.name,
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: `${ACADEMY_CONFIG.name} - Logo Oficial`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${ACADEMY_CONFIG.name} | Academia Feminina Premium`,
    description:
      "Treine, evolua e cuide da sua saúde na Las Chicas Fitness. Conheça nossa estrutura moderna e venha fazer parte.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} dark scroll-smooth`}>
      <body className="bg-background text-zinc-100 antialiased selection:bg-brand-pink selection:text-white min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
