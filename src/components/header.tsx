import Navbar from "./navbar";
import Link from "next/link";
import { Search, ShoppingCart, CircleUserRound } from "lucide-react";

export default function Header() {
  return (
    <header className="flex w-full px-4 py-8">
      <div className="flex-1 flex justify-start items-center">
        <Navbar />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <h1 className="uppercase text-shadow-md h-min w-min text-black font-extrabold hover:text-gray-700 text-4xl">Shop.Co</h1>
      </div>
      <div className="flex-1 flex justify-end items-center">
        <div className="flex gap-x-4">
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