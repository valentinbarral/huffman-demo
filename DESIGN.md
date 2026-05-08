---
version: alpha
name: Teaching Hub
description: A clean, mobile-first, bilingual hub for interactive teaching demos with light/dark theme support.
colors:
  # Light theme
  bg-light: "#f5f7fb"
  text-light: "#333333"
  card-light: "#ffffff"
  header-light: "#ffffff"
  header-text-light: "#24292e"
  accent-light: "#0366d6"
  control-bg-light: "#f0f2f5"
  control-text-light: "#24292e"
  control-border-light: "rgba(0,0,0,0.12)"
  # Dark theme
  bg-dark: "#0f1116"
  text-dark: "#e6edf3"
  card-dark: "#161b22"
  header-dark: "#161b22"
  header-text-dark: "#e6edf3"
  accent-dark: "#2f81f7"
  control-bg-dark: "#21262d"
  control-text-dark: "#e6edf3"
  control-border-dark: "rgba(255,255,255,0.15)"
tokens:
  # CSS custom properties used across themes
  --bg: page background
  --text: body text color
  --surface: card / header background
  --surface2: secondary surface (internal panels, hover states)
  --border: structural borders
  --text-soft: secondary body text
  --muted: subdued labels and meta text
  --accent: primary interactive color (blue)
  --accent2: green (success states)
  --warn: orange/red (warning states)
  --purple: purple (highlight states)
  --yellow: yellow (highlight states)
  --pink: pink (highlight states)
  --teal: teal (highlight states)
  --control-bg: background for buttons and selects
  --control-text: text color for buttons and selects
  --control-border: rgba() border for controls (adapts to any background)
  --header: surface color for header and dropdown
  --radius-card: 12px
  --radius-control: 6px
  --radius-dropdown: 8px
  --shadow-card: 0 5px 15px rgba(0,0,0,0.08)
  --shadow-header: 0 1px 4px rgba(0,0,0,0.08)
  --shadow-dropdown: 0 4px 12px rgba(0,0,0,0.15)
  --font-body: system-ui, sans-serif
  --font-mono: 'Courier New', monospace
typography:
  body:
    fontFamily: system-ui, sans-serif
    fontSize: 16px
    fontWeight: 400
  h1-mobile:
    fontFamily: system-ui, sans-serif
    fontSize: clamp(1rem, 4.5vw, 2em)
    fontWeight: 700
  h1-desktop:
    fontFamily: system-ui, sans-serif
    fontSize: 2em
    fontWeight: 700
  h3:
    fontFamily: system-ui, sans-serif
    fontSize: 1.17em
    fontWeight: 700
  control:
    fontFamily: system-ui, sans-serif
    fontSize: 16px
    fontWeight: 400
  footer:
    fontFamily: system-ui, sans-serif
    fontSize: 14px
    fontWeight: 400
rounded:
  card: 12px
  control: 6px
  dropdown: 8px
spacing:
  container-x: 20px
  container-y: 40px
  header-y-mobile: 12px
  header-x-mobile: 16px
  header-y-desktop: 16px
  header-x-desktop: 30px
  card-y: 25px
  card-x: 25px
  grid-gap: 25px
  control-y: 6px
  control-x: 10px
  dropdown-padding: 12px
  dropdown-gap: 10px
  footer-y: 30px
components:
  card:
    backgroundColor: "{colors.card-light}"
    textColor: "{colors.text-light}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-y}"
  card-dark:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-y}"
  card-hover:
    boxShadow: 0 0 0 2px var(--accent), 0 5px 15px rgba(0,0,0,0.08)
    transform: translateY(-6px)
  header-mobile:
    backgroundColor: "{colors.header-light}"
    textColor: "{colors.header-text-light}"
    padding: "{spacing.header-y-mobile} {spacing.header-x-mobile}"
  header-desktop:
    backgroundColor: "{colors.header-light}"
    textColor: "{colors.header-text-light}"
    padding: "{spacing.header-y-desktop} {spacing.header-x-desktop}"
  header-dark-mobile:
    backgroundColor: "{colors.header-dark}"
    textColor: "{colors.header-text-dark}"
    padding: "{spacing.header-y-mobile} {spacing.header-x-mobile}"
  header-dark-desktop:
    backgroundColor: "{colors.header-dark}"
    textColor: "{colors.header-text-dark}"
    padding: "{spacing.header-y-desktop} {spacing.header-x-desktop}"
  control:
    backgroundColor: "{colors.control-bg-light}"
    textColor: "{colors.control-text-light}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "{spacing.control-y} {spacing.control-x}"
    height: auto
  control-dark:
    backgroundColor: "{colors.control-bg-dark}"
    textColor: "{colors.control-text-dark}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "{spacing.control-y} {spacing.control-x}"
    height: auto
