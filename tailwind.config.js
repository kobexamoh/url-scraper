/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        secondary: '#64748B',
        accent: '#22D3EE',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'ui-serif', 'serif'],
      mono: ['Menlo', 'ui-monospace', 'monospace'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
