import { Suspense } from "react";
import { getProductDetails } from "@/data/products";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
      <div className="flex flex-col md:flex-row gap-1 md:gap-4 items-center justify-center mb-4">
        <h2 className="text-3xl font-bold text-center">{data.title}</h2>
        <p>by</p>
        <h4 className="text-xl font-bold text-center">{data.brand}</h4>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mx-8">
        <p className="flex-1">{data.description}</p>
        <div className="flex-1 flex justify-center mx-auto px-8 w-min">
          {data.images ? (<Carousel>
            <CarouselContent className="mx-auto">
              {data.images.map((image, index) => (
                <CarouselItem key={index}>
                  <Image
                    className="p-1 rounded-md overflow-hidden"
                    src={image}
                    alt={data.title}
                    width={200}
                    height={300}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {data.images.length > 1 && (
              <>
                <CarouselNext className="border-1" />
                <CarouselPrevious className="border-1" />
              </>
            )}
          </Carousel>
          ) : (
            <Image
              src={data.thumbnail}
              alt={data.title}
              width={300}
              height={300}
            />
          )}
        </div>
      </div>
    </div>
  );
}