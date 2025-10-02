import type { Config } from 'tailwindcss';
import tailwindForms from '@tailwindcss/forms';

export default {
  darkMode: 'selector',
  content: [],
  theme: {
    screens: {
      xxs: '450px',
      xs: '576px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        amnezia: {
          bg: {
            primary: '#16171D',
            secondary: '#1C1D22',
            card: '#242526',
            elevated: '#2C2D30',
            hover: 'rgba(255, 255, 255, 0.08)',
          },
          text: {
            primary: '#E3E3E3',
            secondary: '#F5F6F7',
            muted: '#B7C0C7',
          },
          accent: {
            DEFAULT: '#FBB26A',
            dark: '#A85809',
          },
          border: {
            DEFAULT: '#292A2E',
            light: 'rgba(255, 255, 255, 0.08)',
          },
        },
      },
    },
  },
  plugins: [tailwindForms],
} satisfies Config;
