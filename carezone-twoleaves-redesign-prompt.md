# Carezone Nursing Solutions — Website Redesign Prompt
### Inspired by [twoleavestea.com](https://www.twoleavestea.com/) · Animated with Framer Motion

> **Goal:** Rebuild [carezonenursing.com.au](https://carezonenursing.com.au) as a React single-page app  
> modelled on the refined, editorial, nature-inspired aesthetic of Two Leaves and a Bud,  
> with all animations powered by **Framer Motion**.

---

## Design Direction — Match twoleavestea.com

Study these specific design decisions from the reference site and replicate them for Carezone:

| Element | Two Leaves Reference | Carezone Adaptation |
|---|---|---|
| **Palette** | Deep indigo/navy + warm cream | Soft sage green + warm white |
| **Typography** | Large serif italic mixed with sans | Large serif italic + clean sans |
| **Hero** | Full-viewport, bold headline, single CTA, scroll arrow | Same structure, care-themed copy |
| **Section rhythm** | Alternating light/dark full-width bands | Alternating white / soft sage bands |
| **Product cards** | Minimal cards, image top, label + price | Service cards, icon top, label + description |
| **"Discover" filter bar** | Pill tags, horizontally scrollable | Service filter pills (NDIS / Aged / DVA etc.) |
| **Origin story section** | Full-bleed image + overlaid headline | Full-bleed care image + mission headline |
| **Testimonials** | Auto-scrolling quote carousel | Auto-scrolling client/family testimonials |
| **Journal/blog strip** | Horizontal scroll of article cards | Horizontal scroll of care tips / news cards |
| **Footer** | Dark indigo, newsletter signup, logo, socials | Deep sage, newsletter signup, logo, socials |

---

## Fonts

Import both from Google Fonts:

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');
```

| Role | Font | Style |
|---|---|---|
| Display / Hero | `Playfair Display` | Bold + Italic for emphasis words |
| Body / UI | `DM Sans` | 300–500 weight |

> **Key technique from Two Leaves:** Mix upright bold and italic within the same heading — e.g. `A *great* cup` where the italic word is wrapped in `<em>` styled with `font-style: italic`.

---

## Color Palette

```css
:root {
  --bg-primary:       #f7f5f0;   /* warm off-white, like Two Leaves cream */
  --bg-secondary:     #ffffff;   /* pure white for cards */
  --bg-dark:          #1e3a2f;   /* deep forest green for dark sections */
  --bg-sage:          #eaf2ec;   /* soft sage for alternating bands */
  --text-primary:     #1e3a2f;   /* deep green, replaces Two Leaves navy */
  --text-light:       #f7f5f0;   /* cream text on dark backgrounds */
  --text-muted:       #6b8f71;   /* muted sage for captions */
  --accent:           #4aab6d;   /* fresh green CTA accent */
  --accent-hover:     #37905a;   /* darker green on hover */
  --border:           #d8e8da;   /* soft sage border */
  --tag-bg:           #e2efe4;   /* pill/tag background */
}
```

---

## Framer Motion Animations

> All animations **must** use `framer-motion`. No CSS `@keyframes` except for the infinite marquee.

### Animation Reference Table

| Section | Animation | Framer Motion API |
|---|---|---|
| **Navbar** | Shrinks + background fades in on scroll | `useScroll` + `useTransform` on `motion.header` |
| **Hero headline** | Each word/line staggers in `y: 40 → 0` + opacity | `variants` with `staggerChildren: 0.12` |
| **Hero scroll arrow** | Gentle infinite bounce | `animate={{ y: [0, 10, 0] }}` `repeat: Infinity` |
| **Service cards** | Fade + slide up when entering viewport | `whileInView={{ opacity: 1, y: 0 }}` + stagger |
| **Filter pills** | Scale pop on click | `whileTap={{ scale: 0.93 }}` `whileHover={{ scale: 1.05 }}` |
| **"Discover" section reveal** | Headline words animate in one by one | `motion.span` stagger inside heading |
| **Origin/story section** | Image parallax on scroll | `useScroll` + `useTransform` on `motion.img` |
| **Stats counters** | Count up from 0 when in view | `useMotionValue` + `animate()` triggered by `useInView` |
| **Testimonial carousel** | Auto-scroll with drag support | `motion.div` + `drag="x"` + `AnimatePresence` |
| **Journal cards strip** | Horizontal scroll, cards slide in from right | `whileInView` stagger on each card |
| **CTA section** | Text slides in from left, image from right | `whileInView={{ x: 0 }}` from opposite offsets |
| **Dark band section** | Background fades from sage to dark on scroll | `useScroll` + `useTransform` on background color |
| **Footer newsletter** | Input focus expands width smoothly | `motion.input` `animate={{ width }}` on focus |
| **All CTA buttons** | Lift on hover, press on click | `whileHover={{ y: -2, scale: 1.03 }}` `whileTap={{ scale: 0.97 }}` |

---

## Page Sections

### 1. Top Utility Bar
Thin strip at very top (mirrors Two Leaves "free shipping" bar):
- Left: `📍 Serving Brisbane · Gold Coast · Tweed`
- Right: `📞 1300 162 976`
- Background: `--bg-dark`, text: `--text-light`, tiny `DM Sans 300`

---

### 2. Sticky Navbar
Mirrors Two Leaves navbar exactly:

- **Left:** Logo wordmark — `CAREZONE` in `Playfair Display Bold`
- **Centre:** Nav links — `Home` | `About Us` | `Our Services ▾` | `NDIS` | `Contact`
- **Right:** `Get In Touch` — pill CTA button in `--accent`
- On scroll: `motion.header` transitions background from transparent → `--bg-primary` with box-shadow
- Mobile: hamburger icon, slide-down `AnimatePresence` drawer

---

### 3. Hero Section
Full-viewport, directly inspired by Two Leaves hero:

**Layout:**
- Full-bleed background: large, warm lifestyle photo of a carer and client at home (use `https://picsum.photos/1600/900` placeholder)
- Semi-transparent dark overlay: `rgba(30, 58, 47, 0.55)`
- Centred content block

**Copy (use italic mix like Two Leaves):**
```
Care that fits
the *moment*.
```
Subtext:
> "From NDIS support and Aged Care to DVA services — we bring expert, person-centred nursing to your home in Brisbane, the Gold Coast, and Tweed."

**CTAs:** `Learn More` (filled) + `Call 1300 162 976` (outlined ghost)

**Scroll arrow:** `↓` icon below CTAs, infinite gentle bounce animation

**Framer Motion:** Staggered word-by-word headline reveal + fade-in on subtext and buttons

---

### 4. Italic Subheading Band
Thin full-width section (cream background), mirrors Two Leaves `"A great cup starts with a careful pluck"`:

```
A *great* recovery starts with care  
in the *comfort* of your own home.
```
- Large `Playfair Display`, centred
- Italic words in `--accent` colour
- `whileInView` fade-in with slight `y` shift

---

### 5. Services Section — "Best Sellers" Style
Directly mirrors Two Leaves product card grid:

**Section label:** `OUR SERVICES` (small caps, muted, spaced)
**Heading:** `What we offer`

7 cards in a responsive horizontal-scroll grid (like Two Leaves product row):

| Icon | Service | Description |
|---|---|---|
| 🩺 | **Nursing** | Medication management, wound care, dementia & palliative support |
| 🚿 | **Personal Care** | Showering, dressing, grooming — with dignity and comfort |
| 🤝 | **Social Support** | Outings, activities, appointments — staying connected |
| 💪 | **Health & Wellbeing** | Fitness and wellness programs tailored to your needs |
| 🧹 | **Domestic Assistance** | Cleaning, laundry, and everyday household tasks |
| 🔧 | **Home Maintenance** | Safety repairs, modifications, and accessibility upgrades |
| 🦯 | **Allied Health** | Physio, OT, podiatry, and dietetics at home |

**Card design:** White card, icon at top, bold service name, 1-line description, `Learn More →` link in `--accent`
**Hover:** `y: -4px` lift + soft shadow
**Animation:** `whileInView` stagger, each card `0.08s` apart

Below grid: `Explore All Services →` centred link

---

### 6. "Discover" Filter Section
Directly mirrors Two Leaves `"Let's find a cup that fits the moment"` filter UI:

**Heading:**
```
Let's find the care that fits
*your* situation.
```

**Filter pills** (horizontally scrollable on mobile):
`NDIS` · `Aged Care` · `DVA` · `Home Nursing` · `Personal Care` · `Allied Health` · `Brisbane` · `Gold Coast` · `Tweed`

Clicking a pill filters/highlights the relevant service cards above with `AnimatePresence` fade transitions.

---

### 7. Origin / Mission Section — "Born in Colorado" Style
Full-bleed section, mirrors Two Leaves origin story:

**Layout:** Full-width background image (carer in garden, placeholder OK) with scroll parallax

**Overlaid text:**
```
born in
*brisbane*
```
Below: `"Founded with a simple belief — that every Australian deserves quality care at home. Carezone Nursing Solutions has served Brisbane, the Gold Coast, and Tweed since 2015."`

**3 value icons** (like Two Leaves' quality/care/sourcing icons):

| Icon | Value |
|---|---|
| 🌿 | Person-Centred Care |
| 🤲 | Dignity & Respect |
| ✅ | Registered & Trusted |

`Our Story →` link below

**Animation:** Parallax scroll on image via `useScroll` + `useTransform(scrollY, [0, 300], [0, -60])`

---

### 8. Stats Counter Band
Full-width `--bg-dark` band (dark green), mirrors Two Leaves dark section rhythm:

3 animated counters, cream text, centred:

```
500+              3               10+
Clients Served    Regions         Years of Care
```

**Animation:** `useInView` triggers `useMotionValue` count-up from 0

---

### 9. Testimonials — "Loved by Tea People Everywhere" Style
Mirrors Two Leaves testimonial carousel exactly:

**Heading:**
```
Loved by families *everywhere*.
Here's what they're saying.
```

Auto-scrolling testimonial cards (drag to navigate):

Each card contains:
- Quote text
- Client first name + location
- Star rating (⭐⭐⭐⭐⭐)
- Service tag (e.g. `Aged Care`, `NDIS`)

**Sample testimonials:**
> *"The carers from Carezone treat Mum like family. We couldn't be more grateful."* — Sandra K., Brisbane · Aged Care

> *"Finally an NDIS provider that actually listens. Life-changing support."* — Michael T., Gold Coast · NDIS

> *"Professional, warm, and always on time. Highly recommend to any veteran families."* — Robyn H., Tweed · DVA

**Animation:** `motion.div` with `drag="x"` `dragConstraints`, `AnimatePresence` on card transitions, auto-advance every 4s

---

### 10. Partners / Wholesale Band — "Cafe & Wholesale" Style
Mirrors Two Leaves partner section:

**Heading:** `Working with NDIS, DVA & Aged Care providers`

**Copy:** "Carezone partners with hospitals, discharge planners, and care coordinators across South East Queensland to ensure seamless at-home transitions."

`Partner With Us →` CTA button

**Animation:** Text slides in from left `whileInView`

---

### 11. Care Programs — "Barista Blends" Style
Horizontal scroll of 4–5 featured program cards (mirrors Two Leaves latte mix section):

| Program | Tagline |
|---|---|
| **NDIS Home Support** | Flexible, funded, person-centred |
| **Aged Care Package** | Stay independent in the home you love |
| **DVA Services** | Dedicated care for our veterans |
| **Allied Health at Home** | Expert therapy, delivered to your door |
| **Post-Hospital Care** | Safe, supported recovery at home |

Each card: soft sage background, label tag at top, bold program name, 1-line tagline, `Learn More` link

---

### 12. Journal / Blog Strip — "Tea Journal" Style
Horizontal scroll strip of article/tip cards, mirrors Two Leaves journal section:

**Heading:**
```
A community built on *compassion*.
Explore care tips and family guides.
```

6 article card examples:
- "What to Expect from an NDIS Home Visit"
- "How to Talk to Ageing Parents About Home Care"
- "5 Signs It's Time to Consider DVA Support"
- "What Allied Health at Home Really Looks Like"
- "Navigating the My Aged Care Portal"
- "Home Modifications That Make a Real Difference"

Each card: placeholder image, bold title, `Read More →` link
`Explore All Articles →` button below strip

**Animation:** Cards slide in from right with `whileInView` stagger

---

### 13. Final CTA Section — "Great Tea. In Good Company." Style
Full-bleed warm section, mirrors Two Leaves closing CTA:

**Heading:**
```
Expert Care.
In Good *Hands*.
```

**Subtext:** "Discover the people, purpose, and passion behind every visit."

Two buttons: `About Us` (outlined) · `Contact Us` (filled accent)

---

### 14. Footer
Dark `--bg-dark` footer, directly mirrors Two Leaves footer:

**Left column:**
- Logo: `CAREZONE NURSING SOLUTIONS` in `Playfair Display`
- Tagline: *"Care you can feel good about."*
- Social icons: Facebook · Instagram · X

**Centre columns:**
- **Services:** Nursing · Personal Care · Social Support · Allied Health · Home Maintenance
- **Quick Links:** Home · About Us · NDIS · DVA · Aged Care · Contact

**Right column:**
- **Newsletter signup:** `"Stay connected. Get care tips and news."` — email input + `Subscribe` button
- Phone: `1300 162 976`
- Email: `admin@carezonenursing.com.au`

**Bottom bar:** `All rights reserved CAREZONE NURSING © 2026`

**Animation:** `motion.input` — width expands on focus

---

## Tech Stack

```
React           Functional components + hooks, no TypeScript
Framer Motion   ALL animations — no CSS keyframes except marquee fallback
Google Fonts    Playfair Display + DM Sans via @import
CSS Variables   All colours and spacing via :root variables
Placeholders    https://picsum.photos for images
```

> No external component libraries. Hand-craft every component.  
> Default export: root `App` component.

---

## Critical Implementation Rules

1. **Every animation uses `framer-motion`** — not raw CSS transitions or keyframes
2. **Italic emphasis** inside headings — wrap key words in `<em>` styled with `Playfair Display italic` + `--accent` colour, exactly as Two Leaves does
3. **Alternating section backgrounds** — white → sage → white → dark → white, creating natural rhythm
4. **Horizontal scroll sections** (services, journal) must work on mobile with `overflow-x: auto` + hidden scrollbar
5. **Mobile responsive** — hamburger nav, single-column cards, stacked CTAs
6. **Smooth scroll** — `scroll-behavior: smooth` on `html`
7. **`whileInView` with `viewport={{ once: true }}`** on all scroll-triggered animations — fire only once
8. **Plain JSX only** — no TypeScript
