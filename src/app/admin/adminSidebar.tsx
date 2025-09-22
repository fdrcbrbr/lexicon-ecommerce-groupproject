'use client';
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, ClipboardList, PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_PAGES = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: ClipboardList },
  { label: "Orders", href: "/admin/orders", icon: PackageOpen },
]

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="pr-4">
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
        <div className="mt-8">
          <p>Categories</p>
        </div>
      )}
    </div>
  );
}