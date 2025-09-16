'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";

interface ImageCarouselProps {
  images: string[];
  fallbackImage?: string;
  className?: string;
}

export default function ImageCarousel({ images, fallbackImage, className = "" }: ImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const displayImages = images.length > 0 ? images : (fallbackImage ? [fallbackImage] : [])

  useEffect(() => {
    if (!api) return;

    setCurrentIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    api?.scrollTo(index);
  }

  if (displayImages.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 bg-gray-100 rounded-lg">
        No images to display
      </div>
    );
  }

  return (
    <div className={`w-full max-w-6xl mx-auto h-[28rem] min-h-[400px] ${className}`}>
      {/* Desktop Layout */}
      <div className="hidden md:flex gap-6 h-full max-h-96">
        <div className="flex-shrink-0 w-24">
          <Carousel
            setApi={setApi}
            orientation="vertical"
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full h-full"
          >
            <CarouselContent className="h-full mt-4 p-2">
              {displayImages.map((imageUrl, index) => (
                <CarouselItem key={index} className="pt-2 basis-1/3">
                  <div
                    className={`relative cursor-pointer transition-all duration-200 rounded-xl overflow-hidden h-full max-h-20 max-w-20 p-2 ${index === currentIndex
                        ? 'ring-2 ring-blue-500 ring-offset-2 shadow-lg'
                        : 'hover:ring-1 hover:ring-gray-300 hover:shadow-md'
                      }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <div className="aspect-[4/3] relative bg-gray-100">
                      <Image
                        src={imageUrl}
                        alt={`Image ${index + 1}`}
                        width={150}
                        height={150}
                        className="object-cover"
                        sizes="192px"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1/2 -translate-x-1/2 -top-2" />
            <CarouselNext className="left-1/2 -translate-x-1/2 -bottom-2" />
          </Carousel>
        </div>

        <div className="flex-1 flex flex-col h-full w-full">
          <div className="relative bg-gray-50 rounded-lg overflow-hidden shadow-lg flex-1">
            <Image
              src={displayImages[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col h-full">
        <div className="relative bg-gray-50 rounded-lg overflow-hidden shadow-lg flex-1 mb-4">
          <Image
            src={displayImages[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        <div className="flex-shrink-0">
          <Carousel
            setApi={setApi}
            orientation="horizontal"
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="ml-4 p-2">
              {displayImages.map((imageUrl, index) => (
                <CarouselItem key={index} className="pl-2 basis-1/3 sm:basis-1/4">
                  <div
                    className={`relative cursor-pointer transition-all duration-200 rounded-xl overflow-hidden max-h-20 max-w-20 p-2 ${index === currentIndex
                        ? 'ring-2 ring-blue-500 ring-offset-2 shadow-lg'
                        : 'hover:ring-1 hover:ring-gray-300 hover:shadow-md'
                      }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <div className="aspect-[4/3] relative bg-gray-100">
                      <Image
                        src={imageUrl}
                        alt={`Image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 33vw, 25vw"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}