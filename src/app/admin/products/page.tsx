/* "use client"
import { useState, useEffect } from 'react';
import { LucideIcon, PlusCircle, SquarePen, Trash2 } from "lucide-react";
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getProductsForSection } from "@/data/products";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface AdminProductsPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

interface Product {
  id: number;
  title: string;
  stock: number;
  price: number;
  discountPercentage: number;
  category: string;
}

interface ProductsListProps {
  category: string;
  refreshTrigger: boolean;
}

export default function AdminProductsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || "all";
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  return (
    <div className="w-full bg-gray-200 py-4 px-8">
      <div className="flex justify-end">
        <Button
          variant="outline"
          className="text-md m-2 rounded-xl"
          onClick={() => setShowAddProductForm(!showAddProductForm)}
        >
          <PlusCircle size={16} /> {showAddProductForm ? "Cancel" : "Add new product"}
        </Button>
      </div>

      {showAddProductForm ? (
        <AddProductForm
          category={category}
          onProductAdded={() => {
            setShowAddProductForm(false);
            setRefreshList(!refreshList);
          }}
        />
      ) : (
        <ProductsList category={category} refreshTrigger={refreshList} />
      )}
    </div>
  );
}

interface Product {
  id: number;
  title: string;
  stock: number;
  price: number;
  discountPercentage: number;
  category: string;
}

interface ProductsListProps {
  category: string;
  refreshTrigger: boolean;
}

export function ProductsList({ category, refreshTrigger }: ProductsListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await getProductsForSection(category);
        setProducts(response.products);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category, refreshTrigger]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-4">
      <div className="flex gap-4 items-center font-bold">
        <span className="w-full">Product name:</span>
        <span className="min-w-12 text-right">Stock:</span>
        <span className="min-w-20 text-right">Price:</span>
        <span className="min-w-18 text-right">Discount:</span>
        <span className="min-w-4"></span>
        <span className="min-w-4"></span>
      </div>
      <ScrollArea className="h-[41rem]">
        {products.map((product) => (
          <div key={product.id} className="flex gap-4 items-center">
            <span className="w-full">{product.title}</span>
            <span className="min-w-12 text-right">{product.stock}</span>
            <span className="min-w-20 text-right">{product.price}</span>
            <span className="min-w-18 text-right">{product.discountPercentage}%</span>
            <span className="min-w-4">
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost" size="icon" className="text-blue-700">
                    <SquarePen size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="border-2 border-gray-400 bg-white rounded-full font-bold">
                  <p>Edit product</p>
                </TooltipContent>
              </Tooltip>
            </span>
            <span className="min-w-4">
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost" size="icon" className="text-red-600">
                    <Trash2 size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="border-2 border-gray-400 bg-white rounded-full font-bold">
                  <p>Delete product</p>
                </TooltipContent>
              </Tooltip>
            </span>
          </div>
        ))}
        <ScrollBar />
      </ScrollArea>
    </div>
  );
}


// Componente per il form di inserimento
function AddProductForm({ category, onProductAdded }: { category: string; onProductAdded: () => void }) {
  const [product, setProduct] = useState({
    title: '',
    stock: 0,
    price: 0,
    discountPercentage: 0,
    category: category,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      // Resetta il form
      setProduct({
        title: '',
        stock: 0,
        price: 0,
        discountPercentage: 0,
        category: category,
      });

      // Torna alla lista prodotti e aggiorna la lista
      onProductAdded();
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="border-2 border-blue-500 rounded-lg p-4 mt-4">
      <form onSubmit={handleSubmit} className="space-y-4">

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

        <div className="flex justify-end space-x-4 mt-6">
          <Button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded">
            SAVE
          </Button>
          <Button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onProductAdded}
          >
            CANCEL
          </Button>
        </div>
      </form>
    </div>
  );
} */