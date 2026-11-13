---
name: Obsidian Syndicate
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c6c6cf'
  on-secondary: '#2f3037'
  secondary-container: '#45464e'
  on-secondary-container: '#b4b4bd'
  tertiary: '#ffffff'
  on-tertiary: '#303033'
  tertiary-container: '#e4e1e5'
  on-tertiary-container: '#656467'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e2e1eb'
  secondary-fixed-dim: '#c6c6cf'
  on-secondary-fixed: '#1a1b22'
  on-secondary-fixed-variant: '#45464e'
  tertiary-fixed: '#e4e1e5'
  tertiary-fixed-dim: '#c8c6c9'
  on-tertiary-fixed: '#1b1b1e'
  on-tertiary-fixed-variant: '#47464a'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 4rem
    fontWeight: '700'
    lineHeight: 4.25rem
    letterSpacing: -0.04em
  display-mobile:
    fontFamily: Space Grotesk
    fontSize: 2.5rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 2.5rem
    fontWeight: '600'
    lineHeight: 2.75rem
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.125rem
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 1.25rem
    fontWeight: '500'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: 0em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.06em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: 0.875rem
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies the ambitious, disciplined, and visionary spirit of collegiate founders and venture builders. Melding high-stakes venture capital elegance with vanguard engineering precision, the aesthetic leverages a dark-mode-dominant monochrome architecture. It fuses architectural neo-brutalism—defined by deliberate hairline structures, strict tabular grids, and monospaced data anchors—with ethereal glassmorphism and ambient silver luminescences.

The emotional signature is unyielding confidence, institutional prestige, and relentless speed. It avoids loud decorative color gimmicks; instead, tension and energy emerge entirely through stark optical contrast, generous spatial intervals, sharp editorial hierarchy, and tactile edge highlights. Surfaces feel milled, machined, and frosted—evoking bespoke obsidian hardware and midnight syndicate chambers.

## Colors

The palette operates on a strict light-emission model built on a black-to-white chromatic axis.

- **Obsidian Ground (`#0A0A0A`):** The absolute foundation. Absorbs visual clutter and establishes structural depth.
- **Carbon Void (`#121212`):** Primary elevated surface tier for cards, terminal panels, and docked toolbars.
- **Zinc Structural (`#27272A`):** Hairline borders, separators, and inactive container outlines. Muted to maintain architectural discipline.
- **Slate Secondary (`#71717A`):** Mid-tier tertiary data, inactive states, and unselected navigational items.
- **Platinum Secondary (`#A1A1AA`):** High-readability body copy, secondary metadata, and supportive narrative.
- **Pure White Primary (`#FFFFFF`):** High-impact optical focus. Reserved for headlines, interactive triggers, and key performance figures.

Avoid chromatic hue contamination; status feedback (success, alert) must be rendered through symbolic iconography, tonal shifts, or discreet silver micro-accents rather than saturated rainbow tones.

## Typography

Typography establishes an editorial dynamic between the forward-looking technological character of **Space Grotesk**, the hyper-clean functional clarity of **Geist**, and the institutional tabular rigors of **JetBrains Mono**.

- **Space Grotesk:** Reserved for titles, section anchors, and dramatic numerical callouts. Always styled tight and track-reduced to create a punchy, mechanical presence.
- **Geist:** Empowers long-form reading, executive summaries, and pitch decks with modern proportions and high legibility.
- **JetBrains Mono:** Applied to all metadata tags, stage labels (e.g., `SERIES_SEED`, `INCUBATION_PHASE_01`), timestamps, key metric indices, and UI button labels to emphasize operational execution. All mono labels are presented in full capital letters with extended tracking.

## Layout & Spacing

The structural layout relies on an unapologetic 12-column architectural grid with visible hairline alignment corridors. Content zones follow strict 8px-based baseline intervals (`0.5rem`, `1rem`, `1.5rem`, `2.5rem`).

- **Grid Systems:**
  - **Desktop (>= 1280px):** 12-column dynamic grid, 48px outer margins, 24px column gutters. Maximum application container is pegged at 1440px to retain editorial tension.
  - **Tablet (768px - 1279px):** 8-column grid, 32px outer margins, 20px column gutters.
  - **Mobile (< 768px):** 4-column grid, 20px outer margins, 16px column gutters. Elements reflow linearly with vertical edge-to-edge docking options.

