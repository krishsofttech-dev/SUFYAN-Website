import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// brand-reveal.mp4 — plays as a full-width cinematic strip below the marquee
import brandRevealVideo from "../assets/videos/brand-reveal.mp4";

gsap.registerPlugin(ScrollTrigger);

function Marquee() {
  const revealRef = useRef(null);

  useGSAP(() => {
    // Clip-path reveal as user scrolls into the brand video section
    gsap.fromTo(
      ".brand-reveal-video",
      { clipPath: "inset(8% 6% 8% 6%)", opacity: 0.6 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: revealRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      }
    );
    // Text reveal
    gsap.from(".brand-reveal-text", {
      y: 40, opacity: 0, stagger: 0.15, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: revealRef.current, start: "top 65%" },
    });
  }, { scope: revealRef });

  const items = [
    "Premium Cotton", "Hand Embroidered", "Traditional Craft",
    "Luxury Fabric", "Bespoke Tailoring", "Heritage Design",
  ];
  const doubled = [...items, ...items];

  return (
    <>
      <div
        className="py-5 overflow-hidden"
        style={{
          borderTop: "1px solid rgba(201,168,76,.15)",
          borderBottom: "1px solid rgba(201,168,76,.15)",
          background: "var(--off-black)",
        }}
      >
        <div className="marquee-track flex gap-16 whitespace-nowrap">
          {doubled.map((item, i) => (
            <div
              key={i}
              className="font-display text-[13px] tracking-[.3em] flex items-center gap-16"
              style={{ color: "var(--gold-dim)" }}
            >
              {item}
              <span style={{ color: "var(--gold)" }}>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── BRAND REVEAL VIDEO SECTION ── */}
      <div
        ref={revealRef}
        className="relative overflow-hidden"
        style={{ background: "var(--black)", paddingTop: "80px", paddingBottom: "80px" }}
      >
        <video
          className="brand-reveal-video w-full object-cover"
          style={{ height: "60vh", display: "block" }}
          autoPlay muted loop playsInline preload="auto"
        >
          <source src={brandRevealVideo} type="video/mp4" />
        </video>

        {/* Overlay with brand text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent 20%, rgba(5,5,5,.5) 100%)" }}
        >
          <div className="brand-reveal-text text-[11px] tracking-[.4em] uppercase mb-4" style={{ color: "var(--gold)" }}>
            Est. 1987
          </div>
          <h2 className="brand-reveal-text font-display leading-none text-center" style={{ fontSize: "clamp(40px,8vw,100px)", color: "#faf8f4" }}>
            WHERE HERITAGE<br />
            <em className="font-serif not-italic italic" style={{ color: "var(--gold-light)" }}>MEETS CRAFT</em>
          </h2>
        </div>
      </div>
    </>
  );
}

export default Marquee;