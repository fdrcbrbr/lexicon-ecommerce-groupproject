// app/products/page.tsx
import { getProductsForSection } from "@/data/products";
import { CATEGORY_DISPLAY_NAMES } from "@/data/consts";
import FilterProducts from "@/components/FilterProducts";
import Image from "next/image";
import Link from "next/link";

interface ProductsPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function ProductsPage({ searchParams = {} }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const category = (resolvedSearchParams.category as string) || "all";
  
  try {
    const { products } = await getProductsForSection(category);

    // Get section title from constants or generate it
    const getSectionTitle = (cat: string) => {
      return CATEGORY_DISPLAY_NAMES[cat] || 'Products';
    };

    // Format category names for display
    const getCategoryDisplayName = (categoryName: string) => {
      return CATEGORY_DISPLAY_NAMES[categoryName] || 
        categoryName
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
    };

    // Group products by category for better organization
    const groupedProducts = products.reduce((acc, product) => {
      if (!product.category) return acc;
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {} as Record<string, typeof products>);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>›</span>
            <span className="text-gray-900">{getSectionTitle(category)}</span>
          </nav>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {getSectionTitle(category)}
          </h1>
          
          <p className="text-gray-600">
            Showing {products.length} products
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <FilterProducts />
          </div>

          {/* Products Content */}
          <div className="lg:col-span-3">
            {/* Filter Tabs - Mobile/Tablet Quick Filters */}
            <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 lg:hidden">
              <Link
                href="/products?category=all"
                className={`pb-4 px-1 font-medium text-sm ${
                  category === 'all'
                    ? 'border-b-2 border-black text-black'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                All
              </Link>
              <Link
                href="/products?category=men"
                className={`pb-4 px-1 font-medium text-sm ${
                  category === 'men'
                    ? 'border-b-2 border-black text-black'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Men
              </Link>
              <Link
                href="/products?category=women"
                className={`pb-4 px-1 font-medium text-sm ${
                  category === 'women'
                    ? 'border-b-2 border-black text-black'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Women
              </Link>
              <Link
                href="/products?category=accessories"
                className={`pb-4 px-1 font-medium text-sm ${
                  category === 'accessories'
                    ? 'border-b-2 border-black text-black'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Accessories
              </Link>
            </div>

            {/* Products Grid */}
            {Object.entries(groupedProducts).map(([categoryName, categoryProducts]) => (
              <div key={categoryName} className="mb-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {getCategoryDisplayName(categoryName)}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProducts.map((product) => (
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
                        <h3 className="font-medium text-gray-900 line-clamp-2">
                          {product.title}
                        </h3>
                        <p className="text-lg font-bold text-gray-900">
                          ${product.price}
                        </p>
                        {product.description && (
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {product.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Empty State */}
            {products.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m7-6v2m0 4v2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or check back later.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading products:', error);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="text-red-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading products</h3>
          <p className="text-gray-500">Please try again later.</p>
          <Link 
            href="/"
            className="mt-4 inline-block bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }
}