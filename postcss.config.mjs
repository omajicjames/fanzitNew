// ----------------------
// PostCSS Configuration
// ----------------------
// Configures PostCSS plugins in correct order
// Tailwind CSS processes utility classes first
// Autoprefixer adds vendor prefixes after
// Location: /postcss.config.mjs (project root)
// ----------------------

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
