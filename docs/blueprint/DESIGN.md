# Design System Specification: High-Density Enterprise Intelligence

## 1. Overview & Creative North Star

**Creative North Star: The Monolithic Observatory**

This design system moves beyond the "SaaS Template" by embracing a high-contrast, data-dense editorial style. It blends the structural rigidity of a command center with the ethereal lightness of high-end glassmorphism. By utilizing a "Flat-First, Glass-on-Layers" philosophy, we create a clear psychological distinction between **Static Data** (the foundation) and **AI Intelligence** (the floating observer).

The system ships with **two themes**:

- **Light Mode** — the default theme. White-based, corporate, clean. Feels like a premium financial report.
- **Dark Mode** — optional, user-toggled. Obsidian-based, high-contrast, command-center feel.

Both themes share the same **Chromatic Neutral** philosophy: every surface has a faint blue-violet undertone baked into the tone itself. The result reads as black-and-white at a glance, but breathes with cool temperature up close. Neither theme ever uses a pure neutral gray (`#111111`, `#f5f5f5`, etc.) — always use the specified tokens.

---

## 2. Theme Implementation

### Theming Strategy

Themes are implemented via **CSS custom properties** on the `:root` (light, default) and a `[data-theme="dark"]` attribute on the `<html>` element. Tailwind CSS dark mode is configured with `darkMode: ['attribute', '[data-theme="dark"]']` in `tailwind.config.ts`.

All color tokens in components must reference CSS variables — never hard-code hex values in component files.

```css
/* globals.css */
:root {
  /* Light mode tokens — DEFAULT */
  --surface-void: #f4f4f8;
  --surface-base: #eeedf5;
  --surface-container: #ffffff;
  --surface-container-high: #f0eff7;
  --surface-hover: #e8e7f2;
  --surface-active: #dfdeed;
  --surface-glass: rgba(255, 255, 255, 0.82);
  --surface-glass-light: rgba(248, 247, 253, 0.88);

  --border-subtle: rgba(0, 0, 0, 0.06);
  --border-default: rgba(0, 0, 0, 0.1);
  --border-emphasis: rgba(0, 0, 0, 0.16);
  --border-ai: rgba(120, 100, 190, 0.3);
  --scrim: rgba(10, 10, 20, 0.5);

  --text-primary: #0d0e1a;
  --text-secondary: #4a4b65;
  --text-muted: #8e8fa8;
  --text-ghost: #c2c3d4;

  --accent-cool: #4a72c4;
  --accent-violet: #7c6bb8;
  --accent-cool-muted: rgba(74, 114, 196, 0.08);
  --accent-violet-muted: rgba(124, 107, 184, 0.08);
  --accent-gradient: linear-gradient(135deg, #4a72c4, #7c6bb8);

  --status-success: #16a34a;
  --status-success-bg: rgba(22, 163, 74, 0.08);
  --status-warning: #d97706;
  --status-warning-bg: rgba(217, 119, 6, 0.08);
  --status-error: #dc2626;
  --status-error-bg: rgba(220, 38, 38, 0.08);
  --status-info: #4a72c4;
  --status-info-bg: rgba(74, 114, 196, 0.08);
}

[data-theme='dark'] {
  /* Dark mode tokens — OPTIONAL */
  --surface-void: #08090f;
  --surface-base: #0d0e18;
  --surface-container: #11121e;
  --surface-container-high: #181927;
  --surface-hover: #1e1f30;
  --surface-active: #23253a;
  --surface-glass: rgba(13, 14, 22, 0.9);
  --surface-glass-light: rgba(20, 20, 34, 0.85);

  --border-subtle: rgba(255, 255, 255, 0.07);
  --border-default: rgba(255, 255, 255, 0.11);
  --border-emphasis: rgba(255, 255, 255, 0.18);
  --border-ai: rgba(139, 120, 210, 0.35);
  --scrim: rgba(0, 0, 0, 0.7);

  --text-primary: #eeedf5;
  --text-secondary: #8e8fa8;
  --text-muted: #4e4f68;
  --text-ghost: #2e2f45;

  --accent-cool: #8ba4d4;
  --accent-violet: #9b8ec4;
  --accent-cool-muted: rgba(139, 164, 212, 0.1);
  --accent-violet-muted: rgba(155, 142, 196, 0.1);
  --accent-gradient: linear-gradient(135deg, #8ba4d4, #9b8ec4);

  --status-success: #22c55e;
  --status-success-bg: rgba(34, 197, 94, 0.1);
  --status-warning: #f59e0b;
  --status-warning-bg: rgba(245, 158, 11, 0.1);
  --status-error: #ef4444;
  --status-error-bg: rgba(239, 68, 68, 0.1);
  --status-info: #8ba4d4;
  --status-info-bg: rgba(139, 164, 212, 0.1);
}
```

