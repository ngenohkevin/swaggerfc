"use client";

import Image from "next/image";
import { useEffect } from "react";

interface GalleryItem {
  image: string;
  year: string;
  title: string;
  description: string;
}

interface ImageLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export function ImageLightbox({ item, onClose }: ImageLightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Translucent backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Content container */}
      <div
        className="relative z-10 max-w-4xl w-full animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors p-2"
          aria-label="Close lightbox"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
        </div>

        {/* Text below image */}
        <div className="mt-6 text-center">
          <span className="text-[#fcd34d] text-sm font-medium uppercase tracking-wider">
            {item.year}
          </span>
          <h3 className="text-white font-dm-serif text-2xl sm:text-3xl mt-2">
            {item.title}
          </h3>
          <p className="text-white/70 mt-3 max-w-xl mx-auto">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
