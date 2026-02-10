"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

interface ProductImageZoomProps {
  src: string;
  alt: string;
  gallery?: string[];
}

export function ProductImageZoom({ src, alt, gallery = [] }: ProductImageZoomProps) {
  const allImages = [src, ...gallery.filter(img => img !== src)];
  const [selectedImage, setSelectedImage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [zoomPosition2, setZoomPosition2] = useState({ x: 50, y: 50 });
  const imageRef = useRef<HTMLDivElement>(null);

  const LENS_SIZE = 150;
  const ZOOM_LEVEL = 2.5;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 1024px)').matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || isMobile) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Clamp lens position so it stays within the image
    const lensX = Math.max(LENS_SIZE / 2, Math.min(x, rect.width - LENS_SIZE / 2));
    const lensY = Math.max(LENS_SIZE / 2, Math.min(y, rect.height - LENS_SIZE / 2));

    setLensPosition({ x: lensX - LENS_SIZE / 2, y: lensY - LENS_SIZE / 2 });

    // Calculate zoom position as percentage
    const percentX = (lensX / rect.width) * 100;
    const percentY = (lensY / rect.height) * 100;
    setZoomPosition({ x: percentX, y: percentY });
  }, [isMobile]);

  // Mobile: tap-to-zoom with in-place zoom
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!imageRef.current || !e.touches[0] || !isZoomed) return;
    e.preventDefault();

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    const y = ((e.touches[0].clientY - rect.top) / rect.height) * 100;

    setZoomPosition2({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    });
  };

  const handleClick = () => {
    if (isMobile) {
      setIsZoomed(!isZoomed);
      if (!isZoomed) {
        setZoomPosition2({ x: 50, y: 50 });
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative">
        <div
          ref={imageRef}
          className={`relative aspect-square rounded-3xl overflow-hidden bg-[#f5f0e8] dark:bg-[#2d3548] ${
            isMobile
              ? (isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in')
              : 'cursor-crosshair'
          }`}
          onMouseEnter={() => !isMobile && setIsHovering(true)}
          onMouseLeave={() => !isMobile && setIsHovering(false)}
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
              isMobile && isZoomed ? "scale-200" : "scale-100"
            }`}
            style={isMobile && isZoomed ? {
              transformOrigin: `${zoomPosition2.x}% ${zoomPosition2.y}%`
            } : undefined}
            priority
          />

          {/* Desktop: Lens overlay */}
          {isHovering && !isMobile && (
            <div
              className="absolute border-2 border-[#c9a227]/70 bg-[#c9a227]/10 pointer-events-none z-10"
              style={{
                width: LENS_SIZE,
                height: LENS_SIZE,
                left: lensPosition.x,
                top: lensPosition.y,
              }}
            />
          )}

          {/* Zoom indicator */}
          <div className={`absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-2 transition-opacity ${
            isHovering || isZoomed ? 'opacity-0' : 'opacity-100'
          }`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            <span className="hidden lg:inline">Hover to zoom</span>
            <span className="lg:hidden">Tap to zoom</span>
          </div>
        </div>

        {/* Desktop: Zoom panel (appears to the right, overlaying product info) */}
        {isHovering && !isMobile && (
          <div
            className="absolute top-0 left-[calc(100%+1rem)] w-[500px] aspect-square rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-[#2d3548] shadow-2xl z-50"
            style={{
              backgroundImage: `url(${allImages[selectedImage]})`,
              backgroundSize: `${ZOOM_LEVEL * 100}%`,
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              backgroundRepeat: 'no-repeat',
            }}
          />
        )}
      </div>

      {/* Thumbnail Gallery */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto p-1">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 transition-all ${
                selectedImage === index
                  ? "ring-2 ring-[#c9a227] ring-offset-2 ring-offset-[#faf8f5] dark:ring-offset-[#0f1219]"
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