### Tailwind Config

```ts
// tailwind.config.ts
export default {
  darkMode: ['attribute', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        surface: {
          void: 'var(--surface-void)',
          base: 'var(--surface-base)',
          container: 'var(--surface-container)',
          high: 'var(--surface-container-high)',
          hover: 'var(--surface-hover)',
          active: 'var(--surface-active)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          default: 'var(--border-default)',
          emphasis: 'var(--border-emphasis)',
          ai: 'var(--border-ai)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          ghost: 'var(--text-ghost)',
        },
        accent: {
          cool: 'var(--accent-cool)',
          violet: 'var(--accent-violet)',
        },
        status: {
          success: 'var(--status-success)',
          warning: 'var(--status-warning)',
          error: 'var(--status-error)',
          info: 'var(--status-info)',
        },
      },
    },
  },
}
```

### Theme Toggle Component

The theme toggle lives in the topbar. It sets `data-theme="dark"` on `<html>` and persists the preference in `localStorage`.

```tsx
// apps/web/src/components/ThemeToggle.tsx
const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark')
    } else {
      root.removeAttribute('data-theme')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}>
      {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  )
}
```

---

## 3. Color Systems by Theme

### 3.1 Light Mode (Default)

**Philosophy:** Premium corporate paper. Think a Bloomberg terminal printed on white — cold, precise, and high-trust. The background is not pure white; it has a faint blue-violet tint that makes whites feel intentional, not blank.

```
Temperature direction (Light): Blue-white (void/bg) → Violet-white (active/hover)
```

#### Light Surface Tokens

| Token                    | Hex       | RGB             | Role                                        |
| :----------------------- | :-------- | :-------------- | :------------------------------------------ |
| `surface-void`           | `#F4F4F8` | `244, 244, 248` | Page background — white with blue tint      |
| `surface-base`           | `#EEEDF5` | `238, 237, 245` | Sidebar, topbar — violet-white              |
| `surface-container`      | `#FFFFFF` | `255, 255, 255` | Cards — pure white for maximum contrast     |
| `surface-container-high` | `#F0EFF7` | `240, 239, 247` | Input wells, inner sections — violet tinted |
| `surface-hover`          | `#E8E7F2` | `232, 231, 242` | Row/item hover                              |
| `surface-active`         | `#DFDEED` | `223, 222, 237` | Selected/active state                       |

> **Why cards are pure `#FFFFFF`:** On the tinted `#F4F4F8` background, pure white cards create the classic "paper on desk" depth without any shadow. The contrast ratio is subtle but structurally clear.

#### Light Text Tokens

| Token            | Hex       | Usage                                             |
| :--------------- | :-------- | :------------------------------------------------ |
| `text-primary`   | `#0D0E1A` | Headings, values — near-black with blue-void tint |
| `text-secondary` | `#4A4B65` | Body, descriptions — blue-gray mid-tone           |
| `text-muted`     | `#8E8FA8` | Metadata, placeholders                            |
| `text-ghost`     | `#C2C3D4` | Disabled, decorative                              |

#### Light Accent Tokens

In light mode, accents are **deeper and more saturated** than dark mode to maintain contrast on white surfaces.

