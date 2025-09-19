1) Make globals.css v3-compatible (fastest fix)

Replace the v4 bits with classic v3 directives. At the very top of app/globals.css:

/* Tailwind v3-compatible setup */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Dark mode class (instead of @custom-variant) */
:root {
  /* your CSS custom properties here (background, card, brand, etc.) */
}

.dark {
  /* override tokens for dark mode here */
}

/* Any @apply usage is fine in v3, but the file must be processed by PostCSS+Tailwind */


If you truly want to use v4, upgrade Tailwind and follow the v4 setup. But until then, remove @import "tailwindcss";, @theme, and @custom-variant from globals.css so the compiler stops choking on them.

2) Ensure Tailwind is actually compiling your CSS

postcss.config.js should be:

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};


tailwind.config.(js|ts) should include your paths (App Router + src):

content: [
  "./app/**/*.{ts,tsx,js,jsx,mdx}",
  "./src/**/*.{ts,tsx,js,jsx,mdx}",
]


Import ./globals.css in app/layout.tsx (top-level layout).

3) Paint the middle column background explicitly

Firefox is strict about transparency inheritance. Give the center column a guaranteed background so no gray bleeds through. In your shell or profile wrapper, add bg-background (your neutral token per the spec ):

// components/app/layout/three-column-shell.tsx
<main className="flex-1 bg-background">
  {children}
</main>


Or at the profile page wrapper (from the shared Timeline approach) :

<div className="mx-auto max-w-3xl bg-background">
  {/* profile header + feed */}
</div>

4) Keep card rules clean

Your design spec says: page uses bg-background; cards use bg-card; media wrappers shouldn’t add extra borders/radius that cause “double border” halos—the classic source of faint gray outlines in some browsers .

Why this fixes Firefox

With v3-compatible CSS, your tokens/classes actually compile, so bg-background exists.

Setting bg-background on the page/column ensures no transparent gaps. Chrome/WebKit often mask this; Firefox shows the truth.

If you want, I can give you a tiny patch for three-column-shell.tsx and a cleaned globals.css header that you can paste in verbatim.