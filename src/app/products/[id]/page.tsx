import { Suspense } from "react";
import { getProductDetails } from "@/data/products";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProductReview } from "@/lib/interfaces";
import { Star } from "lucide-react";
import ImageCarousel from "./imageCarousel";

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
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex-1 px-8 w-full">
          <ImageCarousel images={data.images} fallbackImage={data.thumbnail} />
        </div>
        <div className="flex-1 flex flex-col gap-2 justify-between h-full">
          <div className="flex md:flex-col gap-2 md:gap-0 mb-4">
            <h2 className="text-2xl font-bold">{data.title}</h2>
            {data.brand && (
              <>
                <p>by{" "}<span className="text-xl font-bold text-center">{data.brand}</span></p>
              </>
            )}
          </div>
          <div>
            <PriceDisplay price={data.price} discountPercentage={data.discountPercentage} />
            <p className="text-sm mt-4">{data.description}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-0 md:gap-4 items-center justify-center mx-auto">
        <div className="border-2 rounded-xl p-2 h-full">
          <p>Warranty: {data.warrantyInformation}</p>
          <p>Shipping: {data.shippingInformation}</p>
          <p>Return Policy: {data.returnPolicy}</p>
        </div>
        <div className="border-2 rounded-xl p-2 h-full">
          <p>Weight: {data.weight} kg</p>
          <p>Size: {data.dimensions.width} x {data.dimensions.height} x {data.dimensions.depth} cm</p>
        </div>
        <div className="border-2 rounded-xl p-2 h-full">
          <p>Availability: {data.stock > 0 && data.stock} {data.availabilityStatus}</p>
          <p>Tags: {data.tags.join(", ")}</p>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex gap-4">
          <p className="mb-4 flex gap-1">Overall rating <StarRating rating={data.rating} /> from {data.reviews.length} reviews</p>
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
      <StarRating rating={review.rating} size={20} />
      <p>Name: {review.reviewerName}</p>
      <p>Comment: {review.comment}</p>
      <p>Date: {new Date(review.date).toDateString()}</p>
    </div>
  );
}

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

function StarRating({ rating, size = 24, className = "" }: StarRatingProps) {
  const clampedRating = Math.max(0, Math.min(5, rating));

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const fillPercentage = Math.max(0, Math.min(1, clampedRating - i + 1));

    stars.push(
      <div key={i} className="relative inline-block">
        <Star
          size={size}
          className="text-gray-300"
          fill="currentColor"
        />

        <div
          className="absolute top-0 left-0 overflow-hidden"
          style={{ width: `${fillPercentage * 100}%` }}
        >
          <Star
            size={size}
            className="text-yellow-400"
            fill="currentColor"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {stars}
      <span className="ml-2 text-sm text-gray-600">
        {clampedRating.toFixed(1)} / 5
      </span>
    </div>
  );
}

interface PriceDisplayProps {
  price: number;
  discountPercentage?: number;
}

function PriceDisplay({ price, discountPercentage }: PriceDisplayProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const discountedPrice = discountPercentage ? price * (1 - discountPercentage / 100) : price;
  const hasDiscount = discountPercentage && discountPercentage > 0;

  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl font-bold text-green-600">
        {formatPrice(discountedPrice)}
      </span>
      {hasDiscount && (
        <span className="text-lg text-gray-500 line-through">
          {formatPrice(price)}
        </span>
      )}
    </div>
  );
}