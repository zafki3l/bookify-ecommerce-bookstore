# Design System: The Curated Gallery

## 1. Overview & Creative North Star

**Creative North Star: "The Digital Archivist"**
This design system rejects the cluttered, "big-box" retail aesthetic in favor of a high-end editorial experience. It is built to feel like a quiet, sun-drenched library where foreign literature is curated, not just sold. We move beyond "standard" minimalism by utilizing **intentional asymmetry** and **tonal layering**.

Instead of rigid grids, we use breathing room as a functional element to guide the eye. The interface should feel like high-quality paper stock—tactile, premium, and sophisticated. We achieve "friendly" not through loud colors, but through soft geometry and an approachable, human-centric hierarchy.

---

## 2. Colors & Surface Architecture

The palette is rooted in botanical and academic tones—`primary` (Forest Green) and `secondary` (Deep Navy)—set against a wash of warm, organic neutrals.

### The "No-Line" Rule

**Borders are prohibited for sectioning.** To separate content, designers must use background shifts. For example, a global navigation bar should use `surface-container-low` against a `surface` background. This creates a "molded" look rather than a "constructed" one.

### Surface Hierarchy & Nesting

Depth is created by stacking our surface tokens.

- **Base Layer:** `surface` (#f7faf5) – The canvas.
- **Secondary Sectioning:** `surface-container-low` (#eff5ef) – Used for subtle grouping.
- **Interactive/Elevated Cards:** `surface-container-lowest` (#ffffff) – Used to make book covers or featured content pop.
- **The Glass Rule:** For floating navigation or modal overlays, use `surface-container-lowest` at 80% opacity with a `24px` backdrop-blur. This "Glassmorphism" ensures the UI feels integrated with the content beneath it.

### Signature Textures

Apply a subtle linear gradient to primary CTAs: `primary` (#3f6754) to `primary-dim` (#335b48). This adds "soul" and prevents the flat, digital look of standard buttons.

---

## 3. Typography: The Editorial Voice

We use **Manrope** exclusively. It is a modern sans-serif with geometric foundations and organic terminals, striking the balance between "Professional" and "Friendly."

- **Display (lg/md/sm):** Used for hero sections and literary quotes. Character spacing should be set to `-0.02em` to create a tight, high-end "masthead" feel.
- **Headline (lg/md/sm):** Used for category titles. These should feel authoritative.
- **Body (lg/md):** Optimized for readability. Use `on-surface-variant` (#58615b) for long-form descriptions to reduce eye strain and enhance the "soft" aesthetic.
- **Labels:** Always uppercase with `+0.05em` letter spacing when used for metadata (e.g., ISBN, Language, Weight) to provide a functional, "archival" contrast to the fluid headlines.

---

## 4. Elevation & Depth

We eschew traditional shadows in favor of **Tonal Layering**.

- **The Layering Principle:** To "lift" a book card, place a `surface-container-lowest` card on a `surface-container` background. The color contrast provides the elevation.
- **Ambient Shadows:** Use only for floating elements (Cart drawers, Popovers).
  - _Spec:_ `0px 20px 40px rgba(43, 53, 47, 0.06)`. This uses a tint of `on-surface` rather than pure black, ensuring the shadow feels like natural light hitting paper.
- **The "Ghost Border":** If a boundary is required for accessibility, use `outline-variant` (#aab4ad) at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components

### Buttons

- **Primary:** `primary` background, `on-primary` text. `xl` (1.5rem) corner radius.
- **Secondary:** `secondary-container` background, `on-secondary-container` text. No border.
- **Tertiary:** Text-only with a subtle underline using the `primary-fixed-dim` token.

### Cards & Lists

- **Constraint:** No dividers. Use `24px` or `32px` of vertical white space to separate list items.
- **Book Cards:** Use `surface-container-lowest` with an `lg` (1rem) corner radius. The book cover should be slightly inset to create a "framed" gallery effect.

### Input Fields

- **State:** Soft-filled. Use `surface-container-high` as the background.
- **Focus:** Transition the background to `surface-container-lowest` and apply a `1px` Ghost Border in `primary`.

### Navigation (The "Floating" Bar)

Instead of a full-width header, use a centered, floating navigation pill with a `9999px` radius, utilizing the Glassmorphism rule. This emphasizes the "Modern & Minimalist" objective.

---

## 6. Do's and Don'ts

### Do:

- **Embrace Asymmetry:** Align a headline to the left and the body text to a narrower column on the right. This "Editorial Offset" feels high-end and custom.
- **Use Generous Leading:** Ensure body text has a line height of at least 1.6 to maintain the "friendly" and readable feel.
- **Tone-on-Tone:** Use `on-surface-variant` text on `surface-container` backgrounds for secondary information.

### Don't:

- **No Pure Black:** Never use #000000. Use `on-surface` (#2b352f) for all "black" text to keep the palette organic.
- **No Sharp Corners:** Every interactive element must use at least the `DEFAULT` (0.5rem) roundedness.
- **No Grid-Lock:** Avoid filling every pixel. If a section only has two books, don't stretch them to fill the screen; let them sit naturally with "white space" as their frame.

## 7. AI IMPLEMENTATION RULES (STRICT)

- This is a Next.js App Router project
- Uses Nginx as reverse proxy
- Backend: NestJS
- API prefix: /api
- NEVER use `border` for layout separation
- ALWAYS use background tokens for sectioning
- ALL components must use rounded corners >= 8px
- DO NOT use pure black (#000000)
- USE spacing: 8px, 12px, 16px, 24px, 32px only
- PRIMARY color must be #3f6754 or gradient variant
- Cards MUST use `surface-container-lowest`
- Avoid symmetric layouts unless explicitly required
- ALL icons MUST be imported from "lucide-react"
