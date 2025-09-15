import { ProductsRes, ProductDetails } from "@/lib/interfaces";
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
    console.error("Error fetching characters:", error);
    throw new Error(
      `Failed to fetch characters: ${error instanceof Error ? error.message : String(error)
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
