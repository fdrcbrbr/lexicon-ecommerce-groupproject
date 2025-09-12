import { ProductsPageData, PaginationData, FilterData } from "./interfaces";

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