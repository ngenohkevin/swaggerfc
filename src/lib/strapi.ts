/**
 * Strapi CMS API Client for SwaggerFC
 *
 * Content Types:
 * - gallery-items: Moments of glory images
 * - products: Shop products
 * - articles: News articles
 * - about-page: About page content (single type)
 * - social-links: Social media links
 * - site-settings: Site configuration (single type)
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://swaggerfc-cms.iopulse.cloud';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// Types for Strapi responses
export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  };
}

export interface GalleryItem {
  id: number;
  documentId: string;
  year: string;
  title: string;
  description: string;
  image: StrapiImage;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductSize {
  size: string;
  available: boolean;
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: StrapiImage;
  gallery?: StrapiImage[];
  isNew: boolean;
  sizes: ProductSize[];
  inStock: boolean;
  stock: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: Category | string | null;
  image: StrapiImage;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface SocialLink {
  id: number;
  documentId: string;
  platform: 'twitter' | 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'whatsapp';
  url: string;
  order: number;
}

export interface AboutPage {
  id: number;
  documentId: string;
  sectionLabel: string;
  title: string;
  storyParagraph1: string;
  storyParagraph2: string;
  foundedYear: number;
  heroImage: StrapiImage;
  teamPhoto: StrapiImage;
  value1Title: string;
  value1Description: string;
  value2Title: string;
  value2Description: string;
  value3Title: string;
  value3Description: string;
  value4Title: string;
  value4Description: string;
}

export interface SiteSettings {
  id: number;
  documentId: string;
  siteName: string;
  tagline: string;
  logo: StrapiImage;
  heroImage: StrapiImage;
  heroSubtitle: string;
  heroDescription: string;
  supportersCount: string;
  yearsStrong: string;
  trophiesWon: string;
  championsTitle: string;
  championsSubtitle: string;
  foundedYear: number;
  whatsappNumber: string;
  email: string;
  address: string;
}

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// API Client
async function fetchFromStrapi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
    next: { revalidate: 10 }, // Revalidate every 10 seconds
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Helper to get full image URL
export function getStrapiImageUrl(image: StrapiImage | null | undefined): string {
  if (!image?.url) return '';
  if (image.url.startsWith('http')) return image.url;
  return `${STRAPI_URL}${image.url}`;
}

// API Functions

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<GalleryItem[]>>(
      '/gallery-items?populate=image&sort=order:asc'
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch gallery items:', error);
    return [];
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<Product[]>>(
      '/products?populate=*&sort=order:asc&filters[inStock][$eq]=true'
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

// Helper to generate slug from name
export function generateSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    // First try to find by slug field
    const response = await fetchFromStrapi<StrapiResponse<Product[]>>(
      `/products?populate=*&filters[slug][$eq]=${slug}`
    );
    if (response.data[0]) {
      return response.data[0];
    }

    // If not found, fetch all products and match by generated slug from name
    const allProducts = await fetchFromStrapi<StrapiResponse<Product[]>>(
      '/products?populate=*'
    );
    const matchedProduct = allProducts.data.find(
      (p) => generateSlug(p.name) === slug
    );
    return matchedProduct || null;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

export async function getArticles(featured?: boolean): Promise<Article[]> {
  try {
    // Use populate=* to get all relations including category
    let endpoint = '/articles?populate=*&sort=publishedAt:desc';
    if (featured) {
      endpoint += '&filters[featured][$eq]=true';
    }
    const response = await fetchFromStrapi<StrapiResponse<Article[]>>(endpoint);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<Article[]>>(
      `/articles?populate=*&filters[slug][$eq]=${slug}`
    );
    return response.data[0] || null;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<Category[]>>(
      '/categories?sort=name:asc'
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<SocialLink[]>>(
      '/social-links?sort=order:asc'
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch social links:', error);
    return [];
  }
}

export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<AboutPage>>(
      '/about-page?populate=*'
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch about page:', error);
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<SiteSettings>>(
      '/site-setting?populate=*'
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
    return null;
  }
}

// Helper to get category name from Article (handles both relation and legacy string)
export function getCategoryName(category: Category | string | null | undefined): string {
  if (!category) return 'Uncategorized';
  if (typeof category === 'string') return category;
  return category.name || 'Uncategorized';
}

// Helper to get category color from Article
export function getCategoryColor(category: Category | string | null | undefined): string {
  if (!category) return '#c9a227';
  if (typeof category === 'string') return '#c9a227';
  return category.color || '#c9a227';
}
