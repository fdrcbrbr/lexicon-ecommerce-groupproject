import { Suspense } from "react";
import { getProductDetails } from "@/data/products";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProductReview } from "@/lib/interfaces";

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
    <div className="px-8">
      <div className="flex flex-col md:flex-row gap-1 md:gap-4 items-center justify-center mb-4">
        <h2 className="text-3xl font-bold text-center">{data.title}</h2>
        {data.brand && (
          <>
            <p>by</p>
            <h4 className="text-xl font-bold text-center">{data.brand}</h4>
          </>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
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
      <div className="flex flex-col md:flex-row gap-0 md:gap-4 items-center justify-center mx-auto">
        <div>
          <p>Warranty: {data.warrantyInformation}</p>
          <p>Shipping: {data.shippingInformation}</p>
          <p>Return Policy: {data.returnPolicy}</p>
        </div>
        <div>
          <p>Availability: {data.stock > 0 && data.stock} {data.availabilityStatus}</p>
          <p>Weight: {data.weight} kg</p>
          <p>Size: {data.dimensions.width} x {data.dimensions.height} x {data.dimensions.depth} cm</p>
        </div>
        <div>
          <p>Price: {data.price}</p>
          <p>Discount: {data.discountPercentage}%</p>
          <p>Tags: {data.tags.join(", ")}</p>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex gap-4">
          <p className="mb-4">Reviews:</p>
        </div>
        <div className="px-4">
          <Carousel className="mx-auto">
            <CarouselContent>
              {data.reviews.map((review, index) => (
                <CarouselItem key={index} className="md:basis-1/3">
                  <ReviewCard review={review} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {data.reviews.length > 1 && (
              <>
                <CarouselNext className="border-1" />
                <CarouselPrevious className="border-1" />
              </>
            )}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: ProductReview }) {
  return (
    <div>
      <p>Name: {review.reviewerName}</p>
      <p>Rating: {review.rating}</p>
      <p>Comment: {review.comment}</p>
      <p>Date: {new Date(review.date).toDateString()}</p>
    </div>
  );
}