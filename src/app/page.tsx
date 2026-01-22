"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ImageLightbox } from "@/components/ImageLightbox";
import { SocialLinks } from "@/components/SocialLinks";
import {
  getGalleryItems,
  getSiteSettings,
  getProducts,
  getStrapiImageUrl,
  type GalleryItem as StrapiGalleryItem,
  type SiteSettings,
  type Product,
} from "@/lib/strapi";

interface DisplayGalleryItem {
  image: string;
  year: string;
  title: string;
  description: string;
}

// Fallback gallery items when Strapi is empty
const fallbackGalleryItems: DisplayGalleryItem[] = [
  {
    image: "https://images.unsplash.com/photo-1560003991-545650ee5f07?w=700&q=80",
    year: "2025",
    title: "League Champions",
    description: "Our first ever league title - a historic achievement that marked the culmination of years of dedication and hard work from players, staff, and supporters alike.",
  },
  {
    image: "https://images.unsplash.com/photo-1620567253244-6f340f675bca?w=700&q=80",
    year: "2024",
    title: "Cup Final Victory",
    description: "A thrilling win that brought the whole town together. The atmosphere at the stadium was electric as we lifted the trophy under the floodlights.",
  },
  {
    image: "https://images.unsplash.com/photo-1718246425786-894821186deb?w=700&q=80",
    year: "2023",
    title: "Record Attendance",
    description: "15,000 fans packed into our new home stadium for the first time, creating memories that will last a lifetime for everyone present.",
  },
  {
    image: "https://images.unsplash.com/photo-1647101678383-9f179e1dd2c0?w=700&q=80",
    year: "2022",
    title: "Youth Award",
    description: "Recognized as the best youth development program in the region, a testament to our commitment to nurturing young talent.",
  },
];

// Fallback products for shop preview
const fallbackProducts = [
  {
    image: "https://images.unsplash.com/photo-1763656812756-3539efd3e301?w=600&q=80",
    title: "Home Jersey 25/26",
    price: "3,500",
    isNew: true,
  },
  {
    image: "https://images.unsplash.com/photo-1759447946445-397b1c034768?w=600&q=80",
    title: "Supporters Hoodie",
    price: "2,800",
    isNew: false,
  },
  {
    image: "https://images.unsplash.com/photo-1763656813028-3eb492fa7bcf?w=600&q=80",
    title: "Classic Polo Shirt",
    price: "2,200",
    isNew: false,
  },
];

// Fallback settings
const fallbackSettings = {
  siteName: "Swagger FC",
  tagline: "More Than Just Football",
  heroSubtitle: "Welcome to our family",
  heroDescription: "A community united by passion for the beautiful game. Where every supporter is family and every match day is a celebration.",
  supportersCount: "5K+",
  yearsStrong: "7+",
  trophiesWon: "12",
  championsTitle: "Champions",
  championsSubtitle: "2025 League Winners",
  foundedYear: 2018,
};

