/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        accent: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
            keyframes: {
                      "bounce-up": {
                                  "0%": { transform: "translateY(20px)", opacity: "0" },
                                  "30%": { transform: "translateY(0)", opacity: "1" },
                                  "100%": { transform: "translateY(-40px)", opacity: "0" },
                                },
                    }
                    "fade-in": {
                "0%": { opacity: "0" },
                "100%": { opacity: "1" },
              },
              "slide-in-left": {
                "0%": { transform: "translateX(-100%)", opacity: "0" },
                "100%": { transform: "translateX(0)", opacity: "1" },
              },
              "slide-in-right": {
                "0%": { transform: "translateX(100%)", opacity: "0" },
                "100%": { transform: "translateX(0)", opacity: "1" },
              },
              "pulse-glow": {
                "0%, 100%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)" },
                "50%": { boxShadow: "0 0 40px rgba(139, 92, 246, 0.8)" },
              },
              "shake": {
                "0%, 100%": { transform: "translateX(0)" },
                "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
                "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
              },
              "float": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-10px)" },
              },,
            animation: {
                      "bounce-up": "bounce-up 1.2s ease-out forwards",
                    },
              "fade-in": "fade-in 0.5s ease-in forwards",
              "slide-in-left": "slide-in-left 0.6s ease-out forwards",
              "slide-in-right": "slide-in-right 0.6s ease-out forwards",
              "pulse-glow": "pulse-glow 2s ease-in-out infinite",
              "shake": "shake 0.5s ease-in-out",
              "float": "float 3s ease-in-out infinite"
    },
  },
  plugins: [],
}
