import { ProductsPageData, PaginationData, FilterData } from "./interfaces";
import { PRODUCT_CATEGORIES } from "@/data/consts";

export function parseProductListingParams(searchParams: { [key: string]: string | string[] | undefined }, isMobile: boolean): ProductsPageData {
  const { page, limit, section, categories, searchterm } = searchParams;

  const pageNumber = page ? parseInt(page as string, 10) : 1;
  const limitNumber = limit ? parseInt(limit as string, 10) : (isMobile ? 6 : 9);

  const categoryArray = categories
    ? Array.isArray(categories)
      ? categories
      : categories.split(",")
    : undefined;

  const pagination: PaginationData = {
    page: pageNumber,
    limit: limitNumber,
    isMobile,
  };

  const filterData: FilterData = {
    section: section as string | undefined,
    categories: categoryArray,
    searchterm: searchterm as string | undefined,
  };

  return { pagination, filterData } as ProductsPageData;
}

export function buildQueryStringForProductsListing(params: ProductsPageData): string {
  const query = new URLSearchParams();

  if (params.pagination.page) {
    query.append("page", params.pagination.page.toString());
  }
  if (params.pagination.limit) {
    query.append("limit", params.pagination.limit.toString());
  }
  if (params.filterData.section) {
    query.append("section", params.filterData.section);
  }
  if (params.filterData.categories && params.filterData.categories.length > 0) {
    query.append("categories", params.filterData.categories.join(","));
  }
  if (params.filterData.searchterm) {
    query.append("searchterm", params.filterData.searchterm);
  }

  return query.toString();
}


/**
 * Map a specific category to its grouped category
 * @param specificCategory - The specific category (e.g., "mens-shirts")
 * @returns The grouped category (e.g., "men")
 */
export function mapSpecificToGroupedCategory(specificCategory: string): string {
  for (const [groupedCategory, categories] of Object.entries(PRODUCT_CATEGORIES)) {
    if (categories.includes(specificCategory)) {
      return groupedCategory;
    }
  }
  return "all"; // Default fallback
}
