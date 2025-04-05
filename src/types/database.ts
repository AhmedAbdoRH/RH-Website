export interface Category {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface Service {
  id: string;
  category_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  price: string | null;
  created_at: string;
  category?: Category;
}