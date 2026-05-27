# Carezone Nursing Solutions — Website Redesign Prompt
### Modelled on [maximatherapy.com](https://maximatherapy.com) · Powered by Framer Motion

> **Reference:** Maxima Therapy was built by agency KOKI-KIKO (featured on Codrops & Communication Arts).  
> The site is acclaimed for layered animations, soft organic transitions, an expressive illustrated  
> visual language, and microinteractions that mirror the fluid, nonlinear nature of care.  
> Recreate that same spirit — warm, playful, alive, human — for Carezone Nursing Solutions.

---

## Design Philosophy — The Maxima Therapy Approach

> *"The site is built around movement and emotional resonance. Layered animations, soft transitions and  
> an expressive visual language reflect the fluid, nonlinear nature of neurodivergence. The design  
> avoids rigid structures and instead leans into something more organic, responsive and intuitive."*  
> — KOKI-KIKO, Communication Arts

Apply this philosophy to Carezone:

- **No cold clinical grids.** Avoid rigid card rows and boxed layouts. Use organic, overlapping, asymmetric compositions.
- **Animation IS the storytelling.** Every scroll moment, hover and transition carries meaning.
- **Illustrations over stock photos.** Warm, hand-drawn SVG illustrations give a human, approachable feel.
- **Microinteractions everywhere.** Cursor effects, hover morphs, sticker pops, parallax layers — everything responds.
- **Soft, not sterile.** The palette is warm and gentle. No harsh whites or cold blues.

---

## Color Palette

Directly inspired by Maxima Therapy's warm, playful, illustrated palette:

```css
:root {
  /* Backgrounds */
  --bg-cream:        #FFF8F0;   /* warm off-white — primary page background */
  --bg-peach:        #FFE8D6;   /* soft peach — alternating section bands */
  --bg-sky:          #D6EEF5;   /* pale sky blue — highlight sections */
  --bg-mint:         #D4F0E8;   /* soft mint — card & hover backgrounds */
  --bg-sun:          #FFF3C4;   /* warm yellow — accent highlight areas */

  /* Text */
  --text-dark:       #1C2B2A;   /* deep forest — primary headings & body */
  --text-mid:        #3D5A54;   /* muted deep green — secondary text */
  --text-soft:       #7A9E97;   /* sage — captions, labels */

  /* Brand Accents */
  --accent-teal:     #56D3D2;   /* Maxima's signature teal — primary CTA */
  --accent-teal-dk:  #2FB8B7;   /* deeper teal on hover */
  --accent-peach:    #FF8C69;   /* warm coral-peach — secondary accent */
  --accent-yellow:   #FFD166;   /* sunny yellow — stickers, highlights */
  --accent-violet:   #B5A4E8;   /* soft lavender — tags, subtle pops */

  /* Functional */
  --border-soft:     #E8D8C8;   /* warm border */
  --shadow:          rgba(28, 43, 42, 0.08);
}
```

### Section Color Bands
Alternate backgrounds across sections to create visual rhythm:

| Section | Background |
|---|---|
| Navbar / Hero | `--bg-cream` |
| Services | `--bg-peach` |
| About / Mission | `--bg-sky` |
| Stats Counter | `--bg-sun` |
| Testimonials | `--bg-cream` |
| Programs / Features | `--bg-mint` |
| Contact / CTA | `--bg-peach` |
| Footer | `--text-dark` (dark, text: `--bg-cream`) |

---

## Typography

```css
@import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800&family=Fraunces:ital,wght@0,400;0,700;1,400;1,600&display=swap');
```

| Role | Font | Weight / Style |
|---|---|---|
| Display headings | `Fraunces` | 700 upright + 600 italic for emphasis words |
| Body & UI | `Cabinet Grotesk` | 400 body, 700 buttons/labels |
| Tags & captions | `Cabinet Grotesk` | 500, uppercase, letter-spaced |

> **Key technique from Maxima:** Headings mix italic and upright weights mid-sentence,  
> e.g. `Care that feels` *`human`* — the italic word in `--accent-teal` signals warmth.

