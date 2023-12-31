/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        rap1: "#FF7858",
        rap2: "#6B64FF",
        rap3: "#ECB5D2",
        rap4: "#F7F7F2",
        rap5: "#5852EC",
        rap6: "#D3FE66",
      },
      tremor: {
        brand: {
          faint: "#eff6ff", // blue-50
          muted: "#bfdbfe", // blue-200
          subtle: "#60a5fa", // blue-400
          DEFAULT: "#6B64FF",
          emphasis: "#1d4ed8", // blue-700
          inverted: "#ffffff", // white
        },
        background: {
          muted: "#f9fafb", // gray-50
          subtle: "#f3f4f6", // gray-100
          DEFAULT: "#ffffff", // white
          emphasis: "#374151", // gray-700
        },
        border: {
          DEFAULT: "#6B64FF", // gray-200
        },
        ring: {
          DEFAULT: "#6B64FF", // gray-200
        },
        content: {
          subtle: "#9ca3af", // gray-400
          DEFAULT: "#6b7280", // gray-500
          emphasis: "#374151", // gray-700
          strong: "#111827", // gray-900
          inverted: "#ffffff", // white
        },
        "dark-tremor": {
          brand: {
            faint: "#0B1229", // custom
            muted: "#172554", // blue-950
            subtle: "#1e40af", // blue-800
            DEFAULT: "#3b82f6", // blue-500
            emphasis: "#60a5fa", // blue-400
            inverted: "#030712", // gray-950
          },
          background: {
            muted: "#131A2B", // custom
            subtle: "#1f2937", // gray-800
            DEFAULT: "#111827", // gray-900
            emphasis: "#d1d5db", // gray-300
          },
          border: {
            DEFAULT: "#1f2937", // gray-800
          },
          ring: {
            DEFAULT: "#1f2937", // gray-800
          },
          content: {
            subtle: "#4b5563", // gray-600
            DEFAULT: "#6b7280", // gray-600
            emphasis: "#e5e7eb", // gray-200
            strong: "#f9fafb", // gray-50
            inverted: "#000000", // black
          },
        },
        boxShadow: {
          // light
          "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          "tremor-card":
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          "tremor-dropdown":
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          // dark
          "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          "dark-tremor-card":
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          "dark-tremor-dropdown":
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        },
        borderRadius: {
          "tremor-small": "0.375rem",
          "tremor-default": "0.5rem",
          "tremor-full": "9999px",
        },
        fontSize: {
          "tremor-label": ["0.75rem"],
          "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
          "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
          "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
        },
      },
    },
  },
  plugins: [],
};
