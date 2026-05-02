/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Plus,
  Send,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Menu,
  X,
} from "lucide-react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HeroScrollSequence from "./components/HeroScrollSequence";
import { Logo } from "./components/Logo";
import { CategoryPage } from "./components/CategoryPage";
import { ProductPage } from "./components/ProductPage";
import ContactPage from "./components/ContactPage";
import { BlogPage } from "./components/BlogPage";

const LOGO_FALLBACK_URL = "https://factorled.pk/wp-content/uploads/2025/01/Factor-Logo-negative-01-scaled.png";

const CATEGORIES = [
  { name: "Residential", id: "01", img: "/Assets/product pics/TU-60.png", hasLocalImage: true, url: "https://factorled.pk/residential/" },
  { name: "Industrial", id: "02", img: "/Assets/product pics/13_Highbay1.jpg.jpeg", hasLocalImage: true, url: "https://factorled.pk/industrial/" },
  { name: "Architectural", id: "03", img: "/Assets/product pics/07_Architectural-Lighting1.jpg.jpeg", hasLocalImage: true, url: "https://factorled.pk/architectural/" },
  { name: "Commercial", id: "04", img: "/Assets/product pics/05_track-light1.jpg.jpeg", hasLocalImage: true, url: "https://factorled.pk/commercial-lighting/" },
  { name: "Premium", id: "05", img: "/Assets/product pics/elite.png", hasLocalImage: true, url: "https://factorled.pk/premium/" },
];

const SOLUTIONS = [
  { name: "Residential", label: "Lighting that feels natural at home", img: "https://factorled.pk/wp-content/uploads/2026/01/residential-lights-1-768x768.jpg", url: "https://factorled.pk/residential/" },
  { name: "Commercial", label: "Clean, balanced lighting for productivity", img: "https://factorled.pk/wp-content/uploads/2026/01/commercial-light-1-768x768.jpg", url: "https://factorled.pk/commercial-lighting/" },
  { name: "Industrial", label: "Built for demanding environments", img: "https://factorled.pk/wp-content/uploads/2026/01/industrial-light-1-768x768.jpg", url: "https://factorled.pk/industrial/" },
  { name: "Architectural", label: "Precise light for architectural spaces", img: "https://factorled.pk/wp-content/uploads/2026/01/commercial-lights-3-768x768.jpg", url: "https://factorled.pk/architectural/" },
];

const FAQS = [
  { question: "Why does manufacturing matter for lighting quality?", answer: "Good lighting starts at the manufacturing stage. By controlling how our products are made, we're able to ensure better consistency, durability, and overall performance." },
  { question: "How do we maintain quality across different products?", answer: "Every product follows the same quality standards. From assembly to final checks, we make sure each light meets our performance expectations before it reaches you." },
  { question: "How does Factor LED ensure long-term reliability?", answer: "We focus on doing the basics right — quality materials, controlled manufacturing, and careful testing. This helps our lighting perform consistently, not just on day one, but over time." },
  { question: "Will the brightness change after regular use?", answer: "Our lighting is designed to maintain steady brightness. You won't notice sudden drops or uneven light as time goes on, just consistent performance you can rely on." },
];

const BLOGS = [
  { title: "Modern Lighting Trends in Architecture for 2026", date: "MAR 15, 2026", excerpt: "Walk into a modern building today and you will notice something before you even realize it — the lighting.", img: "https://factorled.pk/wp-content/uploads/2026/03/Modern-Lighting-Trends-in-Architecturefor-2026.webp", url: "https://factorled.pk/modern-lighting-trends-in-architecturefor-2026/" },
  { title: "Industrial Lighting: What Matters Most in Factories and Warehouses", date: "MAR 10, 2026", excerpt: "In factories and warehouses, work does not slow down. Machines run, materials move, and people stay focused for long hours.", img: "https://factorled.pk/wp-content/uploads/2026/03/Industrial-Lighting-Blog.webp", url: "https://factorled.pk/industrial-lighting-what-matters-mostin-factories-and-warehouses/" },
  { title: "How to Reduce Electricity Bills with LED Lighting", date: "MAR 05, 2026", excerpt: "Every month, the electricity bill arrives and instantly changes the mood. Fans slow down, extra lights get switched off.", img: "https://factorled.pk/wp-content/uploads/2026/03/Bill-Blog-img.webp", url: "https://factorled.pk/how-to-reduce-electricity-billswith-led-lighting/" },
];

