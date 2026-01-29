import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileNav } from "@/components/MobileNav";
import { ProductCard, type DisplayProduct, type ProductSize } from "@/components/ProductCard";
import { getProducts, getSiteSettings, getStrapiImageUrl, generateSlug } from "@/lib/strapi";

// Fallback products when Strapi is empty
const fallbackProducts: DisplayProduct[] = [
  {
    id: 1,
    name: "Home Jersey 2025/26",
    slug: "home-jersey-2025-26",
    description: "Official match-day jersey with breathable fabric and embroidered club crest",
    price: 3500,
    image: "https://images.unsplash.com/photo-1763656812756-3539efd3e301?w=600&q=80",
    isNew: true,
    sizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
  },
  {
    id: 2,
    name: "Away Jersey 2025/26",
    slug: "away-jersey-2025-26",
    description: "Premium away kit with moisture-wicking technology",
    price: 3500,
    image: "https://images.unsplash.com/photo-1759447946445-397b1c034768?w=600&q=80",
    isNew: true,
    sizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
  },
  {
    id: 3,
    name: "Supporters Hoodie",
    slug: "supporters-hoodie",
    description: "Premium cotton blend hoodie with embroidered crest and kangaroo pocket",
    price: 2800,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
    isNew: false,
    sizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
  },
  {
    id: 4,
    name: "Training Jacket",
    slug: "training-jacket",
    description: "Lightweight training jacket with full zip and club branding",
    price: 3200,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    isNew: false,
    sizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
  },
  {
    id: 5,
    name: "Classic Polo Shirt",
    slug: "classic-polo-shirt",
    description: "Classic polo with woven club badge, perfect for match days",
    price: 2200,
    image: "https://images.unsplash.com/photo-1763656813028-3eb492fa7bcf?w=600&q=80",
    isNew: false,
    sizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
  },
  {
    id: 6,
    name: "Club T-Shirt",
    slug: "club-t-shirt",
    description: "Comfortable cotton t-shirt with printed club logo",
    price: 1500,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    isNew: false,
    sizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
  },
];

export default async function ShopPage() {
  const [productsData, settingsData] = await Promise.all([
    getProducts(),
    getSiteSettings(),
  ]);

  // Transform Strapi products to display format
  const products: DisplayProduct[] = productsData.length > 0
    ? productsData.map((p, index) => ({
        id: p.id,
        name: p.name,
        slug: p.slug || generateSlug(p.name),
        description: p.description,
        price: p.price,
        image: getStrapiImageUrl(p.image) || fallbackProducts[index % fallbackProducts.length].image,
        isNew: p.isNew,
        sizes: Array.isArray(p.sizes) ? p.sizes : fallbackProducts[0].sizes,
      }))
    : fallbackProducts;

  const siteName = settingsData?.siteName || "Swagger Sports Academy";
  const whatsappNumber = settingsData?.whatsappNumber || "254700000000";
  const foundedYear = settingsData?.foundedYear || 2018;
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
            <Link href="/news" className="text-[#6b6560] dark:text-white/70 hover:text-[#c9a227] dark:hover:text-[#fcd34d] transition-colors text-sm font-medium">
              News
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

      {/* Header */}
      <div className="pt-24 sm:pt-28 pb-8 sm:pb-12 bg-white dark:bg-[#0f1219]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="text-[#c9a227] dark:text-[#fcd34d] text-sm font-medium uppercase tracking-wider">Show Your Colors</span>
          <h1 className="font-dm-serif text-4xl sm:text-5xl md:text-6xl mt-2">Club Shop</h1>
          <p className="text-[#6b6560] dark:text-white/60 mt-4 max-w-xl">
            Wear your support. Select your size and order through WhatsApp.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} whatsappNumber={whatsappNumber} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a1f2e] text-white py-12 mt-12">
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