---

## Framer Motion Animation System

> **All animations use `framer-motion`.** No CSS keyframes except infinite marquee fallback.

### Global Animation Tokens

```js
// Shared easing and timing — use these everywhere for consistency
const ease = [0.25, 0.46, 0.45, 0.94];         // smooth decelerate
const easeBouncy = [0.34, 1.56, 0.64, 1];       // elastic, playful
const easeSnap = [0.87, 0, 0.13, 1];            // sharp snap

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } }
};

const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } }
};
```

### Animation Reference — Every Section

| Element | Animation | Framer Motion API |
|---|---|---|
| **Navbar** | Transparent → cream bg + shadow on scroll | `useScroll` + `useTransform` on `motion.header` |
| **Hero carousel indicator** | Gentle auto-pulse on active dot | `animate={{ scale: [1, 1.3, 1] }}` `repeat: Infinity` |
| **Hero headline** | Words stagger in from `y: 50`, opacity 0→1 | `motion.span` per word, `staggerChildren: 0.08` |
| **Scroll down arrow** | Infinite `y` bounce | `animate={{ y: [0, 12, 0] }}` `repeat: Infinity, duration: 1.8` |
| **Service cards** | Fade + `y: 40→0` on scroll into view | `whileInView` + `viewport={{ once: true }}` + stagger |
| **Card hover** | Lift + teal border glow | `whileHover={{ y: -6, boxShadow: "0 16px 40px var(--shadow)" }}` |
| **CTA button morph** | Rectangle → rounded pill on hover | `motion.button` + `animate={{ borderRadius }}` on `onHoverStart` |
| **Illustrated characters** | Gentle float loop (parallax feel) | `animate={{ y: [0, -12, 0] }}` `repeat: Infinity, duration: 3` |
| **Sticker pop** | Scale 0→1 with elastic bounce on click/scroll | `animate={{ scale: [0, 1.2, 1] }}` `ease: easeBouncy` |
| **Section backgrounds** | Crossfade between peach/sky/cream on scroll | `useScroll` + `useTransform` on `backgroundColor` |
| **Stats counters** | Count up from 0 when in view | `useMotionValue` + `animate()` triggered by `useInView` |
| **Testimonial carousel** | Drag + auto-advance | `motion.div` + `drag="x"` + `dragConstraints` + `AnimatePresence` |
| **Image parallax** | Slower scroll than page | `useScroll` + `useTransform(y, [0, 300], [0, -60])` on `motion.img` |
| **Page section reveal** | Whole section fades up as it enters viewport | `motion.section` `whileInView={{ opacity: 1, y: 0 }}` from `{ opacity: 0, y: 60 }` |
| **Cursor follower** | Custom round cursor follows mouse with lag | `useSpring` on `mouseX` / `mouseY` with `stiffness: 100, damping: 20` |
| **Nav link hover** | Underline draws in from left | `motion.span` scaleX `0→1` on `whileHover` with `transformOrigin: "left"` |
| **Footer newsletter** | Input expands width on focus | `motion.input` `animate={{ width }}` on `onFocus` |
| **Tag / pill hover** | Background floods in | `motion.div` layout animation on background colour |
| **Mobile menu** | Slides down with `AnimatePresence` | Height `0→auto` + `opacity: 0→1` with `ease` |

---

## Page Sections — Full Specification

---

### 1. Custom Cursor
A soft teal circle (30px) that follows the mouse with spring lag:

```jsx
const cursorX = useMotionValue(-100);
const cursorY = useMotionValue(-100);
const springX = useSpring(cursorX, { stiffness: 100, damping: 20 });
const springY = useSpring(cursorY, { stiffness: 100, damping: 20 });
```

Cursor enlarges (`scale: 2.5`, `mix-blend-mode: difference`) when hovering CTAs or cards.

---

