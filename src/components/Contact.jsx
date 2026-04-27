import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const sectionRef = useRef(null);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      // Title reveal
      gsap.from(".contact-title", {
        y: 50, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".contact-info-block", {
        x: -40, opacity: 0,
        stagger: 0.12, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      // Form fields stagger from right — exact video technique
      gsap.from(".form-field", {
        x: 50, opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-form", start: "top 80%" },
      });
    },
    { scope: sectionRef }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    gsap.to(".submit-btn", { scale: 0.97, duration: 0.1, yoyo: true, repeat: 1 });
    setTimeout(() => setSent(true), 300);
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="px-[60px] py-[160px] relative overflow-hidden"
      style={{ background: "var(--off-black)" }}
    >
      {/* Giant watermark */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display pointer-events-none select-none whitespace-nowrap"
        style={{
          fontSize: "clamp(100px,20vw,260px)",
          color: "rgba(201,168,76,.03)",
          letterSpacing: ".1em",
        }}
      >
        SUFYAN
      </div>

      <div
        className="relative z-10 grid gap-[120px] items-start"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        {/* ── LEFT: Info ── */}
        <div>
          <div
            className="contact-info-block text-[11px] tracking-[.4em] uppercase mb-3"
            style={{ color: "var(--gold)" }}
          >
            Get in Touch
          </div>
          <h2
            className="contact-title font-display leading-none mb-8"
            style={{ fontSize: "clamp(48px,6vw,80px)", color: "#faf8f4" }}
          >
            LET'S CREATE
            <em
              className="font-serif not-italic italic block"
              style={{ color: "var(--gold-light)" }}
            >
              TOGETHER
            </em>
          </h2>
          <p
            className="contact-info-block text-[14px] leading-[1.9] mb-12"
            style={{ color: "var(--cream-dim)" }}
          >
            Have a bespoke design in mind? We bring your vision to life with
            meticulous craftsmanship and premium fabrics sourced from across
            Pakistan.
          </p>

          {[
            { icon: "📍", text: "Lahore, Pakistan" },
            { icon: "📞", text: "+92 300 1234567" },
            { icon: "✉",  text: "orders@sufyan.pk" },
          ].map((d, i) => (
            <div
              key={i}
              className="contact-info-block flex items-center gap-4 text-[14px] mb-5"
              style={{ color: "var(--cream-dim)" }}
            >
              <div
                className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                style={{ border: "1px solid var(--gold-dim)", fontSize: "14px" }}
              >
                {d.icon}
              </div>
              {d.text}
            </div>
          ))}
        </div>

        {/* ── RIGHT: Form ── */}
        <form className="contact-form" onSubmit={handleSubmit}>
          {[
            { label: "Your Name",      type: "text",     placeholder: "Ahmed Khan" },
            { label: "Email Address",  type: "email",    placeholder: "ahmed@email.com" },
            { label: "Phone",          type: "tel",      placeholder: "+92 300 0000000" },
          ].map((field) => (
            <div key={field.label} className="form-field mb-6">
              <label
                className="block text-[11px] tracking-[.2em] uppercase mb-2.5"
                style={{ color: "var(--gold)" }}
              >
                {field.label}
              </label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="w-full bg-transparent text-[15px] py-3 outline-none"
                style={{
                  borderBottom: "1px solid rgba(201,168,76,.2)",
                  color: "#faf8f4",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "border-color .3s",
                }}
                onFocus={(e) => (e.target.style.borderBottomColor = "var(--gold)")}
                onBlur={(e) => (e.target.style.borderBottomColor = "rgba(201,168,76,.2)")}
              />
            </div>
          ))}

          <div className="form-field mb-6">
            <label
              className="block text-[11px] tracking-[.2em] uppercase mb-2.5"
              style={{ color: "var(--gold)" }}
            >
              Your Message
            </label>
            <textarea
              rows={4}
              placeholder="Tell us about your design vision..."
              className="w-full bg-transparent text-[15px] py-3 outline-none resize-none"
              style={{
                borderBottom: "1px solid rgba(201,168,76,.2)",
                color: "#faf8f4",
                fontFamily: "'DM Sans', sans-serif",
                transition: "border-color .3s",
              }}
              onFocus={(e) => (e.target.style.borderBottomColor = "var(--gold)")}
              onBlur={(e) => (e.target.style.borderBottomColor = "rgba(201,168,76,.2)")}
            />
          </div>

          <button
            type="submit"
            className="submit-btn submit-fill w-full py-5 mt-4 font-display tracking-[.2em] text-[18px] cursor-none"
            style={{
              border: "1px solid var(--gold)",
              background: "transparent",
              color: "var(--gold)",
            }}
          >
            <span>{sent ? "MESSAGE SENT ✓" : "SEND INQUIRY"}</span>
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
