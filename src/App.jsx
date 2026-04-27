import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Collection from "./components/Collection";
import About from "./components/About";
import Art from "./components/Art";
import Menu from "./components/Menu";
import Contact from "./components/Contact";

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  return (
    <footer
      style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"60px", background:"var(--black)",
        borderTop:"1px solid rgba(201,168,76,.12)",
      }}
    >
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"24px",letterSpacing:".2em",color:"var(--gold-dim)"}}>SUFYAN</div>
      <div style={{fontSize:"12px",letterSpacing:".1em",color:"rgba(201,168,76,.3)"}}>© 2025 Sufyan Shalwar Kameez. All rights reserved.</div>
      <div style={{display:"flex",gap:"32px"}}>
        {["Instagram","Facebook","WhatsApp"].map(l=>(
          <a key={l} href="#" style={{fontSize:"12px",letterSpacing:".1em",textTransform:"uppercase",color:"rgba(201,168,76,.3)",textDecoration:"none",transition:"color .3s"}}
            onMouseEnter={e=>e.target.style.color="var(--gold)"}
            onMouseLeave={e=>e.target.style.color="rgba(201,168,76,.3)"}
          >{l}</a>
        ))}
      </div>
    </footer>
  );
}

function App() {
  useGSAP(() => { ScrollTrigger.refresh(); });
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Collection />
        <About />
        <Art />
        <Menu />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