| Token                 | Hex                         | Role                                        |
| :-------------------- | :-------------------------- | :------------------------------------------ |
| `accent-cool`         | `#4A72C4`                   | Primary interactive — medium corporate blue |
| `accent-violet`       | `#7C6BB8`                   | AI identity — medium corporate violet       |
| `accent-cool-muted`   | `rgba(74, 114, 196, 0.08)`  | Active state tint                           |
| `accent-violet-muted` | `rgba(124, 107, 184, 0.08)` | AI surface tint                             |
| `accent-gradient`     | `135deg, #4A72C4 → #7C6BB8` | CTA buttons, AI badges                      |

#### Light Glass Tokens (Modals, Dropdowns, Tooltips)

| Property        | Value                                |
| :-------------- | :----------------------------------- |
| Background      | `rgba(255, 255, 255, 0.82)`          |
| Backdrop filter | `blur(28px) saturate(180%)`          |
| Border          | `1px solid rgba(0, 0, 0, 0.08)`      |
| Box shadow      | `0 20px 50px rgba(10, 10, 30, 0.12)` |

> Light glass is white-frosted — like looking through fogged white glass, not dark smoked glass. The `saturate(180%)` makes the slight color behind the modal more vivid, reinforcing depth.

---

### 3.2 Dark Mode (Optional)

**Philosophy:** Obsidian command center. Every surface is near-black with blue-violet cold undertones. Data glows against the void.

```
Temperature direction (Dark): Blue-black (void/bg) → Violet-dark (active/hover)
```

#### Dark Surface Tokens

| Token                    | Hex       | RGB          | Role                                    |
| :----------------------- | :-------- | :----------- | :-------------------------------------- |
| `surface-void`           | `#08090F` | `8, 9, 15`   | Page background — near-black, blue-cold |
| `surface-base`           | `#0D0E18` | `13, 14, 24` | Sidebar, topbar                         |
| `surface-container`      | `#11121E` | `17, 18, 30` | Cards, panels                           |
| `surface-container-high` | `#181927` | `24, 25, 39` | Input wells, inner sections             |
| `surface-hover`          | `#1E1F30` | `30, 31, 48` | Row/item hover                          |
| `surface-active`         | `#23253A` | `35, 37, 58` | Active/selected state                   |

#### Dark Text Tokens

| Token            | Hex       | Usage                                      |
| :--------------- | :-------- | :----------------------------------------- |
| `text-primary`   | `#EEEDF5` | Headings, values — white with faint violet |
| `text-secondary` | `#8E8FA8` | Body text — blue-gray                      |
| `text-muted`     | `#4E4F68` | Timestamps, placeholders                   |
| `text-ghost`     | `#2E2F45` | Disabled, decorative                       |

#### Dark Accent Tokens

Accents in dark mode are **lighter and more desaturated** than light mode — they need to glow softly, not punch.

| Token                 | Hex                         | Role                                              |
| :-------------------- | :-------------------------- | :------------------------------------------------ |
| `accent-cool`         | `#8BA4D4`                   | Primary interactive — desaturated cornflower blue |
| `accent-violet`       | `#9B8EC4`                   | AI identity — muted periwinkle-violet             |
| `accent-cool-muted`   | `rgba(139, 164, 212, 0.10)` | Active state tint                                 |
| `accent-violet-muted` | `rgba(155, 142, 196, 0.10)` | AI surface tint                                   |
| `accent-gradient`     | `135deg, #8BA4D4 → #9B8EC4` | CTA buttons, AI badges                            |

#### Dark Glass Tokens

| Property        | Value                                 |
| :-------------- | :------------------------------------ |
| Background      | `rgba(13, 14, 22, 0.90)`              |
| Backdrop filter | `blur(28px) saturate(160%)`           |
| Border          | `1px solid rgba(255, 255, 255, 0.11)` |
| Box shadow      | `0 20px 50px rgba(0, 0, 0, 0.50)`     |

---

### 3.3 Semantic Status Colors (Both Themes)

