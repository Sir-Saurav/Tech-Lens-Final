import type { MetadataRoute } from 'next';
import { ALL_PRODUCTS, CATEGORIES } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gadgetlens.store';
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/categories`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/videos`, lastModified, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/channels`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/disclosure`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const productRoutes: MetadataRoute.Sitemap = ALL_PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product.updatedAt || lastModified),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}