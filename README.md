# SUFYAN — Shalwar Kameez Brand Website
### Awwwards-Level React + GSAP + Tailwind CSS

---

## Tech Stack
| Tool | Purpose |
|------|---------|
| React + Vite | Component framework |
| GSAP + ScrollTrigger | All animations |
| @gsap/react (useGSAP) | React-safe animation hook |
| Tailwind CSS | Styling |

---

## Project Structure
```
src/
├── components/
│   ├── Cursor.jsx       — Custom trailing cursor
│   ├── Navbar.jsx       — Fixed nav, fades in on scroll
│   ├── Hero.jsx         — Timeline entrance + scroll-synced video
│   ├── Marquee.jsx      — Infinite scrolling ticker
│   ├── Collection.jsx   — Product grid with hover reveals
│   ├── About.jsx        — Stats counter + parallax
│   ├── Art.jsx          — Mask reveal + horizontal parallax
│   ├── Menu.jsx         — Filterable catalog grid
│   └── Contact.jsx      — Staggered contact form
├── index.css            — Tailwind + global styles
├── App.jsx              — Assembles all sections
└── main.jsx             — React entry point
```

---

## How to Run

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
http://localhost:5173
```

## Build for Production
```bash
npm run build
```
Upload the `dist/` folder to Vercel or Netlify.

---

## Adding a Real Hero Video
1. Put your video file at: `src/assets/videos/hero.mp4`
2. Open `src/components/Hero.jsx`
3. Find the `<video>` tag and:
   - Add: `src="/src/assets/videos/hero.mp4"`
   - Remove: `style={{ display: 'none' }}`

The video will automatically sync with scroll position!

---

## Adding Real Product Images
Replace fabric CSS classes in each component with:
```jsx
<img src="/src/assets/images/product1.jpg" className="w-full h-full object-cover" />
```

