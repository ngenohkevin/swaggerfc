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

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '';

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

export interface Product {
  id: number;
  documentId: string;
  name: string;
  description: string;
  price: number;
  image: StrapiImage;
  isNew: boolean;
  sizes: string[];
  inStock: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
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
  title: string;
  subtitle: string;
  content: string;
  foundedYear: number;
  mission: string;
  vision: string;
  heroImage: StrapiImage;
  teamPhoto: StrapiImage;
  stats: {
    years: number;
    trophies: number;
    supporters: number;
    matches: number;
  };
}

export interface SiteSettings {
  id: number;
  documentId: string;
  siteName: string;
  tagline: string;
  logo: StrapiImage;
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
    next: { revalidate: 60 }, // Revalidate every 60 seconds
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
      '/products?populate=image&sort=order:asc&filters[inStock][$eq]=true'
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export async function getArticles(featured?: boolean): Promise<Article[]> {
  try {
    let endpoint = '/articles?populate=image&sort=publishedAt:desc';
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
      `/articles?populate=image&filters[slug][$eq]=${slug}`
    );
    return response.data[0] || null;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return null;
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
      '/site-setting?populate=logo'
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
    return null;
  }
}