function FAQItem({ faq }: { faq: { question: string, answer: string } }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full font-[Poppins] font-600 text-[16px] flex justify-between items-center cursor-pointer text-[#231F20] text-left leading-snug"
      >
        {faq.question}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <Plus className="text-[#00B0CB]" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="mt-4 text-[#888888] font-[Poppins] font-300 leading-relaxed max-w-2xl">
          {faq.answer}
        </p>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const revealVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.55, 
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.06
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const revealVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.55, 
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.06
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-[#00B0CB] selection:text-[#231F20]">
      {/* Navbar */}
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

      {/* Hero Section */}
      <HeroScrollSequence>
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
          <div className="z-10 pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="label-technical mb-8 flex items-center gap-3"
            >
              <span className="w-2 h-2 bg-[#00B0CB] rounded-full animate-pulse-dot"></span>
              // PAKISTAN'S LED LIGHTING BRAND
            </motion.div>
            
            <h1 className="flex flex-col gap-2">
              <div className="overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-white"
                >
                  DISCOVER
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.28, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[#00B0CB] text-glow-brand italic font-[Poppins] font-300"
                >
                  BETTER
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.36, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-white"
                >
                  LIGHTING.
                </motion.span>
              </div>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 max-w-md hero-subheading leading-relaxed"
            >
              Not all lighting feels the same. At Factor LED, we design and manufacture lighting that looks better, performs better, and fits naturally into modern spaces.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center"
            >
              <button className="btn-primary w-full sm:w-auto">
                View Collection
              </button>
              <button className="btn-secondary w-full sm:w-auto">
                Our Story
              </button>
            </motion.div>

            {/* Hero Stats Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14 flex gap-10 border-t border-white/15 pt-8"
            >
              <div>
                <div className="label-technical text-[10px] text-white/60">Founded</div>
                <div className="font-[Poppins] font-700 text-lg text-white">Est. 2010</div>
              </div>
              <div>
                <div className="label-technical text-[10px] text-white/60">Range</div>
                <div className="font-[Poppins] font-700 text-lg text-white">15 Product Lines</div>
              </div>
              <div>
                <div className="label-technical text-[10px] text-white/60">Reach</div>
                <div className="font-[Poppins] font-700 text-lg text-white">Nationwide</div>
              </div>
            </motion.div>
          </div>
          
          <div className="hidden lg:block pointer-events-none w-full h-full"></div>
        </div>
      </HeroScrollSequence>

      {/* Full Width Video Section */}
      <div className="w-full pt-[120px] bg-white">
        <section className="relative w-full h-[70vh] md:h-screen overflow-hidden bg-white">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          >
            <source src="https://factorled.pk/wp-content/uploads/2026/03/FactorLED-BVC-Video-fnf.mp4" type="video/mp4" />
          </video>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/20"
          >
            <motion.span variants={itemVariants} className="label-technical">// Visual Experience</motion.span>
            <motion.h2 variants={itemVariants} className="mt-4 text-center px-6">The Factor Motion</motion.h2>
          </motion.div>
          <div className="absolute inset-0 border border-[#E8E8E8] pointer-events-none"></div>
        </section>
      </div>

      {/* Ticker */}
      <div className="bg-[#00B0CB] py-4 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="flex gap-12 items-center text-[#231F20] font-[Poppins] font-500 text-[11px] tracking-[0.18em] uppercase animate-marquee shrink-0" style={{willChange: 'transform'}}>
            <span>RESIDENTIAL</span><span className="w-1.5 h-1.5 bg-[#231F20] rounded-full opacity-40"></span>
            <span>COMMERCIAL</span><span className="w-1.5 h-1.5 bg-[#231F20] rounded-full opacity-40"></span>
            <span>INDUSTRIAL</span><span className="w-1.5 h-1.5 bg-[#231F20] rounded-full opacity-40"></span>
            <span>ARCHITECTURAL</span><span className="w-1.5 h-1.5 bg-[#231F20] rounded-full opacity-40"></span>
            <span>STREET LIGHTING</span><span className="w-1.5 h-1.5 bg-[#231F20] rounded-full opacity-40"></span>
            <span>ENERGY EFFICIENT</span><span className="w-1.5 h-1.5 bg-[#231F20] rounded-full opacity-40"></span>
            <span>NATIONWIDE DISTRIBUTION</span><span className="w-1.5 h-1.5 bg-[#231F20] rounded-full opacity-40"></span>
            <span>PAKISTAN'S LED BRAND</span><span className="w-1.5 h-1.5 bg-[#231F20] rounded-full opacity-40"></span>
          </div>
          <div className="flex gap-12 items-center text-[#231F20] font-[Poppins] font-500 text-[11px] tracking-[0.18em] uppercase animate-marquee shrink-0" aria-hidden="true" style={{willChange: 'transform'}}>
            <span>RESIDENTIAL</span><span className="w-1.5 h-1.5 bg-[#231F20] rounded-full opacity-40"></span>
            <span>COMMERCIAL</span><span className="w-1.5 h-1.5 bg-[#231F20] rounded-full opacity-40"></span>
            <span>INDUSTRIAL</span><span className="w-1.5 h-1.5 bg-[#231F20] rounded-full opacity-40"></span>
            <span>ARCHITECTURAL</span><span className="w-1.5 h-1.5 bg-[#231F20] rounded-full opacity-40"></span>
            <span>STREET LIGHTING</span><span className="w-1.5 h-1.5 bg-[#231F20] rounded-full opacity-40"></span>
            <span>ENERGY EFFICIENT</span><span className="w-1.5 h-1.5 bg-[#231F20] rounded-full opacity-40"></span>
            <span>NATIONWIDE DISTRIBUTION</span><span className="w-1.5 h-1.5 bg-[#231F20] rounded-full opacity-40"></span>
            <span>PAKISTAN'S LED BRAND</span><span className="w-1.5 h-1.5 bg-[#231F20] rounded-full opacity-40"></span>
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <section id="products" className="py-24 bg-white">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
          className="container mx-auto px-6 md:px-12"
        >
          <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <motion.div variants={itemVariants}>
              <span className="label-technical">// Product Categories</span>
              <h2 className="mt-3">Lighting for every need.</h2>
            </motion.div>
            <motion.div variants={itemVariants} className="font-[Poppins] font-300 italic text-xl max-w-xs md:text-right text-[#888888]">
              A comprehensive range of high-performance illumination.
            </motion.div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-[clamp(12px,2vw,32px)]">
            {CATEGORIES.map((cat) => (
              <motion.a
                key={cat.id}
                href={cat.url}
                target="_blank"
                rel="noreferrer"
                variants={itemVariants}
                className={`group block border border-[#E8E8E8] p-[clamp(12px,2vw,24px)] rounded-[20px] overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  cat.hasLocalImage ? 'bg-white' : 'bg-[#231F20]'
                }`}
              >
                <div className={`h-[clamp(180px,20vw,280px)] flex items-center justify-center mb-[clamp(12px,2vw,24px)] overflow-hidden rounded-lg ${
                  cat.hasLocalImage ? '' : 'bg-[#231F20]'
                }`}>
                  {cat.hasLocalImage ? (
                    <img 
                      src={cat.img} 
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <img 
                      src={LOGO_FALLBACK_URL} 
                      alt={cat.name}
                      className="w-[60%] h-auto object-contain opacity-90"
                    />
                  )}
                </div>
                <div className={`label-technical text-[clamp(9px,1vw,11px)] mb-2 ${cat.hasLocalImage ? '' : 'text-[#00B0CB]'}`}>Category {cat.id}</div>
                <h3 className={`font-[Poppins] font-600 text-[clamp(14px,1.5vw,18px)] mt-1 ${
                  cat.hasLocalImage ? 'text-[#231F20]' : 'text-white'
                }`}>{cat.name}</h3>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Space Solutions */}
      <section id="solutions" className="section-padding bg-[#F9F9F7]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
          className="container mx-auto px-6 md:px-12"
        >
          <motion.div variants={itemVariants} className="mb-16">
            <span className="label-technical">// Solutions</span>
            <h2 className="mt-3">The right light for every space.</h2>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {SOLUTIONS.map((sol) => (
              <motion.div 
                key={sol.name} 
                variants={itemVariants}
                className="bg-white p-2 group overflow-hidden shadow-sm card-hover"
              >
                <div className="relative h-96 overflow-hidden">
                  <img 
                    src={sol.img} 
                    alt={sol.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="p-6">
                  <h4>{sol.name}</h4>
                  <p className="mt-2 label-technical text-[10px] opacity-80">{sol.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Cinematic Banner */}
      <section className="relative h-[600px] md:h-[800px] flex items-center overflow-hidden">
        <img 
          src="https://factorled.pk/wp-content/uploads/2026/01/sales-service-image.jpg" 
          alt="Factor LED Quality"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/96 via-white/65 to-transparent"></div>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
          className="container mx-auto px-6 md:px-12 relative z-10"
        >
          <div className="max-w-2xl">
            <motion.span variants={itemVariants} className="label-technical">// Quality Assurance</motion.span>
            <motion.h2 variants={itemVariants} className="mt-4 leading-tight">Quality That Shows in Every Switch On.</motion.h2>
            <motion.p variants={itemVariants} className="mt-8 text-[#888888] text-lg max-w-lg font-[Poppins] font-300">
              Built with care so your lighting stays reliable from the first use to long-term operation. Quality materials, controlled manufacturing, and consistent testing.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-12">
              <a href="https://factorled.pk/quality-standards/" target="_blank" rel="noreferrer" className="btn-primary inline-block">
                Our Quality Standards
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FAQ & Blog */}
      <section id="curation" className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* FAQ */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
            >
              <motion.span variants={itemVariants} className="label-technical block mb-4">// Common Questions</motion.span>
              <motion.h2 variants={itemVariants} className="mb-10">Questions worth asking.</motion.h2>
              <div className="space-y-8">
                {FAQS.map((faq, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    className="border-b border-[#E8E8E8] pb-8"
                  >
                    <FAQItem faq={faq} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Blog */}
            <motion.div 
              id="journal"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
            >
              <motion.div variants={itemVariants} className="flex justify-between items-center mb-12">
                <span className="label-technical block mb-4">// Insights</span>
                <h2 className="mb-0">From the Factor LED blog.</h2>
                <a href="https://factorled.pk/blogs/" className="label-technical hover:opacity-70 transition-opacity">View All →</a>
              </motion.div>
              <div className="space-y-12">
                {BLOGS.map((blog, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    className="flex flex-col md:flex-row gap-8 items-start group"
                  >
                    <div className="w-full md:w-32 h-32 shrink-0 overflow-hidden bg-[#F4F4F2] rounded-lg">
                      <img 
                        src={blog.img} 
                        alt={blog.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <span className="label-technical text-[10px] text-[#AAAAAA]">{blog.date}</span>
                      <a href={blog.url} target="_blank" rel="noreferrer"><h4 className="group-hover:text-[#00B0CB] transition-colors duration-200 font-[Poppins] font-600">{blog.title}</h4></a>
                      <p className="text-[#888888] text-sm mt-2 font-[Poppins] font-300 line-clamp-2">{blog.excerpt}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
