'use client';
import { Button } from "@/components/ui/button";
import NestedDropdownForm from "./form-subcategories";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { ActionState } from "@/lib/interfaces";
import type { Products } from "@/lib/interfaces";
import DeleteButton from "./deleteButton";
import { translateCategory } from "@/lib/helpers";

interface ProductFormProps {
  submitAction: (prevState: ActionState | null, formData: FormData) => Promise<ActionState>;
  product?: Products;
}

export default function ProductForm({ submitAction, product }: ProductFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(submitAction, null);
  const isEditing = !!product;

  useEffect(() => {
    if (state?.success && state.product) {
      const productQueryParam = encodeURIComponent(JSON.stringify(state.product));
      router.push(`/admin/products?newProduct=${productQueryParam}`);
    }
  }, [state, router]);

  return (
    <div className="border-2 border-blue-500 rounded-lg p-4 mt-4">
      <form action={formAction} className="space-y-4">
        {isEditing && (
          <input
            type="hidden"
            name="id"
            defaultValue={product?.id}
          />
        )}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={isEditing ? product?.title : undefined}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <NestedDropdownForm defaultValue={isEditing ? translateCategory(product!.category as string) : undefined} />
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            defaultValue={isEditing ? product?.stock : undefined}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            defaultValue={isEditing ? product?.price : undefined}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
          <input
            type="number"
            name="discountPercentage"
            defaultValue={isEditing ? product?.discountPercentage : undefined}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <Button
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "SAVE"}
          </Button>
          <Link href="/admin/products">
            <Button type="button" className="bg-gray-700 text-white px-4 py-2 rounded">
              CANCEL
            </Button>
          </Link>
          {isEditing && <DeleteButton
            id={product?.id}
            name={product?.title}
            redirectTo="/admin/products"
            variant="form"
          />}
        </div>
      </form>
    </div>
  );
}
