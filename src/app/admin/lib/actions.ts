"use server"
import { mapSpecificToGroupedCategory } from "@/lib/helpers";

interface ActionState {
  success?: boolean;
  error?: string;
  product?: unknown;
}

export async function createProduct(prevState: ActionState | null, formData: FormData): Promise<ActionState> {
  try {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const stock = formData.get("stock") as string;
    const price = formData.get("price") as string;
    const discountPercentage = formData.get("discountPercentage") as string;

    const newProduct = {
      title,
      price: parseInt(price),
      category,
      stock: parseInt(stock),
      discountPercentage: parseInt(discountPercentage),
    };

    const res = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    if (!res.ok) {
      return { success: false, error: "Failed to save product" };
    }

    const data = await res.json();
    const groupedCategory = mapSpecificToGroupedCategory(category);
    const transformedProduct = { ...data, category: groupedCategory };

    return { success: true, product: transformedProduct };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { success: false, error: "An unexpected error occurred" };
  }
}