Status colors shift slightly between themes to maintain accessibility contrast ratios (WCAG AA minimum).

| Status      | Light Hex | Light BG                | Dark Hex  | Dark BG                  |
| :---------- | :-------- | :---------------------- | :-------- | :----------------------- |
| **Success** | `#16A34A` | `rgba(22,163,74,0.08)`  | `#22C55E` | `rgba(34,197,94,0.10)`   |
| **Warning** | `#D97706` | `rgba(217,119,6,0.08)`  | `#F59E0B` | `rgba(245,158,11,0.10)`  |
| **Error**   | `#DC2626` | `rgba(220,38,38,0.08)`  | `#EF4444` | `rgba(239,68,68,0.10)`   |
| **Info**    | `#4A72C4` | `rgba(74,114,196,0.08)` | `#8BA4D4` | `rgba(139,164,212,0.10)` |

> Status colors in light mode are **one step darker** (600-level) than dark mode (400-level) to maintain legibility on white surfaces. Always use the CSS variable — never hard-code a status hex.

---

## 4. Typography: The Editorial Hierarchy

**Inter** exclusively. Apply `font-variant-numeric: tabular-nums` to all numeric values.

| Level           | Size        | Weight    | Tracking  | Usage                              |
| :-------------- | :---------- | :-------- | :-------- | :--------------------------------- |
| **Display-LG**  | `3.5rem`    | `600`     | `-0.02em` | Hero KPIs, revenue totals          |
| **Headline-SM** | `1.5rem`    | `500`     | `-0.01em` | Module headers                     |
| **Title-SM**    | `1.0rem`    | `600`     | `0`       | Card titles, nav labels            |
| **Body-MD**     | `0.875rem`  | `400`     | `0`       | Descriptions, data content         |
| **Label-SM**    | `0.6875rem` | `700`     | `+0.05em` | Table headers (ALL CAPS), metadata |
| **Numeric**     | inherited   | inherited | `0`       | All numbers — `tabular-nums`       |

---

## 5. Elevation & Depth: Tonal Layering

Both themes use the same 4-layer elevation model. The surface tokens change per theme; the layering logic does not.

| Layer     | Token                    | Light                           | Dark                         | Role                |
| :-------- | :----------------------- | :------------------------------ | :--------------------------- | :------------------ |
| 0 — Void  | `surface-void`           | `#F4F4F8`                       | `#08090F`                    | Page floor          |
| 1 — Desk  | `surface-container`      | `#FFFFFF`                       | `#11121E`                    | Cards, panels       |
| 2 — Paper | `surface-container-high` | `#F0EFF7`                       | `#181927`                    | Inputs, inner wells |
| 3 — Float | `surface-glass`          | `rgba(255,255,255,0.82)` + blur | `rgba(13,14,22,0.90)` + blur | Modals, popovers    |

---

## 6. Signature Components

### Buttons

| Variant       | Background               | Text             | Border                               | Hover                                   |
| :------------ | :----------------------- | :--------------- | :----------------------------------- | :-------------------------------------- |
| **Primary**   | `accent-gradient`        | `#FFFFFF`        | none                                 | `brightness(1.08)`, `scale(1.01)`       |
| **Secondary** | `surface-container-high` | `text-primary`   | `border-default`                     | `surface-hover`                         |
| **Ghost**     | transparent              | `text-secondary` | none                                 | `surface-active`, text → `text-primary` |
| **AI Action** | `accent-violet-muted`    | `accent-violet`  | `1px solid border-ai`                | deeper violet tint                      |
| **Danger**    | `status-error-bg`        | `status-error`   | `1px solid rgba(status-error, 0.30)` | deeper red tint                         |

Border radius: `6px` standard · `9999px` for primary pill CTA only.

### Status Badges / Pills

```
bg:            var(--status-{x}-bg)
color:         var(--status-{x})
border-radius: 9999px
padding:       2px 8px
font:          Label-SM (no caps for badges)
```

### Data Inputs

