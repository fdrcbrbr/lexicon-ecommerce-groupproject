'use client';
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { PRODUCT_CATEGORIES, ADMIN_PAGES } from "@/data/consts";
import Link from "next/link";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="p-4">
      <nav className="flex flex-col items-stretch gap-2 py-4">
        {ADMIN_PAGES.map((page, id) => {
          const isActive = pathname === page.href;
          const Icon = page.icon;

          return (
            <Button
              key={id}
              onClick={() => router.push(page.href)}
              variant={isActive ? "secondary" : "outline"}
              className={cn("rounded-xl text-center w-full", {
                "text-white bg-black hover:text-white hover:bg-black": isActive,
              })}>
              <Icon size={16} />
              {page.label}
            </Button>
          );
        })}
      </nav>

      {pathname.startsWith("/admin/products") && (
        <Categories />
      )}
    </div>
  );
}

function Categories() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const categories = Object.keys(PRODUCT_CATEGORIES);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="mt-8 flex flex-col gap-2 w-full "
    >
      <div className="flex justify-between items-center">
        <p>Categories</p>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDownIcon />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        {categories.map((category, id) => (
          <div key={id}>
            <Link
              href={`/admin/products?category=${category}`}
              className="flex justify-between items-center"
            >
              <p>{category}</p>
              <p>10</p>
            </Link>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}