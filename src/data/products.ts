import { ProductsRes } from "@/lib/interfaces";
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
      `Failed to fetch characters: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