### 2. Top Utility Bar
Thin strip, `--bg-sun` (warm yellow):
- Left: `📍 Brisbane · Gold Coast · Tweed`
- Right: `📞 1300 162 976`
- Font: `Cabinet Grotesk 500`, 13px, letter-spaced

---

### 3. Sticky Navbar
`motion.header` with scroll-triggered background:

- **Logo:** `CAREZONE` in `Fraunces 700` + nursing cross SVG icon in `--accent-teal`
- **Links:** Home | About | Services ▾ | NDIS | Contact
- **CTA:** `Get In Touch` pill button — `--accent-teal` fill, morphs to rounded-full on hover
- **Hover on links:** teal underline draws left → right (`scaleX: 0→1`)
- **Scroll behaviour:** `useTransform(scrollY, [0, 80], ["rgba(255,248,240,0)", "rgba(255,248,240,1)"])` + shadow appears
- **Mobile:** hamburger → `AnimatePresence` slide-down full-width menu

---

### 4. Hero Section — Interactive Illustrated Carousel
*Directly mirrors Maxima's home hero carousel concept.*

Full-viewport hero with a rotating illustrated panel system — 4 panels representing Carezone's core programs:

| Panel | Program | Illustration Idea | Interaction |
|---|---|---|---|
| 1 | NDIS Support | Illustrated person in wheelchair outdoors | SVG character eyes follow cursor |
| 2 | Aged Care | Older adult in cozy armchair, plant beside them | User can move a butterfly around the scene |
| 3 | DVA Services | Veteran in garden with animated leaves | Animated Lottie-style sun rising |
| 4 | Allied Health | Physio with patient, calm water background | Mouse creates gentle ripple in water SVG |

**Navigation:** Left/right arrow buttons + draggable carousel wheel (click-drag to rotate)

**Each panel contains:**
- Large `Fraunces` italic heading (e.g. *"Support at home"*)
- 1-line subtext in `Cabinet Grotesk`
- `Learn More →` CTA
- Full SVG illustration (inline, animated)

**Background colour** changes per panel using `AnimatePresence` + `motion.div` crossfade.

**Scroll arrow** below carousel: gentle infinite bounce.

**Animation:** Staggered word reveal for heading, panel rotation uses CSS transform + Framer Motion `animate={{ rotate }}`.

---

### 5. Italic Banner — Emotional Subheading
Full-width band, `--bg-peach`, centred:

```
The best place to heal
is the comfort of your own *home*.
```

- Font: `Fraunces 700`, 3.5rem
- Italic word `home` in `--accent-teal`
- `motion.div` `whileInView` fade + `y: 30→0`

---

### 6. Services Grid — Organic Card Layout
*No rigid rows. Offset cards like Maxima's illustrated sections.*

**Label:** `WHAT WE OFFER` — small caps, `--text-soft`, letter-spaced  
**Heading:** `Care for every *part* of your day.`

7 service cards in an **asymmetric masonry-style grid** (not a uniform 3-col grid):
- Odd cards: offset 20px upward
- Even cards: default height

| Icon | Service | Accent Colour |
|---|---|---|
| 🩺 | **Nursing** | `--accent-teal` |
| 🚿 | **Personal Care & Hygiene** | `--accent-peach` |
| 🤝 | **Social Support** | `--accent-violet` |
| 💪 | **Health & Wellbeing** | `--accent-yellow` |
| 🧹 | **Domestic Assistance** | `--accent-teal` |
| 🔧 | **Home Maintenance** | `--accent-peach` |
| 🦯 | **Allied Health** | `--accent-violet` |

**Card anatomy:**
- Rounded corners (24px)
- Icon in a soft coloured circle (matching accent)
- Bold service title (`Fraunces 700`)
- 1-line description (`Cabinet Grotesk 400`)
- `Learn More →` in accent colour

**Hover animation:** `whileHover={{ y: -6, scale: 1.02 }}` + coloured left-border slides in

**Stagger animation:** `whileInView` on each card, `staggerChildren: 0.08`, `once: true`

---

