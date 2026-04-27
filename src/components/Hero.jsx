import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import heroBg from "../assets/images/hero-bg.jpg";
import heroVideo from "../assets/videos/hero.mp4";

function Hero() {

  const heroRef = useRef(null);
  const videoRef = useRef(null);

  const [showImage, setShowImage] = useState(false);

  useGSAP(() => {

    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(".hero-eyebrow", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(".hero-line-1", {
        y: "0%",
        duration: 1.1,
        ease: "power4.out",
      }, "-=0.4")
      .to(".hero-line-2", {
        y: "0%",
        duration: 1.1,
        ease: "power4.out",
      }, "-=0.7")
      .to(".hero-subtitle", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.4")
      .to(".hero-scroll-indicator", {
        opacity: 1,
        duration: 0.6,
      }, "-=0.2");

  }, { scope: heroRef });


  /* When video finishes */
  const handleVideoEnd = () => {

    setShowImage(true);

    /* Show image for 3 seconds then replay video */
    setTimeout(() => {

      setShowImage(false);

      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }

    }, 3000);
  };


  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "black" }}
    >

      {/* IMAGE */}
      {showImage && (
        <img
          src={heroBg}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* VIDEO */}
      {!showImage && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnd}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      )}

      {/* HERO CONTENT */}
      <div className="relative z-10 text-center">

        <div
          className="hero-eyebrow mb-6 text-[11px] tracking-[.4em] uppercase"
          style={{
            color: "#c9a84c",
            opacity: 0,
            transform: "translateY(20px)",
          }}
        >
          Heritage Craftsmanship
        </div>

        <h1
          className="font-display leading-none"
          style={{
            fontSize: "clamp(80px,14vw,200px)",
            color: "#faf8f4",
            overflow: "hidden",
          }}
        >

          <span
            className="hero-line-1 block"
            style={{ transform: "translateY(110%)" }}
          >
            SHALWAR
          </span>

          <span
            className="hero-line-2 block"
            style={{ transform: "translateY(110%)" }}
          >
            KAMEEZ
          </span>

        </h1>

        <p
          className="hero-subtitle mt-5 italic"
          style={{
            fontSize: "clamp(16px,2vw,24px)",
            color: "#d6d2c7",
            opacity: 0,
            transform: "translateY(20px)",
          }}
        >
          Where tradition meets contemporary elegance
        </p>

      </div>

      {/* SCROLL INDICATOR */}
      <div
        className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ opacity: 0, color: "#c9a84c" }}
      >
      </div>

    </section>
  );
}

export default Hero;