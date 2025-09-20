# CompactFilterCard Visual Specifications

## 🎨 Visual Specifications

### 1. Container Styling
```css
.compact-filter-group {
  background: var(--admin-surface);           /* Dark background */
  border: 1px solid var(--admin-border-soft); /* Subtle border */
  border-radius: 0.5rem;                      /* Rounded corners */
  padding: 1rem;                              /* Internal spacing */
  margin-bottom: var(--admin-space-4);        /* Bottom spacing */
}
```

### 2. Layout Structure
```css
/* Flexbox layout for horizontal alignment */
.flex {
  display: flex;
}

.items-center {
  align-items: center;                        /* Vertical centering */
}

.gap-4 {
  gap: 1rem;                                  /* Space between elements */
}
```

### 3. Label Styling
```css
label {
  font-size: 0.875rem;                        /* 14px */
  font-weight: 500;                           /* Medium weight */
  color: var(--admin-text-primary)-muted;     /* Muted text color */
  margin-bottom: 0.5rem;                      /* Space below label */
  display: block;                             /* Block element */
}
```

### 4. Select Trigger (Dropdown Button)
```css
.select-trigger {
  background: var(--admin-card-bg);           /* Card background */
  border: 1px solid var(--admin-border-soft); /* Subtle border */
  color: var(--admin-text-primary);           /* Primary text color */
  border-radius: 0.375rem;                    /* Slightly rounded */
  padding: 0.5rem 0.75rem;                    /* Internal padding */
  height: 2.25rem;                            /* Fixed height */
  min-width: fit-content;                     /* Auto width */
  transition: all 150ms ease-in-out;          /* Smooth transitions */
}
```

### 5. Hover Effects
```css
.select-trigger:hover {
  border-color: var(--admin-border-strong);   /* Stronger border on hover */
}
```

### 6. Select Content (Dropdown Menu)
```css
.select-content {
  background: var(--admin-card-bg);           /* Same as trigger */
  border: 1px solid var(--admin-border-soft); /* Consistent border */
  border-radius: 0.375rem;                    /* Rounded corners */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); /* Drop shadow */
}
```

### 7. Select Items (Options)
```css
.select-item {
  color: var(--admin-text-primary);           /* Primary text color */
  padding: 0.5rem 0.75rem;                    /* Internal padding */
  cursor: pointer;                            /* Pointer cursor */
  transition: background-color 150ms;         /* Smooth transitions */
}

.select-item:hover {
  background: var(--admin-surface);           /* Hover background */
}
```

### 8. Option Content Layout
```css
/* Each option is a flex container */
.flex {
  display: flex;
}

.items-center {
  align-items: center;                        /* Vertical centering */
}

.gap-2 {
  gap: 0.5rem;                                /* Space between icon, text, badge */
}
```

### 9. Badge Styling
```css
.badge {
  font-size: 0.75rem;                         /* 12px */
  padding: 0.25rem 0.5rem;                    /* Small padding */
  border-radius: 0.375rem;                    /* Rounded */
  font-weight: 500;                           /* Medium weight */
  white-space: nowrap;                        /* No text wrapping */
}
```

## 🔧 CSS Variables Used

```css
/* From your admin theme */
--admin-surface: #1c1e30;                    /* Main background */
--admin-card-bg: #1c1e30;                    /* Card background */
--admin-border-soft: #3a3d42;                /* Subtle borders */
--admin-border-strong: #4a4d52;              /* Strong borders */
--admin-text-primary: #fafafa;               /* Primary text */
--admin-text-muted: #a1a1aa;                 /* Muted text */
--admin-space-4: 1rem;                       /* Standard spacing */
```

## 📐 Dimensions & Spacing

- **Container padding:** `1rem` (16px)
- **Label font size:** `0.875rem` (14px)
- **Select height:** `2.25rem` (36px)
- **Border radius:** `0.5rem` (8px) for container, `0.375rem` (6px) for selects
- **Gap between elements:** `1rem` (16px)
- **Icon size:** `1rem` (16px) - `h-4 w-4` class

## 🎯 Key Design Principles

1. **Consistent theming** using CSS variables
2. **Subtle borders** for clean separation
3. **Proper spacing** using admin space variables
4. **Smooth transitions** for better UX
5. **Flexible layout** that adapts to content
6. **Accessible contrast** with proper text colors

This creates the **clean, professional, dark-themed** appearance you see in the admin dashboard! 🌙
