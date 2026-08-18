import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Benefits } from "@/components/Benefits";
import { Structure } from "@/components/Structure";
import { Gallery } from "@/components/Gallery";
import { CTA } from "@/components/CTA";
import { InstagramSection } from "@/components/InstagramSection";
import { Location } from "@/components/Location";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-zinc-100 flex flex-col selection:bg-brand-pink selection:text-white">
      {/* 1. Header Fixo com Blur */}
      <Header />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Sobre a Academia */}
        <About />

        {/* 4. Modalidades e Serviços */}
        <Services />

        {/* 5. Benefícios e Diferenciais */}
        <Benefits />

        {/* 6. Estrutura e Equipamentos */}
        <Structure />

        {/* 7. Galeria de Fotos com Lightbox */}
        <Gallery />

        {/* 8. Chamada para Matrícula (CTA) */}
        <CTA />

        {/* 9. Feed e Redes Sociais */}
        <InstagramSection />

        {/* 10. Localização, Horários e Contato */}
        <Location />
      </main>

      {/* 11. Footer com Marca d'Água "Feito por Pedro" */}
      <Footer />

      {/* 12. Botão Flutuante de WhatsApp */}
      <WhatsAppButton />
    </div>
  );
}
