import Hero from "@/components/hero";
import { getProductsByCategory } from "@/data/products";
import Card from "@/components/card";

export default async function Home() {
  const { products } = await getProductsByCategory("sunglasses");

  return (
    <div>
      <Hero />
      <div className="grid justify-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl text-black font-black my-8">
          NEW ARRIVALS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            return <Card product={product} key={product.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
