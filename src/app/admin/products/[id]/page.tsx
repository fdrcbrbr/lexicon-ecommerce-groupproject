import ProductForm from "@/app/admin/_components/productForm";
import { updateProduct } from "@/lib/actions";
import type { Products } from "@/lib/interfaces";
import { getProductById } from "@/data/products";

interface ProductUpdatePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductUpdatePage({ params }: ProductUpdatePageProps) {
  const { id } = await params;
  const data = await getProductById(Number(id)) as Products;

  return (
    <div className="w-full bg-gray-200 py-4 px-8">
      <div className="flex justify-start">
        <h2 className="text-xl font-bold">Update Product</h2>
      </div>
      <ProductForm submitAction={updateProduct} product={data} />
    </div>
  );
}
