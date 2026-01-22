"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  getArticleBySlug,
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

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<DisplayArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<DisplayArticle[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const [articleData, allArticles, settingsData] = await Promise.all([
        getArticleBySlug(slug),
        getArticles(),
        getSiteSettings(),
      ]);

      if (!articleData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const displayArticle: DisplayArticle = {
        id: articleData.id,
        documentId: articleData.documentId,
        title: articleData.title,
        slug: articleData.slug,
        excerpt: articleData.excerpt,
        content: articleData.content,
        category: articleData.category,
        image: getStrapiImageUrl(articleData.image) || "https://images.unsplash.com/photo-1544366981-2150548c9c1c?w=800&q=80",
        featured: articleData.featured,
        publishedAt: articleData.publishedAt,
      };
      setArticle(displayArticle);

      // Get related articles (same category, exclude current)
      const related = allArticles
        .filter((a) => a.slug !== slug)
        .slice(0, 3)
        .map((a) => ({
          id: a.id,
          documentId: a.documentId,
          title: a.title,
          slug: a.slug,
          excerpt: a.excerpt,
          content: a.content,
          category: a.category,
          image: getStrapiImageUrl(a.image) || "https://images.unsplash.com/photo-1544366981-2150548c9c1c?w=800&q=80",
          featured: a.featured,
          publishedAt: a.publishedAt,
        }));
      setRelatedArticles(related);

      setSettings(settingsData);
      setLoading(false);
    }
    fetchData();
  }, [slug]);

  const siteName = settings?.siteName || "Swagger FC";
  const foundedYear = settings?.foundedYear || 2018;

  if (loading) {
    return (
      <div className="bg-[#faf8f5] dark:bg-[#1a1f2e] min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a227]"></div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="bg-[#faf8f5] dark:bg-[#1a1f2e] text-[#2d2926] dark:text-white min-h-screen flex flex-col">
        <nav className="fixed top-0 w-full z-50 bg-[#faf8f5]/95 dark:bg-[#1a1f2e]/95 backdrop-blur-sm border-b border-black/5 dark:border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#c9a227] rounded-full flex items-center justify-center">
                <span className="text-[#1a1f2e] font-bold text-lg sm:text-xl">SF</span>
              </div>
              <span className="font-dm-serif text-lg sm:text-xl">{siteName}</span>
            </Link>
          </div>
        </nav>
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-dm-serif text-4xl mb-4">Article Not Found</h1>
            <p className="text-[#6b6560] dark:text-white/60 mb-6">The article you're looking for doesn't exist.</p>
            <Link href="/news" className="bg-[#c9a227] text-[#1a1f2e] px-6 py-3 rounded-full font-medium hover:bg-[#d4af37] transition-colors">
              View All News
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            <Link href="/news" className="text-[#6b6560] dark:text-white/70 hover:text-[#c9a227] dark:hover:text-[#fcd34d] transition-colors text-sm font-medium">
              All News
            </Link>
            <ThemeToggle className="text-[#6b6560] dark:text-white/70 hover:text-[#c9a227] dark:hover:text-[#fcd34d] hover:bg-black/5 dark:hover:bg-white/10" />
          </div>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="pt-20">
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
          <Image
            src={article!.image}
            alt={article!.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-32 relative z-10">
        <article className="bg-white dark:bg-[#2d3548] rounded-3xl shadow-xl dark:shadow-black/30 overflow-hidden">
          <div className="p-6 sm:p-8 md:p-12">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-[#c9a227] text-[#1a1f2e] px-4 py-1.5 rounded-full text-sm font-medium">
                {article!.category}
              </span>
              <span className="text-[#6b6560] dark:text-white/60 text-sm">
                {new Date(article!.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-dm-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
              {article!.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-[#6b6560] dark:text-white/70 mb-8 leading-relaxed">
              {article!.excerpt}
            </p>

            {/* Content */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-dm-serif prose-headings:text-[#2d2926] dark:prose-headings:text-white
                prose-p:text-[#6b6560] dark:prose-p:text-white/70 prose-p:leading-relaxed
                prose-a:text-[#c9a227] dark:prose-a:text-[#fcd34d] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[#2d2926] dark:prose-strong:text-white
                prose-ul:text-[#6b6560] dark:prose-ul:text-white/70
                prose-ol:text-[#6b6560] dark:prose-ol:text-white/70"
              dangerouslySetInnerHTML={{ __html: article!.content || '<p>No content available.</p>' }}
            />

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10">
              <p className="text-sm text-[#6b6560] dark:text-white/60 mb-4">Share this article</p>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article!.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#f5f0e8] dark:bg-white/10 rounded-full flex items-center justify-center hover:bg-[#c9a227] hover:text-[#1a1f2e] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#f5f0e8] dark:bg-white/10 rounded-full flex items-center justify-center hover:bg-[#c9a227] hover:text-[#1a1f2e] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(article!.title + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#f5f0e8] dark:bg-white/10 rounded-full flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="font-dm-serif text-2xl sm:text-3xl mb-8">More News</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <article key={related.id} className="group">
                <Link href={`/news/${related.slug}`} className="block">
                  <div className="bg-white dark:bg-[#2d3548] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-black/20 transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-[#c9a227] dark:text-[#fcd34d] text-sm font-medium">
                        {related.category}
                      </span>
                      <h3 className="font-dm-serif text-lg mt-2 group-hover:text-[#c9a227] dark:group-hover:text-[#fcd34d] transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#1a1f2e] text-white py-12">
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
