"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  getArticles,
  getSiteSettings,
  getStrapiImageUrl,
  type Article,
  type SiteSettings,
} from "@/lib/strapi";

interface DisplayArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  featured: boolean;
  publishedAt: string;
}

export default function NewsPage() {
  const [articles, setArticles] = useState<DisplayArticle[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    async function fetchData() {
      const [articlesData, settingsData] = await Promise.all([
        getArticles(),
        getSiteSettings(),
      ]);

      if (articlesData.length > 0) {
        const displayArticles: DisplayArticle[] = articlesData.map((article) => ({
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
        setArticles(displayArticles);
      }

      setSettings(settingsData);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Get unique categories
  const categories = ["all", ...new Set(articles.map((a) => a.category).filter(Boolean))];

  // Filter articles by category
  const filteredArticles = selectedCategory === "all"
    ? articles
    : articles.filter((a) => a.category === selectedCategory);

  // Separate featured and regular articles
  const featuredArticle = filteredArticles.find((a) => a.featured);
  const regularArticles = filteredArticles.filter((a) => !a.featured || a.id !== featuredArticle?.id);

  const siteName = settings?.siteName || "Swagger FC";
  const foundedYear = settings?.foundedYear || 2018;

  return (
    <div className="bg-[#faf8f5] dark:bg-[#1a1f2e] text-[#2d2926] dark:text-white font-dm-sans min-h-screen transition-colors">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#faf8f5]/95 dark:bg-[#1a1f2e]/95 backdrop-blur-sm border-b border-black/5 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#c9a227] rounded-full flex items-center justify-center">
              <span className="text-[#1a1f2e] font-bold text-lg sm:text-xl">SF</span>
            </div>
            <div>
              <span className="font-dm-serif text-lg sm:text-xl">{siteName}</span>
              <p className="text-xs text-[#6b6560] dark:text-white/50 hidden sm:block">Est. {foundedYear}</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[#6b6560] dark:text-white/70 hover:text-[#c9a227] dark:hover:text-[#fcd34d] transition-colors text-sm font-medium">
              Back to Home
            </Link>
            <ThemeToggle className="text-[#6b6560] dark:text-white/70 hover:text-[#c9a227] dark:hover:text-[#fcd34d] hover:bg-black/5 dark:hover:bg-white/10" />
          </div>
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

      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="bg-white dark:bg-[#0f1219] border-b border-black/5 dark:border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-[#c9a227] text-[#1a1f2e]"
                      : "bg-[#f5f0e8] dark:bg-white/10 text-[#6b6560] dark:text-white/70 hover:bg-[#c9a227]/20 dark:hover:bg-[#c9a227]/20"
                  }`}
                >
                  {category === "all" ? "All" : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Articles */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a227]"></div>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#6b6560] dark:text-white/60 text-lg">No articles found.</p>
            <Link href="/" className="text-[#c9a227] dark:text-[#fcd34d] font-medium hover:underline mt-4 inline-block">
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Article */}
            {featuredArticle && (
              <article className="group">
                <Link href={`/news/${featuredArticle.slug}`} className="block">
                  <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
                    <Image
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-[#c9a227] text-[#1a1f2e] px-4 py-1.5 rounded-full text-sm font-medium">
                          {featuredArticle.category}
                        </span>
                        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                          Featured
                        </span>
                      </div>
                      <h2 className="font-dm-serif text-2xl sm:text-3xl md:text-4xl text-white group-hover:text-[#fcd34d] transition-colors">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-white/70 mt-3 line-clamp-2 max-w-2xl">
                        {featuredArticle.excerpt}
                      </p>
                      <p className="text-white/50 text-sm mt-4">
                        {new Date(featuredArticle.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              </article>
            )}

            {/* Article Grid */}
            {regularArticles.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {regularArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#1a1f2e] text-white py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#c9a227] rounded-full flex items-center justify-center">
                <span className="text-[#1a1f2e] font-bold">SF</span>
              </div>
              <span className="font-dm-serif text-lg">{siteName}</span>
            </div>
            <p className="text-white/50 text-sm">&copy; {new Date().getFullYear()} {siteName}. Built with passion.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ArticleCard({ article }: { article: DisplayArticle }) {
  return (
    <article className="group">
      <Link href={`/news/${article.slug}`} className="block">
        <div className="bg-white dark:bg-[#2d3548] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-black/20 transition-shadow duration-300">
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#c9a227] dark:text-[#fcd34d] text-sm font-medium">
                {article.category}
              </span>
              <span className="text-[#6b6560]/40 dark:text-white/30">•</span>
              <span className="text-[#6b6560]/60 dark:text-white/40 text-sm">
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
            <h3 className="font-dm-serif text-xl group-hover:text-[#c9a227] dark:group-hover:text-[#fcd34d] transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p className="text-[#6b6560] dark:text-white/60 text-sm mt-2 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="mt-4 flex items-center text-[#c9a227] dark:text-[#fcd34d] text-sm font-medium group-hover:gap-2 transition-all">
              Read More
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
