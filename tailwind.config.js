/** @type {import('tailwindcss').Config} */
module.exports = {
  
  // Where to look for Tailwind classes
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',      // Next.js pages
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Components
    './app/**/*.{js,ts,jsx,tsx,mdx}',        // Next.js app directory
  ],
  
  theme: {
    extend: {
      
      // SITE COLORS
      colors: {
        
        // Main color black
        primary: '#000000',        // Main black
        secondary: '#ffffff',      // White
        
        // Gray scale for text and backgrounds
        gray: {
          50: '#fafafa',    // Very light gray
          100: '#f5f5f5',   // Very light gray
          200: '#e5e5e5',   // Light gray
          300: '#d4d4d4',   // Medium-light gray
          400: '#a3a3a3',   // Medium gray
          500: '#737373',   // Gray
          600: '#525252',   // Dark gray
          700: '#404040',   // Very dark gray
          800: '#262626',   // Almost black gray
          900: '#171717',   // Almost black
        },
        
        // Status colors for messages, errors, etc
        success: '#22c55e',  // Green for success
        warning: '#f59e0b',  // Orange for warnings
        error: '#ef4444',    // Red for errors
        info: '#3b82f6',     // Blue for information
      },
      
      // FONT FAMILIES
      fontFamily: {
        // Main font Inter for all normal text
        sans: ['var(--font-inter)', 'Inter', 'Arial', 'sans-serif'],
        
        // Font for titles and logo Integral CF
        display: ['Integral CF', 'Arial Black', 'sans-serif'],
        
        // Simpler aliases
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
        integral: ['Integral CF', 'sans-serif'],
      },
      
      // EXTRA SPACING in addition to Tailwind defaults
      spacing: {
        '18': '4.5rem',   // 72px - For large spacing
        '22': '5.5rem',   // 88px
        '25': '6.25rem',  // 100px - For desktop padding
        '30': '7.5rem',   // 120px
      },
      
      // CONTAINER main content box
      container: {
        center: true,     // Always centered
        padding: {
          DEFAULT: '1rem',    // 16px on mobile
          sm: '2rem',         // 32px on small tablet
          lg: '4rem',         // 64px on desktop
          xl: '6.25rem',      // 100px on large desktop
        },
      },
      
      // ROUNDED BORDERS
      borderRadius: {
        // Extra borders for buttons
        'button': '62px',   // Very rounded buttons
        '4xl': '2rem',      // 32px for large cards
      },
      
      // BREAKPOINTS responsive breaking points
      screens: {
        'mobile': '475px',    // Large phones
        'tablet': '768px',    // Tablets
        'desktop': '1024px',  // Computers
        'wide': '1440px',     // Large screens
      },
    },
  },
      
  plugins: [],
}
