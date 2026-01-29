import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileNav } from "@/components/MobileNav";
import { ProductImageZoom } from "@/components/ProductImageZoom";
import { ProductOrderForm } from "@/components/ProductOrderForm";
import {
  getProductBySlug,
  getProducts,
  getSiteSettings,
  getStrapiImageUrl,
  type StrapiImage,
} from "@/lib/strapi";

// Allow dynamic rendering for products not pre-generated
export const dynamicParams = true;

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [product, settings] = await Promise.all([
    getProductBySlug(slug),
    getSiteSettings(),
  ]);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const siteName = settings?.siteName || "Swagger Sports Academy";
  const siteUrl = "https://swaggerfc.iopulse.cloud";
  const productUrl = `${siteUrl}/shop/${slug}`;
  const imageUrl = getStrapiImageUrl(product.image) || `${siteUrl}/logo.png`;

  return {
    title: `${product.name} | ${siteName} Shop`,
    description: product.description,
    keywords: [product.name, siteName, "shop", "football", "jersey", "merchandise"].filter(Boolean),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: productUrl,
      siteName: siteName,
      title: product.name,
      description: product.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@swaggerfc",
      title: product.name,
      description: product.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: productUrl,
    },
  };
}

// Generate static paths for all products
export async function generateStaticParams() {
  const products = await getProducts();
  return products
    .filter((product) => product.slug)
    .map((product) => ({
      slug: product.slug,
    }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [productData, allProducts, settingsData] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
    getSiteSettings(),
  ]);

  if (!productData) {
    notFound();
  }

  const product = {
    id: productData.id,
    name: productData.name,
    slug: productData.slug,
    description: productData.description,
    price: productData.price,
    image: getStrapiImageUrl(productData.image) || "https://images.unsplash.com/photo-1763656812756-3539efd3e301?w=600&q=80",
    gallery: productData.gallery?.map((img: StrapiImage) => getStrapiImageUrl(img)).filter(Boolean) as string[] || [],
    isNew: productData.isNew,
    sizes: Array.isArray(productData.sizes) ? productData.sizes : [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    inStock: productData.inStock,
  };

  // Get related products (exclude current)
  const relatedProducts = allProducts
    .filter((p) => p.slug !== slug)
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      image: getStrapiImageUrl(p.image) || "https://images.unsplash.com/photo-1763656812756-3539efd3e301?w=600&q=80",
      isNew: p.isNew,
    }));

  const siteName = settingsData?.siteName || "Swagger Sports Academy";
  const foundedYear = settingsData?.foundedYear || 2018;
  const whatsappNumber = settingsData?.whatsappNumber || "254700000000";
  const logoUrl = getStrapiImageUrl(settingsData?.logo);

  return (
    <div className="bg-[#faf8f5] dark:bg-[#1a1f2e] text-[#2d2926] dark:text-white font-dm-sans min-h-screen transition-colors overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#faf8f5]/95 dark:bg-[#1a1f2e]/95 backdrop-blur-sm border-b border-black/5 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            {logoUrl ? (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden relative">
                <Image src={logoUrl} alt={siteName} fill className="object-cover" sizes="48px" />
              </div>
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#c9a227] rounded-full flex items-center justify-center">
                <span className="text-[#1a1f2e] font-bold text-lg sm:text-xl">SS</span>
              </div>
            )}
            <div>
              <span className="font-dm-serif text-[11px] sm:text-base md:text-lg lg:text-xl">{siteName}</span>
              <p className="text-xs text-[#6b6560] dark:text-white/50 hidden sm:block">Est. {foundedYear}</p>
            </div>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/" className="text-[#6b6560] dark:text-white/70 hover:text-[#c9a227] dark:hover:text-[#fcd34d] transition-colors text-sm font-medium">
              Home
            </Link>
            <Link href="/shop" className="text-[#6b6560] dark:text-white/70 hover:text-[#c9a227] dark:hover:text-[#fcd34d] transition-colors text-sm font-medium">
              Shop
            </Link>
            <ThemeToggle className="text-[#6b6560] dark:text-white/70 hover:text-[#c9a227] dark:hover:text-[#fcd34d] hover:bg-black/5 dark:hover:bg-white/10" />
          </div>
          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle className="text-[#6b6560] dark:text-white/70 hover:text-[#c9a227] dark:hover:text-[#fcd34d] hover:bg-black/5 dark:hover:bg-white/10" />
            <MobileNav
              items={[
                { href: "/", label: "Home" },
                { href: "/news", label: "News" },
                { href: "/shop", label: "Shop", isButton: true },
              ]}
              logoUrl={logoUrl}
              siteName={siteName}
              foundedYear={foundedYear}
            />
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="pt-24 sm:pt-28 bg-white dark:bg-[#0f1219]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-sm text-[#6b6560] dark:text-white/60">
            <Link href="/" className="hover:text-[#c9a227] dark:hover:text-[#fcd34d] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#c9a227] dark:hover:text-[#fcd34d] transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="text-[#2d2926] dark:text-white truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <div className="bg-white dark:bg-[#0f1219] pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Section */}
            <div>
              <ProductImageZoom
                src={product.image}
                alt={product.name}
                gallery={product.gallery}
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.isNew && (
                  <span className="bg-[#c9a227] text-[#1a1f2e] px-3 py-1 rounded-full text-sm font-medium">
                    New Arrival
                  </span>
                )}
                {product.inStock ? (
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                    In Stock
                  </span>
                ) : (
                  <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-dm-serif text-3xl sm:text-4xl lg:text-5xl mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mb-6">
                <span className="text-sm text-[#6b6560] dark:text-white/50">Price</span>
                <p className="font-dm-serif text-3xl sm:text-4xl text-[#c9a227] dark:text-[#fcd34d]">
                  KES {product.price.toLocaleString()}
                </p>
              </div>

              {/* Description */}
              <p className="text-[#6b6560] dark:text-white/70 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Order Form */}
              <ProductOrderForm
                product={product}
                whatsappNumber={whatsappNumber}
              />

              {/* Features */}
              <div className="mt-8 pt-8 border-t border-black/10 dark:border-white/10">
                <h3 className="font-medium mb-4">Features</h3>
                <ul className="space-y-2 text-[#6b6560] dark:text-white/70">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#c9a227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Premium quality material
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#c9a227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Official club merchandise
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#c9a227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Comfortable fit for all occasions
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#c9a227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Easy WhatsApp ordering
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="font-dm-serif text-2xl sm:text-3xl mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((related) => (
              <Link key={related.id} href={`/shop/${related.slug}`} className="group block">
                <div className="bg-white dark:bg-[#2d3548] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-black/20 transition-shadow duration-300">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={related.image}
                      alt={related.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {related.isNew && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-[#c9a227] text-[#1a1f2e] px-2 py-0.5 rounded-full text-xs font-medium">
                          New
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-dm-serif text-sm sm:text-base line-clamp-1 group-hover:text-[#c9a227] dark:group-hover:text-[#fcd34d] transition-colors">
                      {related.name}
                    </h3>
                    <p className="text-[#c9a227] dark:text-[#fcd34d] font-medium text-sm sm:text-base mt-1">
                      KES {related.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#1a1f2e] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                  <Image src={logoUrl} alt={siteName} fill className="object-cover" sizes="40px" />
                </div>
              ) : (
                <div className="w-10 h-10 bg-[#c9a227] rounded-full flex items-center justify-center">
                  <span className="text-[#1a1f2e] font-bold">SS</span>
                </div>
              )}
              <span className="font-dm-serif text-sm sm:text-lg">{siteName}</span>
            </div>
            <p className="text-white/50 text-sm">&copy; {new Date().getFullYear()} {siteName}. Built with passion.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