Visual divisions are prioritized through structural whitespace intervals rather than arbitrary dividing shapes. Hairline borders (`1px solid #27272A`) run vertically and horizontally across major modules to echo blueprints and executive dashboards.

## Elevation & Depth

Depth is established through translucent physical glass sheeting, surface darkness gradations, and white optical refraction rather than diffuse soft shadows.

- **Level 0 (Canvas Base):** Solid `#0A0A0A`. Non-interactive baseline surface.
- **Level 1 (Card & Module Layer):** `#121212` with a 1px solid border in `#27272A`. Zero drop shadow. Pure geometric distinction.
- **Level 2 (Floating Cockpit & Nav Glass):** High-density backdrop blur (`backdrop-filter: blur(20px)`), filled with `rgba(18, 18, 18, 0.75)` and outlined with an ultra-thin specular top stroke: `border-top: 1px solid rgba(255, 255, 255, 0.2)` and `border-inline/bottom: 1px solid rgba(255, 255, 255, 0.08)`.
- **Level 3 (Modal Shells & High Priority Triggers):** `#18181B` elevated with an intense monochrome highlight halo: `box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.25), 0 20px 40px -15px rgba(0, 0, 0, 0.9)`.
- **Specular Hover State:** Interactive tiles gain a faint radial glow tracking the cursor, achieved via an interior `box-shadow: inset 0 0 16px rgba(255, 255, 255, 0.04)` and edge brighten to `#71717A`.

## Shapes

The design system employs a **Soft** (4px base) geometric silhouette. This restrained corner radius avoids soft, playful consumer aesthetics while eliminating the extreme hostility of completely raw right angles. It feels precision-machined, like an aerospace instrument.

- **Standard Containers, Cards, Inputs, and Badges:** `0.25rem` (4px).
- **Modals, Floating Panels, and Key Feature Cards (`rounded-lg`):** `0.5rem` (8px).
- **Hero Containers (`rounded-xl`):** `0.75rem` (12px).
- **Full Circular Radii:** Prohibited for action containers, buttons, and form elements. Permitted strictly for user avatars, live presence pulses, and standalone circular iconography.

## Components

### Buttons & Triggers
- **Primary:** Pure `#FFFFFF` background with solid `#0A0A0A` text, `font-family: JetBrains Mono`, uppercase, tracking `0.06em`, radius `0.25rem`. Hover triggers an incandescent white flare: `box-shadow: 0 0 20px rgba(255, 255, 255, 0.4)`.
- **Secondary / Outline:** Background `transparent`, border `1px solid #27272A`, text `#FFFFFF`. Hover shifts border to `#FFFFFF` and surface to `rgba(255, 255, 255, 0.04)`.
- **Ghost / Minimal:** Background `transparent`, text `#A1A1AA`. Hover text transitions directly to `#FFFFFF` with an active bottom hairline bar.

### Chips & Badges
- Constructed with monospaced typography (`label-sm`).
- Border `1px solid #27272A`, surface `rgba(255, 255, 255, 0.03)`. Padding `0.25rem 0.5rem`.
- Live status indicators utilize a subtle `0.375rem` circular node emitting a soft glow via `box-shadow: 0 0 6px #FFFFFF`.

### Inputs & Select Fields
- Base background `#0E0E10`, border `1px solid #27272A`, radius `0.25rem`. Typography `body-md` in `#FFFFFF`. Placeholder text `#71717A`.
- Active focus state: border shifts immediately to `#FFFFFF` with no outer chromatic glow, maintaining clean geometric lines.

### Cards & Incubator Dossiers
- Constructed from `#121212` backgrounds framed with `#27272A` hairline borders.
- Top card headers feature a distinct metadata strip displaying category, date, or cohort ID using `label-sm` in `#71717A`.
- Optional corner brackets: 6px corner marks layered at card perimeters reinforcing the technical neo-brutalist collegiate tone.

### Lists & Activity Feeds
- Row-separated lists anchored by `border-bottom: 1px solid #1C1C1F`.
- Hovering a feed entry transitions background to `rgba(255, 255, 255, 0.02)` and shifts text indentation `+4px` horizontally.
- Key figures and metrics within rows are rendered in `JetBrains Mono` and vertically aligned across a tabular layout.