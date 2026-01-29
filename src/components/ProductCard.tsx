"use client";

import Image from "next/image";
import Link from "next/link";

export interface ProductSize {
  size: string;
  available: boolean;
}

export interface DisplayProduct {
  id: number;
  name: string;
  slug?: string;
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

export function ProductCard({ product }: ProductCardProps) {
  const productUrl = product.slug ? `/shop/${product.slug}` : `/shop`;

  return (
    <Link href={productUrl} className="block h-full group">
      <div className="bg-white dark:bg-[#2d3548] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-black/20 transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-64 sm:h-72 overflow-hidden flex-shrink-0">
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
          {/* View Details overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <span className="bg-white/90 dark:bg-[#1a1f2e]/90 text-[#2d2926] dark:text-white px-4 py-2 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
              View Details
            </span>
          </div>
        </div>
        <div className="p-5 sm:p-6 flex-1 flex flex-col">
          <h3 className="font-dm-serif text-xl line-clamp-1 group-hover:text-[#c9a227] dark:group-hover:text-[#fcd34d] transition-colors">{product.name}</h3>
          <p className="text-[#6b6560] dark:text-white/60 text-sm mt-2 line-clamp-2 flex-1">{product.description}</p>

          {/* Size Preview */}
          <div className="mt-4">
            <p className="text-[#6b6560] dark:text-white/60 text-sm mb-2">Available Sizes:</p>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((sizeObj) => (
                <span
                  key={sizeObj.size}
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    sizeObj.available
                      ? "bg-[#f5f0e8] dark:bg-white/10 text-[#6b6560] dark:text-white/70"
                      : "bg-gray-200 dark:bg-white/5 text-gray-400 dark:text-white/30 line-through"
                  }`}
                >
                  {sizeObj.size}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div>
              <span className="text-sm text-[#6b6560] dark:text-white/50">Price</span>
              <p className="font-dm-serif text-2xl text-[#c9a227] dark:text-[#fcd34d]">KES {product.price.toLocaleString()}</p>
            </div>
            <span className="px-4 py-2.5 font-medium bg-[#c9a227] text-[#1a1f2e] rounded-full group-hover:bg-[#d4af37] transition-colors">
              Shop Now
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
