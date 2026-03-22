import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 라티 컬러
        coral: {
          DEFAULT: '#FFB3A7',
          light: '#FFD6CF',
          dark: '#FF8A7A',
        },
        cream: '#FFF8F0',
        mint: '#A8E6CF',
        peach: '#FFCBA4',
        // 루미 컬러
        purple: {
          deep: '#7B5EA7',
          navy: '#2C3E6B',
          lavender: '#C9B8E8',
        },
        // 피피 컬러
        gray: {
          cool: '#9EA3B0',
          offwhite: '#F5F5F5',
        },
        // 공통 브랜드
        brand: {
          bg: '#1A0F2E',
          card: '#2A1B4E',
          gold: '#F4C875',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'card-flip': 'cardFlip 0.6s ease-in-out',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        cardFlip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
