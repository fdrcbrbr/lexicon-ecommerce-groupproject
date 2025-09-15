/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    // Where to look for Tailwind classes
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',      // Next.js pages
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // Components
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',        // Next.js app directory
  ],

  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			gray: {
  				'50': '#fafafa',
  				'100': '#f5f5f5',
  				'200': '#e5e5e5',
  				'300': '#d4d4d4',
  				'400': '#a3a3a3',
  				'500': '#737373',
  				'600': '#525252',
  				'700': '#404040',
  				'800': '#262626',
  				'900': '#171717'
  			},
  			success: '#22c55e',
  			warning: '#f59e0b',
  			error: '#ef4444',
  			info: '#3b82f6',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-inter)',
  				'Inter',
  				'Arial',
  				'sans-serif'
  			],
  			display: [
  				'Integral CF',
  				'Arial Black',
  				'sans-serif'
  			],
  			inter: [
  				'var(--font-inter)',
  				'Inter',
  				'sans-serif'
  			],
  			integral: [
  				'Integral CF',
  				'sans-serif'
  			]
  		},
  		spacing: {
  			'18': '4.5rem',
  			'22': '5.5rem',
  			'25': '6.25rem',
  			'30': '7.5rem'
  		},
  		container: {
  			center: true,
  			padding: {
  				DEFAULT: '1rem',
  				sm: '2rem',
  				lg: '4rem',
  				xl: '6.25rem'
  			}
  		},
  		borderRadius: {
  			button: '62px',
  			'4xl': '2rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		screens: {
  			mobile: '475px',
  			tablet: '768px',
  			desktop: '1024px',
  			wide: '1440px'
  		}
  	}
  },

  plugins: [import("tailwindcss-animate")],
}