// Fallback images
const fallbackImages = {
  hero: "https://images.unsplash.com/photo-1629977007371-0ba395424741?w=800&q=80",
  about: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80",
  news1: "https://images.unsplash.com/photo-1544366981-2150548c9c1c?w=1000&q=80",
  news2: "https://images.unsplash.com/photo-1757031299944-5028e556613d?w=500&q=80",
  news3: "https://images.unsplash.com/photo-1629977007398-a17feb6ddf14?w=500&q=80",
};

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<DisplayGalleryItem | null>(null);
  const [galleryItems, setGalleryItems] = useState<DisplayGalleryItem[]>(fallbackGalleryItems);
  const [settings, setSettings] = useState<typeof fallbackSettings>(fallbackSettings);
  const [shopProducts, setShopProducts] = useState<typeof fallbackProducts>(fallbackProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [galleryData, settingsData, productsData] = await Promise.all([
        getGalleryItems(),
        getSiteSettings(),
        getProducts(),
      ]);

      // Transform gallery items from Strapi
      if (galleryData.length > 0) {
        const displayGallery: DisplayGalleryItem[] = galleryData.map((item, index) => ({
          image: getStrapiImageUrl(item.image) || fallbackGalleryItems[index % fallbackGalleryItems.length].image,
          year: item.year || fallbackGalleryItems[index % fallbackGalleryItems.length].year,
          title: item.title || fallbackGalleryItems[index % fallbackGalleryItems.length].title,
          description: item.description || fallbackGalleryItems[index % fallbackGalleryItems.length].description,
        }));
        setGalleryItems(displayGallery);
      }

      // Use site settings from Strapi or fallback
      if (settingsData) {
        setSettings({
          siteName: settingsData.siteName || fallbackSettings.siteName,
          tagline: settingsData.tagline || fallbackSettings.tagline,
          heroSubtitle: settingsData.heroSubtitle || fallbackSettings.heroSubtitle,
          heroDescription: settingsData.heroDescription || fallbackSettings.heroDescription,
          supportersCount: settingsData.supportersCount || fallbackSettings.supportersCount,
          yearsStrong: settingsData.yearsStrong || fallbackSettings.yearsStrong,
          trophiesWon: settingsData.trophiesWon || fallbackSettings.trophiesWon,
          championsTitle: settingsData.championsTitle || fallbackSettings.championsTitle,
          championsSubtitle: settingsData.championsSubtitle || fallbackSettings.championsSubtitle,
          foundedYear: settingsData.foundedYear || fallbackSettings.foundedYear,
        });
      }

      // Transform products for shop preview
      if (productsData.length > 0) {
        const displayProducts = productsData.slice(0, 3).map((product, index) => ({
          image: getStrapiImageUrl(product.image) || fallbackProducts[index % fallbackProducts.length].image,
          title: product.name || fallbackProducts[index % fallbackProducts.length].title,
          price: product.price?.toLocaleString() || fallbackProducts[index % fallbackProducts.length].price,
          isNew: product.isNew || false,
        }));
        setShopProducts(displayProducts);
      }

      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <div className="bg-[#faf8f5] dark:bg-[#1a1f2e] text-[#2d2926] dark:text-white font-dm-sans min-h-screen transition-colors">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#faf8f5]/95 dark:bg-[#1a1f2e]/95 backdrop-blur-sm border-b border-black/5 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#c9a227] rounded-full flex items-center justify-center">
              <span className="text-[#1a1f2e] font-bold text-xl">SF</span>
            </div>
            <div>
              <span className="font-dm-serif text-xl">{settings.siteName}</span>
              <p className="text-xs text-[#6b6560] dark:text-white/50">Est. {settings.foundedYear}</p>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#news" className="text-[#6b6560] dark:text-white/70 hover:text-[#c9a227] dark:hover:text-[#fcd34d] transition-colors">News</a>
            <a href="#achievements" className="text-[#6b6560] dark:text-white/70 hover:text-[#c9a227] dark:hover:text-[#fcd34d] transition-colors">Gallery</a>
            <a href="#about" className="text-[#6b6560] dark:text-white/70 hover:text-[#c9a227] dark:hover:text-[#fcd34d] transition-colors">About</a>
            <a href="#shop" className="bg-[#c9a227] text-[#1a1f2e] px-6 py-2.5 rounded-full hover:bg-[#d4af37] transition-colors font-medium">Shop</a>
            <ThemeToggle className="text-[#6b6560] dark:text-white/70 hover:text-[#c9a227] dark:hover:text-[#fcd34d] hover:bg-black/5 dark:hover:bg-white/10" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#c9a227]/5 to-transparent rounded-full blur-3xl pointer-events-none dark:from-[#c9a227]/10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#c9a227]/5 to-transparent rounded-full blur-3xl pointer-events-none dark:from-[#c9a227]/10" />

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="order-2 lg:order-1">
              {/* Animated badge */}
              <div className="inline-flex items-center gap-2 bg-[#c9a227]/10 dark:bg-[#c9a227]/20 text-[#c9a227] dark:text-[#fcd34d] px-4 py-2 rounded-full text-sm font-medium mb-6 border border-[#c9a227]/20 dark:border-[#c9a227]/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9a227] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c9a227]"></span>
                </span>
                {settings.heroSubtitle}
              </div>

              <h1 className="font-dm-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
                {settings.tagline.includes(" ") ? (
                  <>
                    {settings.tagline.split(" ").slice(0, -2).join(" ")}<br/>
                    <span className="text-[#c9a227] dark:text-[#fcd34d] relative">
                      {settings.tagline.split(" ").slice(-2).join(" ")}
                      <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#c9a227]/30 dark:text-[#fcd34d]/30" viewBox="0 0 200 12" preserveAspectRatio="none">
                        <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                    </span>
                  </>
                ) : (
                  settings.tagline
                )}
              </h1>

              <p className="text-[#6b6560] dark:text-white/70 text-lg mb-8 max-w-md leading-relaxed">
                {settings.heroDescription}
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <a href="#news" className="group bg-[#c9a227] text-[#1a1f2e] px-8 py-4 rounded-full font-medium hover:bg-[#d4af37] transition-all hover:shadow-lg hover:shadow-[#c9a227]/25 flex items-center gap-2">
                  Read Our Story
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
                <a href="#shop" className="border-2 border-[#2d2926]/20 dark:border-white/20 text-[#2d2926] dark:text-white px-8 py-4 rounded-full font-medium hover:border-[#c9a227] dark:hover:border-[#fcd34d] hover:text-[#c9a227] dark:hover:text-[#fcd34d] transition-all hover:bg-[#c9a227]/5">
                  Visit Shop
                </a>
              </div>

              {/* Stats row */}
              <div className="flex gap-8 pt-8 border-t border-black/10 dark:border-white/10">
                <div>
                  <p className="font-dm-serif text-3xl text-[#c9a227] dark:text-[#fcd34d]">{settings.yearsStrong}</p>
                  <p className="text-sm text-[#6b6560] dark:text-white/60">Years Strong</p>
                </div>
                <div>
                  <p className="font-dm-serif text-3xl text-[#c9a227] dark:text-[#fcd34d]">{settings.trophiesWon}</p>
                  <p className="text-sm text-[#6b6560] dark:text-white/60">Trophies Won</p>
                </div>
                <div>
                  <p className="font-dm-serif text-3xl text-[#c9a227] dark:text-[#fcd34d]">{settings.supportersCount}</p>
                  <p className="text-sm text-[#6b6560] dark:text-white/60">Supporters</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute -inset-4 border-2 border-dashed border-[#c9a227]/20 dark:border-[#fcd34d]/20 rounded-[3rem] animate-spin-slow pointer-events-none" style={{ animationDuration: '30s' }} />

                {/* Main image */}
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20 dark:shadow-black/40 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1629977007371-0ba395424741?w=800&q=80"
                    alt="Football Action"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

                {/* Floating Card - Bottom Left */}
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-[#2d3548] p-5 rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/30 max-w-[220px] backdrop-blur-sm border border-black/5 dark:border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#c9a227]/10 dark:bg-[#c9a227]/30 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#c9a227] dark:text-[#fcd34d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-dm-serif text-xl text-[#c9a227] dark:text-[#fcd34d]">{settings.supportersCount}</p>
                      <p className="text-xs text-[#6b6560] dark:text-white/60">Active Supporters</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#6b6560] dark:text-white/50">Growing stronger every matchday</p>
                </div>

                {/* Floating Card - Top Right */}
                <div className="absolute -top-4 -right-4 bg-[#c9a227] text-[#1a1f2e] px-4 py-3 rounded-xl shadow-lg shadow-[#c9a227]/30">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="font-dm-serif text-lg">{settings.championsTitle}</span>
                  </div>
                  <p className="text-xs opacity-80 mt-1">{settings.championsSubtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-20 bg-white dark:bg-[#0f1219]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[#c9a227] dark:text-[#fcd34d] text-sm font-medium uppercase tracking-wider">What&apos;s Happening</span>
              <h2 className="font-dm-serif text-4xl md:text-5xl mt-2">Club News</h2>
            </div>
            <a href="#" className="text-[#c9a227] dark:text-[#fcd34d] font-medium hover:underline mt-4 md:mt-0 flex items-center gap-2">
              All Articles
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Featured News */}
            <div className="md:col-span-2 md:row-span-2 group">
              <article className="h-full">
                <div className="relative h-[400px] md:h-full rounded-3xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1544366981-2150548c9c1c?w=1000&q=80"
                    alt="Championship"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="bg-[#c9a227] text-[#1a1f2e] px-4 py-1.5 rounded-full text-sm font-medium">Match Day</span>
                    <h3 className="font-dm-serif text-2xl md:text-3xl text-white mt-4 group-hover:text-[#fcd34d] transition-colors">
                      A Night to Remember: Championship Glory
                    </h3>
                    <p className="text-white/70 mt-3 line-clamp-2">
                      Our supporters made their voices heard as we lifted the trophy under the lights.
                    </p>
                    <p className="text-white/50 text-sm mt-4">January 10, 2026</p>
                  </div>
                </div>
              </article>
            </div>

            {/* News Card */}
            <article className="group">
              <div className="bg-[#f5f0e8] dark:bg-[#2d3548] rounded-2xl overflow-hidden">
                <div className="h-48 overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1757031299944-5028e556613d?w=500&q=80"
                    alt="Training"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[#c9a227] dark:text-[#fcd34d] text-sm font-medium">Training</span>
                  <h4 className="font-dm-serif text-xl mt-2 group-hover:text-[#c9a227] dark:group-hover:text-[#fcd34d] transition-colors">
                    Youth Academy Open Day Success
                  </h4>
                  <p className="text-[#6b6560] dark:text-white/60 text-sm mt-2 line-clamp-2">
                    Over 200 young players attended our talent identification program.
                  </p>
                  <p className="text-[#6b6560]/60 dark:text-white/40 text-sm mt-4">January 8, 2026</p>
                </div>
              </div>
            </article>

            {/* News Card */}
            <article className="group">
              <div className="bg-[#f5f0e8] dark:bg-[#2d3548] rounded-2xl overflow-hidden">
                <div className="h-48 overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1629977007398-a17feb6ddf14?w=500&q=80"
                    alt="Community"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[#c9a227] dark:text-[#fcd34d] text-sm font-medium">Community</span>
                  <h4 className="font-dm-serif text-xl mt-2 group-hover:text-[#c9a227] dark:group-hover:text-[#fcd34d] transition-colors">
                    Season Ticket Renewals Now Open
                  </h4>
                  <p className="text-[#6b6560] dark:text-white/60 text-sm mt-2 line-clamp-2">
                    Secure your seat for another season of unforgettable moments.
                  </p>
                  <p className="text-[#6b6560]/60 dark:text-white/40 text-sm mt-4">January 5, 2026</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Achievements Gallery */}
      <section id="achievements" className="py-20 bg-[#1a1f2e] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <div className="text-center text-white">
            <span className="text-[#fcd34d] text-sm font-medium uppercase tracking-wider">Our Journey</span>
            <h2 className="font-dm-serif text-4xl md:text-5xl mt-2">Moments of Glory</h2>
            <p className="text-white/60 mt-4 max-w-xl mx-auto">
              Every trophy tells a story of dedication, teamwork, and the unwavering support of our community.
            </p>
          </div>
        </div>

        {/* Auto-scrolling Gallery */}
        <div className="relative overflow-hidden">
          <div className="carousel-auto flex gap-4">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-4">
                {galleryItems.map((item, index) => (
                  <GalleryCard
                    key={`${setIndex}-${index}`}
                    item={item}
                    onClick={() => setSelectedImage(item)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <ImageLightbox item={selectedImage} onClose={() => setSelectedImage(null)} />

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-[#0f1219]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80"
                  alt="Team celebrating"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -right-6 bg-[#c9a227] text-[#1a1f2e] p-6 rounded-2xl shadow-lg max-w-[200px]">
                <p className="font-dm-serif text-4xl">{settings.foundedYear}</p>
                <p className="text-sm opacity-80">Year Founded</p>
              </div>
            </div>

            {/* Content Side */}
            <div>
              <span className="text-[#c9a227] dark:text-[#fcd34d] text-sm font-medium uppercase tracking-wider">Our Story</span>
              <h2 className="font-dm-serif text-4xl md:text-5xl mt-2 mb-6">About {settings.siteName}</h2>
              <p className="text-[#6b6560] dark:text-white/70 text-lg mb-6 leading-relaxed">
                Founded in {settings.foundedYear}, {settings.siteName} started as a group of friends with a shared passion for football. What began as casual weekend matches has grown into a community of over {settings.supportersCount} supporters who believe in the beautiful game.
              </p>
              <p className="text-[#6b6560] dark:text-white/70 mb-8 leading-relaxed">
                Our mission is simple: to provide a platform where talent meets opportunity, where community comes first, and where every match day is a celebration of what we can achieve together.
              </p>

              {/* Values */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#c9a227]/10 dark:bg-[#c9a227]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#c9a227] dark:text-[#fcd34d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-dm-serif text-lg">Community</h4>
                    <p className="text-sm text-[#6b6560] dark:text-white/60">Family-first approach to football</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#c9a227]/10 dark:bg-[#c9a227]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#c9a227] dark:text-[#fcd34d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-dm-serif text-lg">Excellence</h4>
                    <p className="text-sm text-[#6b6560] dark:text-white/60">Striving for the best every day</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#c9a227]/10 dark:bg-[#c9a227]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#c9a227] dark:text-[#fcd34d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-dm-serif text-lg">Passion</h4>
                    <p className="text-sm text-[#6b6560] dark:text-white/60">Love for the beautiful game</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#c9a227]/10 dark:bg-[#c9a227]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#c9a227] dark:text-[#fcd34d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-dm-serif text-lg">Integrity</h4>
                    <p className="text-sm text-[#6b6560] dark:text-white/60">Fair play on and off the pitch</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-20 bg-[#faf8f5] dark:bg-[#1a1f2e]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#c9a227] dark:text-[#fcd34d] text-sm font-medium uppercase tracking-wider">Show Your Colors</span>
            <h2 className="font-dm-serif text-4xl md:text-5xl mt-2">Club Shop</h2>
            <p className="text-[#6b6560] dark:text-white/60 mt-4 max-w-md mx-auto">
              Wear your support. Order easily through WhatsApp.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {shopProducts.map((product, index) => (
              <ShopPreviewCard
                key={index}
                image={product.image}
                title={product.title}
                price={product.price}
                isNew={product.isNew}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop" className="inline-flex items-center gap-2 bg-[#c9a227] text-[#1a1f2e] px-8 py-4 rounded-full font-medium hover:bg-[#d4af37] transition-colors">
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1f2e] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#c9a227] rounded-full flex items-center justify-center">
                  <span className="text-[#1a1f2e] font-bold text-xl">SF</span>
                </div>
                <div>
                  <span className="font-dm-serif text-xl">{settings.siteName}</span>
                  <p className="text-white/50 text-sm">Est. {settings.foundedYear}</p>
                </div>
              </div>
              <p className="text-white/60 max-w-sm">
                More than a club. We&apos;re a family united by our love for football and community.
              </p>
            </div>
            <div>
              <h4 className="font-dm-serif text-lg mb-4">Club</h4>
              <ul className="space-y-3 text-white/60">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fixtures</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Results</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Academy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-dm-serif text-lg mb-4">Follow Us</h4>
              <SocialLinks />
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/40 text-sm">
            <p>&copy; {new Date().getFullYear()} {settings.siteName}. Built with passion.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes scrollRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-380px * 4 - 4rem)); }
        }
        .carousel-auto {
          animation: scrollRight 30s linear infinite;
          width: calc(380px * 8 + 7rem);
        }
        .carousel-auto:hover {
          animation-play-state: paused;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

function GalleryCard({ item, onClick }: { item: DisplayGalleryItem; onClick: () => void }) {
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

function ShopPreviewCard({ image, title, price, isNew }: { image: string; title: string; price: string; isNew?: boolean }) {
  return (
    <Link href="/shop" className="bg-white dark:bg-[#2d3548] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group block cursor-pointer">
      <div className="relative h-80 overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        {isNew && (
          <div className="absolute top-4 left-4">
            <span className="bg-[#c9a227] text-[#1a1f2e] px-3 py-1 rounded-full text-sm font-medium">New</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-dm-serif text-xl">{title}</h3>
        <p className="text-[#6b6560] dark:text-white/60 text-sm mt-2">Available in S, M, L, XL, XXL</p>
        <div className="flex items-center justify-between mt-6">
          <div>
            <span className="text-sm text-[#6b6560] dark:text-white/50">From</span>
            <p className="font-dm-serif text-2xl text-[#c9a227] dark:text-[#fcd34d]">KES {price}</p>
          </div>
          <span className="text-[#c9a227] dark:text-[#fcd34d] text-sm font-medium">View in Shop →</span>
        </div>
      </div>
    </Link>
  );
}
