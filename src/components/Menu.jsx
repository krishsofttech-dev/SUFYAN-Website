import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ── CATALOG IMAGES ───────────────────────────────────────────────────────────
// Save these files to src/assets/images/products/ with these exact names:
//   midnight-kurta.jpg    ← dark navy cotton lawn kurta flat lay
//   azure-shalwar.jpg     ← blue pure silk shalwar set model shot
//   amber-waistcoat.jpg   ← gold velvet waistcoat flat lay or hanger
//   wedding-sherwani.jpg  ← cream gold wedding sherwani in haveli courtyard
//   classic-white.jpg     ← white khaddar kurta clean flat lay
//   royal-sherwani.jpg    ← maroon silk brocade sherwani editorial model shot
import midnightKurta   from "../assets/images/products/midnight-kurta.jpg";
import azureShalwar    from "../assets/images/products/azure-shalwar.png";
import amberWaistcoat  from "../assets/images/products/amber-waistcoat.png";
import weddingSherwani from "../assets/images/products/wedding-sherwani.png";
import classicWhite    from "../assets/images/products/classic-white.png";
import royalSherwani   from "../assets/images/products/royal-sherwani.png";

gsap.registerPlugin(ScrollTrigger);

const allItems = [
  { id:1, name:"Midnight Kurta",    detail:"Cotton Lawn · Navy",      price:"PKR 6,800",  img: midnightKurta,   cat:"kurta"      },
  { id:2, name:"Azure Shalwar Set", detail:"Pure Silk · Blue",        price:"PKR 18,500", img: azureShalwar,    cat:"shalwar"    },
  { id:3, name:"Amber Waistcoat",   detail:"Velvet · Gold",           price:"PKR 22,000", img: amberWaistcoat,  cat:"waistcoat"  },
  { id:4, name:"Wedding Sherwani",  detail:"Brocade · Ivory",         price:"PKR 45,000", img: weddingSherwani, cat:"embroidered"},
  { id:5, name:"Classic White",     detail:"Khaddar · White",         price:"PKR 5,500",  img: classicWhite,    cat:"kurta"      },
  { id:6, name:"Royal Sherwani",    detail:"Silk Brocade · Maroon",   price:"PKR 38,000", img: royalSherwani,   cat:"embroidered"},
];

const filters = [
  { label:"All Pieces",     value:"all",        count:24 },
  { label:"Kurta Shalwar",  value:"kurta",      count:10 },
  { label:"Waistcoat",      value:"waistcoat",  count:6  },
  { label:"Embroidered",    value:"embroidered",count:8  },
];

function Menu() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState("all");

  const filtered = active === "all" ? allItems : allItems.filter(i => i.cat === active);

  useGSAP(() => {
    gsap.from(".menu-filter-col", {
      x: -40, opacity: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    });
    gsap.from(".catalog-card", {
      y: 60, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: ".catalog-grid", start: "top 80%" },
    });
  }, { scope: sectionRef });

  const handleFilter = (val) => {
    setActive(val);
    setTimeout(() => {
      gsap.from(".catalog-card", {
        opacity: 0, y: 20, stagger: 0.07, duration: 0.5, ease: "power2.out",
      });
    }, 0);
  };

  return (
    <section
      id="catalog"
      ref={sectionRef}
      className="px-[60px] py-[160px]"
      style={{ background: "var(--black)" }}
    >
      <div className="grid gap-20" style={{ gridTemplateColumns: "1fr 2fr" }}>

        {/* ── Filters (sticky) ── */}
        <div className="menu-filter-col" style={{ position: "sticky", top: "120px", alignSelf: "start" }}>
          <h2 className="font-display mb-10" style={{ fontSize: "36px", color: "#faf8f4" }}>SHOP</h2>

          <div className="mb-8">
            <div className="text-[10px] tracking-[.3em] uppercase mb-4" style={{ color: "var(--gold)" }}>Category</div>
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => handleFilter(f.value)}
                className="w-full flex justify-between items-center py-3 text-[14px] transition-colors cursor-none border-b"
                style={{
                  borderColor: "rgba(201,168,76,.08)",
                  background: "none",
                  color: active === f.value ? "var(--gold-light)" : "var(--cream-dim)",
                }}
              >
                <span>{f.label}</span>
                <span className="text-[11px]" style={{ color: "var(--gold-dim)" }}>{f.count}</span>
              </button>
            ))}
          </div>

          <a
            href="#contact"
            className="btn-fill inline-flex items-center gap-3 mt-6 text-[12px] tracking-[.2em] uppercase px-8 py-4 no-underline"
            style={{ color: "var(--cream)", border: "1px solid rgba(201,168,76,.4)" }}
          >
            <span>Custom Order</span>
          </a>
        </div>

        {/* ── Catalog grid ── */}
        <div className="catalog-grid grid gap-10" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className="catalog-card cursor-none group"
              style={{ marginTop: i % 2 === 1 ? "60px" : "0" }}
            >
              {/* Real product image */}
              <div className="relative overflow-hidden mb-4" style={{ aspectRatio: "3/4" }}>
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover tint */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: "rgba(5,5,5,.2)" }}
                />
                {/* Wishlist */}
                <button
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-none"
                  style={{
                    background: "rgba(5,5,5,.6)", backdropFilter: "blur(8px)",
                    border: "1px solid rgba(201,168,76,.2)", color: "var(--cream)",
                  }}
                >
                  ♡
                </button>
              </div>

              <div className="font-serif text-[20px]" style={{ color: "#faf8f4" }}>{item.name}</div>
              <div className="text-[12px] tracking-wide mt-0.5" style={{ color: "var(--cream-dim)" }}>{item.detail}</div>
              <div className="text-[14px] font-medium mt-2" style={{ color: "var(--gold)" }}>{item.price}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Menu;
