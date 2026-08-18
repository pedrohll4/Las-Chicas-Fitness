import Image from "next/image";
import { Instagram, ArrowUpRight, Heart } from "lucide-react";
import { ACADEMY_CONFIG } from "@/config/academy";

const INSTA_POSTS = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop",
    likes: "248",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
    likes: "189",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=600&auto=format&fit=crop",
    likes: "312",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
    likes: "405",
  },
];

export function InstagramSection() {
  return (
    <section className="py-20 bg-[#0A0A0C] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-bold uppercase tracking-wider mb-3">
              <Instagram className="w-3.5 h-3.5" />
              <span>{ACADEMY_CONFIG.contacts.instagramHandle}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase leading-tight">
              ACOMPANHE A <br className="sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-pink-300">
                {ACADEMY_CONFIG.name}
              </span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 mt-2">
              Veja nossos treinos, novidades e acompanhe nossa rotina nas redes sociais.
            </p>
          </div>

          <div>
            <a
              href={ACADEMY_CONFIG.contacts.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-surface-card hover:bg-surface-light border border-white/15 hover:border-brand-pink text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-md group"
            >
              <Instagram className="w-4 h-4 text-brand-pink group-hover:rotate-6 transition-transform" />
              <span>Seguir no Instagram</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            </a>
          </div>
        </div>

        {/* Instagram Grid Previews */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INSTA_POSTS.map((post, idx) => (
            <a
              key={idx}
              href={ACADEMY_CONFIG.contacts.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-surface border border-white/10 shadow-md hover:border-brand-pink/50 transition-all duration-300"
            >
              <Image
                src={post.imageUrl}
                alt={`Publicação Instagram ${idx + 1}`}
                fill
                className="object-cover object-center group-hover:scale-110 filter brightness-90 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              {/* Hover overlay with like count */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 text-white font-bold text-sm transition-opacity duration-300">
                <Heart className="w-4 h-4 fill-brand-pink text-brand-pink" />
                <span>{post.likes}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
