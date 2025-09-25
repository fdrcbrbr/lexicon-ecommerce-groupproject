"use client"
import { useState, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface SimplifiedProduct {
  title: string;
  stock: number;
  price: number;
  discountPercentage: number;
}

export default function NewProduct() {
  const [product, setProduct] = useState<SimplifiedProduct>({
    title: '',
    stock: 0,
    price: 0,
    discountPercentage: 0,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'stock' || name === 'price' || name === 'discountPercentage' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      const savedProduct = await response.json();
      alert(`Product "${savedProduct.title}" saved successfully!`);

      // Resetta il form dopo il salvataggio
      setProduct({
        title: '',
        stock: 0,
        price: 0,
        discountPercentage: 0,
      });
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="w-full bg-gray-200 py-4 px-8">
      <div className="flex justify-end">
        <Button variant="outline" className="text-md m-2 rounded-xl">
          <PlusCircle size={16} /> Add new product
        </Button>
      </div>

      <div className="border-2 border-blue-500 rounded-lg p-4 mt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Discount Percentage */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
            <input
              type="number"
              name="discountPercentage"
              value={product.discountPercentage}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <Button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded">
              SAVE
            </Button>
            <Button type="button" className="bg-gray-500 text-white px-4 py-2 rounded">
              CANCEL
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

