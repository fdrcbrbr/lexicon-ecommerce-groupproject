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
export interface ProductsPageData {
  pagination: PaginationData;
  filterData: FilterData;
}
export interface PaginationData {
  total?: number;
  page: number;
  limit: number;
  isMobile: boolean;
}
export interface FilterData {
  section?: string;
  categories?: string[];
  searchterm?: string;
}
export interface ProductDetails extends Products {
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  tags: string[];
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  images: string[];
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  reviews: ProductReview[];
}
export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}