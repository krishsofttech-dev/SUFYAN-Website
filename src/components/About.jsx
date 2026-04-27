import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ── VIDEO ─────────────────────────────────────────────────
import artisanVideo from "../assets/videos/artisan-hands.mp4";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const sectionRef = useRef(null);

  useGSAP(() => {

    gsap.from(".about-frame", {
      scale: 0.92,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    gsap.to(".about-bg-num", {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });

    gsap.from(".about-text-reveal", {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-content",
        start: "top 80%",
      },
    });

    [
      { el: "#stat-years", end: 35, suffix: "+" },
      { el: "#stat-clients", end: 12, suffix: "K" },
      { el: "#stat-designs", end: 200, suffix: "+" },
    ].forEach(({ el, end, suffix }) => {

      const target = document.querySelector(el);
      if (!target) return;

      gsap.from({ val: 0 }, {
        val: end,
        duration: 2,
        ease: "power2.out",
        snap: { val: 1 },

        onUpdate: function () {
          target.textContent = Math.round(this.targets()[0].val) + suffix;
        },

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

    });

  }, { scope: sectionRef });

  return (
    <section
      id="heritage"
      ref={sectionRef}
      className="grid grid-cols-2 gap-[120px] px-[60px] py-[160px] items-center"
      style={{ background: "var(--black)" }}
    >

      {/* LEFT VISUAL */}
      <div className="relative">

        <div
          className="about-bg-num absolute -left-14 top-1/2 -translate-y-1/2 select-none pointer-events-none font-display leading-none"
          style={{
            fontSize: "160px",
            color: "rgba(201,168,76,.05)",
          }}
        >
          01
        </div>

        <div
          className="about-frame relative overflow-hidden"
          style={{ aspectRatio: "3/4" }}
        >

          {/* VIDEO ONLY */}
          <video
            className="w-full h-full object-cover pointer-events-none"
            style={{ filter: "brightness(0.75) saturate(0.8)" }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={artisanVideo} type="video/mp4" />
          </video>

          {/* Gold overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(201,168,76,.08) 0%, transparent 60%)",
            }}
          />

          {/* Since label */}
          <div
            className="absolute bottom-8 left-8"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "16px",
              letterSpacing: ".3em",
              color: "var(--gold-dim)",
              background: "rgba(5,5,5,.6)",
              padding: "8px 16px",
            }}
          >
            SINCE 1987
          </div>

        </div>

        <div
          className="absolute -top-5 -right-5 w-24 h-24"
          style={{ border: "1px solid var(--gold-dim)" }}
        />

        <div
          className="absolute -bottom-5 -left-5 w-14 h-14"
          style={{ background: "var(--gold)", opacity: 0.12 }}
        />

      </div>

      {/* RIGHT CONTENT */}
      <div className="about-content">

        <div
          className="about-text-reveal text-[11px] tracking-[.4em] uppercase mb-3"
          style={{ color: "var(--gold)" }}
        >
          Our Heritage
        </div>

        <h2
          className="about-text-reveal font-display leading-none mb-8"
          style={{
            fontSize: "clamp(40px,5vw,72px)",
            color: "#faf8f4",
          }}
        >
          CRAFTED WITH
          <em
            className="font-serif not-italic italic block"
            style={{ color: "var(--gold-light)" }}
          >
            SOUL
          </em>
        </h2>

        <p
          className="about-text-reveal text-[15px] leading-[1.9] mb-6"
          style={{ color: "var(--cream-dim)" }}
        >
          For over three decades, SUFYAN has been at the forefront of traditional
          Pakistani fashion. Every stitch tells a story — of master craftsmen who
          have passed down their art through generations.
        </p>

        <p
          className="about-text-reveal text-[15px] leading-[1.9] mb-10"
          style={{ color: "var(--cream-dim)" }}
        >
          We blend centuries-old embroidery techniques with contemporary silhouettes
          to create pieces that honor the past while embracing the present.
        </p>

        {/* Stats */}
        <div className="about-text-reveal flex gap-12 mb-12">

          {[
            { id: "stat-years", label: "Years", init: "35+" },
            { id: "stat-clients", label: "Clients", init: "12K" },
            { id: "stat-designs", label: "Designs", init: "200+" },
          ].map((s) => (

            <div key={s.id}>

              <div
                id={s.id}
                className="font-display leading-none"
                style={{
                  fontSize: "52px",
                  color: "var(--gold-light)",
                }}
              >
                {s.init}
              </div>

              <div
                className="text-[12px] tracking-[.15em] uppercase mt-1"
                style={{ color: "var(--cream-dim)" }}
              >
                {s.label}
              </div>

            </div>

          ))}

        </div>

        <a
          href="#collection"
          className="about-text-reveal btn-fill inline-flex items-center gap-3 text-[12px] tracking-[.2em] uppercase px-8 py-4 no-underline"
          style={{
            color: "var(--cream)",
            border: "1px solid rgba(201,168,76,.4)",
          }}
        >
          <span>View Collection</span>
          
        </a>

      </div>

    </section>
  );
}

export default About;