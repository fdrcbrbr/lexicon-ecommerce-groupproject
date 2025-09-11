export interface ProductsRes {
  products: Products[];
  total: number;
  skip: number;
  limit: number;
}
export interface Products {
  id: number;
  title: string;
  description?: string;
  category?: string;
  price: number;
  size?: number;
  thumbnail: string;
}
