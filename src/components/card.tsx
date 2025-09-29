import { Products } from "@/lib/interfaces";
import Link from "next/link";
import Image from "next/image";

export default async function Card({ product }: { product: Products }) {
  if (!product) return;

  return (
    <div className=" hover:text-gray-700 ">
      <Link
        key={product.id}
        href={`/products/${product.id}`}
        className="group cursor-pointer bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-gray-900 hover:text-gray-600 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-lg font-bold text-gray-900  hover:text-gray-600 ">
            ${product.price}
          </p>
        </div>
      </Link>
    </div>
  );
}
