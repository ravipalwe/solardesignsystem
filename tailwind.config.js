/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          appCanvas: "#000000",
          cardSurface: "#121212",
          cardSurfaceHover: "#1A1A1A",
          badgeNeutral: "#262626",
        },
        text: {
          primary: "#E5E5E5",
          secondary: "#A3A3A3",
          tertiary: "#737373",
          link: "#DDEE88",
        },
        accent: {
          primary: "#DDEE88",
          'primary-dim': "#BBDD55",
          'solar-amber': "#F59E0B",
          'oled-rose': "#E11D48",
          'deep-teal': "#0D9488",
          purple: "#A78BFA",
          cyan: "#22D3EE",
          success: "#34D399",
        },
        borders: {
          subtle: "#262626",
          contrast: "#404040",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "sans-serif"],
      },
      borderRadius: {
        card: "24px",
        button: "9999px",
        input: "12px",
        badge: "6px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
    },
  },
  plugins: [],
}

