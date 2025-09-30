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

/**
 * Transforms between DB and Form style category
 * @param category - The category to translate from
 * @param isDB - Denotes if DB style or not, defaults to true
 * @return string with category in the other style
 */
export function translateCategory(category: string, isDB: boolean = true): string {
  const fromSeparator = isDB ? "-" : "|";
  const toSeparator = isDB ? "|" : "-";
  const [mainCat, subCat] = category.split(fromSeparator);
  if (isDB && !subCat) return `accessories|${mainCat}`;
  if (!isDB && subCat === "sunglasses") return `${subCat}`
  return `${mainCat}${toSeparator}${subCat}`;
}

export function buildCategoryMatrix() {
  const result: Record<string, string[]> = {};
  for (const [key, value] of Object.entries(PRODUCT_CATEGORIES)) {
    value.forEach((item) => {
      let [mainCat, subCat] = item.split("-");
      if (!subCat) {
        subCat = mainCat;
        mainCat = key;
      }
      if (!result[mainCat]) {
        result[mainCat] = [];
      }
      if (!result[mainCat].includes(subCat)) result[mainCat].push(subCat);
    });
  }
  return result;
}
