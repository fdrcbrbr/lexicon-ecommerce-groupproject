// data/consts.ts

// Navigation menu items
export const MENUITEMS = [
  { title: 'Home', path: '/' },
  { title: 'Men', path: '/products?category=men' },
  { title: 'Women', path: '/products?category=women'},
  {title: 'Accessories', path: '/products?category=accessories'},
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
];

// Product categories mapping based on DummyJSON API structure
export const PRODUCT_CATEGORIES = {
  men: [
    "mens-shirts",
    "mens-shoes", 
    "mens-watches"
  ],
  women: [
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches"
  ],
  accessories: [
    "sunglasses",
    "mens-watches", // Watches can be considered accessories
    "womens-watches",
    "womens-jewellery",
    "womens-bags"
  ]
};

// All categories for the "all" filter
export const ALL_CATEGORIES = [
  ...PRODUCT_CATEGORIES.men,
  ...PRODUCT_CATEGORIES.women,
  "sunglasses" // Only include sunglasses from accessories to avoid duplicates
];

// Category display names mapping
export const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  'all': 'All Products',
  'men': "Men's Collection",
  'women': "Women's Collection",
  'accessories': 'Accessories',
  'mens-shirts': "Men's Shirts",
  'mens-shoes': "Men's Shoes",
  'mens-watches': "Men's Watches",
  'womens-bags': "Women's Bags",
  'womens-dresses': "Women's Dresses",
  'womens-jewellery': "Women's Jewellery",
  'womens-shoes': "Women's Shoes",
  'womens-watches': "Women's Watches",
  'sunglasses': 'Sunglasses'
};