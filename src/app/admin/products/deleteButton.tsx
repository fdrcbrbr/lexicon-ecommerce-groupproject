'use client';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function DeleteButton({ id }: { id?: number }) {
  const handleDelete = async () => {
    if (!id) return;
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