import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AdminProductsPage() {
  return (
    <div className="w-full bg-gray-200 p-4">
      <div className="w-[60rem] mx-auto">
        <div className="flex justify-end">
          <Button
            variant="outline"
            className="text-md m-2 rounded-xl"
          >
            <PlusCircle size={16} />Add new product
          </Button>
        </div>
        <ProductsList />
      </div>
    </div>
  );
}

function ProductsList() {
  return (
    <div className="mt-4">
      <p className="flex gap-2">
        <span className="w-full">Product name:</span>
        <span className="w-min">Stock:</span>
        <span className="w-min">Price:</span>
        <span className="w-min">Discount:</span>
        <span className="w-min">Update:</span>
        <span className="w-min">Remove:</span>
      </p>
    </div>
  );
}
