'use client';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/data/products";
import { toast } from "sonner";

export default function DeleteButton({ id }: { id?: number }) {
  const handleDelete = async () => {
    if (!id) return;

    if (confirm(`Are you sure you want to delete product: ${id}`)) {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
      window.location.reload();
    }
  }

  return (
    <Button
      onClick={handleDelete}
      variant="ghost"
      size="icon"
      className="text-red-600">
      <Trash2 />
      Delete
    </Button>
  );
}