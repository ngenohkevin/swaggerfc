"use client";

import Image from "next/image";
import { useState } from "react";

export interface ProductSize {
  size: string;
  available: boolean;
}

export interface DisplayProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  isNew: boolean;
  sizes: ProductSize[];
}

interface ProductCardProps {
  product: DisplayProduct;
  whatsappNumber: string;
}

export function ProductCard({ product, whatsappNumber }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappMessage = `Hi! I want to order: ${product.name} - Size: ${selectedSize || "Not selected"} - Price: KES ${product.price.toLocaleString()}`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleOrderClick = (e: React.MouseEvent) => {
    if (!selectedSize) {
      e.preventDefault();
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };

  return (
    <div className="bg-white dark:bg-[#2d3548] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-black/20 transition-shadow duration-300 group">
      <div className="relative h-64 sm:h-72 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.isNew && (
          <div className="absolute top-4 left-4">
            <span className="bg-[#c9a227] text-[#1a1f2e] px-3 py-1 rounded-full text-sm font-medium">New</span>
          </div>
        )}
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="font-dm-serif text-xl">{product.name}</h3>
        <p className="text-[#6b6560] dark:text-white/60 text-sm mt-2 line-clamp-2">{product.description}</p>

        {/* Size Selection */}
        <div className="mt-4">
          <p className="text-[#6b6560] dark:text-white/60 text-sm mb-2">Select Size:</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((sizeObj) => (
              <button
                key={sizeObj.size}
                onClick={() => {
                  if (sizeObj.available) {
                    setSelectedSize(sizeObj.size);
                    setShowTooltip(false);
                  }
                }}
                disabled={!sizeObj.available}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all ${
                  !sizeObj.available
                    ? "bg-gray-200 dark:bg-white/5 text-gray-400 dark:text-white/30 cursor-not-allowed line-through"
                    : selectedSize === sizeObj.size
                    ? "bg-[#c9a227] text-[#1a1f2e]"
                    : "bg-[#f5f0e8] dark:bg-white/10 text-[#6b6560] dark:text-white/70 hover:bg-[#c9a227]/10 dark:hover:bg-[#c9a227]/20 hover:text-[#c9a227] dark:hover:text-[#fcd34d]"
                }`}
              >
                {sizeObj.size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div>
            <span className="text-sm text-[#6b6560] dark:text-white/50">Price</span>
            <p className="font-dm-serif text-2xl text-[#c9a227] dark:text-[#fcd34d]">KES {product.price.toLocaleString()}</p>
          </div>
          <div className="relative">
            <a
              href={selectedSize ? whatsappLink : "#"}
              target={selectedSize ? "_blank" : undefined}
              rel="noopener noreferrer"
              onClick={handleOrderClick}
              className={`px-4 py-2.5 font-medium flex items-center gap-2 transition-colors rounded-full ${
                selectedSize
                  ? "bg-[#25D366] text-white hover:bg-[#1fbd5a]"
                  : "bg-gray-200 dark:bg-white/10 text-gray-400 dark:text-white/30 cursor-not-allowed"
              }`}
            >
              <WhatsAppIcon />
              Order
            </a>
            {showTooltip && (
              <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-[#c9a227] text-[#1a1f2e] text-sm font-medium rounded-full shadow-lg whitespace-nowrap animate-pulse">
                Please select a size first!
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#c9a227]"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
