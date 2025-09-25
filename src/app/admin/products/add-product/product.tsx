"use client"

import { useState, ChangeEvent } from 'react';
import { ProductDetails as ProductDetailsInterface} from '@/lib/interfaces';
import Image from 'next/image';

interface ProductFormDetails extends Omit<ProductDetailsInterface, 'images'> {
  image: string | null;
}

export default function NewProduct() {
  const [product, setProduct] = useState<ProductFormDetails>({
    id: 0,
    title: '',
    description: '',
    category: '',
    price: 0,
    stock: 0,
    thumbnail: '',
    rating: 0,
    brand: '',
    tags: [],
    weight: 0,
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
    },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: '',
    returnPolicy: '',
    discountPercentage: 0,
    image: null,
    reviews: [],
  });

    const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          setProduct((prev) => ({ ...prev, image: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedTags: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedTags.push(options[i].value);
      }
    }
    setProduct((prev) => ({ ...prev, tags: selectedTags }));
  };

  return (
    <div className="p-4">
      {/* Breadcrumbs */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm breadcrumbs">
          <ul className="flex space-x-2">
            <li><a className="link link-hover">Home</a></li>
            <li><a className="link link-hover">All Products</a></li>
            <li>Product Details</li>
          </ul>
        </div>
        <button className="btn btn-sm btn-circle btn-ghost">➕</button>
      </div>

      {/* Form */}
      <div className="border-2 border-blue-500 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Brand</label>
              <input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Tags</label>
              <select
                multiple
                name="tags"
                value={product.tags}
                onChange={handleTagChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
          </div>

          {/* Right Column - Image Upload */}
          <div className="border border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center">
            <p className="text-gray-500 mb-2">Product Gallery</p>
            <label className="cursor-pointer">
              {product.image ? (
                <Image
                  src={product.image}
                  alt="Preview"
                  className="max-w-full h-auto"
                />
              ) : (
                <div className="text-center">
                  <span className="text-gray-500">Drop your image here, or browse</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button className="bg-gray-500 text-white px-4 py-2 rounded">UPDATE</button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded">DELETE</button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded">CANCEL</button>
        </div>
      </div>
    </div>
  );
};



 