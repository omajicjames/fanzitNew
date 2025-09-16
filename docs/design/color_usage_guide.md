This guide keeps our UI color choices consistent across the app so content shines and chrome stays classy. We use:

Primary (blue) → interactions & focus

Accent (teal) → supportive highlights, chips, filters

Brand (gold) → prestige micro-decor (badges, verified, crowns), not CTAs

Neutrals (zinc) → backgrounds, surfaces, text, borders

Tokens (from globals.css)

--primary / --primary-foreground

--accent / --accent-foreground

--brand / --brand-foreground

--background, --foreground, --muted, --border, --ring

Mapped in @theme inline so Tailwind classes like text-primary, bg-accent, text-brand work.

When to use what
Primary (blue)

Use for

Main CTAs: buttons, submit, “Subscribe”, “Post”, “Pay”

Links, link hovers

Focus rings, selected tabs/pills, active nav item

Progress & key interactive indicators

Classes

bg-primary text-primary-foreground

text-primary hover:text-primary/80

ring-2 ring-primary

border-primary (sparingly; prefer neutral borders)

Don’t

Use primary for every chip/badge. It becomes visual noise.

Accent (teal)

Use for

Secondary actions (non-destructive)

Filter chips, small info tags (e.g., “New”, “Beta”)

Hover states on subtle elements

Graph series, charts (variety without shouting)

Classes

bg-accent text-accent-foreground

text-accent

bg-accent/10 border-accent/30 (subtle fills)

Don’t

Promote an element’s hierarchy with accent if it should be primary.

Brand (gold)

Use for (sparingly!)

Verified ticks, crowns, premium ribbons

“Creator of the Day” halo or small lines on paywalls

Tiny decorations that signal prestige

Classes

text-brand for icons/small text

bg-brand/10 for soft halo backgrounds

border-brand/30 for subtle brand edges

Don’t

Use brand for buttons, links, nav, focus states, global borders.

Avoid brand gradients and large fills; it overpowers content.

Neutrals (zinc)

Backgrounds: bg-background (page), bg-card (surfaces)

Text: text-foreground (primary), text-muted-foreground (meta)

Borders: border-border

Disabled: reduce alpha (/40, /20) on neutral tokens

Component recipes

Primary Button

<button className="bg-primary text-primary-foreground hover:bg-primary/90 ring-1 ring-primary/20 rounded-lg px-4 py-2">
  Continue
</button>


Secondary Button

<button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg px-4 py-2">
  View details
</button>


Chip (accent)

<span className="bg-accent/10 text-accent border border-accent/30 rounded-full px-3 py-1 text-xs">
  Filter: Yoga
</span>


Verified Badge (brand)

<span className="inline-flex items-center gap-1 text-brand">
  <svg className="size-4" /> <span className="text-xs">Verified</span>
</span>


Card

<div className="bg-card text-card-foreground border border-border rounded-2xl">
  {/* content */}
</div>

Accessibility

Minimum contrast: interactive text ≥ 4.5:1 on --background.

Don’t rely on color alone: keep shape/label hints.

Focus states: always visible (ring-primary on focus).

Do / Don’t quick list

Do

Use primary for actions and focus.

Use accent for supportive emphasis.

Use brand rarely for prestige.

Keep borders neutral.

Don’t

Turn brand into a theme color.

Use multiple saturated colors in the same component.

Mix brand + primary on the same element.

Examples in context

Nav active item

<a className="text-primary bg-primary/10 rounded-md px-3 py-2">
  Following
</a>


Paywall ribbon (brand)

<div className="border border-brand/30 bg-brand/5 text-brand rounded-md px-2 py-1 text-xs">
  Premium
</div>


Input

<input className="bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-3 py-2" />

The 60–30–10 rule

60% neutrals (backgrounds/surfaces)

30% content colors (thumbnails, creator media)

10% UI accents (primary/brand/accent combined)

Implementing Path 2 (keep @custom-variant, silence the linter)

Goal: keep the Tailwind v4 @custom-variant declaration (for .dark or [data-theme]) and stop editor warnings. Build remains via PostCSS + Tailwind.

1) Keep or add the variant at the top of app/globals.css

Pick the strategy you actually use (class or data attribute). :where() keeps specificity low.

/* At the very top of globals.css */
@custom-variant dark (&:where(.dark *));
/* OR, if you prefer data attributes: */
/* @custom-variant dark (&:where([data-theme="dark"] *)); */


You can keep your .dark { … } token overrides further down. This directive only tells Tailwind how to expand dark: utilities.

2) VS Code settings (mute unknown at-rule warnings)

Create or update .vscode/settings.json (or user settings):

{
  "css.lint.unknownAtRules": "ignore",
  "postcss.validate": true
}


Install Tailwind CSS IntelliSense for best DX.

3) Stylelint (if you use it)

Add Tailwind’s config and disable the generic at-rule rule:

{
  "extends": ["stylelint-config-standard", "stylelint-config-tailwindcss"],
  "rules": {
    "at-rule-no-unknown": null
  }
}

4) PostCSS order

Ensure Tailwind runs before Autoprefixer.

// postcss.config.js (ESM or CJS; either is fine)
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

5) Tailwind config (keep class mode; content globs)

Even with @custom-variant, we still want the normal dark: behavior in class mode.

// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"], // toggle by adding/removing .dark on <html> or <body>
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {},
  plugins: [],
} satisfies Config;

6) Runtime toggle (example)

If you’re using the class strategy, your HTML should look like:

<html class="dark"> <!-- or omit to be light -->


If using the data-attribute variant strategy:

<html data-theme="dark">


And you can switch it in React with:

document.documentElement.classList.toggle("dark", isDark);
// or
document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");

7) Sanity check

dark:bg-card changes with your toggle

ring-primary uses the blue token

text-brand appears only where prestige is intended