### 7. "Discover Your Care" Filter Section
*Mirrors Maxima's intuitive, non-prescriptive exploration UX.*

**Heading:**
```
Find the care that fits
*your* situation.
```

**Filter pills** — horizontally scrollable on mobile:

`NDIS` · `Aged Care` · `DVA` · `Home Nursing` · `Personal Care` · `Allied Health` · `Brisbane` · `Gold Coast` · `Tweed`

- Active pill: `--accent-teal` background floods in with layout animation
- `whileTap={{ scale: 0.93 }}` + `whileHover={{ scale: 1.05 }}`
- Filtering changes service card visibility with `AnimatePresence` + `layout` prop

---

### 8. About / Origin Section — Full-Bleed Illustrated
*Mirrors Maxima's "movement and emotional resonance" approach.*

Full-viewport section split:

**Left half:** Large SVG illustration — carer and client in a sunny living room, surrounded by plants. Characters have gentle float animation (`y: 0→-10→0`, `duration: 3, repeat: Infinity`).

**Right half:**
```
Born in
*Brisbane*
```
```
Founded with one belief — that every Australian
deserves expert, compassionate care at home.
Carezone has served Brisbane, the Gold Coast,
and Tweed since 2015.
```

**3 value stickers** — rounded badge shapes that pop in with elastic scale animation:

| Sticker | Value |
|---|---|
| 🌿 | Person-Centred Care |
| 🤲 | Dignity & Respect |
| ✅ | Registered & Trusted |

