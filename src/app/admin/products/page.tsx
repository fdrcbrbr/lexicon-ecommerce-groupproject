import { Button } from "@/components/ui/button";
import { PlusCircle, SquarePen } from "lucide-react";
import { Suspense } from "react";
import { getProductsForSection } from "@/data/products";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import DeleteButton from "./deleteButton";

interface AdminProductsPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function AdminProductsPage({ searchParams }: AdminProductsPageProps) {
  const { category } = await searchParams;

  return (
    <div className="w-full bg-gray-200 py-4 px-8">
      <div className="flex justify-end">
        <Button
          variant="outline"
          className="text-md m-2 rounded-xl"
        >
          <PlusCircle size={16} />Add new product
        </Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsList category={category || "all"} />
      </Suspense>
    </div>
  );
}

interface ProductListProps {
  category: string;
}

async function ProductsList({ category }: ProductListProps) {
  const response = await getProductsForSection(category);

  return (
    <div className="mt-4">
      <div className="flex gap-4 items-center">
        <span className="w-full">Product name:</span>
        <span className="min-w-12 text-right">Stock:</span>
        <span className="min-w-20 text-right">Price:</span>
        <span className="min-w-18 text-right">Discount:</span>
        <span className="min-w-14"><EditButton /></span>
        <span className="min-w-14"><DeleteButton  /></span>
      </div>
      <ScrollArea className="h-[41rem]">
        {response.products.map((product) => (
          <div key={product.id} className="flex gap-4 items-center">
            <span className="w-full">{product.title}</span>
            <span className="min-w-12 text-right">{product.stock}</span>
            <span className="min-w-20 text-right">{product.price}</span>
            <span className="min-w-18 text-right">{product.discountPercentage}%</span>
            <span className="min-w-14"><EditButton id={product.id} /></span>
            <span className="min-w-14"><DeleteButton id={product.id}/></span>
          </div>
        ))}
        <ScrollBar />
      </ScrollArea>
    </div>
  );
}

function EditButton({ id }: { id?: number }) {
  if (id) {
    return (
      <Link href={`/admin/products/${id}`}>
        <Button variant="ghost" size="icon" className="text-blue-700">
          <SquarePen />
          Edit
        </Button>
      </Link>
    );
  }

  return (
    <Button variant="ghost" size="icon" className="text-blue-700">
      <SquarePen />
      Edit
    </Button>
  );
}
