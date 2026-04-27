import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ── GALLERY IMAGES ───────────────────────────────────────────────────────────
// Save these files to src/assets/images/gallery/ with these exact names:
//   floral-embroidery.jpg  ← macro gold & crimson floral embroidery on black silk
//   zari-work.jpg          ← gold metallic zari thread geometric on navy fabric
//   stone-setting.jpg      ← semi-precious stones & mirror work on black velvet
import floralEmbroidery from "../assets/images/gallery/floral-embroidery.jpg";
import zariWork         from "../assets/images/gallery/zari-work.jpg";
import stoneSetting     from "../assets/images/gallery/stone-setting.jpg";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    img: floralEmbroidery,
    alt: "Floral hand embroidery on dark silk fabric",
    name: "FLORAL EMBROIDERY",
    sub: "Hand-stitched motifs",
    flex: "flex-[1.5]",
  },
  {
    img: zariWork,
    alt: "Gold zari thread weaving on navy fabric",
    name: "ZARI WORK",
    sub: "Gold thread weaving",
    flex: "flex-1",
  },
  {
    img: stoneSetting,
    alt: "Semi-precious stone setting on velvet fabric",
    name: "STONE SETTING",
    sub: "Semi-precious gems",
    flex: "flex-1",
  },
];

function Art() {
  const sectionRef = useRef(null);
  const stripRef   = useRef(null);

  useGSAP(() => {
    // Header reveal
    gsap.from(".art-label", {
      y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    });
    gsap.from(".art-title", {
      y: 50, opacity: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
    });

    // Panels stagger from sides
    gsap.from(".art-panel", {
      opacity: 0, x: (i) => (i === 0 ? -80 : 60),
      stagger: 0.15, duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
    });

    // ── MASK REVEAL — key video technique ──────────────────────────────────
    // clipPath animates open as you scroll past each panel
    gsap.utils.toArray(".art-mask").forEach((el, i) => {
      gsap.fromTo(
        el,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power2.out", duration: 1.2, delay: i * 0.2,
          scrollTrigger: {
            trigger: el, start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Horizontal parallax drift on the whole strip
    gsap.to(stripRef.current, {
      x: -60, ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", end: "bottom top", scrub: 1.5,
      },
    });

    // Per-panel inner image parallax
    gsap.utils.toArray(".art-img").forEach((img) => {
      gsap.fromTo(img,
        { y: -30 },
        {
          y: 30, ease: "none",
          scrollTrigger: {
            trigger: img, start: "top bottom", end: "bottom top", scrub: 1,
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-[160px] overflow-hidden"
      style={{ background: "var(--dark)" }}
    >
      {/* Header */}
      <div className="px-[60px] mb-20">
        <div className="art-label text-[11px] tracking-[.4em] uppercase mb-3" style={{ color: "var(--gold)" }}>
          The Craft
        </div>
        <h2 className="art-title font-display leading-none" style={{ fontSize: "clamp(48px,7vw,96px)", color: "#faf8f4" }}>
          ARTISAN <em className="font-serif not-italic italic" style={{ color: "var(--gold-light)" }}>GALLERY</em>
        </h2>
      </div>

      {/* Art strip */}
      <div ref={stripRef} className="flex gap-px" style={{ willChange: "transform" }}>
        {panels.map((panel, i) => (
          <div
            key={i}
            className={`art-panel art-mask relative overflow-hidden cursor-none group ${panel.flex}`}
            style={{ minHeight: "520px" }}
          >
            {/* Real gallery image with parallax */}
            <img
              src={panel.img}
              alt={panel.alt}
              className="art-img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ minHeight: "520px", display: "block" }}
              loading="lazy"
            />

            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(to top, rgba(5,5,5,.75) 0%, transparent 60%)" }}
            />

            {/* Label slides up on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-7 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <div className="font-display text-[22px] tracking-wide" style={{ color: "#faf8f4" }}>{panel.name}</div>
              <div className="text-[12px] tracking-[.15em] uppercase mt-1" style={{ color: "var(--gold)" }}>{panel.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Art;
