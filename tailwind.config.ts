import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'lexend-exa': ['Lexend Exa', 'sans-serif'],
        'lexend-zetta': ['var(--font-lexend-zetta)'],
      },
    },
  },
  plugins: [],
}

export default config