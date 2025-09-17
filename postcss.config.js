// ----------------------
// PostCSS Configuration
// ----------------------
// Configures PostCSS plugins in correct order
// Tailwind CSS processes utility classes first
// Autoprefixer adds vendor prefixes after
// Location: /postcss.config.js (project root)
// Uses CommonJS format for better Next.js compatibility
// ----------------------

/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};