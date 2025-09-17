export type Review = {
  id?: string;
  username?: string;
  rating?: number;
  description?: string;
};

export type ProductImage = {
  url: string;
  alt?: string;
};

export type Product = {
  id: string;
  title: string;
  description?: string;
  price: number;
  discountedPrice?: number;
  rating?: number;
  image?: ProductImage;
  tags?: string[];
  reviews?: Review[];
};