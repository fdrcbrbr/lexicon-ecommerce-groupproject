"use client"
import { Button } from "@/components/ui/button";
import Form from "next/form";
import Link from "next/link";
import { createProduct } from "../../lib/actions";
import {ALL_CATEGORIES} from "@/data/consts"


export default function AddProduct() {

  return (
    <div className="w-full bg-gray-200 py-4 px-8">
      <div className="flex justify-start">
        <h2 className="text-xl font-bold">New Product</h2>
      </div>

      <div className="border-2 border-blue-500 rounded-lg p-4 mt-4">
        <Form action={createProduct} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="title"
              id="title"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select a category</option>
              {ALL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.replace(/-/g, " ")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
            <input
              type="number"
              name="discount"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded">
              SAVE
            </Button>
            <Link href="/admin/products">
                <Button type="button" className="bg-gray-700 text-white px-4 py-2 rounded">
              CANCEL
            </Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}