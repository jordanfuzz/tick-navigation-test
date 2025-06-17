/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        light: 'var(--light)',
        dark: 'var(--dark)',
        success: 'var(--success)',
        error: 'var(--error)',
        warn: 'var(--warn)',
      },
    },
  },
  plugins: [],
}
