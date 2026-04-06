import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

interface NavbarProps {
  variant?: "light" | "dark";
}

export function Navbar({ variant = "light" }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = variant === "dark";
  const bgClass = isDark
    ? "bg-[#231F20] border-b border-white/10"
    : scrolled
    ? "bg-white backdrop-blur-xl border-b border-[#E8E8E8] py-4"
    : "bg-white py-5";

  const textClass = isDark ? "text-white/60 hover:text-white" : "text-[#231F20]/60 hover:text-[#231F20]";
  const logoFilter = isDark ? "brightness-0 invert" : "";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${bgClass}`}>
      <div className="flex justify-between items-center px-6 md:px-12 w-full max-w-screen-2xl mx-auto">
        <div className="flex items-center">
          <Link to="/">
            <Logo height={48} className={`h-10 md:h-12 ${logoFilter}`} />
          </Link>
        </div>

        <div className="hidden md:flex gap-12 items-center">
          {[
            { label: "Residential", href: "https://factorled.pk/residential/" },
            { label: "Commercial", href: "https://factorled.pk/commercial-lighting/" },
            { label: "Industrial", href: "https://factorled.pk/industrial/" },
            { label: "About Us", href: "https://factorled.pk/about-us/" },
            { label: "Contact", href: "https://factorled.pk/contact-us/" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`${textClass} transition-colors duration-200 font-[Poppins] font-medium text-[13px] tracking-wide`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-[#00B0CB] text-[#231F20] px-6 md:px-8 py-3 font-[Poppins] font-600 text-[13px] rounded-full hover:bg-[#0099B2] hover:shadow-[0_0_20px_rgba(0,176,203,0.3)] transition-all duration-200">
            Catalog
          </button>
          <button
            className={`md:hidden ${isDark ? "text-white" : "text-[#231F20]"}`}
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
            { label: "Home", to: "/" },
            { label: "About Us", href: "https://factorled.pk/about-us/" },
            { label: "Categories", to: "/category" },
            { label: "Blogs", href: "#journal" },
            { label: "Gallery", href: "https://factorled.pk/gallery/" },
            { label: "Events", href: "https://factorled.pk/events/" },
            { label: "Contact", href: "https://factorled.pk/contact-us/" },
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
          <motion.a
            href="https://factorled.pk/contact-us/"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-8 bg-[#00B0CB] text-[#231F20] px-10 py-4 font-[Poppins] font-bold text-sm tracking-widest uppercase"
          >
            Get a Quote
          </motion.a>
        </motion.div>
      )}
    </nav>
  );
}
