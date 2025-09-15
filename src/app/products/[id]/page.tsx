import { Suspense } from "react";
import { getProductDetails } from "@/data/products";
import Image from "next/image";
interface ProductDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetails id={id} />
    </Suspense>
  );
}

async function ProductDetails({ id }: { id: string }) {
  const data = await getProductDetails(id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">{data.title}</h1>
      <p>{data.description}</p>
      <Image
        src={data.thumbnail}
        alt={data.title}
        width={300}
        height={300}
      />
    </div>
  );
}