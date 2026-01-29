"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface ProductImageZoomProps {
  src: string;
  alt: string;
  gallery?: string[];
}

export function ProductImageZoom({ src, alt, gallery = [] }: ProductImageZoomProps) {
  const allImages = [src, ...gallery.filter(img => img !== src)];
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isMobile, setIsMobile] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || isMobile) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!imageRef.current || !e.touches[0] || !isZoomed) return;
    e.preventDefault();

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    const y = ((e.touches[0].clientY - rect.top) / rect.height) * 100;

    setZoomPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    });
  };

  const handleClick = () => {
    if (isMobile) {
      setIsZoomed(!isZoomed);
      if (!isZoomed) {
        setZoomPosition({ x: 50, y: 50 });
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Image with Zoom */}
      <div
        ref={imageRef}
        className={`relative aspect-square rounded-3xl overflow-hidden bg-[#f5f0e8] dark:bg-[#2d3548] ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        onMouseEnter={() => !isMobile && setIsZoomed(true)}
        onMouseLeave={() => !isMobile && setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        onTouchMove={handleTouchMove}
      >
        <Image
          src={allImages[selectedImage]}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-transform duration-300 ${
            isZoomed ? "scale-200" : "scale-100"
          }`}
          style={isZoomed ? {
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
          } : undefined}
          priority
        />

        {/* Zoom indicator */}
        <div className={`absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-2 transition-opacity ${isZoomed ? 'opacity-0' : 'opacity-100'}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
          <span className="hidden sm:inline">Hover to zoom</span>
          <span className="sm:hidden">Tap to zoom</span>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 mt-6">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 transition-all ${
                selectedImage === index
                  ? "ring-2 ring-[#c9a227] ring-offset-2 ring-offset-[#faf8f5] dark:ring-offset-[#1a1f2e]"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`${alt} view ${index + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
