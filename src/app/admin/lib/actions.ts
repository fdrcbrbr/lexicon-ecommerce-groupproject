"use server"

import { redirect } from "next/navigation";
import {mapSpecificToGroupedCategory} from "@/lib/helpers";

export async function createProduct(formData: FormData){
    const title = formData.get("title") as string
    const category = formData.get("category") as string
    const stock = formData.get("stock") as string
    const price = formData.get("price") as string
    const discountPercentage = formData.get("discountPercentage") as string

  //we could loop thru all formData and then process it more after instead of above
  //const postData = Object.fromEntries(formData.entries())

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
    const data = await res.json();
    const groupedCategory = mapSpecificToGroupedCategory(category);
    const transformedProduct = {
      ...data,
      category: groupedCategory,
    };

    const productQueryParam = encodeURIComponent(JSON.stringify(transformedProduct));
    redirect(`/admin/products?newProduct=${productQueryParam}`);
  
}