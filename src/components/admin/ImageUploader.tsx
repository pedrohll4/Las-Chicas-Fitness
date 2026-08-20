"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Upload, Link as LinkIcon, X, Check, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (newUrl: string) => void;
  aspectRatio?: "square" | "wide" | "video";
}

export function ImageUploader({
  label,
  value,
  onChange,
  aspectRatio = "video",
}: ImageUploaderProps) {
  const [mode, setMode] = useState<"url" | "upload">("url");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Converte para Base64 com compressão básica em canvas
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new (window as any).Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        const scaleSize = MAX_WIDTH / img.width;
        
        if (scaleSize < 1) {
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        onChange(dataUrl);
      };
    };
    reader.readAsDataURL(file);
  };

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "wide"
      ? "aspect-[16/9]"
      : "aspect-[4/3]";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
          {label}
        </label>
        <div className="flex items-center gap-1 bg-surface-dark p-0.5 rounded-lg border border-white/10">
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
              mode === "url"
                ? "bg-brand-pink text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            URL da Imagem
          </button>
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
              mode === "upload"
                ? "bg-brand-pink text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Upload do Arquivo
          </button>
        </div>
      </div>

      {mode === "url" ? (
        <div className="relative flex items-center">
          <LinkIcon className="absolute left-3 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={value.startsWith("data:") ? "[Imagem Carregada do Computador]" : value}
            disabled={value.startsWith("data:")}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://exemplo.com/foto.jpg"
            className="w-full pl-9 pr-8 py-2.5 text-xs bg-surface-card border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink disabled:opacity-60"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-2.5 p-1 text-zinc-500 hover:text-brand-pink"
              title="Limpar imagem"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : (
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 px-4 rounded-xl border border-dashed border-brand-pink/40 hover:border-brand-pink bg-brand-pink/5 hover:bg-brand-pink/10 text-xs font-semibold text-pink-300 flex items-center justify-center gap-2 transition-all"
          >
            <Upload className="w-4 h-4 text-brand-pink" />
            <span>Selecionar Foto do Computador</span>
          </button>
        </div>
      )}

      {/* Preview */}
      {value ? (
        <div className={`relative ${aspectClass} w-full max-w-xs rounded-xl overflow-hidden border border-white/15 bg-black mt-2 group`}>
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            unoptimized={value.startsWith("data:")}
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <span className="text-[11px] font-semibold text-white px-2 py-1 rounded bg-black/70 border border-white/20">
              Pré-visualização
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-[11px] text-zinc-500 pt-1">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Nenhuma imagem selecionada</span>
        </div>
      )}
    </div>
  );
}
