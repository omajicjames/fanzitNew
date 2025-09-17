Home and Profile do use the same 3-column shell, but the Profile page adds its own “mini-layout” wrappers and sticky tabs that don’t mutually hide, so at certain widths you’re rendering two heads/containers at once. That’s why it feels like “two pages” when you drag the window.

Here’s the usual culprits I see in your screenshots and code patterns—and the fixes:

Two tab bars at once
Symptom: “Posts / About / Subscriptions / Reviews” appears twice.
Cause: the compact sticky tabs and the hero tabs are both visible.
Fix:

Make them mutually exclusive:

Hero tabs: className="hidden lg:flex"

Sticky/compact bar: className="lg:sticky top-0 lg:block hidden [data-compact=true]:block [data-compact=false]:hidden"

Or, if you drive it with data-compact, add explicit display rules to globals (you already started this):

#profile-tabs[data-compact="true"] { display:block; }
#profile-tabs[data-compact="false"] { display:none; }
@media (max-width: 1024px){ /* mobile: show only one implementation */ }


Make sure only one of the two components gets rendered at a time.

Nested scroll containers (“page inside a page”)
Symptom: Profile scrolls independently from the shell; right rail/header feel desynced.
Cause: an extra wrapper in the profile center with h-screen/overflow-y-auto inside the shell that already scrolls.
Fix:

In your Profile center component, remove h-screen and any overflow-y-auto. Use min-h-full and let the shell’s main.flex-1 overflow-y-auto do the scrolling.

Keep one vertical scroller per column, never both parent and child.

Mixed width constraints
Symptom: columns jump at different breakpoints than Home; cards wrap oddly.
Cause: Profile center using a different max width (e.g., max-w-3xl or fixed px) while Home uses max-w-2xl.
Fix:

Standardize the center container on the same utility you use on Home, e.g.:
className="mx-auto w-full max-w-[720px] px-4 sm:px-6 lg:px-0"

Avoid fixed pixel widths inside cards on Profile; use %/clamp() or Tailwind responsive width utilities.

Breakpoint mismatches
Symptom: desktop + mobile variants show together around 1024–1140px.
Cause: Profile uses md: where the shell transitions at lg:.
Fix:

Align all “show/hide” breakpoints with the shell (lg): hidden lg:flex, lg:hidden, etc.

Duplicate layout shell (rare but lethal)
Symptom: double borders/right-rail shadows, everything looks duplicated.
Cause: a second ThreeColumnShell or a local flex h-screen wrapper impersonating it.
Fix:

Render ThreeColumnShell only once at the page level; the profile content component should be “dumb” content, not a layout.

Quick checklist (do this in order)

Remove h-screen/overflow-y-auto from the Profile’s inner wrappers.

Unify center column width utilities with Home.

Make hero tabs vs compact tabs mutually exclusive (either lg:hidden/lg:flex or data-compact display toggles).

Audit breakpoints: use lg: for layout visibility to match the shell.

Verify only one shell exists in the Profile route.

Sanity test

Resize at 1280 → 1024 → 768. You should see: left rail hides at the same width on both pages; exa