/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        accent: '#4F46E5',
        canvas: '#F5F7FB',
        ink: '#0F172A',
        muted: '#64748B',
        panel: '#FFFFFF',
        success: '#0F9D58',
      },
      borderRadius: {
        card: '28px',
      },
      boxShadow: {
        card: '0px 18px 36px rgba(15, 23, 42, 0.08)',
      },
      spacing: {
        page: '24px',
      },
    },
  },
  plugins: [],
};
