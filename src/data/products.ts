// data/products.ts
import { ProductsRes, ProductDetails } from "@/lib/interfaces";
import { PRODUCT_CATEGORIES, ALL_CATEGORIES } from "./consts";

const baseurl = `https://dummyjson.com/`;

/**
 * Fetch products from a specific category
 * @param category - The category name (e.g., 'mens-shirts', 'womens-bags')
 * @returns Promise with product data
 */
export async function getProductsByCategory(category?: string) {
  try {
    const response = await fetch(`${baseurl}products/category/${category}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ProductsRes = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error(
      `Failed to fetch products: ${error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Fetch products from multiple categories and combine them
 * @param categories - Array of category names
 * @returns Promise with combined product data
 */
export async function getProductsByCategories(categories: string[]) {
  try {
    // Create promises for all category requests
    const promises = categories.map(category =>
      getProductsByCategory(category)
    );

    // Wait for all requests to complete
    const results = await Promise.all(promises);

    // Combine all products from different categories
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
      `Failed to fetch products: ${error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Get products for a specific section (men, women, all, accessories, or specific category)
 * @param section - The section identifier
 * @returns Promise with product data for the section
 */
export async function getProductsForSection(section: string) {
  try {
    switch (section) {
      case 'men':
        // Get all men's products
        return getProductsByCategories(PRODUCT_CATEGORIES.men);

      case 'women':
        // Get all women's products
        return getProductsByCategories(PRODUCT_CATEGORIES.women);

      case 'accessories':
        // Get all accessories products
        return getProductsByCategories(PRODUCT_CATEGORIES.accessories);

      case 'all':
        // Get all products from all categories
        return getProductsByCategories(ALL_CATEGORIES);

      default:
        // Handle specific category requests (e.g., 'mens-shirts', 'womens-bags')
        return getProductsByCategory(section);
    }
  } catch (error) {
    console.error(`Error fetching products for section ${section}:`, error);
    throw error;
  }
}

//Added for type secure logic in searchProducts
type ProductCategoryKey = keyof typeof PRODUCT_CATEGORIES;

function isProductCategoryKey(key: string): key is ProductCategoryKey {
  return key in PRODUCT_CATEGORIES;
}

 /**
 * Search products by title or description
 * @param query - Search query string
 * @param category - Optional category to filter by
 * @returns Promise with search results
 */
export async function searchProducts(query: string, category?: string) {
  try {
    if (category && isProductCategoryKey(category)) {
      const searchUrl = `${baseurl}products/search?q=${encodeURIComponent(query)}`;
      const response = await fetch(searchUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ProductsRes = await response.json();

      const allowedCategories = PRODUCT_CATEGORIES[category];
      const filteredProducts = data.products.filter((product) =>
        allowedCategories.includes(product.category!)
      );

      return {
        ...data,
        products: filteredProducts,
        total: filteredProducts.length,
      };
    } else {
      const promises = ALL_CATEGORIES.map((cat) =>
        fetch(`${baseurl}products/search?q=${encodeURIComponent(query)}`)
          .then((res) => res.json())
          .then((data: ProductsRes) => ({
            ...data,
            products: data.products.filter((product) => product.category === cat),
          }))
      );

      const results = await Promise.all(promises);
      const allProducts = results.flatMap((result) => result.products);
      const uniqueProducts = Array.from(
        new Map(allProducts.map((product) => [product.id, product])).values()
      );

      return {
        products: uniqueProducts,
        total: uniqueProducts.length,
        skip: 0,
        limit: uniqueProducts.length,
      };
    }
  } catch (error) {
    console.error("Error searching products:", error);
    throw new Error(
      `Failed to search products: ${error instanceof Error ? error.message : String(error)
      }`
    );
  }
}


/**
 * Get a single product by ID
 * @param id - Product ID
 * @returns Promise with product data
 */
export async function getProductById(id: string | number) {
  try {
    const response = await fetch(`${baseurl}products/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error(
      `Failed to fetch product: ${error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export async function getProductDetails(id: string) {
  try {
    const response = await fetch(`${baseurl}products/${id}`);
    if (!response.ok) {
      throw new Error("bad response");
    }
    const data: ProductDetails = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw new Error(
      `Failed to fetch product details: ${error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Get all available categories from the API
 * @returns Promise with categories list
 */
export async function getCategories() {
  try {
    const response = await fetch(`${baseurl}products/categories`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const categories = await response.json();

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error(
      `Failed to fetch categories: ${error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Get product counts for the major categories
 * @return Promise with category counts
 */
export async function getCategoryCounts() {
  const categories = Object.keys(PRODUCT_CATEGORIES);
  const result: Record<string, number> = {};

  ALL_CATEGORIES.forEach(async (category) => {
    const response = await getProductsByCategory(category)

    if ("all" in result) {
      result["all"] += response.total;
    } else {
      result["all"] = response.total;
    }

    categories.forEach((cat) => {
      if (PRODUCT_CATEGORIES[cat as keyof typeof PRODUCT_CATEGORIES].includes(category)) {
        if (cat in result) {
          result[cat] += response.total;
        } else {
          result[cat] = response.total;
        }
      }
    });
  });

  return result;
}

/**
 * Delete a single product by ID
 * @params id - Product ID
 * @returns nothing
 */
export async function deleteProduct(id: number) {
  try {
    const response = await fetch(`${baseurl}products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error(
      `Failed to delete product: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
