import { useEffect, useRef } from "react";
import gsap from "gsap";

function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.set(dotRef.current, { x: mouseX, y: mouseY });
    };
    document.addEventListener("mousemove", onMove);

    // Ring lags behind dot for smooth trailing effect
    const loop = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ringRef.current, { x: ringX, y: ringY });
      requestAnimationFrame(loop);
    };
    loop();

    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999]"
        style={{ mixBlendMode: "difference", top: 0, left: 0 }}
      >
        <div className="cursor-dot" />
      </div>
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998]"
        style={{ top: 0, left: 0 }}
      >
        <div className="cursor-ring" />
      </div>
    </>
  );
}

export default Cursor;
