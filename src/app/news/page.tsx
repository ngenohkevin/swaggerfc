import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileNav } from "@/components/MobileNav";
import { ArticlesList, type DisplayArticle } from "@/components/ArticlesList";
import {
  getArticles,
  getSiteSettings,
  getStrapiImageUrl,
} from "@/lib/strapi";

export default async function NewsPage() {
  const [articlesData, settingsData] = await Promise.all([
    getArticles(),
    getSiteSettings(),
  ]);

  // Transform articles from Strapi
  const articles: DisplayArticle[] = articlesData.map((article) => ({
    id: article.id,
    documentId: article.documentId,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category,
    image: getStrapiImageUrl(article.image) || "https://images.unsplash.com/photo-1544366981-2150548c9c1c?w=800&q=80",
    featured: article.featured,
    publishedAt: article.publishedAt,
  }));

  const siteName = settingsData?.siteName || "Swagger Sports Academy";
  const foundedYear = settingsData?.foundedYear || 2018;
  const logoUrl = getStrapiImageUrl(settingsData?.logo);

  return (
    <div className="bg-[#faf8f5] dark:bg-[#1a1f2e] text-[#2d2926] dark:text-white font-dm-sans min-h-screen transition-colors">
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
              <span className="font-dm-serif text-lg sm:text-xl">{siteName}</span>
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
      </nav>

      {/* Header */}
      <div className="pt-24 sm:pt-28 pb-8 sm:pb-12 bg-white dark:bg-[#0f1219]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="text-[#c9a227] dark:text-[#fcd34d] text-sm font-medium uppercase tracking-wider">What's Happening</span>
          <h1 className="font-dm-serif text-4xl sm:text-5xl md:text-6xl mt-2">Club News</h1>
          <p className="text-[#6b6560] dark:text-white/60 mt-4 max-w-xl">
            Stay updated with the latest news, match reports, and announcements from {siteName}.
          </p>
        </div>
      </div>

      <ArticlesList articles={articles} />

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
              <span className="font-dm-serif text-lg">{siteName}</span>
            </div>
            <p className="text-white/50 text-sm">&copy; {new Date().getFullYear()} {siteName}. Built with passion.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
