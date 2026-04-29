/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { Menu, X, Send, Facebook, Instagram, Youtube, Linkedin, ArrowRight, Zap, BadgeCheck, Settings2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

interface Product {
  name: string;
  img: string;
  url: string;
  pdfUrl?: string;
  hasLocalImage?: boolean;
  images?: string[];
}

const LOGO_FALLBACK_URL = "https://factorled.pk/wp-content/uploads/2025/01/Factor-Logo-negative-01-scaled.png";

// Counting animation hook
function useCountUp(target: number, duration: number = 2000, suffix: string = "") {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * target);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, target, duration]);

  return { count, ref, display: `${count}${suffix}` };
}

// Stat Card component with counting animation
function StatCard({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const { ref, display } = useCountUp(target, 2000, suffix);
  
  return (
    <div className="flex flex-col items-center md:items-start p-10 bg-white border border-[#F0F0F0] rounded-2xl shadow-sm">
      <span ref={ref} className="font-heading font-[800] text-[48px] text-black leading-none mb-4">{display}</span>
      <span className="font-[Poppins] font-medium text-[11px] text-[#00B0CB] uppercase tracking-[0.18em]">{label}</span>
    </div>
  );
}

const productsData: Record<string, Product[] | null> = {
  "cob-series": [
    { name: "COB Lums", img: "/Assets/product pics/02_cob-light1.jpg.jpeg", url: "https://factorled.pk/product/cob-lums/", pdfUrl: "https://factorled.pk/wp-content/uploads/2026/01/COB-LUMS.pdf", hasLocalImage: true },
    { name: "SASA", img: "/Assets/product pics/Sasa.png", url: "https://factorled.pk/product/sasa/", hasLocalImage: true },
    { name: "C Series", img: "/Assets/product pics/c.jpg", url: "https://factorled.pk/product/c-series/", hasLocalImage: true }
  ],
  "downlights": [
    { name: "Alkor", img: "/Assets/product pics/Alkore Downlight.png", url: "https://factorled.pk/product/alkor/", hasLocalImage: true },
    { name: "Glow", img: "/Assets/product pics/Glow Lightks.png", url: "https://factorled.pk/product/glow/", hasLocalImage: true },
    { name: "Range (Downlight)", img: "/Assets/product pics/06_star-downlight1.jpg.jpeg", url: "https://factorled.pk/product/range/", hasLocalImage: true },
    { name: "Star", img: "/Assets/product pics/STAR.png", url: "https://factorled.pk/product/star/", hasLocalImage: true }
  ],
  "mercury-series": [
    { name: "Mercury Circle Series", img: "/Assets/product pics/Mercury Circle.png", url: "https://factorled.pk/product/mercury-circle-series/", hasLocalImage: true },
    { name: "Mercury Square Series", img: "/Assets/product pics/03_Mercury-Series1.jpg.jpeg", url: "https://factorled.pk/product/mercury-square-series/", hasLocalImage: true },
    { name: "Mercury Surface", img: "/Assets/product pics/Mercury Surface light.png", url: "https://factorled.pk/product/mercury-surface/", hasLocalImage: true }
  ],
  "dc-series": [
    { name: "DC Solo Bulb", img: "/Assets/product pics/solo.jpg", url: "https://factorled.pk/product/dc-bulb/", hasLocalImage: true },
    { name: "Orion DC", img: "/Assets/product pics/orient-dc.jpg", url: "https://factorled.pk/product/orion-dc/", hasLocalImage: true }
  ],
  "led-bulbs": [
    { name: "Blaz", img: "/Assets/product pics/Blaz.jpg", url: "https://factorled.pk/product/blaz/", hasLocalImage: true },
    { name: "Lomo", img: "/Assets/product pics/lomo.jpg", url: "https://factorled.pk/product/lomo/", hasLocalImage: true },
    { name: "Range Bulb", img: "/Assets/product pics/Range-copy.jpg", url: "https://factorled.pk/product/range-bulb/", hasLocalImage: true }
  ],
  "tubelights": [
    { name: "M Series", img: "/Assets/product pics/M3 Light 2.png", url: "https://factorled.pk/product/m-series/", hasLocalImage: true },
    { name: "TU Series", img: "/Assets/product pics/TU-60.png", url: "https://factorled.pk/product/tu-series/", hasLocalImage: true },
    { name: "Zeno", img: "/Assets/product pics/Zeno Tube light With shadow.png", url: "https://factorled.pk/product/zeno/", hasLocalImage: true }
  ],
  "flood-lights": [
    { name: "Mars Series (30W-200W)", img: "/Assets/product pics/Mars-Series-MARS-200-watts.png", url: "https://factorled.pk/product/mars-series/", hasLocalImage: true },
    { name: "Venus Series", img: "/Assets/product pics/09_Flood-Lights1.jpg.jpeg", url: "https://factorled.pk/product/venus-series/", hasLocalImage: true },
    { name: "RGB Reflector Flood Lights", img: "/Assets/product pics/RGB Flood Light AD.png", url: "https://factorled.pk/product/rgb-reflector-flood-lights/", hasLocalImage: true }
  ],
  "track-lights": [
    { name: "Tracks", img: "/Assets/product pics/05_track-light1.jpg.jpeg", url: "https://factorled.pk/product/tracks/", hasLocalImage: true },
    { name: "Track Light", img: LOGO_FALLBACK_URL, url: "https://factorled.pk/product/track-light/", hasLocalImage: false }
  ],
  "industrial-lighting": [
    { name: "Highbay", img: "/Assets/product pics/13_Highbay1.jpg.jpeg", url: "https://factorled.pk/product/highbay/", pdfUrl: "https://factorled.pk/wp-content/uploads/2026/01/HIGHBAY.pdf", hasLocalImage: true }
  ],
  "panel-lights": [
    { name: "PL-5", img: "/Assets/product pics/PL-5.png", url: "https://factorled.pk/product/pl-5/", hasLocalImage: true },
    { name: "PL-14", img: "/Assets/product pics/PL-14.png", url: "https://factorled.pk/product/pl-14/", hasLocalImage: true }
  ],
  "street-lights": [
    { name: "Solar Street Light", img: "/Assets/product pics/Solar Street Light.png", url: "https://factorled.pk/product/solar-street-light/", hasLocalImage: true },
    { name: "St Light", img: "/Assets/product pics/1. ST 50.png", url: "https://factorled.pk/product/st-light/", hasLocalImage: true },
    { name: "Serene Street Light", img: "/Assets/product pics/Serene ST - 50 02.png", url: "https://factorled.pk/product/serene-street-light/", hasLocalImage: true }
  ],
  "architectural-lighting": [
    { name: "Glossy", img: "/Assets/product pics/Gleam.png", url: "https://factorled.pk/product/glossy/", hasLocalImage: true },
    { name: "Profile Light", img: LOGO_FALLBACK_URL, url: "https://factorled.pk/product/profile-light/", hasLocalImage: false },
    { name: "Lazer Blade Light", img: "/Assets/product pics/07_Architectural-Lighting1.jpg.jpeg", url: "https://factorled.pk/product/lazer-blade-light/", hasLocalImage: true },
    { name: "Linear LED Light", img: LOGO_FALLBACK_URL, url: "https://factorled.pk/product/linear-led-light/", hasLocalImage: false }
  ],
  "premium-products": [
    { name: "Tubix", img: "/Assets/product pics/Tubix.png", url: "https://factorled.pk/product/tubix/", hasLocalImage: true },
    { name: "Lux", img: LOGO_FALLBACK_URL, url: "https://factorled.pk/product/lux/", hasLocalImage: false },
    { name: "Optima", img: LOGO_FALLBACK_URL, url: "https://factorled.pk/product/optima/", hasLocalImage: false },
    { name: "Elite", img: "/Assets/product pics/elite.png", url: "https://factorled.pk/product/elite/", hasLocalImage: true },
    { name: "Premium Solar Street Light", img: "/Assets/product pics/Solar Street Light.png", url: "https://factorled.pk/product/premium-solar-street-light/", hasLocalImage: true },
    { name: "Hile Flood Light", img: LOGO_FALLBACK_URL, url: "https://factorled.pk/product/hile-flood-light/", hasLocalImage: false },
    { name: "Hila Street Light", img: LOGO_FALLBACK_URL, url: "https://factorled.pk/product/hila-street-light/", hasLocalImage: false }
  ],
  "pvc-tapes": [
    { name: "Match", img: "/Assets/product pics/tape/15_PVC-Tapes1.jpg.jpeg", url: "https://factorled.pk/product/match/", hasLocalImage: true, images: ["/Assets/product pics/tape/1.jpg", "/Assets/product pics/tape/2-1.jpg", "/Assets/product pics/tape/3-1.jpg", "/Assets/product pics/tape/4-1.jpg", "/Assets/product pics/tape/5.jpg"] },
    { name: "Klas", img: "/Assets/product pics/tape/KLas.jpg", url: "https://factorled.pk/product/klas/", hasLocalImage: true, images: ["/Assets/product pics/tape/KLas.jpg"] }
  ],
  "breaker-series": [
    { name: "Miniature Circuit Breaker Series (MCB)", img: "/Assets/product pics/12_Breaker-Series1.jpg.jpeg", url: "https://factorled.pk/product/miniature-circuit-breaker-series-mcb/", hasLocalImage: true },
    { name: "Surge Protection Device (SPD)", img: LOGO_FALLBACK_URL, url: "https://factorled.pk/product/surge-protection-device-spd/", hasLocalImage: false }
  ],
  "devices": [
    { name: "VAKWH Voltage Protector", img: LOGO_FALLBACK_URL, url: "https://factorled.pk/product/vakwh-voltage-protector/", hasLocalImage: false },
    { name: "Hear Aerosol Fire Extinguisher Device", img: LOGO_FALLBACK_URL, url: "https://factorled.pk/product/hear-aerosol-fire-extinguisher-device/", hasLocalImage: false }
  ]
};

const categories = [
  { id: "cob-series", label: "COB Series", url: "https://factorled.pk/cob-series/" },
  { id: "downlights", label: "Downlights", url: "https://factorled.pk/downlights/" },
  { id: "mercury-series", label: "Mercury Series", url: "https://factorled.pk/mercury-series/" },
  { id: "dc-series", label: "DC Series", url: "https://factorled.pk/dc-series/" },
  { id: "led-bulbs", label: "LED Bulbs", url: "https://factorled.pk/led-bulbs/" },
  { id: "tubelights", label: "Tubelights", url: "https://factorled.pk/tubelights/" },
  { id: "flood-lights", label: "Flood Lights", url: "https://factorled.pk/flood-lights/" },
  { id: "track-lights", label: "Track Lights", url: "https://factorled.pk/track-lights/" },
  { id: "industrial-lighting", label: "Industrial Lighting", url: "https://factorled.pk/industrial-lighting/" },
  { id: "panel-lights", label: "Panel Lights", url: "https://factorled.pk/panel-lights/" },
  { id: "street-lights", label: "Street Lights", url: "https://factorled.pk/street-lights/" },
  { id: "architectural-lighting", label: "Architectural Lighting", url: "https://factorled.pk/architectural-lighting/" },
  { id: "premium-products", label: "Premium Products", url: "https://factorled.pk/premium-products/" },
  { id: "pvc-tapes", label: "PVC Tapes", url: "https://factorled.pk/pvc-tapes/" },
  { id: "breaker-series", label: "Breaker Series", url: "https://factorled.pk/breaker-series/" },
  { id: "devices", label: "Devices", url: "https://factorled.pk/devices/" }
];

export function CategoryPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("cob-series");
  const [isFading, setIsFading] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [productImageIndices, setProductImageIndices] = useState<Record<string, number>>({});
  const showcaseRef = useRef<HTMLElement>(null);
  const [parallaxValues, setParallaxValues] = useState({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ rx: 0, ry: 0, tx: 0, ty: 0 });

  const handlePrevImage = (productName: string, maxImages: number) => {
    setProductImageIndices(prev => ({
      ...prev,
      [productName]: prev[productName] > 0 ? prev[productName] - 1 : maxImages - 1
    }));
  };

  const handleNextImage = (productName: string, maxImages: number) => {
    setProductImageIndices(prev => ({
      ...prev,
      [productName]: prev[productName] < maxImages - 1 ? (prev[productName] || 0) + 1 : 0
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

  // Handle category change with fade animation
  const handleCategoryChange = useCallback((categoryId: string) => {
    setIsFading(true);
    setVisibleItems(new Set());
    setTimeout(() => {
      setActiveCategory(categoryId);
      setIsFading(false);
    }, 200);
  }, []);

  // Stagger animation for products
  useEffect(() => {
    if (!isFading) {
      const data = productsData[activeCategory] ?? productsData["cob-series"];
      if (data) {
        data.forEach((_, index) => {
          setTimeout(() => {
            setVisibleItems(prev => new Set([...prev, index]));
          }, index * 50);
        });
      }
    }
  }, [activeCategory, isFading]);

  // Parallax effect
  useEffect(() => {
    const showcase = showcaseRef.current;
    if (!showcase) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = showcase.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseRef.current = {
        x: (e.clientX - centerX) / (rect.width / 2),
        y: (e.clientY - centerY) / (rect.height / 2)
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: 0, y: 0 };
    };

    let animationId: number;
    const update = () => {
      if (window.innerWidth > 768) {
        const targetRX = -mouseRef.current.y * 8;
        const targetRY = mouseRef.current.x * 8;
        const targetTX = mouseRef.current.x * 20;
        const targetTY = mouseRef.current.y * 20;

        currentRef.current.rx = lerp(currentRef.current.rx, targetRX, 0.1);
        currentRef.current.ry = lerp(currentRef.current.ry, targetRY, 0.1);
        currentRef.current.tx = lerp(currentRef.current.tx, targetTX, 0.1);
        currentRef.current.ty = lerp(currentRef.current.ty, targetTY, 0.1);

        setParallaxValues({
          rx: currentRef.current.rx,
          ry: currentRef.current.ry,
          tx: currentRef.current.tx,
          ty: currentRef.current.ty
        });
      }
      animationId = requestAnimationFrame(update);
    };

    showcase.addEventListener("mousemove", handleMouseMove);
    showcase.addEventListener("mouseleave", handleMouseLeave);
    animationId = requestAnimationFrame(update);

    return () => {
      showcase.removeEventListener("mousemove", handleMouseMove);
      showcase.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const getCategoryData = () => {
    const data = productsData[activeCategory];
    if (data === null) return productsData["cob-series"] ?? [];
    return data ?? [];
  };

  const displayCategoryName = activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);
  const products = getCategoryData();

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#231F20] selection:bg-[#00B0CB] selection:text-white font-[Poppins]">
      <style>{`
        @keyframes float1 { 0%, 100% { transform: translate3d(0,0,100px) rotateY(-10deg); } 50% { transform: translate3d(0,-20px,120px) rotateY(-5deg); } }
        @keyframes float2 { 0%, 100% { transform: translate3d(0,0,50px) rotateY(5deg); } 50% { transform: translate3d(20px,35px,80px) rotateY(8deg); } }
        @keyframes float3 { 0%, 100% { transform: translate3d(0,0,20px) rotateX(10deg); } 50% { transform: translate3d(-15px,-10px,50px) rotateX(5deg); } }
        @keyframes float4 { 0%, 100% { transform: translate3d(0,0,80px) rotateZ(-2deg); } 50% { transform: translate3d(5px,25px,110px) rotateZ(2deg); } }
        @keyframes float5 { 0%, 100% { transform: translate3d(0,0,60px) rotateX(-5deg) rotateY(5deg); } 50% { transform: translate3d(-10px,15px,90px) rotateX(2deg) rotateY(8deg); } }
        /* Desktop (> 1023px): all cards float */
        @media (min-width: 1024px) {
          .card-3d-1 { animation: float1 6s ease-in-out infinite; }
          .card-3d-2 { animation: float2 7s ease-in-out infinite; }
          .card-3d-3 { animation: float3 8s ease-in-out infinite; }
          .card-3d-4 { animation: float4 5s ease-in-out infinite; }
          .card-3d-5 { animation: float5 6.5s ease-in-out infinite; }
        }
        /* Mobile and Tablet (< 1024px): no floating animation */
        @media (max-width: 1023px) {
          .card-3d-1, .card-3d-2, .card-3d-3, .card-3d-4, .card-3d-5 { animation: none !important; }
          .perspective-container { display: none !important; }
        }
        .perspective-container { perspective: 1200px; transform-style: preserve-3d; }
        .parallax-wrapper {
          transform: rotateX(${parallaxValues.rx}deg) rotateY(${parallaxValues.ry}deg) translateX(${parallaxValues.tx}px) translateY(${parallaxValues.ty}px);
          transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1);
          transform-style: preserve-3d;
        }
        .dot-overlay {
          background-image: radial-gradient(rgba(0, 163, 255, 0.1) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        @media (max-width: 768px) {
          .parallax-wrapper { transform: none !important; }
          .mobile-snap { overflow-x: auto; scroll-snap-type: x mandatory; -ms-overflow-style: none; scrollbar-width: none; }
          .mobile-snap::-webkit-scrollbar { display: none; }
          .snap-item { scroll-snap-align: center; flex-shrink: 0; }
        }
        .category-tab.active {
          background-color: #00B0CB;
          color: #231F20;
          font-weight: 600;
          border-color: #00B0CB;
        }
        .product-card {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-8px);
          border-color: rgba(0, 176, 203, 0.35);
          box-shadow: 0 0 32px rgba(0, 176, 203, 0.14);
        }
        .stagger-item {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }
        .stagger-item.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .fade-out { opacity: 0; }
        .fade-in { opacity: 1; }
      `}</style>

      {/* Navbar - Homepage Style */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white backdrop-blur-xl border-b border-[#E8E8E8] py-4' : 'bg-white py-5'}`}>
        <div className="flex justify-between items-center px-6 md:px-12 w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center">
            <Link to="/">
              <Logo height={48} className="h-10 md:h-12" />
            </Link>
          </div>
          
          <div className="hidden md:flex gap-12 items-center">
            {[{label:'About Us', href:'https://factorled.pk/about-us/'}, {label:'Categories', to:'/category'}, {label:'Blogs', href:'#journal'}, {label:'Contact', to:'/contact'}].map((item) => (
              item.to ? (
                <Link 
                  key={item.label}
                  to={item.to}
                  className="text-[#231F20]/60 hover:text-[#231F20] transition-colors duration-200 font-[Poppins] font-medium text-[13px] tracking-wide"
                >
                  {item.label}
                </Link>
              ) : (
                <a 
                  key={item.label}
                  href={item.href}
                  className="text-[#231F20]/60 hover:text-[#231F20] transition-colors duration-200 font-[Poppins] font-medium text-[13px] tracking-wide"
                >
                  {item.label}
                </a>
              )
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-[#00B0CB] text-[#231F20] px-6 md:px-8 py-3 font-[Poppins] font-600 text-[13px] rounded-full hover:bg-[#0099B2] hover:shadow-[0_0_20px_rgba(0,176,203,0.3)] transition-all duration-200">
              Inquire
            </button>
            <button 
              className="md:hidden text-[#231F20]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-0 bg-white z-40 flex flex-col items-center justify-center gap-10 px-6"
          >
            <button 
              className="absolute top-6 right-6 text-[#231F20]"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={28} />
            </button>
            {[
              {label:'Home', to:'/'},
              {label:'About Us', href:'https://factorled.pk/about-us/'},
              {label:'Categories', to:'/category'},
              {label:'Blogs', href:'#journal'},
              {label:'Gallery', href:'https://factorled.pk/gallery/'},
              {label:'Events', href:'https://factorled.pk/events/'},
              {label:'Contact', to:'/contact'}
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {item.to ? (
                  <Link
                    to={item.to}
                    className="text-4xl font-[Poppins] font-700 text-[#231F20] hover:text-[#00B0CB] transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <motion.a
                    href={item.href}
                    className="text-4xl font-[Poppins] font-700 text-[#231F20] hover:text-[#00B0CB] transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                )}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-8"
            >
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="bg-[#00B0CB] text-[#231F20] px-10 py-4 font-[Poppins] font-bold text-sm tracking-widest uppercase inline-block"
              >
                Get a Quote
              </Link>
            </motion.div>
          </motion.div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative w-full h-[85vh] md:h-screen min-h-[500px] md:min-h-[600px] overflow-hidden" id="hero">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="/frames/frame_212_delay-0.041s.webp" 
              alt="Factor LED Product" 
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center center' }}
            />
          </div>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-[48px] relative z-10 h-full flex items-center">
            <div className="max-w-[800px] w-full">
              <span className="font-[Poppins] font-medium text-[11px] text-[#00B0CB] tracking-[0.18em] block mb-6 uppercase">Factor LED Standard</span>
              <h1 className="text-6xl md:text-[96px] leading-[0.9] mb-8 text-white font-[Poppins] font-extrabold">
                Discover better lighting.
              </h1>
              <p className="text-white/60 text-[18px] leading-[1.7] mb-[56px] max-w-[50ch]">
                Engineered for every space — from homes to factories. Each product carries the Factor LED standard of precision, durability, and consistent output.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#00B0CB] text-[#231F20] font-[Poppins] font-semibold text-[14px] px-8 py-4 rounded-full hover:shadow-[0_0_24px_rgba(0,176,203,0.25)] hover:translate-y-[-2px] transition-all duration-300">
                  Explore all products
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-[120px] bg-[#F9F9F7] border-y border-[#F0F0F0]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-[48px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard target={15} suffix="+" label="Product lines" />
              <StatCard target={7} label="Categories" />
              <StatCard target={1} suffix="yr" label="Full warranty" />
            </div>
          </div>
        </section>

        {/* Floating Product Showcase Section */}
        <section ref={showcaseRef} className="relative w-full bg-[#f9f9f9] py-16 md:py-[160px] overflow-hidden" id="product-showcase">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-[160px] flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
            {/* Left Content */}
            <div className="w-full md:w-[45%] z-10">
              <span className="font-[Poppins] font-medium text-[11px] text-[#00B0CB] tracking-[0.18em] block mb-6 uppercase">Curated Collection</span>
              <h2 className="font-[Poppins] font-bold text-5xl md:text-[54px] text-[#231F20] leading-[0.95] mb-8">
                Precision-crafted illumination.
              </h2>
              <p className="text-[#888888] text-[16px] leading-[1.7] mb-[40px] max-w-[60ch]">
                Our fixtures are more than just lights; they are high-performance instruments designed to elevate architectural aesthetics while maintaining peak industrial efficiency.
              </p>
              <button className="group flex items-center gap-3 font-[Poppins] font-semibold text-[14px] text-[#231F20] hover:text-[#00B0CB] transition-colors">
                VIEW CATALOGUE
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
            {/* Right Visuals - 3-2 Grid Layout */}
            <div className="w-full md:w-[55%] h-[500px] md:h-[600px] relative perspective-container">
              <div className="parallax-wrapper w-full h-full relative flex items-center justify-center mobile-snap">
                {/* TOP ROW - 3 Cards */}
                {/* Card 1: RESIDENTIAL → TU Series - Top Left */}
                <div className="card-3d-1 snap-item absolute md:top-[8%] md:left-[5%] w-[clamp(150px,22%,200px)] bg-white p-[16px] shadow-2xl rounded-xl border border-[#F0F0F0] group hover:z-50 transition-all z-20">
                  <div className="relative overflow-hidden bg-[#F9F9F7] aspect-square rounded-lg mb-3">
                    <img className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" src="/Assets/product pics/TU-60.png" alt="TU Series" referrerPolicy="no-referrer" />
                  </div>
                  <span className="font-[Poppins] font-medium text-[10px] text-[#00B0CB] block mb-1 uppercase tracking-[0.18em]">// Residential</span>
                  <h4 className="font-heading text-[16px] font-extrabold text-black uppercase">Residential</h4>
                </div>
                {/* Card 2: INDUSTRIAL → Highbay - Top Center */}
                <div className="card-3d-2 snap-item absolute md:top-[8%] md:left-[38%] w-[clamp(150px,22%,200px)] bg-white p-[16px] shadow-2xl rounded-xl border border-[#F0F0F0] group hover:z-50 transition-all z-10">
                  <div className="relative overflow-hidden bg-[#F9F9F7] aspect-square rounded-lg mb-3">
                    <img className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" src="/Assets/product pics/13_Highbay1.jpg.jpeg" alt="Highbay" referrerPolicy="no-referrer" />
                  </div>
                  <span className="font-[Poppins] font-medium text-[10px] text-[#00B0CB] block mb-1 uppercase tracking-[0.18em]">// Industrial</span>
                  <h4 className="font-heading text-[16px] font-extrabold text-black uppercase">Industrial</h4>
                </div>
                {/* Card 3: ARCHITECTURAL → Lazer Blade Light - Top Right */}
                <div className="card-3d-3 snap-item absolute md:top-[8%] md:left-[71%] w-[clamp(150px,22%,200px)] bg-white p-[16px] shadow-2xl rounded-xl border border-[#F0F0F0] group hover:z-50 transition-all z-10">
                  <div className="relative overflow-hidden bg-[#F9F9F7] aspect-square rounded-lg mb-3">
                    <img className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" src="/Assets/product pics/07_Architectural-Lighting1.jpg.jpeg" alt="Lazer Blade Light" referrerPolicy="no-referrer" />
                  </div>
                  <span className="font-[Poppins] font-medium text-[10px] text-[#00B0CB] block mb-1 uppercase tracking-[0.18em]">// Architectural</span>
                  <h4 className="font-heading text-[16px] font-extrabold text-black uppercase">Architectural</h4>
                </div>

                {/* BOTTOM ROW - 2 Cards */}
                {/* Card 4: COMMERCIAL → Track Light - Bottom Left */}
                <div className="card-3d-4 snap-item absolute md:top-[52%] md:left-[22%] w-[clamp(150px,22%,200px)] bg-white p-[16px] shadow-2xl rounded-xl border border-[#F0F0F0] group hover:z-50 transition-all z-30">
                  <div className="relative overflow-hidden bg-[#F9F9F7] aspect-square rounded-lg mb-3">
                    <img className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" src="/Assets/product pics/05_track-light1.jpg.jpeg" alt="Track Light" referrerPolicy="no-referrer" />
                  </div>
                  <span className="font-[Poppins] font-medium text-[10px] text-[#00B0CB] block mb-1 uppercase tracking-[0.18em]">// Commercial</span>
                  <h4 className="font-heading text-[16px] font-extrabold text-black uppercase">Commercial</h4>
                </div>
                {/* Card 5: PREMIUM → Elite - Bottom Right */}
                <div className="card-3d-5 snap-item absolute md:top-[52%] md:left-[55%] w-[clamp(150px,22%,200px)] bg-white p-[16px] shadow-2xl rounded-xl border border-[#F0F0F0] group hover:z-50 transition-all z-40">
                  <div className="relative overflow-hidden bg-[#F9F9F7] aspect-square rounded-lg mb-3">
                    <img className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" src="/Assets/product pics/elite.png" alt="Elite" referrerPolicy="no-referrer" />
                  </div>
                  <span className="font-[Poppins] font-medium text-[10px] text-[#00B0CB] block mb-1 uppercase tracking-[0.18em]">// Premium</span>
                  <h4 className="font-heading text-[16px] font-extrabold text-black uppercase">Premium</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-[#F9F9F7] py-16 md:py-[120px]" style={{ fontFamily: "Poppins, sans-serif" }} id="categories">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-[48px]">
            <header className="mb-16">
              <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#00B0CB] mb-4">// Product Categories</span>
              <h2 className="text-[40px] md:text-[56px] font-bold text-[#231F20] leading-[0.95] mb-6">Lighting for every need.</h2>
              <p className="text-[16px] font-light text-[#888888] max-w-[520px] leading-[1.7]">
                Engineered for every space — from homes to factories. Each product carries the Factor LED standard of precision and durability.
              </p>
            </header>

            {/* Tabs */}
            <div className="flex flex-wrap gap-3 mb-16">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={cat.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryChange(cat.id);
                  }}
                  className={`category-tab px-6 py-3 rounded-full border-[1.5px] border-[#E8E8E8] bg-white text-[14px] text-[#888888] transition-all hover:border-[#00B0CB] hover:text-[#00B0CB] ${activeCategory === cat.id ? "active" : ""}`}
                >
                  {cat.label}
                </a>
              ))}
            </div>

            {/* Product Grid */}
            <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[clamp(12px,2vw,32px)] transition-opacity duration-200 ${isFading ? "fade-out" : "fade-in"}`}>
              {activeCategory !== "breaker-series" && activeCategory !== "devices" && products.map((product, index) => (
                <div
                  key={product.name}
                  className={`stagger-item product-card ${product.hasLocalImage !== false ? 'bg-white' : 'bg-[#231F20]'} rounded-[20px] border-[1.5px] border-[#E8E8E8] overflow-hidden ${visibleItems.has(index) ? "visible" : ""}`}
                >
                  <div className={`${product.hasLocalImage !== false ? 'bg-[#F4F4F2]' : 'bg-[#231F20]'} aspect-square p-[clamp(16px,4vw,32px)] flex items-center justify-center relative overflow-hidden`}>
                    {product.hasLocalImage !== false ? (
                      product.images && product.images.length > 1 ? (
                        <>
                          <img 
                            src={product.images[productImageIndices[product.name] || 0]} 
                            alt={product.name} 
                            className="w-full h-full object-contain" 
                          />
                          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                            {product.images.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setProductImageIndices(prev => ({ ...prev, [product.name]: idx }))}
                                className={`w-2 h-2 rounded-full transition-all ${idx === (productImageIndices[product.name] || 0) ? 'bg-[#00B0CB]' : 'bg-[#231F20]/30'}`}
                              />
                            ))}
                          </div>
                          <button 
                            onClick={() => handlePrevImage(product.name, product.images!.length)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md transition-all z-10"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#231F20" strokeWidth="2">
                              <path d="M15 18l-6-6 6-6" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleNextImage(product.name, product.images!.length)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md transition-all z-10"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#231F20" strokeWidth="2">
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <img src={product.img} alt={product.name} className="w-full h-full object-contain" />
                      )
                    ) : (
                      <img src={LOGO_FALLBACK_URL} alt={product.name} className="w-[60%] h-auto object-contain opacity-90" />
                    )}
                  </div>
                  <div className="h-[1.5px] bg-[#E8E8E8] w-full"></div>
                  <div className="p-[clamp(12px,3vw,24px)]">
                    <span className={`block text-[clamp(9px,1vw,11px)] font-semibold ${product.hasLocalImage !== false ? 'text-[#00B0CB]' : 'text-[#00B0CB]'} uppercase tracking-widest mb-2`}>// {displayCategoryName}</span>
                    <h3 className={`text-[clamp(14px,1.5vw,18px)] font-bold ${product.hasLocalImage !== false ? 'text-[#231F20]' : 'text-white'} mb-[clamp(12px,2vw,24px)]`}>{product.name}</h3>
                    <div className="flex flex-col gap-2">
                      <Link 
                        to={`/product/${encodeURIComponent(product.name)}`}
                        className="w-full bg-[#231F20] text-white text-[13px] font-semibold py-3 rounded-lg hover:brightness-110 transition-all text-center block"
                      >
                        View Product
                      </Link>
                      {product.pdfUrl && (
                        <a 
                          href={product.pdfUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-full border-[1.5px] border-[#E8E8E8] text-[#888888] text-[13px] font-medium py-3 rounded-lg hover:bg-[#F9F9F7] transition-all text-center block"
                        >
                          Download PDF
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {(activeCategory === "breaker-series" || activeCategory === "devices") && (
                <div className="col-span-full py-24 flex items-center justify-center min-h-[300px]">
                  <p className="font-[Poppins] font-light text-[32px] text-[#AAAAAA] tracking-wide">Coming soon</p>
                </div>
              )}
            </div>

            {/* Footer of Section */}
            <div className="mt-20 pt-10 border-t border-[#E8E8E8] flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-[#231F20] text-[15px] font-medium">Can&apos;t find what you&apos;re looking for?</p>
              <a className="text-[#00B0CB] font-semibold hover:opacity-80 transition-opacity" href="https://factorled.pk" target="_blank" rel="noreferrer">Browse full catalog at factorled.pk →</a>
            </div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <section className="relative py-16 md:py-[120px] bg-black text-white overflow-hidden border-t border-white/10">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen">
            <source src="https://factorled.pk/wp-content/uploads/2026/01/FactorLed-Video.mp4" type="video/mp4" />
          </video>
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-[48px] relative z-10">
            <div className="max-w-[800px] mb-[56px]">
              <span className="font-[Poppins] font-medium text-[11px] text-[#00B0CB] tracking-[0.18em] block mb-4 uppercase">Technology</span>
              <h2 className="font-heading text-4xl md:text-5xl font-[800] text-white leading-tight">
                Lighting for <em className="italic font-light">every</em> need.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px]">
              <div className="p-[28px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                <Zap className="text-[#00B0CB] text-4xl mb-8" size={36} />
                <h3 className="font-heading font-extrabold text-2xl mb-4 text-white">High efficiency</h3>
                <p className="text-white/60 text-[16px] leading-[1.7]">Superior lumens per watt performance ensuring minimal energy waste and maximum brightness for industrial scale.</p>
              </div>
              <div className="p-[28px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                <BadgeCheck className="text-[#00B0CB] text-4xl mb-8" size={36} />
                <h3 className="font-heading font-extrabold text-2xl mb-4 text-white">Certified quality</h3>
                <p className="text-white/60 text-[16px] leading-[1.7]">Rigorous testing standards that exceed industry benchmarks for longevity and precise color accuracy.</p>
              </div>
              <div className="p-[28px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                <Settings2 className="text-[#00B0CB] text-4xl mb-8" size={36} />
                <h3 className="font-heading font-extrabold text-2xl mb-4 text-white">Smart optics</h3>
                <p className="text-white/60 text-[16px] leading-[1.7]">Advanced beam control technology designed to reduce glare and optimize light distribution across your floorplan.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Matching Screenshot Style */}
      <footer className="w-full bg-white">
        {/* Main Footer Content */}
        <div className="pt-16 pb-12 px-6 md:px-12 w-full max-w-screen-2xl mx-auto">
          {/* Centered Logo */}
          <div className="flex justify-center mb-12">
            <Link to="/">
              <Logo height={48} />
            </Link>
          </div>

          {/* Three Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* ABOUT FACTOR LED */}
            <div>
              <h4 className="font-[Poppins] font-semibold text-[13px] text-[#231F20] uppercase tracking-wider mb-6 border-b-2 border-[#00B0CB] pb-2 inline-block">About Factor LED</h4>
              <ul className="space-y-3">
                {[{label:'Our Story', href:'https://factorled.pk/about-us/'}, {label:'Blogs', href:'https://factorled.pk/blogs/'}, {label:'Quality Standards', href:'https://factorled.pk/quality-standards/'}, {label:'Mission & Vision', href:'https://factorled.pk/about-us/'}, {label:'Events & Exhibitions', href:'https://factorled.pk/events/'}].map(link => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noreferrer" className="text-[#231F20]/70 hover:text-[#00B0CB] transition-colors duration-200 text-[13px] font-[Poppins]">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* PARTNER WITH US */}
            <div>
              <h4 className="font-[Poppins] font-semibold text-[13px] text-[#231F20] uppercase tracking-wider mb-6 border-b-2 border-[#00B0CB] pb-2 inline-block">Partner With Us</h4>
              <ul className="space-y-3">
                {[{label:'Become a Distributor', to:'/contact'}, {label:'Corporate Projects', href:'https://factorled.pk/commercial-lighting/'}, {label:'Business Partnerships', to:'/contact'}].map(link => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link to={link.to} className="text-[#231F20]/70 hover:text-[#00B0CB] transition-colors duration-200 text-[13px] font-[Poppins]">{link.label}</Link>
                    ) : (
                      <a href={link.href} target="_blank" rel="noreferrer" className="text-[#231F20]/70 hover:text-[#00B0CB] transition-colors duration-200 text-[13px] font-[Poppins]">{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h4 className="font-[Poppins] font-semibold text-[13px] text-[#231F20] uppercase tracking-wider mb-6 border-b-2 border-[#00B0CB] pb-2 inline-block">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#00B0CB] mt-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </span>
                  <span className="text-[#231F20]/70 text-[13px] font-[Poppins]">Office # 805, 8th Floor, Star City Mall, Karachi.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#00B0CB]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </span>
                  <a href="tel:+923325555990" className="text-[#231F20]/70 hover:text-[#00B0CB] transition-colors duration-200 text-[13px] font-[Poppins]">+92 332 5555990</a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#00B0CB]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  <a href="mailto:info@factorled.pk" className="text-[#231F20]/70 hover:text-[#00B0CB] transition-colors duration-200 text-[13px] font-[Poppins]">info@factorled.pk</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Black Bottom Bar */}
        <div className="bg-[#231F20] py-4 px-6 md:px-12">
          <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-white/60 text-[12px] font-[Poppins]">Copyright 2026 Factor LED - All rights reserved.</span>
            <div className="flex gap-6">
              <a href="http://facebook.com/factorledpk" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#00B0CB] transition-colors duration-200">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="http://instagram.com/factorledpk" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#00B0CB] transition-colors duration-200">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/factorledpk" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#00B0CB] transition-colors duration-200">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
