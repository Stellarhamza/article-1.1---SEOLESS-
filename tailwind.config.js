/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        geist: ['Geist', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        silkscreen: ['Silkscreen', 'cursive'],
      },
    },
  },
  plugins: [],
}