---

## Overview

A **Clean Academic Portal** — utilitarian yet polished, designed **mobile-first**. The hub presents a collection of interactive teaching demos (signal processing, compression, communications) as a browsable card grid. The personality is neutral and functional: it prioritizes clarity, accessibility, and quick navigation over decorative flair.

The site supports three languages (Spanish, English, Galician) and toggles between light and dark color schemes. Dark mode is the default on first visit, stored in `localStorage` for persistence.

On narrow screens (≤600px), a hamburger button (☰) exposes theme and language controls in a dropdown menu, keeping the header clean and focused on the title. On wider screens, both controls sit at the header edges.

**Section navigation (if present):** If the page has a horizontal navigation bar with links to page sections, those links must also be included in the hamburger dropdown on mobile (≤600px). The horizontal bar is hidden on mobile. The dropdown order is: section links → theme toggle → language selector.

## Colors

The palette uses restrained neutrals with a single blue accent. Two complete color schemes exist — one for light mode, one for dark — switched via a CSS class `.dark` on the body element.

### Light Theme

- **Background (#f5f7fb):** A cool, very light gray-blue that stays out of the way.
- **Cards / Header (#ffffff):** Pure white surfaces on the light background for clean separation.
- **Text (#333333):** Near-black for comfortable reading contrast.
- **Header Text (#24292e):** Slightly cooler dark tone, matching GitHub's header palette.
- **Accent (#0366d6):** GitHub-style link blue for interactive elements and hover borders.
- **Control background (#f0f2f5):** Light gray for buttons and selects — distinct from white cards.
- **Control text (#24292e):** Dark text on control surfaces.
- **Control border (rgba(0,0,0,0.12)):** Subtle dark border for definition in light mode.

### Dark Theme

- **Background (#0f1116):** Deep near-black blue-gray, GitHub dark mode inspired.
- **Cards / Header (#161b22):** Slightly lifted dark surfaces that read as "raised" above the background.
- **Text (#e6edf3):** High-contrast off-white for readability.
- **Accent (#2f81f7):** Brighter blue to maintain visibility against dark surrounds.
- **Control background (#21262d):** Dark gray for buttons and selects — distinct from card surfaces.
- **Control text (#e6edf3):** Light text on dark control surfaces.
- **Control border (rgba(255,255,255,0.15)):** Subtle light border for definition in dark mode.

### Transition

All color properties use `transition: 0.3s` on the body to smoothly animate between themes.

## Typography

The site relies entirely on the **system font stack** (`system-ui, sans-serif`), ensuring native rendering and zero latency on every platform.

- **Title (h1):** Responsive — `clamp(1rem, 4.5vw, 2em)` on mobile, fixed `2em` bold on desktop (≥600px). Adapts to viewport width to prevent overflow.
- **Card headings (h3):** Browser-default ~1.17em bold. Hierarchy comes from semantic HTML, not custom typography scales.
- **Body:** Browser default 16px, regular weight. Descriptions are one-liners, so long-form readability is not a concern.
- **Controls:** Same 16px regular weight as body — controls inherit the system font and sit naturally alongside text.
- **Footer:** 14px at 75% opacity for a subdued, secondary-information treatment.

There is no custom font loading, no variable font configuration, and no web font dependencies.

## Layout & Spacing

The layout is **mobile-first** with a single 600px breakpoint.

### Mobile (default, ≤600px)

- **Header:** Flex row (`space-between`), padded `12px` vertical × `16px` horizontal. Hamburger on the left, title centered and flexible (`flex: 1`).
- **Controls dropdown:** Hidden by default. When toggled via the hamburger, appears below the header at `left: 0` as a vertical flex column with `12px` padding, `8px` rounded bottom corners, `10px` gap between items, and a `4px 12px` shadow.
- **Grid:** Same responsive grid as desktop (scrolls naturally).

### Desktop (≥600px)

- **Header:** `justify-content: center`, padded `16px` vertical × `30px` horizontal. Hamburger hidden.
- **Controls:** Theme toggle absolutely positioned at `top: 50%; left: 20px`, language selector at `top: 50%; right: 20px`. Both vertically centered via `translateY(-50%)`.

### Shared

- **Container:** `max-width: 1100px`, centered with `margin: auto`, padded `40px` vertically and `20px` horizontally.
- **Grid:** CSS Grid with `auto-fit, minmax(250px, 1fr)` — cards flow responsively from 1 to 4+ columns.
- **Card Spacing:** 25px gap between cards.

No sidebar, no complex multi-column layouts. Everything is a single vertical stack: header → grid → footer.

## Elevation & Depth

Depth is achieved through **soft shadows and hover effects**:

- **Cards:** `box-shadow: 0 5px 15px rgba(0,0,0,0.08)` — a gentle, spread-out shadow that works in both themes.
- **Card Hover:** Cards lift `6px` (`translateY(-6px)`) and gain a **2px accent-colored ring** via `box-shadow: 0 0 0 2px var(--accent)`, combining elevation feedback with a clear focus indicator. Transition: `0.25s`.
- **Header:** `box-shadow: 0 1px 4px rgba(0,0,0,0.08)` — subtle separator, critical in light mode where header and body are both white.
- **Dropdown:** `box-shadow: 0 4px 12px rgba(0,0,0,0.15)` — stronger shadow for the floating menu.
- **Footer:** 75% opacity recedes visually, keeping focus on the card grid.

## Shapes

The shape language is **Soft Modern** — rounded corners everywhere, restrained:

- **Cards:** 12px border-radius for a friendly, approachable feel.
- **Controls (buttons, selects, hamburger):** 6px border-radius — tighter than cards to distinguish interactive chrome.
- **Dropdown menu:** 8px border-radius on the bottom corners (top corners are square, flush against the header).

No sharp corners appear anywhere in the interface.

## Components

### Control Button & Select (Standard)

This is the **canonical control style** for all apps following this design system. Every interactive control — theme toggle, hamburger, action buttons, `<select>` dropdowns — must use this exact specification.

**CSS implementation:**

```css
select, .header-controls button, .hamburger {
  -webkit-appearance: none;
  appearance: none;
  background: var(--control-bg);
  color: var(--control-text);
  border: 1px solid var(--control-border);
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-family: system-ui, sans-serif;
  font-size: 16px;
}
```

**Token mapping per theme:**

| Property | Light | Dark |
|---|---|---|
| `background` | `#f0f2f5` | `#21262d` |
| `color` | `#24292e` | `#e6edf3` |
| `border` | `rgba(0,0,0,0.12)` | `rgba(255,255,255,0.15)` |
| `border-radius` | `6px` | `6px` |
| `padding` | `6px 10px` | `6px 10px` |
| `font-size` | `16px` | `16px` |
| `font-family` | `system-ui, sans-serif` | `system-ui, sans-serif` |

**Key design rules:**
- Always include `-webkit-appearance: none; appearance: none;` on buttons — this strips browser default gradients and ensures the solid `--control-bg` color renders correctly in both themes.
- The border must use `rgba()` with alpha transparency — this ensures it works on both the header background and the dropdown background without needing separate variants.
- Padding is `6px` vertical × `10px` horizontal. This produces a compact control (~32px tall including border) that fits neatly in a slim header bar.
- The background is a solid color (not transparent) — controls must be visually distinct from the surface they sit on.
- No hover or focus style changes — the button is deliberately static. The cursor change to `pointer` is the only interaction feedback.
- `<select>` elements use the identical style as `<button>` elements. They must look and feel like the same family of controls.

### Theme Toggle

A `<button>` using the standard control style, with the `🌓` emoji as its sole content. No text label — the emoji is universally understood.

**HTML:**
```html
<button onclick="toggleTheme()">🌓</button>
```

**JavaScript:** Toggles the `.dark` class on `<body>` and persists the preference in `localStorage` under the key `"theme"` (values: `"dark"` or `"light"`).

### Language Selector

A `<select>` using the standard control style. Contains `<option>` elements for each supported language, identified by two-letter codes (`es`, `en`, `gl`).

**HTML:**
```html
<select onchange="changeLang(this.value)" id="langSelect">
  <option value="es">Español</option>
  <option value="en">English</option>
  <option value="gl">Galego</option>
</select>
```

**Behavior:** On change, updates all elements with `data-i18n` attributes by looking up the translation key in a JavaScript object. Persists the selected language in `localStorage` under the key `"lang"`. On page load (`init()`), restores the saved language and sets the `<select>` value to match.

**Important:** The `<select>` must have `id="langSelect"` so `init()` can programmatically set its value after restoring from `localStorage`.

### Hamburger Button

A `<button>` using the standard control style, with two overrides: `font-size: 1.3em` and `line-height: 1` so the `☰` icon renders at a visually balanced size without extra vertical space.

**HTML:**
```html
<button class="hamburger" onclick="toggleMenu()" aria-label="Menú">☰</button>
```

**CSS overrides:**
```css
.hamburger {
  display: flex;
  font-size: 1.3em;
  line-height: 1;
}
```

**Visibility:** Visible by default (mobile-first). Hidden on desktop via `@media (min-width: 600px) { .hamburger { display: none; } }`.

### Hamburger Menu Dropdown

A `<nav class="header-controls">` container that holds all header controls when collapsed behind the hamburger. Hidden by default (`display: none`), shown when the `.open` class is added (`display: flex`).

**CSS specification:**

```css
.header-controls {
  display: none;
  position: absolute;
  top: 100%;                        /* flush below the header */
  left: 0;                          /* aligned with the hamburger */
  background: var(--header);        /* matches the header surface */
  padding: 12px;
  border-radius: 0 0 8px 8px;      /* rounded only at the bottom */
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  flex-direction: column;           /* controls stack vertically */
  gap: 10px;                        /* spacing between controls */
  z-index: 100;
  min-width: 160px;                 /* prevents squishing */
}

.header-controls.open {
  display: flex;
}
```

**Inside the dropdown**, controls appear in this exact order, stacked vertically:
1. **Section navigation links** (if the page has them) — `<a>` links to page sections, styled as clickable rows
2. **Theme toggle (🌓)** — a standard control button
3. **Language selector** — a standard control `<select>`

**Section nav link styling inside the dropdown:**
```css
.nav-links {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nav-links a {
  display: block;
  padding: 8px 10px;
  color: var(--text);
  text-decoration: none;
  font-size: 15px;
  font-family: system-ui, sans-serif;
  border-radius: 6px;
  transition: background 0.15s;
}
.nav-links a:hover {
  background: var(--control-bg);
}
```

Both controls use their standard styles unchanged. The dropdown's `background: var(--header)` ensures the controls sit on the correct surface. Since control borders use `rgba()` with alpha, they adapt automatically to both light and dark header backgrounds without any per-theme overrides on the dropdown itself.

**Desktop behavior:** At ≥600px:
- The `.header-controls` container switches to `display: block; position: static; background: none; box-shadow: none;` — it becomes an invisible wrapper.
- The theme toggle and language selector are absolutely positioned at the header edges via `.theme-btn` and `.lang-sel` classes.
- The `.nav-links` inside `.header-controls` are hidden (`display: none`) — section links appear in the separate `#mainNav` horizontal bar instead.
- The `#mainNav` is a sticky horizontal bar with scrollable `<a>` links, visible only on desktop (`@media (max-width: 600px) { #mainNav { display: none; } }`).

**JavaScript behavior:**
- `toggleMenu()` toggles the `.open` class on `.header-controls`.
- A global `click` listener on `document` closes the dropdown when clicking anywhere outside it (checks that the click target is not inside `.header-controls` and is not the hamburger button itself).

**Complete HTML structure for the header:**

```html
<header>
  <button class="hamburger" onclick="toggleMenu()" aria-label="Menú">☰</button>
  <h1 data-i18n="title"></h1>
  <nav class="header-controls" id="headerControls">
    <div class="nav-links">
      <a href="#intro" data-i18n="nav.intro">Intro</a>
      <a href="#section2" data-i18n="nav.section2">Section 2</a>
      <!-- ... additional section links as needed ... -->
    </div>
    <button class="theme-btn" onclick="toggleTheme()">🌓</button>
    <select class="lang-sel" onchange="changeLang(this.value)" id="langSelect">
      <option value="es">Español</option>
      <option value="en">English</option>
      <option value="gl">Galego</option>
    </select>
  </nav>
</header>

<!-- Separate horizontal nav bar — visible only on desktop (≥600px) -->
<nav id="mainNav">
  <a href="#intro" data-i18n="nav.intro">Intro</a>
  <a href="#section2" data-i18n="nav.section2">Section 2</a>
  <!-- ... same links as in .nav-links above ... -->
</nav>
```

Note: The section links are duplicated in both `.nav-links` (mobile dropdown) and `#mainNav` (desktop bar). The `#mainNav` is hidden on mobile via `@media (max-width: 600px) { #mainNav { display: none; } }`. The `.nav-links` are hidden on desktop via `.header-controls .nav-links { display: none; }` inside the desktop media query.

### Cards

Each project card is a clickable rectangle (full area navigation via `onclick`). Cards contain a title and a one-line description.

- **Default:** White/dark background, 12px rounded, subtle shadow, `cursor: pointer`.
- **Hover (clickable cards only):** 6px upward lift + 2px accent-colored ring (using `box-shadow` so it respects `border-radius` without layout shift). Transition: `0.25s`.
- **Non-clickable content cards:** Same visual style as cards, but without `cursor: pointer` and without the hover animation. Content cards are static containers — they do not lift or gain a ring on hover.

### Info Cards (highlight blocks)

Used for key-value fact displays. Each info card has a colored title (`h4`) instead of a colored side border:

```css
.info-card h4       { color: var(--accent); }   /* blue — default */
.info-card.green h4  { color: var(--accent2); }  /* green */
.info-card.purple h4 { color: var(--purple); }    /* purple */
.info-card.warn h4   { color: var(--warn); }      /* orange */
.info-card.yellow h4 { color: var(--yellow); }    /* yellow */
```

No `border-left` on any info card. The color communicates meaning through the title text, not a decorative border.

### No Icons in Section Headings

Section headings (`h2`) do not use emoji or icon decorations. The hierarchy comes from typography alone.

### Footer

Centered, subdued text at 75% opacity containing a copyright line and a Creative Commons license link. The link uses the accent color.

## Do's and Don'ts

- Do use `data-i18n` attributes for all user-facing text — never hardcode Spanish/English/Galego strings in HTML
- Do persist theme and language preferences in `localStorage` across sessions
- Do keep all CSS and JS in a single static HTML file — no external resources
- Do use CSS custom properties (`--bg`, `--text`, etc.) for theme switching, not hardcoded colors
- Do use `box-shadow` for hover borders on rounded elements — avoids layout shift and respects `border-radius`
- Do follow mobile-first CSS: base styles for narrow screens, `@media (min-width: 600px)` for desktop overrides
- Do close the hamburger dropdown on outside click for good UX
- Do use `rgba()` with alpha for control borders — it adapts to any background without per-theme overrides
- Do include `appearance: none` on all control buttons to strip browser default styling
- Do place section nav links FIRST in the hamburger dropdown, then theme toggle, then language selector
- Do include section navigation links inside the hamburger dropdown on mobile — duplicate them from the desktop `#mainNav` bar
- Do hide the `#mainNav` horizontal bar on mobile (`display: none`) and hide `.nav-links` on desktop
- Do keep `data-theme` attribute on `<html>` for theme switching (or `.dark` class on `<body>` — choose one consistently)
- Do apply hover effects (lift + ring) ONLY to clickable cards — content cards should remain static
- Do use colored title text (`h4`) instead of colored side borders for info blocks
- Do use Spanish opening question marks (`¿`) and exclamation marks (`¡`) in Spanish text
- Do use "standard array" untranslated in all languages — it is a technical term
- Don't add external font dependencies — the system font stack is intentional
- Don't add JavaScript frameworks — the page is a single static HTML file
- Don't mix light and dark mode tokens in the same component — use the CSS variable abstraction
- Don't use `border` for hover states on cards — the `box-shadow` ring approach preserves the shadow depth
- Don't add hover/focus color changes to control buttons — the cursor change is the only interaction feedback
- Don't use `border-left` colored bars on info cards or step info blocks
- Don't use emoji icons in section headings (`h2`)