```
background:    var(--surface-container-high)
border:        1px solid var(--border-subtle)
border-radius: 6px

:focus
  border:      1px solid var(--accent-cool)
  box-shadow:  0 0 0 3px var(--accent-cool-muted)

:invalid / .error
  border:      1px solid var(--status-error)
  background:  var(--status-error-bg)
```

### Intelligence Cards (AI Insights)

```
background:    var(--surface-container)
border-left:   3px solid var(--border-ai)
background:    + rgba(accent-violet, 0.04) overlay
padding:       20px 18px 20px 22px  (asymmetric — extra left)
```

AI badge (top-right): `Sparkles` icon 14px + label pill using `accent-violet-muted` bg and `accent-violet` text.

### Data Tables

```
thead:         surface-container-high bg, Label-SM ALL CAPS, text-muted
tbody rows:    surface-container base
               alternate: surface-void (barely perceptible)
hover row:     surface-hover
row height:    40px standard · 32px compact
numeric cols:  right-aligned, tabular-nums
no horizontal dividers between rows
```

---

## 7. Chart Style Guide (Recharts)

All charts live inside flat `surface-container` cards. Tooltip is the only glass element in charts.

| Property         | Value                                                                           |
| :--------------- | :------------------------------------------------------------------------------ |
| Axis stroke      | `var(--surface-hover)`                                                          |
| Grid lines       | `var(--surface-container-high)`, horizontal only                                |
| Tooltip          | Glass — `surface-glass` bg, `border-default` border, `blur(20px)`, `8px` radius |
| Line width       | `2px`, no dots (hover only: `r=3`)                                              |
| Area fill        | Line color → transparent, `0.08` opacity at top                                 |
| Bar radius       | `4px` top corners only                                                          |
| Positive         | `var(--status-success)`                                                         |
| Negative         | `var(--status-error)`                                                           |
| Neutral / actual | `var(--accent-cool)`                                                            |
| Forecast / AI    | `var(--accent-violet)`, dashed                                                  |

---

## 8. Do's and Don'ts

### Do

- **Do** use `var(--token-name)` for every color value in every component — never hard-code a hex.
- **Do** treat `surface-container` (white in light, `#11121E` in dark) as your primary card surface.
- **Do** use `tabular-nums` on all numeric output, everywhere, always.
- **Do** use semantic status colors aggressively — they are the only saturated colors and must be unmissable.
- **Do** keep `accent-cool` and `accent-violet` as accent colors only — not fills on large surfaces.
- **Do** use `Label-SM` in ALL CAPS for table headers and section metadata.

### Don't

- **Don't** hard-code hex values in component files. Use the CSS variable tokens.
- **Don't** use pure neutral grays (`#111111`, `#f5f5f5`, `#e5e5e5`) — always use the chromatic tokens.
- **Don't** add new hues. The only colors are: chromatic neutrals, `accent-cool`, `accent-violet`, and three status colors.
- **Don't** apply `backdrop-filter` to non-floating surfaces (cards, sidebar, topbar).
- **Don't** stack more than two glass layers — blur compounding degrades legibility and performance.
- **Don't** use color to group sections — use spacing and the surface layering system.

---

## 9. Spacing & Grid Logic

Built on an **8px base grid**. Identical across both themes.

| Context                   | Value                            | Notes                     |
| :------------------------ | :------------------------------- | :------------------------ |
| Page outer margin         | `28px`                           | Horizontal and vertical   |
| Card internal padding     | `20px`                           | Standard                  |
| Card-to-card gap          | `16px`                           | Grid gap                  |
| Major section gap         | `32px`                           | Between named sections    |
| Topbar height             | `56px`                           | Fixed                     |
| Sidebar width (expanded)  | `220px`                          | —                         |
| Sidebar width (collapsed) | `52px`                           | Icon-only mode            |
| Icon-to-label gap         | `8px`                            | Inline, in nav and badges |
| Table row height          | `40px` standard · `32px` compact | —                         |

All measurements must be divisible by `4px` minimum, `8px` preferred.
