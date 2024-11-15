export interface Post {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  status: 'draft' | 'published' | 'scheduled';
  seoMetadata: {
    description: string;
    keywords: string[];
    ogImage?: string;
    ogTitle?: string;
    ogDescription?: string;
  };
  category: 'restaurant-reviews' | 'holiday-dishes' | 'leonne-favorites' | 'quick-bites' | 'desserts' | 'must-trys';
}
