"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion } from "motion/react";
import { Search, ArrowRight, RefreshCw, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { cn } from "@/lib/utils";

// Aurora Background Component - Inlined
interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col  h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900  text-slate-950 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            //   I'm sorry but this is what peak developer performance looks like // trigger warning
            className={cn(
              `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};

const categories = [
  { id: "all", label: "All" },
  { id: "architecture", label: "Architecture" },
  { id: "industrial", label: "Industrial" },
  { id: "energy saving", label: "Energy Saving" },
  { id: "awards", label: "Awards" },
  { id: "events", label: "Events" },
];

const blogPosts = [
  {
    id: 1,
    category: "Architecture",
    title: "Modern Lighting Trends in Architecture for 2026",
    excerpt: "Walk into a modern building today and you will notice something before you even realize it — the lighting. It is no longer just about making a space bright.",
    image: "https://factorled.pk/wp-content/uploads/2026/03/Modern-Lighting-Trends-in-Architecturefor-2026.webp",
    date: "March 13, 2026",
  },
  {
    id: 2,
    category: "Industrial",
    title: "Industrial Lighting: What Matters Most in Factories and Warehouses",
    excerpt: "In factories and warehouses, work does not slow down. Machines run, materials move, and people stay focused for long hours.",
    image: "https://factorled.pk/wp-content/uploads/2026/03/Industrial-Lighting-Blog.webp",
    date: "March 13, 2026",
  },
  {
    id: 3,
    category: "Energy Saving",
    title: "How to Reduce Electricity Bills with LED Lighting",
    excerpt: "Every month, the electricity bill arrives and instantly changes the mood. The good news is that reducing electricity bills does not always require big sacrifices.",
    image: "https://factorled.pk/wp-content/uploads/2026/03/Bill-Blog-img.webp",
    date: "March 13, 2026",
  },
  {
    id: 4,
    category: "Awards",
    title: "CEO Of the Year",
    excerpt: "Congratulations to our CEO Mr. Imran Bawany! Mr. Imran Bawany, CEO Factor LED, has been honored as the CEO of the year 2024.",
    image: "https://factorled.pk/wp-content/uploads/2020/09/final1.jpg",
    date: "November 8, 2024",
  },
  {
    id: 5,
    category: "Awards",
    title: "Consumer Choice Awards",
    excerpt: "Factor LED is proud to achieve the 17th Consumer Choice Award 2023, a tribute to our passion, creativity and dedication.",
    image: "https://factorled.pk/wp-content/uploads/2020/09/final2.jpg",
    date: "2023",
  },
  {
    id: 6,
    category: "Events",
    title: "IEEP Fair",
    excerpt: "We were honored to be a part of IEEEP fair 2023, one of the top-tier events for showcasing innovation and technology in the domain of electrical industry.",
    image: "https://factorled.pk/wp-content/uploads/2020/09/final3.jpg",
    date: "July 8, 2021",
  },
];

const featuredPost = {
  category: "ARCHITECTURE",
  date: "March 13, 2026",
  title: "Modern Lighting Trends in Architecture for 2026",
  excerpt: "Walk into a modern building today and you will notice something before you even realize it — the lighting. It is no longer just about making a space bright. Lighting has become part of the architecture itself.",
  image: "https://factorled.pk/wp-content/uploads/2026/03/Modern-Lighting-Trends-in-Architecturefor-2026.webp",
};

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f9f9f9] font-[Poppins]">
      <Navbar />

      {/* Hero Section with Aurora Background */}
      <AuroraBackground className="h-[70vh] min-h-[500px]" showRadialGradient={true}>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-6 items-center justify-center px-4 pt-20"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 text-center max-w-4xl drop-shadow-lg">
            The FactorLED Blog
          </h1>
          <p className="font-light text-base md:text-xl text-slate-700 max-w-2xl mx-auto text-center">Lighting insights, product updates & industry knowledge from Pakistan's leading LED engineering firm.</p>
          
          {/* Search Bar */}
          <div className="max-w-xl w-full mx-auto relative mt-8">
            <input
              type="text"
              placeholder="Search insights, technical guides, projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 border border-[#E8E8E8] focus:border-[#00B0CB] focus:ring-1 focus:ring-[#00B0CB] rounded-xl bg-white transition-all outline-none text-[#231F20]"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] w-5 h-5" />
          </div>
        </motion.div>
      </AuroraBackground>

      <main className="max-w-[1280px] mx-auto px-6 md:px-8 py-12">
        {/* Filters */}
        <section className="mb-12 overflow-x-auto whitespace-nowrap pb-4 scrollbar-hide flex gap-3" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              aria-selected={activeCategory === cat.id}
              role="tab"
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                activeCategory === cat.id
                  ? "bg-[#00B0CB] text-[#231F20]"
                  : "border border-[#E8E8E8] hover:border-[#00B0CB] text-[#555555]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </section>

        {/* Featured Post */}
        <section className="mb-16 group cursor-pointer relative overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white shadow-sm hover:shadow-lg transition-shadow">
          <div className="grid md:grid-cols-2">
            <div className="relative overflow-hidden h-[300px] md:h-[400px]">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6 bg-[#00B0CB] text-[#231F20] px-4 py-1.5 font-semibold text-xs rounded">
                {featuredPost.category}
              </div>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="font-semibold text-[#00B0CB] text-xs uppercase tracking-wider mb-4 block">
                FEATURED INSIGHT • {featuredPost.date}
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#231F20] mb-6 leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-[#888888] mb-8 line-clamp-3 text-base leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <Link
                to="#"
                className="flex items-center gap-2 font-semibold text-[#231F20] group-hover:text-[#00B0CB] transition-colors text-sm uppercase tracking-wider"
              >
                Read Article <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#00B0CB] group-hover:w-full transition-all duration-500"></div>
        </section>

        {/* Grid (3-col) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white border border-[#E8E8E8] rounded-xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 flex flex-col shadow-sm hover:shadow-lg"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-grow border-b-4 border-transparent group-hover:border-[#00B0CB] transition-all">
                <span className="text-xs font-semibold text-[#00B0CB] uppercase mb-2 block tracking-wider">
                  {post.category}
                </span>
                <h3 className="text-lg font-bold text-[#231F20] mb-3 group-hover:text-[#00B0CB] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-[#888888] text-sm line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* Pagination */}
        <div className="flex justify-center mb-16">
          <button className="flex items-center gap-3 px-8 py-4 border-2 border-[#231F20] text-[#231F20] font-semibold hover:bg-[#231F20] hover:text-white transition-all rounded-lg group text-sm uppercase tracking-wider">
            Load More Articles
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </main>

      {/* Newsletter Section */}
      <section className="bg-[#1a1a1a] text-white py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Engineering Insights In Your Inbox
            </h2>
            <p className="text-neutral-400 text-lg">
              Subscribe to receive technical guides, case studies, and the latest product launches from FactorLED.
            </p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your corporate email address"
                required
                className="flex-grow px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#00B0CB] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#00B0CB] hover:bg-[#00d0f0] text-[#231F20] px-8 py-4 font-semibold transition-all rounded-lg whitespace-nowrap"
              >
                SUBSCRIBE
              </button>
            </div>
            <p className="text-xs text-neutral-500">
              By subscribing, you agree to our Privacy Policy and terms of communication.
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
