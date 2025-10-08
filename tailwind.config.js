/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"], // Enables dark mode with a class strategy
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        padding: "5%",
      },
      fontSize: {
        // Screen-specific font sizes in pixels
        // 2560px+ screens
        "xl-2560": ["22px", { lineHeight: "1.5" }],
        "2xl-2560": ["24px", { lineHeight: "1.4" }],
        "3xl-2560": ["30px", { lineHeight: "1.3" }],
        "4xl-2560": ["36px", { lineHeight: "1.2" }],
        "5xl-2560": ["48px", { lineHeight: "1.1" }],
        "6xl-2560": ["60px", { lineHeight: "1" }],
        "7xl-2560": ["72px", { lineHeight: "1" }],
        "8xl-2560": ["96px", { lineHeight: "1" }],
        // 1440px screens
        "xl-1440": ["16px", { lineHeight: "1.5" }],
        "2xl-1440": ["18px", { lineHeight: "1.4" }],
        "3xl-1440": ["24px", { lineHeight: "1.3" }],
        "4xl-1440": ["30px", { lineHeight: "1.2" }],
        "5xl-1440": ["40px", { lineHeight: "1.1" }],
        "6xl-1440": ["50px", { lineHeight: "1" }],
        "7xl-1440": ["60px", { lineHeight: "1" }],
        "8xl-1440": ["80px", { lineHeight: "1" }],
        // 1280px screens
        "xl-1280": ["15px", { lineHeight: "1.5" }],
        "2xl-1280": ["17px", { lineHeight: "1.4" }],
        "3xl-1280": ["22px", { lineHeight: "1.3" }],
        "4xl-1280": ["28px", { lineHeight: "1.2" }],
        "5xl-1280": ["36px", { lineHeight: "1.1" }],
        "6xl-1280": ["45px", { lineHeight: "1" }],
        "7xl-1280": ["54px", { lineHeight: "1" }],
        "8xl-1280": ["72px", { lineHeight: "1" }],
        // 1024px screens (tablets)
        "xl-1024": ["15px", { lineHeight: "1.5" }],
        "2xl-1024": ["17px", { lineHeight: "1.4" }],
        "3xl-1024": ["22px", { lineHeight: "1.3" }],
        "4xl-1024": ["28px", { lineHeight: "1.2" }],
        "5xl-1024": ["36px", { lineHeight: "1.1" }],
        "6xl-1024": ["45px", { lineHeight: "1" }],
        "7xl-1024": ["54px", { lineHeight: "1" }],
        "8xl-1024": ["72px", { lineHeight: "1" }],
        // 768px screens (mobile)
        "xl-768": ["14px", { lineHeight: "1.5" }],
        "2xl-768": ["16px", { lineHeight: "1.4" }],
        "3xl-768": ["20px", { lineHeight: "1.3" }],
        "4xl-768": ["26px", { lineHeight: "1.2" }],
        "5xl-768": ["32px", { lineHeight: "1.1" }],
        "6xl-768": ["40px", { lineHeight: "1" }],
        "7xl-768": ["48px", { lineHeight: "1" }],
        "8xl-768": ["64px", { lineHeight: "1" }],
        // 480px screens (small mobile)
        "xl-480": ["15px", { lineHeight: "1.5" }],
        "2xl-480": ["17px", { lineHeight: "1.4" }],
        "3xl-480": ["22px", { lineHeight: "1.3" }],
        "4xl-480": ["28px", { lineHeight: "1.2" }],
        "5xl-480": ["36px", { lineHeight: "1.1" }],
        "6xl-480": ["45px", { lineHeight: "1" }],
        "7xl-480": ["54px", { lineHeight: "1" }],
        "8xl-480": ["72px", { lineHeight: "1" }],
        // Default font sizes (16px base)
        xs: ["12px", { lineHeight: "1rem" }],
        sm: ["14px", { lineHeight: "1.25rem" }],
        base: ["16px", { lineHeight: "1.5rem" }],
        lg: ["18px", { lineHeight: "1.75rem" }],
        xl: ["20px", { lineHeight: "1.75rem" }],
        "2xl": ["24px", { lineHeight: "2rem" }],
        "3xl": ["30px", { lineHeight: "2.25rem" }],
        "4xl": ["36px", { lineHeight: "2.5rem" }],
        "5xl": ["48px", { lineHeight: "1" }],
        "6xl": ["60px", { lineHeight: "1" }],
        "7xl": ["72px", { lineHeight: "1" }],
        "8xl": ["96px", { lineHeight: "1" }],
        "9xl": ["128px", { lineHeight: "1" }],
      },
      colors: {
        primary: {
          DEFAULT: "#1D4ED8", // Blue
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#1D4ED8", // Default
          600: "#1D4ED8",
          700: "#1D4ED8",
          800: "#1D4ED8",
          900: "#1D4ED8",
        },
        secondary: {
          DEFAULT: "#2A2A2A", // Dark Gray
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#2A2A2A", // Default
          600: "#2A2A2A",
          700: "#2A2A2A",
          800: "#2A2A2A",
          900: "#2A2A2A",
        },
        gray: {
          DEFAULT: "#A0A0A0", // Mid Gray
          50: "#FAFAFA",
          100: "#F5F5F5",
          110: "#AAADAD",
          150: "#EBEAEF",
          200: "#E5E5E5",
          250: "#202027",
          300: "#D4D4D4",
          350: "#F7F9FB",
          400: "#BFBFBF",
          410: "#A7A7A7",
          450: "#CBCCCD",
          500: "#A0A0A0", // Default
          550: "#DEDEDE",
          600: "#7A7A7A",
          650: "#404040",
          700: "#5C5C5C",
          750: "#777777",
          800: "#3D3D3D",
          850: "#676D7C",
          900: "#1F1F1F",
          950: "#F5F4F9",
        },
        yellow: {
          DEFAULT: "#FFAE43", // Mid Gray
          100: "#FFAE43",
          150: "#FFAE4321",
          200: "#FFED9F",

          500: "#FFAE43", // Default
        },
        green: {
          // Mid Gray
          100: "#4BD670",
          150: "#EFFFF1",
        },
      },
      spacing: {
        64: "16rem",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        sans: ["Poppins", "sans-serif"],
      },
    },
  },

  plugins: [
    async () => (await import("tailwindcss-animate")).default,
    async () => (await import("@tailwindcss/forms")).default,
  ],
};
