# Carezone Nursing Solutions — Website Redesign Prompt

> **Goal:** Rebuild [carezonenursing.com.au](https://carezonenursing.com.au) as a React single-page app, styled to match the bold editorial aesthetic of [banhmiworld.ca](https://banhmiworld.ca), with all animations powered by **Framer Motion**.

---

## Design Direction

Match the visual language of Banh Mi World:

- Soft light backgrounds (`#f4f9f8`, `#ffffff`) with deep teal typography
- Oversized, stacked, multi-line display headings (e.g. `CARE / at / HOME`)
- Mixed font weights — ultra-heavy display + light elegant body
- Warm **teal accent** (`#2db89e`) used on CTAs, highlights, and card borders
- Horizontal **marquee ticker** scrolling text banners on a mint background
- Organic SVG decorative shapes (leaf/care motifs, abstract blobs)
- Service cards with hover lift + teal glow border animations
- Clean white card backgrounds with soft shadow depth
- Airy, trustworthy feel — light, breathable, and calm

---

## Font Choices

| Role    | Font              | Source       |
|---------|-------------------|--------------|
| Display | `Bebas Neue`      | Google Fonts |
| Body    | `DM Sans`         | Google Fonts |

---

## Color Palette (CSS Variables)

```css
--bg-primary:    #f4f9f8;
--bg-secondary:  #ffffff;
--bg-card:       #eaf4f2;
--text-primary:  #1a3a35;
--text-muted:    #5a7a75;
--accent:        #2db89e;
--accent-hover:  #1fa085;
--border:        #c8e0dc;
```

---

## Framer Motion Animations

Apply `framer-motion` to every interactive and scroll-triggered element:

| Element | Animation |
|---|---|
| **Hero headings** | Staggered `y: 60 → 0` + opacity fade, 0.15s between each line |
| **Marquee ticker** | `motion.div` with `animate={{ x: ["0%", "-50%"] }}`, `repeat: Infinity` |
| **Service cards** | `whileInView` fade + `y: 40 → 0`, staggered container |
| **Navbar** | `motion.header` — shrinks and changes background on scroll via `useScroll` + `useTransform` |
| **CTA buttons** | `whileHover={{ scale: 1.05 }}` + `whileTap={{ scale: 0.97 }}` |
| **"Talk with a Nurse" section** | Image slides in from left, text from right using `whileInView` |
| **Stats counters** | Count-up using `useMotionValue` + `useTransform` on scroll into view |
| **Gallery tabs** | Tab switch with `AnimatePresence` + fade/slide transition |
| **Contact form fields** | Teal focus ring animated with `motion.input` |

---

## Page Sections

### 1. Top Utility Bar
- "Open Now" green dot indicator
- Phone: `1300 162 976`
- Locations: Brisbane | Gold Coast | Tweed

---

### 2. Navbar
- Logo: **CAREZONE NURSING SOLUTIONS**
- Links: Home | About Us | Our Services ▾ | NDIS | Contact Us
- CTA button: `Get In Touch` — teal, pill-shaped
- Sticky; scroll-triggered dark → slightly lighter background transition
- Mobile: hamburger menu with slide-down drawer

---

### 3. Hero Section
- Background: `#f4f9f8` with a soft subtle texture/grain overlay
- Giant stacked heading (3 lines, mixed weight):
  ```
  CARE
  at
  HOME
  ```
- Subtext:
  > "Serving Brisbane, Gold Coast & Tweed — person-centred nursing care for NDIS, Aged Care & DVA"
- Two CTA buttons: `Learn More` | `Call Now`
- Decorative SVG shape (abstract leaf/care motif) on right side

---

### 4. Marquee Ticker
- Infinite scrolling text:
  ```
  NDIS Support • Aged Care • DVA Services • Home Nursing •
  Personal Care • Allied Health • Brisbane • Gold Coast • Tweed •
  ```
- Deep teal text (`--text-primary`) on a soft mint background strip (`--bg-card`)

---

### 5. Services Section
**Heading:** "We offer personalised support"

7 service cards in a responsive grid (3 cols desktop / 2 tablet / 1 mobile):

| Icon | Service |
|------|---------|
| 🩺 | Nursing — medication, wound care, dementia, palliative |
| 🚿 | Personal Care & Hygiene |
| 🤝 | Social Support |
| 💪 | Health & Wellbeing Programs |
| 🧹 | Cleaning & Domestic Assistance |
| 🔧 | Home Maintenance & Modifications |
| 🦯 | Allied Health (physio, OT, podiatry, dietetics) |

Each card: white background, teal accent icon, bold deep-teal title, short description.
Hover: lift shadow + teal border glow.
Animation: `whileInView` stagger.

---

### 6. About / Welcome Section
Split layout (inspired by Banh Mi World "welcome to my world"):

- **Left:** Large decorative text — `CARE / for / YOU`
- **Right:** Carezone mission paragraph + `Learn More` CTA button
- Background: slightly lighter dark tone for contrast

---

### 7. Stats Bar
Full-width mint band (`--bg-card`), 3 animated count-up counters in deep teal:

- `500+` Clients Supported
- `3` Regions Served
- `10+` Years Experience

---

### 8. Talk With a Nurse (CTA Section)
- Left: image/illustration (placeholder: gradient circle with nurse icon)
- Right: `"Talk With a Nurse Today!"` heading + paragraph + `Get In Touch` button
- Animation: image slides in from left, text from right, `whileInView`

---

### 9. Gallery / Services Tabs
Tabbed section with animated tab switching:

| Tab | Content |
|-----|---------|
| NDIS | 2–3 cards describing NDIS support offerings |
| Aged Care | 2–3 cards describing aged care at home |
| DVA | 2–3 cards describing veterans' care services |
| Allied Health | 2–3 cards describing allied health services |

Tab content switches with `AnimatePresence` fade/slide.

---

### 10. Location Section
- Heading: `Serving Our Communities`
- 3 location pills: `Brisbane` | `Gold Coast` | `Tweed Heads`
- Embedded map placeholder (Google Maps iframe or styled map graphic)

---

### 11. Contact Form
Fields: Name, Email, Phone, Message
- `Submit` button with loading spinner animation
- Inputs: animated teal focus ring via `motion.input`

---

### 12. Footer
- Logo + tagline
- Nav columns: Services | Quick Links | Contact
- Social icons: Facebook | X | Instagram
- Newsletter email signup (animated focus input)
- `All rights reserved CAREZONE NURSING © 2026`

---

## Tech Stack

- **React** — functional components + hooks (no TypeScript)
- **Framer Motion** — all animations (no CSS keyframes except fallback marquee)
- **CSS Modules** or inline CSS variables for theming
- **Google Fonts** — imported via `@import` in CSS
- No external component libraries — hand-craft the UI
- Placeholder images via `https://picsum.photos` or gradient divs with icons
- Default export: root `App` component

---

## Important Rules

- All animations must use `framer-motion` — not CSS `@keyframes` (except marquee fallback)
- Fully mobile-responsive with hamburger nav
- No TypeScript — plain JSX only
- Placeholder images are fine — no real assets required
- Keep background transparent on all sections; rely on CSS variables for theming
