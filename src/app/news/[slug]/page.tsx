import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileNav } from "@/components/MobileNav";
import { ShareButtons } from "@/components/ShareButtons";
import {
  getArticleBySlug,
  getArticles,
  getSiteSettings,
  getStrapiImageUrl,
  getCategoryName,
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

// Generate dynamic metadata for SEO and social sharing
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [article, settings] = await Promise.all([
    getArticleBySlug(slug),
    getSiteSettings(),
  ]);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  const siteName = settings?.siteName || "Swagger Sports Academy";
  const siteUrl = "https://swaggerfc.iopulse.cloud";
  const articleUrl = `${siteUrl}/news/${slug}`;
  const imageUrl = getStrapiImageUrl(article.image) || `${siteUrl}/logo.png`;

  return {
    title: article.title,
    description: article.excerpt,
    keywords: [getCategoryName(article.category), siteName, "news", "football", "sports academy"].filter(Boolean),
    authors: [{ name: siteName }],
    openGraph: {
      type: "article",
      locale: "en_US",
      url: articleUrl,
      siteName: siteName,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@swaggerfc",
      creator: "@swaggerfc",
      title: article.title,
      description: article.excerpt,
      images: [imageUrl],
    },
    alternates: {
      canonical: articleUrl,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [articleData, allArticles, settingsData] = await Promise.all([
    getArticleBySlug(slug),
    getArticles(),
    getSiteSettings(),
  ]);

  if (!articleData) {
    notFound();
  }

  const article: DisplayArticle = {
    id: articleData.id,
    documentId: articleData.documentId,
    title: articleData.title,
    slug: articleData.slug,
    excerpt: articleData.excerpt,
    content: articleData.content,
    category: getCategoryName(articleData.category),
    image: getStrapiImageUrl(articleData.image) || "https://images.unsplash.com/photo-1544366981-2150548c9c1c?w=800&q=80",
    featured: articleData.featured,
    publishedAt: articleData.publishedAt,
  };

  // Get related articles (exclude current)
  const relatedArticles: DisplayArticle[] = allArticles
    .filter((a) => a.slug !== slug)
    .slice(0, 3)
    .map((a) => ({
      id: a.id,
      documentId: a.documentId,
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      content: a.content,
      category: getCategoryName(a.category),
      image: getStrapiImageUrl(a.image) || "https://images.unsplash.com/photo-1544366981-2150548c9c1c?w=800&q=80",
      featured: a.featured,
      publishedAt: a.publishedAt,
    }));

  const siteName = settingsData?.siteName || "Swagger Sports Academy";
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
            <Link href="/news" className="text-[#6b6560] dark:text-white/70 hover:text-[#c9a227] dark:hover:text-[#fcd34d] transition-colors text-sm font-medium">
              All News
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

      {/* Hero Image */}
      <div className="pt-20">
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="100vw"
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
                {article.category}
              </span>
              <span className="text-[#6b6560] dark:text-white/60 text-sm">
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-dm-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-[#6b6560] dark:text-white/70 mb-8 leading-relaxed">
              {article.excerpt}
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
              dangerouslySetInnerHTML={{ __html: article.content ? marked.parse(article.content) as string : '<p>No content available.</p>' }}
            />

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10">
              <p className="text-sm text-[#6b6560] dark:text-white/60 mb-4">Share this article</p>
              <ShareButtons title={article.title} />
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
              <article key={related.id} className="group h-full">
                <Link href={`/news/${related.slug}`} className="block h-full">
                  <div className="bg-white dark:bg-[#2d3548] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-black/20 transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <span className="text-[#c9a227] dark:text-[#fcd34d] text-sm font-medium">
                        {related.category}
                      </span>
                      <h3 className="font-dm-serif text-lg mt-2 group-hover:text-[#c9a227] dark:group-hover:text-[#fcd34d] transition-colors line-clamp-2 flex-1">
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
