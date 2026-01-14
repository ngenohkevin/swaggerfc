"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Home Jersey 2025/26",
    description: "Official match-day jersey with breathable fabric and embroidered club crest",
    price: "3,500",
    image: "https://images.unsplash.com/photo-1763656812756-3539efd3e301?w=600&q=80",
    isNew: true,
  },
  {
    id: 2,
    name: "Away Jersey 2025/26",
    description: "Premium away kit with moisture-wicking technology",
    price: "3,500",
    image: "https://images.unsplash.com/photo-1759447946445-397b1c034768?w=600&q=80",
    isNew: true,
  },
  {
    id: 3,
    name: "Supporters Hoodie",
    description: "Premium cotton blend hoodie with embroidered crest and kangaroo pocket",
    price: "2,800",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
  },
  {
    id: 4,
    name: "Training Jacket",
    description: "Lightweight training jacket with full zip and club branding",
    price: "3,200",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
  },
  {
    id: 5,
    name: "Classic Polo Shirt",
    description: "Classic polo with woven club badge, perfect for match days",
    price: "2,200",
    image: "https://images.unsplash.com/photo-1763656813028-3eb492fa7bcf?w=600&q=80",
  },
  {
    id: 6,
    name: "Club T-Shirt",
    description: "Comfortable cotton t-shirt with printed club logo",
    price: "1,500",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  },
];

const sizes = ["S", "M", "L", "XL", "XXL"];

export default function ShopPage() {
  return (
    <div className="bg-[#faf8f5] text-[#2d2926] font-dm-sans min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#faf8f5]/95 backdrop-blur-sm border-b border-black/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/design-3" className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1d4d2c] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg sm:text-xl">SF</span>
            </div>
            <div>
              <span className="font-dm-serif text-lg sm:text-xl">Swagger FC</span>
              <p className="text-xs text-[#6b6560] hidden sm:block">Est. 2018</p>
            </div>
          </Link>
          <Link href="/design-3" className="text-[#6b6560] hover:text-[#1d4d2c] transition-colors text-sm font-medium">
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div className="pt-24 sm:pt-28 pb-8 sm:pb-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="text-[#1d4d2c] text-sm font-medium uppercase tracking-wider">Show Your Colors</span>
          <h1 className="font-dm-serif text-4xl sm:text-5xl md:text-6xl mt-2">Club Shop</h1>
          <p className="text-[#6b6560] mt-4 max-w-xl">
            Wear your support. Select your size and order through WhatsApp.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Back to designs link */}
      <Link href="/" className="fixed bottom-6 left-6 bg-[#1d4d2c] text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-[#164023] transition-colors z-50">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
        </svg>
        All Designs
      </Link>
    </div>
  );
}

function ProductCard({ product }: { product: typeof products[0] }) {
  const [selectedSize, setSelectedSize] = useState<string>("");

  const whatsappMessage = `Hi! I want to order: ${product.name} - Size: ${selectedSize || "Not selected"} - Price: KES ${product.price}`;
  const whatsappLink = `https://wa.me/254700000000?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative h-64 sm:h-72 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.isNew && (
          <div className="absolute top-4 left-4">
            <span className="bg-[#1d4d2c] text-white px-3 py-1 rounded-full text-sm font-medium">New</span>
          </div>
        )}
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="font-dm-serif text-xl">{product.name}</h3>
        <p className="text-[#6b6560] text-sm mt-2 line-clamp-2">{product.description}</p>

        {/* Size Selection */}
        <div className="mt-4">
          <p className="text-[#6b6560] text-sm mb-2">Select Size:</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all ${
                  selectedSize === size
                    ? "bg-[#1d4d2c] text-white"
                    : "bg-[#f5f0e8] text-[#6b6560] hover:bg-[#1d4d2c]/10 hover:text-[#1d4d2c]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div>
            <span className="text-sm text-[#6b6560]">Price</span>
            <p className="font-dm-serif text-2xl text-[#1d4d2c]">KES {product.price}</p>
          </div>
          <a
            href={selectedSize ? whatsappLink : "#"}
            target={selectedSize ? "_blank" : undefined}
            rel="noopener noreferrer"
            onClick={(e) => !selectedSize && e.preventDefault()}
            className={`px-4 py-2.5 font-medium flex items-center gap-2 transition-colors rounded-full ${
              selectedSize
                ? "bg-[#25D366] text-white hover:bg-[#1fbd5a]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <WhatsAppIcon />
            Order
          </a>
        </div>
        {!selectedSize && (
          <p className="text-[#1d4d2c]/70 text-xs mt-2">Please select a size to order</p>
        )}
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
