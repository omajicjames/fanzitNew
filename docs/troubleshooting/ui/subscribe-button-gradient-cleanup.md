# Subscribe Button Gradient Cleanup

## Issue
The subscribe button had a gradient that included grey/zinc colors mixed with the primary color, creating a less cohesive visual appearance that didn't fully align with the design system's primary color scheme.

## Changes Made

### Button Gradient Simplification
- **Removed**: Grey/zinc color stops from the unsubscribed button gradient
- **Updated**: Gradient to use only primary color with opacity variations
- **Maintained**: Hover state transitions and visual effects

### Technical Implementation

#### Before
```tsx
'bg-gradient-to-br from-zinc-600 via-primary to-zinc-700 hover:from-zinc-700 hover:via-primary/90 hover:to-zinc-800'
```

#### After
```tsx
'bg-gradient-to-br from-primary/80 via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary'
```

### Gradient Structure
- **from-primary/80**: Starting point with 80% opacity
- **via-primary**: Middle point at full opacity
- **to-primary/90**: End point with 90% opacity
- **Hover states**: Intensified primary color variations

## Outcome
- Cleaner, more cohesive button appearance
- Better alignment with design system primary color
- Maintained visual depth and modern gradient effects
- Improved brand consistency

## Files Modified
- `src/features/creator/components/creator-profile.tsx`

## Design System Compliance
- Uses CSS custom property `--primary: oklch(0.72 0.12 235)`
- Maintains opacity-based variations for depth
- Preserves glassmorphism and modern UI effects