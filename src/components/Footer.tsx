import { Link } from "react-router-dom";
import { Logo } from "./Logo";

interface FooterProps {
  variant?: "light" | "dark";
}

export function Footer({ variant = "light" }: FooterProps) {
  const isDark = variant === "dark";

  if (isDark) {
    return (
      <footer className="bg-[#231F20] w-full pt-[120px] pb-10 border-t border-white/10 shadow-none">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-[1320px] mx-auto px-12">
          <div className="space-y-6">
            <div className="text-lg font-bold text-white uppercase tracking-tighter">Factor LED</div>
            <p className="text-white/60 font-['Poppins'] font-light text-sm leading-relaxed max-w-[280px]">
              Quality lighting solutions for every sector. Engineered for reliability and high value in Pakistan.
            </p>
            <p className="text-white/30 text-xs mt-4">Office #805, 8th Floor, Star City Mall, Karachi, Pakistan.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-[#00B0CB] font-semibold text-sm">Quick Links</h4>
            <ul className="space-y-2">
              <li><a className="text-white/60 hover:text-[#00B0CB] transition-all font-light text-sm" href="https://factorled.pk/">Shop</a></li>
              <li><a className="text-white/60 hover:text-[#00B0CB] transition-all font-light text-sm" href="https://factorled.pk/blogs/">Blogs</a></li>
              <li><a className="text-white/60 hover:text-[#00B0CB] transition-all font-light text-sm" href="https://factorled.pk/contact-us/">Contact Us</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[#00B0CB] font-semibold text-sm">Social Presence</h4>
            <ul className="space-y-2">
              <li><a className="text-white/60 hover:text-[#00B0CB] transition-all font-light text-sm" href="http://facebook.com/factorledpk">Facebook</a></li>
              <li><a className="text-white/60 hover:text-[#00B0CB] transition-all font-light text-sm" href="http://instagram.com/factorledpk">Instagram</a></li>
              <li><a className="text-white/60 hover:text-[#00B0CB] transition-all font-light text-sm" href="https://www.linkedin.com/company/factorledpk">LinkedIn</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[#00B0CB] font-semibold text-sm">Contact Support</h4>
            <div className="flex items-center gap-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span className="text-white/80 font-medium text-sm">+92 332 5555990</span>
            </div>
            <div className="flex items-center gap-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span className="text-white/80 font-medium text-sm">info@factorled.pk</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1320px] mx-auto px-12 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-[11px] uppercase tracking-widest font-medium">© 2026 Factor LED. Karachi, Pakistan. carries all sectors</p>
          <div className="flex gap-6">
            <a className="text-white/20 hover:text-white transition-colors text-[11px]" href="#">Privacy Policy</a>
            <a className="text-white/20 hover:text-white transition-colors text-[11px]" href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    );
  }

  return (
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
              {[{label:'Become a Distributor', href:'https://factorled.pk/contact-us/'}, {label:'Corporate Projects', href:'https://factorled.pk/commercial-lighting/'}, {label:'Business Partnerships', href:'https://factorled.pk/contact-us/'}].map(link => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noreferrer" className="text-[#231F20]/70 hover:text-[#00B0CB] transition-colors duration-200 text-[13px] font-[Poppins]">{link.label}</a>
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
  );
}
