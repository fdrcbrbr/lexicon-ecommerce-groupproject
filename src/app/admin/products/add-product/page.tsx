import { createProduct } from "@/lib/actions";
import ProductForm from "@/app/admin/_components/productForm";


export default function AddProduct() {
  return (
    <div className="w-full bg-gray-200 py-4 px-8">
      <div className="flex justify-start">
        <h2 className="text-xl font-bold">New Product</h2>
      </div>
      <ProductForm submitAction={createProduct} />
    </div>
  );
}
