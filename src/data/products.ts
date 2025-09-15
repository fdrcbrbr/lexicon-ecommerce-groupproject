// data/products.ts
import { ProductsRes } from "@/lib/interfaces";
import { PRODUCT_CATEGORIES, ALL_CATEGORIES } from "./consts";

const baseurl = `https://dummyjson.com/`;

export async function getProductsByCategory(category?: string) {
  try {
    const response = await fetch(`${baseurl}products/category/${category}`);
    if (!response.ok) {
      throw new Error("bad response");
    }
    const data: ProductsRes = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error(
      `Failed to fetch products: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export async function getProductsByCategories(categories: string[]) {
  try {
    const promises = categories.map(category => 
      getProductsByCategory(category)
    );
    
    const results = await Promise.all(promises);
    
    const allProducts = results.flatMap(result => result.products);
    const totalProducts = results.reduce((sum, result) => sum + result.total, 0);
    
    return {
      products: allProducts,
      total: totalProducts,
      skip: 0,
      limit: allProducts.length
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error(
      `Failed to fetch products: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export async function getProductsForSection(section: string) {
  switch (section) {
    case 'men':
      return getProductsByCategories(PRODUCT_CATEGORIES.men);
    case 'women':
      return getProductsByCategories(PRODUCT_CATEGORIES.women);
    case 'all':
      return getProductsByCategories(ALL_CATEGORIES);
    default:
      return getProductsByCategory(section);
  }
}