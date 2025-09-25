import { Button } from "@/components/ui/button";
import { LucideIcon, PlusCircle, SquarePen, Trash2 } from "lucide-react";
import { Suspense } from "react";
import { getProductsForSection } from "@/data/products";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AdminProductsPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function AdminProductsPage({
  searchParams,
}: AdminProductsPageProps) {
  const { category } = await searchParams;

  return (
    <div className="w-full bg-gray-200 py-4 px-8">
      <div className="flex justify-end">
        <Link href="/admin/products/add-product">
          <Button variant="outline" className="text-md m-2 rounded-xl">
            <PlusCircle size={16} />
            Add new product
          </Button>
        </Link>
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
        <span className="min-w-4">
          <Tooltip>
            <TooltipTrigger>
              <ActionButton Icon={SquarePen} className="text-blue-700" />
            </TooltipTrigger>
            <TooltipContent
              className="border-2 border-gray-400 bg-white rounded-full font-bold"
              side="bottom"
            >
              <p>Edit product</p>
            </TooltipContent>
          </Tooltip>
        </span>
        <span className="min-w-4">
          <Tooltip>
            <TooltipTrigger>
              <ActionButton Icon={Trash2} className="text-red-600" />
            </TooltipTrigger>
            <TooltipContent
              className="border-2 border-gray-400 bg-white rounded-full font-bold"
              side="bottom"
            >
              <p>Delete product</p>
            </TooltipContent>
          </Tooltip>
        </span>
      </div>
      <ScrollArea className="h-[41rem]">
        {response.products.map((product) => (
          <div key={product.id} className="flex gap-4 items-center">
            <span className="w-full">{product.title}</span>
            <span className="min-w-12 text-right">{product.stock}</span>
            <span className="min-w-20 text-right">{product.price}</span>
            <span className="min-w-18 text-right">
              {product.discountPercentage}%
            </span>
            <span className="min-w-4">
              <ActionButton
                Icon={SquarePen}
                href={`/admin/products/${product.id}`}
                className="text-blue-700"
              />
            </span>
            <span className="min-w-4">
              <ActionButton Icon={Trash2} className="text-red-600" />
            </span>
          </div>
        ))}
        <ScrollBar />
      </ScrollArea>
    </div>
  );
}

interface ActionButtonProps {
  Icon: LucideIcon;
  action?: () => void;
  href?: string;
  hoverMessage?: string;
  className?: string;
}

async function ActionButton({
  Icon,
  action,
  href,
  className,
}: ActionButtonProps) {
  if (action) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={action}
        className={className}
      >
        <Icon size={16} />
      </Button>
    );
  }

  if (href) {
    return (
      <Link href={href}>
        <Button variant="ghost" size="icon" className={className}>
          <Icon size={16} />
        </Button>
      </Link>
    );
  }

  return (
    <Button variant="ghost" size="icon" className={className}>
      <Icon size={16} />
    </Button>
  );
}
