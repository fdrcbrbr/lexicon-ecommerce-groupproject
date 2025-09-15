// data/consts.ts
export const MENUITEMS = [
  { title: 'Home', path: '/' },
  { title: 'Men', path: '/products?category=men' },
  { title: 'Women', path: '/products?category=women'},
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' }, 
];

// Product categories mapping
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
    "sunglasses"
  ]
};

// All categories for the "all" filter
export const ALL_CATEGORIES = [
  ...PRODUCT_CATEGORIES.men,
  ...PRODUCT_CATEGORIES.women,
  ...PRODUCT_CATEGORIES.accessories
];