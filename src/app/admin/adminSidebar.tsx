'use client';
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ADMIN_PAGES } from "@/data/consts";
import { useState, useEffect } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronsUpDownIcon } from "lucide-react";
import Link from "next/link";
import { getCategoryCounts } from "@/data/products";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getCategoryCounts();
        setData(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

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
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {(!loading && !error) && Object.entries(data || {}).map(([category, count]) => (
              <div key={category}>
                <Link
                  href={`/admin/products?category=${category}`}
                  className="flex justify-between items-center"
                >
                  <p className="capitalize">{category}</p>
                  <p>{count || 0}</p>
                </Link>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}