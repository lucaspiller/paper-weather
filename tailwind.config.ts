import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    plugin(function({ addBase }) {
     addBase({
        'html': { fontSize: "28px" },
      })
    }),
  ]
}

export default config
