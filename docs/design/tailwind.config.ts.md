/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Map semantic tokens -> tailwind color objects
        text: {
          DEFAULT: 'hsl(var(--text))',
          muted: 'hsl(var(--text-muted))',
          subtle: 'hsl(var(--text-subtle))',
        },
        surface: {
          canvas: 'hsl(var(--surface-canvas))',
          elev1: 'hsl(var(--surface-elev-1))',
          elev2: 'hsl(var(--surface-elev-2))',
          panel: 'hsl(var(--surface-panel))',
          panelQuiet: 'hsl(var(--surface-panel-quiet))',
        },
        line: {
          soft: 'hsl(var(--line-soft))',
          strong: 'hsl(var(--line-strong))',
        },
        brand: {
          DEFAULT: 'hsl(var(--brand))',
          contrast: 'hsl(var(--brand-contrast))',
        },
        gold: 'hsl(var(--accent-gold))',
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        danger: 'hsl(var(--danger))',
        info: 'hsl(var(--info))',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};
