"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageLightbox } from "@/components/ImageLightbox";

export interface DisplayGalleryItem {
  image: string;
  year: string;
  title: string;
  description: string;
}

interface GallerySectionProps {
  items: DisplayGalleryItem[];
}

export function GallerySection({ items }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<DisplayGalleryItem | null>(null);

  return (
    <>
      {/* Auto-scrolling Gallery */}
      <div className="relative overflow-hidden">
        <div className="carousel-auto flex gap-4">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-4">
              {items.map((item, index) => (
                <GalleryCard
                  key={`${setIndex}-${index}`}
                  item={item}
                  onClick={() => setSelectedImage(item)}
                  priority={setIndex === 0 && index < 3}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <ImageLightbox item={selectedImage} onClose={() => setSelectedImage(null)} />
    </>
  );
}

function GalleryCard({ item, onClick, priority = false }: { item: DisplayGalleryItem; onClick: () => void; priority?: boolean }) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[380px] group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fcd34d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1f2e] rounded-2xl"
    >
      <div className="relative h-[480px] rounded-2xl overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          priority={priority}
          sizes="380px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition-colors duration-300"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <span className="text-[#fcd34d] text-sm font-medium">{item.year}</span>
          <h3 className="text-white font-dm-serif text-xl mt-1 group-hover:text-[#fcd34d] transition-colors">{item.title}</h3>
          <p className="text-white/60 text-sm mt-2 line-clamp-2">{item.description}</p>
        </div>
        {/* Click indicator */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </button>
  );
}
