import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import royalKurta from "../assets/images/products/silk-shalwar.jpg";
import silkShalwar from "../assets/images/products/royal-kurta.jpg";
import embroideredSet from "../assets/images/products/image.jpg";

import modelWalkVideo from "../assets/videos/model-walk.mp4";
import outfitRotateVideo from "../assets/videos/outfit-rotate.mp4";
import embroideredSetVideo from "../assets/videos/embroideredSet.mp4";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: "ROYAL KURTA",
    price: "PKR 8,500 — 12,000",
    tag: "New",
    tagStyle: { background: "var(--gold)", color: "var(--black)" },
    img: royalKurta,
    video: modelWalkVideo,
    span: "row-span-2",
    minH: "600px",
  },
  {
    id: 2,
    name: "SILK SHALWAR",
    price: "PKR 15,000 — 22,000",
    tag: "Limited",
    tagStyle: {
      border: "1px solid var(--gold)",
      color: "var(--gold)",
      background: "transparent",
    },
    img: silkShalwar,
    video: outfitRotateVideo,
    minH: "280px",
  },
  {
    id: 3,
    name: "EMBROIDERED SET",
    price: "PKR 18,000 — 35,000",
    tag: null,
    img: embroideredSet,
    video: embroideredSetVideo, // ✅ FIXED
    minH: "280px",
  },
];

function ProductCard({ p }) {
  const videoWrapperRef = useRef(null);
  const [videoFinished, setVideoFinished] = useState(false);

  const handleVideoEnd = () => {
    gsap.to(videoWrapperRef.current, {
      y: -80,
      opacity: 0,
      scale: 0.8,
      duration: 0.7,
      ease: "bounce.out",
      onComplete: () => {
        setVideoFinished(true);
      },
    });
  };

  return (
    <div
      className={`product-card relative overflow-hidden group ${p.span || ""}`}
      style={{ background: "var(--dark)" }}
    >
      <div className="w-full overflow-hidden relative" style={{ minHeight: p.minH }}>
        
        {/* IMAGE */}
        <img
          src={p.img}
          alt={p.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoFinished ? "opacity-100" : "opacity-0"
          }`}
          style={{ minHeight: p.minH }}
        />

        {/* VIDEO */}
        {p.video && !videoFinished && (
          <div ref={videoWrapperRef} className="absolute inset-0">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={handleVideoEnd}
            >
              <source src={p.video} type="video/mp4" />
            </video>
          </div>
        )}

        {/* Overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{ background: "rgba(5,5,5,.25)" }}
        />

        {/* Tag */}
        {p.tag && (
          <div
            className="absolute top-5 right-5 text-[10px] tracking-[.2em] uppercase px-3 py-1.5 font-medium z-20"
            style={p.tagStyle}
          >
            {p.tag}
          </div>
        )}
      </div>

      {/* INFO */}
      <div
        className="absolute bottom-0 left-0 right-0 p-8 translate-y-5 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-20"
        style={{
          background: "linear-gradient(to top, rgba(5,5,5,.92) 0%, transparent 100%)",
        }}
      >
        <div
          className="font-display text-[28px] tracking-wide"
          style={{ color: "#faf8f4" }}
        >
          {p.name}
        </div>

        <div
          className="text-[13px] tracking-wide mt-1"
          style={{ color: "var(--gold)" }}
        >
          {p.price}
        </div>
      </div>
    </div>
  );
}

function Collection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(".collection-label", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    });

    gsap.from(".collection-title", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
    });

    gsap.from(".collection-desc", {
      x: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
    });

    gsap.from(".product-card", {
      y: 80,
      opacity: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: ".products-grid", start: "top 80%" },
    });
  }, { scope: sectionRef });

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="px-[60px] py-[120px]"
      style={{ background: "var(--off-black)" }}
    >
      {/* HEADER */}
      <div className="flex items-end justify-between mb-20">

        <div>
          <div
            className="collection-label text-[11px] tracking-[.4em] uppercase mb-3"
            style={{ color: "var(--gold)" }}
          >
            New Season
          </div>

          <h2
            className="collection-title font-display leading-none"
            style={{ fontSize: "clamp(48px,7vw,96px)", color: "#faf8f4" }}
          >
            THE{" "}
            <em
              className="font-serif not-italic italic"
              style={{ color: "var(--gold-light)" }}
            >
              COLLECTION
            </em>
          </h2>
        </div>

        <p
          className="collection-desc text-[14px] leading-relaxed max-w-xs pb-2"
          style={{ color: "var(--cream-dim)" }}
        >
          Each piece is crafted with the finest cotton and silk blends,
          embroidered by master artisans with decades of experience.
        </p>

      </div>

      {/* GRID */}
      <div className="products-grid grid grid-cols-3 gap-px">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}

export default Collection;