import Hero from "@/components/hero";
import Image from "next/image";
import { getProductsByCategory } from "@/data/products";

export default async function Home() {
  const { products } = await getProductsByCategory("sunglasses");

  return (
    <div>
      <Hero />
      <div className="grid justify-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl text-black font-black my-8">
          NEW ARRIVALS
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
          {products.map((product) => {
            return (
              <li
                key={product.id}
                className="bg-neutral-200 rounded-xl justify-items-center"
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  height={200}
                  width={200}
                ></Image>
                <h3>{product.title}</h3>
                <h4>${product.price}</h4>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}