Each sticker: `animate={{ scale: [0, 1.2, 1] }}` elastic bounce when it enters view.  
Clicking the section heading **cycles through illustrated sticker variants** (like Maxima's sticker block).

**Parallax scroll:** Illustration moves at 60% scroll speed via `useScroll` + `useTransform`.

---

### 9. Stats Counter Band
Full-width `--bg-sun` (warm yellow) band:

3 animated count-up counters in `Fraunces 800`, large:

```
500+               3                 10+
Clients Served     Regions           Years of Care
```

`useInView` triggers `useMotionValue` count from 0 to target over 2 seconds.

---

### 10. Testimonials Carousel — Draggable
*Mirrors Maxima's interaction system: "experience felt, not just seen."*

**Heading:**
```
Loved by families *everywhere*.
```

Auto-advancing draggable carousel (`drag="x"`, `dragConstraints`):

Each card:
- Quote text in `Fraunces 400 italic`
- Client first name + location
- Star rating ⭐⭐⭐⭐⭐
- Service tag pill (e.g. `Aged Care`)
- Soft `--bg-peach` card background

**Sample quotes:**
> *"The carers treat Mum like family. We couldn't be more grateful."* — Sandra K., Brisbane · Aged Care

> *"Finally an NDIS provider that actually listens."* — Michael T., Gold Coast · NDIS

> *"Professional, warm, and always on time. Highly recommend."* — Robyn H., Tweed · DVA

`AnimatePresence` on active card + `auto-advance: 4s interval`.

---

### 11. "Physics Moment" — Animated SVG Feature Block
*Inspired by Maxima's physics-based hanging word interaction.*

A full-width section with the word **"SUPPORT"** displayed large, hanging from two illustrated rope-ends at the top. On hover or scroll, the word gently swings left/right using Framer Motion springs:

```jsx
const rotateZ = useSpring(0, { stiffness: 30, damping: 8 });
// onMouseMove: rotateZ.set( (mouseX - center) * 0.05 )
```

Below the swinging word:
> *"Our team is here to hold you up — every single day."*

`Learn More →` CTA button.

---

### 12. Care Programs — Horizontal Scroll Strip
Full-width horizontal scroll of 5 program cards (mobile: swipe):

| Program | Colour | Tagline |
|---|---|---|
| **NDIS Home Support** | `--bg-mint` | Flexible, funded, person-centred |
| **Aged Care Package** | `--bg-peach` | Stay independent in the home you love |
| **DVA Services** | `--bg-sky` | Dedicated care for our veterans |
| **Allied Health at Home** | `--bg-sun` | Expert therapy, delivered to your door |
| **Post-Hospital Care** | `--bg-mint` | Safe, supported recovery at home |

Each card: soft rounded corners, label tag, `Fraunces` heading, 1-line tagline, `Learn More →`  
Cards slide in from right with `whileInView` stagger.

---

### 13. Journal / Resources Strip
Horizontal scrollable article cards:

**Heading:**
```
A community built on *compassion*.
```

6 article cards:
- "What to Expect from an NDIS Home Visit"
- "How to Talk to Ageing Parents About Home Care"
- "5 Signs It's Time to Consider DVA Support"
- "What Allied Health at Home Really Looks Like"
- "Navigating the My Aged Care Portal"
- "Home Modifications That Make a Real Difference"

Each card: warm background, `Fraunces` title, `Read More →` link.  
`whileInView` stagger, cards enter from right.

---

### 14. Final CTA Section
Full-width `--bg-peach`:

**Heading:**
```
Expert Care.
In Good *Hands*.
```

Two CTA buttons side by side:
- `About Us` — outlined, `--text-dark` border
- `Contact Us` — filled `--accent-teal`

Both buttons: `whileHover={{ y: -3, scale: 1.04 }}` + morph to rounder shape on hover.

---

### 15. Contact Form
Clean section, `--bg-cream`:

Fields: Name · Email · Phone · Message (textarea)

- Teal animated focus ring: `motion.div` absolute border `scale: 0→1` on field focus
- Submit button: loading spinner animation on submit
- On success: checkmark SVG draws in with stroke animation

---

### 16. Footer
Background: `--text-dark` (deep forest green), all text: `--bg-cream`

**Left:** Logo + tagline *"Care you can feel good about."* + social icons (Facebook · Instagram · X)

**Centre columns:**
- Services: Nursing · Personal Care · Social Support · Allied Health · Home Maintenance
- Quick Links: Home · About · NDIS · DVA · Aged Care · Contact

**Right:** Newsletter signup:
> *"Stay connected. Care tips and news to your inbox."*  
> `motion.input` — expands width on focus, teal underline animates in

**Bottom bar:** `All rights reserved CAREZONE NURSING © 2026`

---

## Illustrated SVG Characters — Style Guide

All illustrations should feel:
- **Hand-drawn, warm, friendly** — not corporate clipart
- Rounded edges, no sharp corners
- Skin tones diverse and inclusive
- Colour palette: use `--accent-teal`, `--accent-peach`, `--accent-yellow`, `--accent-violet`
- Backgrounds: soft gradients using palette colours

Inline SVGs preferred over image files so they can be animated via Framer Motion or CSS.

---

## Tech Stack

```
React           Functional components + hooks (no TypeScript)
Framer Motion   ALL animations — the entire motion system
Google Fonts    Fraunces + Cabinet Grotesk via @import
CSS Variables   :root palette as defined above
Lenis (opt.)    Smooth scroll — sync with Framer Motion via RAF
Placeholder SVG Use simple inline SVG shapes for illustrations
```

> No external component libraries. Hand-craft every component.  
> Default export: root `App` component.

---

## Critical Rules

1. **Every animation is Framer Motion** — no CSS `@keyframes` or `transition` properties
2. **Organic, not gridded** — offset cards, asymmetric layouts, overlapping elements
3. **`whileInView` with `viewport={{ once: true }}`** on all scroll animations
4. **Italic headings** — key words in `Fraunces italic` + `--accent-teal`, every major section
5. **`AnimatePresence`** on all conditionally rendered elements (tabs, carousel, mobile menu)
6. **Alternating background bands** per the section colour table above
7. **Mobile responsive** — stacked cards, touch-drag carousel, hamburger menu
8. **Custom cursor** only on desktop (`pointer-events: none` on touch)
9. **Reduced motion:** respect `prefers-reduced-motion` — disable animations if true
10. **Plain JSX only** — no TypeScript
