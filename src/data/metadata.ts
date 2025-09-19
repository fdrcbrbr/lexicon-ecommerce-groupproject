import { getProductDetails } from "./products";
import { Product, WithContext } from "schema-dts";
export default async function generateMetadata(id:string) {
  const product = await getProductDetails(id);
  const [review] = product.reviews;
  const productJsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.thumbnail,
    sku: product.sku,
    keywords: product.tags,
    brand: product.brand,
   aggregateRating: {
      "@type": "AggregateRating",
      ratingValue:product.rating,
    },
    review:
    {
    "@type":"UserReview",
      reviewBody:review.comment,
    },
    offers: {
      "@type": "AggregateOffer",
      availability: product.availabilityStatus
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: "SEK",
      //   highPrice: product.priceRange.maxVariantPrice,
      //   lowPrice: product.priceRange.minVariantPrice,
      category: product.category,
      price: product.price,
      deliveryLeadTime: {
        "@type": "QuantitativeValue",
        unitText: product.shippingInformation,
      },
    },
  };

  return productJsonLd;
}
