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
}
export interface FilterData {
  section?: string;
  categories?: string[];
  searchterm?: string;
}