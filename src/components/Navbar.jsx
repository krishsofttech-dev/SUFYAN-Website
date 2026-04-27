import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;

    // Animate navbar background on scroll — exact technique from video
    ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => {
        if (self.scroll() > 80) {
          gsap.to(nav, {
            backgroundColor: "rgba(5,5,5,0.88)",
            backdropFilter: "blur(20px)",
            paddingTop: "14px",
            paddingBottom: "14px",
            borderBottomColor: "rgba(201,168,76,0.15)",
            duration: 0.4,
            ease: "power2.out",
          });
        } else {
          gsap.to(nav, {
            backgroundColor: "transparent",
            paddingTop: "28px",
            paddingBottom: "28px",
            borderBottomColor: "transparent",
            duration: 0.4,
            ease: "power2.out",
          });
        }
      },
    });

    // Stagger links in on load
    gsap.from(".nav-link", {
      y: -20,
      opacity: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: "power3.out",
      delay: 1.6,
    });
  }, []);

  return (
    <nav
      ref={navRef}
      style={{ borderBottom: "1px solid transparent" }}
      className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-[60px] py-[28px] transition-all"
    >
      <a
        href="#"
        className="font-display text-[28px] tracking-[.15em] no-underline"
        style={{ color: "var(--gold-light)" }}
      >
        SUFYAN
      </a>

      <ul className="flex gap-10 list-none">
        {["Collection", "Heritage", "Gallery", "Catalog", "Contact"].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="nav-link font-body text-[13px] tracking-[.15em] uppercase no-underline transition-colors relative group"
              style={{ color: "var(--cream-dim)" }}
            >
              {item}
              <span
                className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                style={{ background: "var(--gold)" }}
              />
            </a>
          </li>
        ))}
      </ul>

      <button
        className="font-body text-[12px] tracking-[.2em] uppercase px-6 py-[10px] border-none cursor-none transition-colors"
        style={{ background: "var(--gold)", color: "var(--black)" }}
        onMouseEnter={(e) => (e.target.style.background = "var(--gold-light)")}
        onMouseLeave={(e) => (e.target.style.background = "var(--gold)")}
      >
        Bespoke Order
      </button>
    </nav>
  );
}

export default Navbar;
