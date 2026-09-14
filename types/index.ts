export interface Product {
  id: string;
  asin: string;
  slug: string;
  title: string;
  brand?: string;
  category: string;
  subCategory?: string;
  price?: number;
  originalPrice?: number;
  currency: string;
  rating?: number;
  reviewCount?: number;
  thumbnail?: string;
  images: string[];
  description?: string;
  specs?: Record<string, string>;
  features: string[];
  affiliateUrl?: string;
  amazonUrl?: string;
  inStock: boolean;
  verdictScore?: number;
  verdictSummary?: string;
  verdictPros: string[];
  verdictCons: string[];
  whoItIsFor?: string;
  whoShouldSkip?: string;
  isFeatured: boolean;
  isPublished: boolean;
  /** Tracks provenance of rating/reviewCount for schema auditability */
  _dataSource?: string;
  createdAt: string;
  updatedAt: string;
}


export interface Review {
  id: string;
  productId: string;
  source: 'AMAZON' | 'REDDIT' | 'YOUTUBE' | 'EXPERT' | 'MANUAL';
  authorName: string;
  authorLocation?: string;
  authorAvatar?: string;
  rating?: number;
  title?: string;
  body: string;
  sentimentScore?: number;
  isVerified: boolean;
  isHelpful: number;
  sourceUrl?: string;
  sourceDate?: string;
  createdAt: string;
}

export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description?: string;
  thumbnail?: string;
  channelName: string;
  channelId: string;
  publishedAt?: string;
  viewCount?: number;
  likeCount?: number;
  duration?: string;
  productId?: string;
  productAsin?: string;
  tags: string[];
  isPublished: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  imageUrl?: string;
  productCount?: number;
}

export interface VerdictResult {
  summary: string;
  pros: string[];
  cons: string[];
  score: number;
  verdict: 'Highly Recommended' | 'Recommended' | 'Mixed' | 'Not Recommended';
}

export interface ScrapedProduct {
  title: string;
  brand?: string;
  price?: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  description?: string;
  specs: Record<string, string>;
  features: string[];
  rating?: number;
  reviewCount?: number;
  asin: string;
}

export interface ScrapedReview {
  authorName: string;
  authorLocation?: string;
  rating?: number;
  title?: string;
  body: string;
  isVerified: boolean;
  sourceDate?: string;
}

export interface RedditPost {
  authorName: string;
  title?: string;
  body: string;
  score: number;
  sourceUrl: string;
  sourceDate?: string;
}

export interface YouTubeVideo {
  youtubeId: string;
  title: string;
  description?: string;
  thumbnail?: string;
  channelName: string;
  channelId: string;
  publishedAt?: string;
  viewCount?: number;
  likeCount?: number;
  duration?: string;
  tags?: string[];
}
