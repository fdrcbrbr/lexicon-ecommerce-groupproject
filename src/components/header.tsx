//import Navbar from "./navbar";
import Link from "next/link";
import { Search, ShoppingCart, CircleUserRound } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-white dark:bg-black shadow-md p-4">
      <div className=" flex items-center justify-between">
        {/* <Navbar /> */}
        <h1 className="font-bold uppercase">Shop.Co</h1>
        <div className="flex items-center space-x-4">
          <Link
            href="/products"
          >
            <Search className="w-5 h-5 cursor-pointer" />
          </Link>
          <ShoppingCart className="w-5 h-5 cursor-pointer" />
          <CircleUserRound className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}