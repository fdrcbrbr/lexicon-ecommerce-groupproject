'use client';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/data/products";
import { toast } from "sonner";

interface DeleteButtonProps {
  id?: number;
  name?: string;
  redirectTo?: string;
  variant?: "list" | "form";
}

export default function DeleteButton({ id, name, redirectTo, variant = "list" }: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!id) return;

    if (confirm(`Are you sure you want to delete product: ${name}`)) {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
      if (redirectTo) router.push(redirectTo);
      else window.location.reload();
    }
  }

  if (variant === "form") {
    return (
      <Button
        onClick={handleDelete}
        type="button"
        className="bg-red-600 text-white px-4 py-2 rounded">
        DELETE
      </Button>
    );
  }

  return (
    <Button
      onClick={handleDelete}
      size="icon"
      className="text-red-600">
      <Trash2 />
      Delete
    </Button>
  );
}
