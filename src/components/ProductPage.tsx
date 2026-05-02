import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { Thermometer, ZapOff, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Logo } from "./Logo";
import { Navbar } from "./Navbar";

// Product data from CategoryPage - flattened for lookup
interface Product {
  name: string;
  img: string;
  url: string;
  pdfUrl?: string;
  hasLocalImage?: boolean;
  images?: string[];
  category?: string;
}

const LOGO_FALLBACK_URL = "https://factorled.pk/wp-content/uploads/2025/01/Factor-Logo-negative-01-scaled.png";

const productsData: Record<string, Product[] | null> = {
  "cob-series": [
    { name: "COB Lums", img: "/Assets/product pics/02_cob-light1.jpg.jpeg", url: "https://factorled.pk/product/cob-lums/", pdfUrl: "https://factorled.pk/wp-content/uploads/2026/01/COB-LUMS.pdf", hasLocalImage: true, category: "COB Series" },
    { name: "SASA", img: "/Assets/product pics/Sasa.png", url: "https://factorled.pk/product/sasa/", hasLocalImage: true, category: "COB Series" },
    { name: "C Series", img: "/Assets/product pics/c.jpg", url: "https://factorled.pk/product/c-series/", hasLocalImage: true, category: "COB Series" }
  ],
  "downlights": [
    { name: "Alkor", img: "/Assets/product pics/Alkore Downlight.png", url: "https://factorled.pk/product/alkor/", hasLocalImage: true, category: "Downlights" },
    { name: "Glow", img: "/Assets/product pics/Glow Lightks.png", url: "https://factorled.pk/product/glow/", hasLocalImage: true, category: "Downlights" },
    { name: "Range (Downlight)", img: "/Assets/product pics/06_star-downlight1.jpg.jpeg", url: "https://factorled.pk/product/range/", hasLocalImage: true, category: "Downlights" },
    { name: "Star", img: "/Assets/product pics/STAR.png", url: "https://factorled.pk/product/star/", hasLocalImage: true, category: "Downlights" }
  ],
  "mercury-series": [
    { name: "Mercury Circle Series", img: "/Assets/product pics/Mercury Circle.png", url: "https://factorled.pk/product/mercury-circle-series/", hasLocalImage: true, category: "Mercury Series" },
    { name: "Mercury Square Series", img: "/Assets/product pics/03_Mercury-Series1.jpg.jpeg", url: "https://factorled.pk/product/mercury-square-series/", hasLocalImage: true, category: "Mercury Series" },
    { name: "Mercury Surface", img: "/Assets/product pics/Mercury Surface light.png", url: "https://factorled.pk/product/mercury-surface/", hasLocalImage: true, category: "Mercury Series" }
  ],
  "dc-series": [
    { name: "DC Solo Bulb", img: "/Assets/product pics/solo.jpg", url: "https://factorled.pk/product/dc-bulb/", hasLocalImage: true, category: "DC Series" },
    { name: "Orion DC", img: "/Assets/product pics/orient-dc.jpg", url: "https://factorled.pk/product/orion-dc/", hasLocalImage: true, category: "DC Series" }
  ],
  "led-bulbs": [
    { name: "Blaz", img: "/Assets/product pics/Blaz.jpg", url: "https://factorled.pk/product/blaz/", hasLocalImage: true, category: "LED Bulbs" },
    { name: "Lomo", img: "/Assets/product pics/lomo.jpg", url: "https://factorled.pk/product/lomo/", hasLocalImage: true, category: "LED Bulbs" },
    { name: "Range Bulb", img: "/Assets/product pics/Range-copy.jpg", url: "https://factorled.pk/product/range-bulb/", hasLocalImage: true, category: "LED Bulbs" }
  ],
  "tubelights": [
    { name: "M Series", img: "/Assets/product pics/M3 Light 2.png", url: "https://factorled.pk/product/m-series/", hasLocalImage: true, category: "Tubelights" },
    { name: "TU Series", img: "/Assets/product pics/TU-60.png", url: "https://factorled.pk/product/tu-series/", hasLocalImage: true, category: "Tubelights" },
    { name: "Zeno", img: "/Assets/product pics/Zeno Tube light With shadow.png", url: "https://factorled.pk/product/zeno/", hasLocalImage: true, category: "Tubelights" }
  ],
  "flood-lights": [
    { name: "Mars Series (30W-200W)", img: "/Assets/product pics/Mars-Series-MARS-200-watts.png", url: "https://factorled.pk/product/mars-series/", hasLocalImage: true, category: "Flood Lights" },
    { name: "Venus Series", img: "/Assets/product pics/09_Flood-Lights1.jpg.jpeg", url: "https://factorled.pk/product/venus-series/", hasLocalImage: true, category: "Flood Lights" },
    { name: "RGB Reflector Flood Lights", img: "/Assets/product pics/RGB Flood Light AD.png", url: "https://factorled.pk/product/rgb-reflector-flood-lights/", hasLocalImage: true, category: "Flood Lights" }
  ],
  "track-lights": [
    { name: "Tracks", img: "/Assets/product pics/05_track-light1.jpg.jpeg", url: "https://factorled.pk/product/tracks/", hasLocalImage: true, category: "Track Lights" },
    { name: "Track Light", img: LOGO_FALLBACK_URL, url: "https://factorled.pk/product/track-light/", hasLocalImage: false, category: "Track Lights" }
  ],
  "industrial-lighting": [
    { name: "Highbay", img: "/Assets/product pics/13_Highbay1.jpg.jpeg", url: "https://factorled.pk/product/highbay/", pdfUrl: "https://factorled.pk/wp-content/uploads/2026/01/HIGHBAY.pdf", hasLocalImage: true, category: "Industrial Lighting" }
  ],
  "panel-lights": [
    { name: "PL-5", img: "/Assets/product pics/PL-5.png", url: "https://factorled.pk/product/pl-5/", hasLocalImage: true, category: "Panel Lights" },
    { name: "PL-14", img: "/Assets/product pics/PL-14.png", url: "https://factorled.pk/product/pl-14/", hasLocalImage: true, category: "Panel Lights" }
  ],
  "street-lights": [
    { name: "Solar Street Light", img: "/Assets/product pics/Solar Street Light.png", url: "https://factorled.pk/product/solar-street-light/", hasLocalImage: true, category: "Street Lights" },
    { name: "St Light", img: "/Assets/product pics/1. ST 50.png", url: "https://factorled.pk/product/st-light/", hasLocalImage: true, category: "Street Lights" },
    { name: "Serene Street Light", img: "/Assets/product pics/Serene ST - 50 02.png", url: "https://factorled.pk/product/serene-street-light/", hasLocalImage: true, category: "Street Lights" }
  ],
  "architectural-lighting": [
    { name: "Glossy", img: "/Assets/product pics/Gleam.png", url: "https://factorled.pk/product/glossy/", hasLocalImage: true, category: "Architectural Lighting" },
    { name: "Profile Light", img: LOGO_FALLBACK_URL, url: "https://factorled.pk/product/profile-light/", hasLocalImage: false, category: "Architectural Lighting" },
    { name: "Lazer Blade Light", img: "/Assets/product pics/07_Architectural-Lighting1.jpg.jpeg", url: "https://factorled.pk/product/lazer-blade-light/", hasLocalImage: true, category: "Architectural Lighting" },
    { name: "Linear LED Light", img: LOGO_FALLBACK_URL, url: "https://factorled.pk/product/linear-led-light/", hasLocalImage: false, category: "Architectural Lighting" }
  ],
  "premium-products": [
    { name: "Tubix", img: "/Assets/product pics/Tubix.png", url: "https://factorled.pk/product/tubix/", hasLocalImage: true, category: "Premium Products" },
    { name: "Lux", img: LOGO_FALLBACK_URL, url: "https://factorled.pk/product/lux/", hasLocalImage: false, category: "Premium Products" },
    { name: "Optima", img: LOGO_FALLBACK_URL, url: "https://factorled.pk/product/optima/", hasLocalImage: false, category: "Premium Products" },
    { name: "Elite", img: "/Assets/product pics/elite.png", url: "https://factorled.pk/product/elite/", hasLocalImage: true, category: "Premium Products" },
    { name: "Premium Solar Street Light", img: "/Assets/product pics/Solar Street Light.png", url: "https://factorled.pk/product/premium-solar-street-light/", hasLocalImage: true, category: "Premium Products" },
    { name: "Hile Flood Light", img: LOGO_FALLBACK_URL, url: "https://factorled.pk/product/hile-flood-light/", hasLocalImage: false, category: "Premium Products" },
    { name: "Hila Street Light", img: LOGO_FALLBACK_URL, url: "https://factorled.pk/product/hila-street-light/", hasLocalImage: false, category: "Premium Products" }
  ],
  "pvc-tapes": [
    { name: "Match", img: "/Assets/product pics/15_PVC-Tapes1.jpg.jpeg", url: "https://factorled.pk/product/match/", hasLocalImage: true, category: "PVC Tapes", images: ["/Assets/product pics/tape/1.jpg", "/Assets/product pics/tape/2-1.jpg", "/Assets/product pics/tape/3-1.jpg", "/Assets/product pics/tape/4-1.jpg", "/Assets/product pics/tape/5.jpg"] },
    { name: "Klas", img: "/Assets/product pics/KLas.jpg", url: "https://factorled.pk/product/klas/", hasLocalImage: true, category: "PVC Tapes", images: ["/Assets/product pics/tape/KLas.jpg"] }
  ],
  "breaker-series": [
    { name: "Miniature Circuit Breaker Series (MCB)", img: "/Assets/product pics/12_Breaker-Series1.jpg.jpeg", url: "https://factorled.pk/product/miniature-circuit-breaker-series-mcb/", hasLocalImage: true, category: "Breaker Series" },
    { name: "Surge Protection Device (SPD)", img: LOGO_FALLBACK_URL, url: "https://factorled.pk/product/surge-protection-device-spd/", hasLocalImage: false, category: "Breaker Series" }
  ],
  "devices": [
    { name: "VAKWH Voltage Protector", img: LOGO_FALLBACK_URL, url: "https://factorled.pk/product/vakwh-voltage-protector/", hasLocalImage: false, category: "Devices" },
    { name: "Hear Aerosol Fire Extinguisher Device", img: LOGO_FALLBACK_URL, url: "https://factorled.pk/product/hear-aerosol-fire-extinguisher-device/", hasLocalImage: false, category: "Devices" }
  ]
};

// Flatten all products into a single array for lookup
const allProducts = Object.values(productsData).flatMap(arr => arr || []);

interface ProductSpec {
  label: string;
  value: string;
  highlight?: boolean;
}

interface RelatedProduct {
  name: string;
  category: string;
  wattage: string;
  image: string;
  url: string;
}

// Smart matching logic for related products
function generateRelatedProducts(currentProductName: string, currentCategory: string): RelatedProduct[] {
  // Define category relationships for smart matching
  const categoryGroups: Record<string, string[]> = {
    "COB Series": ["COB Series", "Downlights", "Track Lights"],
    "Downlights": ["Downlights", "COB Series", "Panel Lights"],
    "Track Lights": ["Track Lights", "COB Series", "Architectural Lighting"],
    "Panel Lights": ["Panel Lights", "Downlights", "Architectural Lighting"],
    "Architectural Lighting": ["Architectural Lighting", "Track Lights", "Panel Lights", "Premium Products"],
    "LED Bulbs": ["LED Bulbs", "DC Series", "Tubelights"],
    "Tubelights": ["Tubelights", "LED Bulbs", "Panel Lights"],
    "Flood Lights": ["Flood Lights", "Street Lights", "Industrial Lighting"],
    "Street Lights": ["Street Lights", "Flood Lights", "Industrial Lighting"],
    "Industrial Lighting": ["Industrial Lighting", "Flood Lights", "Street Lights"],
    "Mercury Series": ["Mercury Series", "Panel Lights", "Downlights"],
    "Premium Products": ["Premium Products", "Architectural Lighting", "COB Series"],
    "PVC Tapes": ["PVC Tapes"],
    "Breaker Series": ["Breaker Series", "Devices"],
    "Devices": ["Devices", "Breaker Series"]
  };

  // Get related categories
  const relatedCategories = categoryGroups[currentCategory] || [currentCategory];
  
  // Find products in related categories
  let candidates = allProducts.filter(p => {
    if (p.name === currentProductName) return false;
    // Match by category
    if (relatedCategories.includes(p.category || "")) return true;
    // Match by name characteristics (e.g., "COB" in name)
    if (currentProductName.toLowerCase().includes("cob") && p.name.toLowerCase().includes("cob")) return true;
    if (currentProductName.toLowerCase().includes("round") && p.name.toLowerCase().includes("round")) return true;
    if (currentProductName.toLowerCase().includes("surface") && p.name.toLowerCase().includes("surface")) return true;
    return false;
  });

  // If not enough related products, add random ones from same category
  if (candidates.length < 4) {
    const sameCategory = allProducts.filter(p => 
      p.category === currentCategory && 
      p.name !== currentProductName &&
      !candidates.find(c => c.name === p.name)
    );
    candidates = [...candidates, ...sameCategory];
  }

  // If still not enough, add any other products
  if (candidates.length < 4) {
    const others = allProducts.filter(p => 
      p.name !== currentProductName &&
      !candidates.find(c => c.name === p.name)
    );
    candidates = [...candidates, ...others];
  }

  // Shuffle and take 4
  const shuffled = [...candidates].sort(() => 0.5 - Math.random()).slice(0, 4);
  
  return shuffled.map(p => ({
    name: p.name,
    category: p.category || "Factor LED",
    wattage: "From " + ["7W", "10W", "15W", "20W", "30W"][Math.floor(Math.random() * 5)],
    image: p.hasLocalImage ? (p.images?.[0] || p.img) : p.img,
    url: p.url
  }));
}

// Generate dynamic specs based on product name
function generateSpecs(productName: string): ProductSpec[] {
  const wattages = ["10W", "15W", "20W", "30W", "50W", "100W", "150W", "200W"];
  const randomWattage = wattages[Math.floor(Math.random() * wattages.length)];
  
  return [
    { label: "IP Rating", value: productName.includes("Street") || productName.includes("Flood") ? "IP65 (Outdoor Use)" : "IP20 (Indoor Use)", highlight: true },
    { label: "Beam Angle", value: productName.includes("COB") || productName.includes("Track") ? "24° / 36° / 60°" : "120° Wide Beam" },
    { label: "Housing Material", value: "Die-cast Aluminum" },
    { label: "Input Voltage", value: productName.includes("DC") ? "DC 12V" : "AC 220-240V" },
    { label: "Lifespan", value: "50,000 Hours" },
    { label: "Wattage", value: randomWattage },
  ];
}

// Generate dynamic features based on product name
function generateFeatures(productName: string) {
  const features = [
    { icon: "thermostat" as const, title: "Advanced Heat Dissipation", description: "Precision cooling fins for extended hardware life." },
    { icon: "flash_off" as const, title: "Flicker-Free Driver", description: "Consistent light output for eye comfort." },
  ];
  
  if (productName.includes("Street") || productName.includes("Flood")) {
    features.push({ icon: "thermostat" as const, title: "Weather Resistant", description: "Built to withstand harsh outdoor conditions." });
  }
  
  if (productName.includes("Solar")) {
    features.push({ icon: "flash_off" as const, title: "Solar Powered", description: "Energy efficient with integrated solar panel." });
  }
  
  return features;
}

export function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const [activeTab, setActiveTab] = useState<"features" | "applications">("features");

  // Decode the product name from URL
  const decodedProductName = useMemo(() => {
    return productId ? decodeURIComponent(productId) : "";
  }, [productId]);

  // Find the product from our data
  const product = useMemo(() => {
    return allProducts.find(p => p.name === decodedProductName);
  }, [decodedProductName]);

  // Generate dynamic data based on the found product
  const productData = useMemo(() => {
    if (!product) {
      return null;
    }

    return {
      name: product.name,
      image: product.hasLocalImage ? (product.images?.[0] || product.img) : product.img,
      category: product.category || "Professional Series",
      description: `Engineered for architectural excellence, the ${product.name} provides unparalleled precision lighting. Designed to integrate seamlessly into modern commercial and residential environments.`,
      wattageRange: "10W — 30W",
      cctOptions: "3000K, 4000K, 6500K",
      specs: generateSpecs(product.name),
      features: generateFeatures(product.name),
      relatedProducts: generateRelatedProducts(product.name, product.category || ""),
      pdfUrl: product.pdfUrl
    };
  }, [product]);

  const scrollRelatedProducts = (direction: "left" | "right") => {
    const container = document.getElementById("related-products-scroll");
    if (container) {
      const scrollAmount = 340;
      container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  // 404 State - Product not found
  if (!productData) {
    return (
      <div className="min-h-screen bg-white text-[#231F20] font-sans selection:bg-[#00B0CB] selection:text-white">
        <Navbar />

        <main className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center px-6">
            <h1 className="text-6xl md:text-8xl font-bold text-[#00B0CB] mb-6">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-[#231F20] mb-4">Product Not Found</h2>
            <p className="text-black/50 text-lg mb-8 max-w-md mx-auto">
              We couldn't find "{decodedProductName}". The product may have been removed or the URL might be incorrect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/category" className="bg-[#00B0CB] text-white px-8 py-4 rounded-full font-bold hover:bg-[#0099B2] transition-all">
                Browse All Products
              </Link>
              <Link to="/" className="border border-black/20 text-[#231F20] px-8 py-4 rounded-full font-bold hover:border-[#00B0CB] hover:text-[#00B0CB] transition-all">
                Go Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#231F20] font-sans selection:bg-[#00B0CB] selection:text-white overflow-x-hidden">
      <style>{`
        .glass-card {
          background: rgba(0, 0, 0, 0.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.08);
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <Navbar />

      <main className="pt-24 overflow-x-hidden">
        {/* Hero Section */}
        <section className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-20 min-h-0 md:min-h-[819px] flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Left: Product Image */}
          <div className="w-full md:w-[55%] lg:w-[60%] relative group order-1">
            <div className="absolute -inset-4 bg-[#00B0CB]/10 blur-[120px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
            <div className="relative bg-black/5 rounded-[20px] md:rounded-[30px] lg:rounded-[40px] p-4 sm:p-6 md:p-8 lg:p-12 border border-black/10 backdrop-blur-sm overflow-hidden">
              <img
                src={productData.image}
                alt={productData.name}
                className="w-full h-auto max-h-[50vh] md:max-h-none object-contain mix-blend-multiply scale-110 group-hover:scale-115 transition-transform duration-1000"
              />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full md:w-[45%] lg:w-[40%] space-y-4 md:space-y-6 lg:space-y-8 order-2">
            <div>
              <span className="text-[#00B0CB] font-medium text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-2 md:mb-4 block">{productData.category}</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter mb-2 leading-none text-[#231F20]">{productData.name}</h1>
              <p className="text-[#00B0CB]/80 italic font-light text-sm sm:text-base md:text-lg">Factor carries all sectors</p>
            </div>
            <p className="text-black/50 text-sm sm:text-base md:text-lg leading-relaxed font-light">
              {productData.description}
            </p>
          </div>
        </section>

        {/* Details/Features/Downloads Tabs */}
        <section className="bg-black/5 border-y border-black/5 py-6 md:py-8 lg:py-12">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-12">
            {/* Tab Headers */}
            <div className="flex gap-4 md:gap-8 lg:gap-12 border-b border-black/10 mb-6 md:mb-8 lg:mb-12 overflow-x-auto pb-4">
              <button
                onClick={() => setActiveTab("features")}
                className={`font-semibold text-sm sm:text-base md:text-lg pb-3 md:pb-4 whitespace-nowrap transition-all ${
                  activeTab === "features"
                    ? "text-[#00B0CB] border-b-2 border-[#00B0CB]"
                    : "text-black/40 hover:text-[#231F20]/80"
                }`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab("applications")}
                className={`font-semibold text-sm sm:text-base md:text-lg pb-3 md:pb-4 whitespace-nowrap transition-all ${
                  activeTab === "applications"
                    ? "text-[#00B0CB] border-b-2 border-[#00B0CB]"
                    : "text-black/40 hover:text-[#231F20]/80"
                }`}
              >
                Applications
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "features" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 lg:mb-8 text-[#231F20]">Product Features</h3>
                  <div className="space-y-3 md:space-y-4 lg:space-y-6">
                    {productData.features.map((feature, idx) => (
                      <div key={idx} className="flex gap-3 md:gap-4 lg:gap-6 items-start">
                        <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl md:rounded-2xl bg-[#00B0CB]/10 flex items-center justify-center shrink-0">
                          {feature.icon === "thermostat" && <Thermometer className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#00B0CB]" />}
                          {feature.icon === "flash_off" && <ZapOff className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#00B0CB]" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-base md:text-lg lg:text-xl text-[#231F20] mb-1 md:mb-2">{feature.title}</h4>
                          <p className="text-black/50 text-xs sm:text-sm md:text-base font-light leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="glass-card p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl lg:rounded-3xl">
                  <h4 className="font-semibold text-base md:text-lg lg:text-xl text-[#231F20] mb-3 md:mb-4">Why Choose {productData.name}?</h4>
                  <ul className="space-y-2 md:space-y-3 lg:space-y-4">
                    <li className="flex items-start gap-2 md:gap-3">
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB] shrink-0" />
                      <span className="text-black/60 text-xs sm:text-sm md:text-base">Premium build quality with die-cast aluminum housing</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3">
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB] shrink-0" />
                      <span className="text-black/60 text-xs sm:text-sm md:text-base">Multiple beam angles for versatile lighting applications</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3">
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB] shrink-0" />
                      <span className="text-black/60 text-xs sm:text-sm md:text-base">Long lifespan of 50,000+ hours</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3">
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB] shrink-0" />
                      <span className="text-black/60 text-xs sm:text-sm md:text-base">Energy efficient with high lumen output</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "applications" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 lg:mb-8 text-[#231F20]">Real-World Applications</h3>
                  <p className="text-black/60 text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                    The {productData.name} is engineered for specific environments where performance and reliability matter. Discover how this lighting solution transforms spaces across different sectors.
                  </p>
                  <div className="space-y-4 md:space-y-6">
                    {productData.category?.includes("Residential") || productData.name.includes("TU") ? (
                      <>
                        <div className="flex gap-3 md:gap-4 items-start">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00B0CB]/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-base md:text-lg text-[#231F20] mb-1">Home Interiors</h4>
                            <p className="text-black/50 text-sm md:text-base">Perfect for living rooms, bedrooms, and dining areas where warm, comfortable lighting creates the right ambiance for daily living.</p>
                          </div>
                        </div>
                        <div className="flex gap-3 md:gap-4 items-start">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00B0CB]/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-base md:text-lg text-[#231F20] mb-1">Kitchen & Task Areas</h4>
                            <p className="text-black/50 text-sm md:text-base">Ideal for under-cabinet lighting, kitchen islands, and workspaces where focused illumination supports cooking and household tasks.</p>
                          </div>
                        </div>
                        <div className="flex gap-3 md:gap-4 items-start">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00B0CB]/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-base md:text-lg text-[#231F20] mb-1">Apartments & Housing</h4>
                            <p className="text-black/50 text-sm md:text-base">Compact design and efficient performance make it suitable for modern apartments, condominiums, and residential complexes.</p>
                          </div>
                        </div>
                      </>
                    ) : productData.category?.includes("Industrial") || productData.name.includes("Highbay") ? (
                      <>
                        <div className="flex gap-3 md:gap-4 items-start">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00B0CB]/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-base md:text-lg text-[#231F20] mb-1">Warehouses & Distribution Centers</h4>
                            <p className="text-black/50 text-sm md:text-base">High-mount installation provides uniform illumination across large storage facilities, improving visibility for inventory management and logistics operations.</p>
                          </div>
                        </div>
                        <div className="flex gap-3 md:gap-4 items-start">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00B0CB]/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-base md:text-lg text-[#231F20] mb-1">Manufacturing Plants</h4>
                            <p className="text-black/50 text-sm md:text-base">Robust construction withstands industrial environments while delivering consistent, high-output lighting for production lines and assembly areas.</p>
                          </div>
                        </div>
                        <div className="flex gap-3 md:gap-4 items-start">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00B0CB]/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-base md:text-lg text-[#231F20] mb-1">Gymnasiums & Sports Halls</h4>
                            <p className="text-black/50 text-sm md:text-base">High ceiling mounting with wide beam distribution eliminates shadows and provides glare-free lighting for athletic facilities and recreational centers.</p>
                          </div>
                        </div>
                      </>
                    ) : productData.category?.includes("Architectural") || productData.name.includes("Lazer") || productData.name.includes("Blade") ? (
                      <>
                        <div className="flex gap-3 md:gap-4 items-start">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00B0CB]/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-base md:text-lg text-[#231F20] mb-1">Modern Building Facades</h4>
                            <p className="text-black/50 text-sm md:text-base">Linear precision lighting accentuates architectural lines, creating dramatic exterior illumination for contemporary buildings and landmarks.</p>
                          </div>
                        </div>
                        <div className="flex gap-3 md:gap-4 items-start">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00B0CB]/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-base md:text-lg text-[#231F20] mb-1">Interior Accent Lighting</h4>
                            <p className="text-black/50 text-sm md:text-base">Recessed and surface-mounted options provide seamless integration into ceilings and walls for sophisticated ambient lighting in lobbies, galleries, and showrooms.</p>
                          </div>
                        </div>
                        <div className="flex gap-3 md:gap-4 items-start">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00B0CB]/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-base md:text-lg text-[#231F20] mb-1">Landscape & Outdoor Design</h4>
                            <p className="text-black/50 text-sm md:text-base">Weather-resistant profiles illuminate pathways, gardens, and outdoor structures, enhancing nighttime aesthetics of architectural landscapes.</p>
                          </div>
                        </div>
                      </>
                    ) : productData.category?.includes("Commercial") || productData.name.includes("Track") ? (
                      <>
                        <div className="flex gap-3 md:gap-4 items-start">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00B0CB]/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-base md:text-lg text-[#231F20] mb-1">Retail Stores & Showrooms</h4>
                            <p className="text-black/50 text-sm md:text-base">Adjustable track positioning allows precise spotlighting on merchandise, creating attractive displays that draw customer attention and enhance product presentation.</p>
                          </div>
                        </div>
                        <div className="flex gap-3 md:gap-4 items-start">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00B0CB]/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-base md:text-lg text-[#231F20] mb-1">Art Galleries & Museums</h4>
                            <p className="text-black/50 text-sm md:text-base">Directional control and high CRI rendering showcase artwork and exhibits with accurate color representation and minimal glare or UV exposure.</p>
                          </div>
                        </div>
                        <div className="flex gap-3 md:gap-4 items-start">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00B0CB]/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-base md:text-lg text-[#231F20] mb-1">Hospitality & Restaurants</h4>
                            <p className="text-black/50 text-sm md:text-base">Flexible positioning creates layered lighting schemes in hotels, cafes, and dining venues, highlighting tables, bars, and architectural features.</p>
                          </div>
                        </div>
                      </>
                    ) : productData.category?.includes("Premium") || productData.name.includes("Elite") ? (
                      <>
                        <div className="flex gap-3 md:gap-4 items-start">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00B0CB]/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-base md:text-lg text-[#231F20] mb-1">Luxury Residences & Villas</h4>
                            <p className="text-black/50 text-sm md:text-base">Premium finish and superior performance meet the exacting standards of high-end residential projects, delivering exceptional lighting quality for discerning homeowners.</p>
                          </div>
                        </div>
                        <div className="flex gap-3 md:gap-4 items-start">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00B0CB]/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-base md:text-lg text-[#231F20] mb-1">Corporate Headquarters</h4>
                            <p className="text-black/50 text-sm md:text-base">Executive offices, boardrooms, and reception areas benefit from refined aesthetics and consistent color temperature for professional environments.</p>
                          </div>
                        </div>
                        <div className="flex gap-3 md:gap-4 items-start">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00B0CB]/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-base md:text-lg text-[#231F20] mb-1">Boutique Hotels & Spas</h4>
                            <p className="text-black/50 text-sm md:text-base">Designer-grade fixtures enhance premium hospitality spaces, providing guests with sophisticated lighting experiences in suites, lounges, and wellness areas.</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex gap-3 md:gap-4 items-start">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00B0CB]/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-base md:text-lg text-[#231F20] mb-1">Commercial Spaces</h4>
                            <p className="text-black/50 text-sm md:text-base">Ideal for offices, retail stores, and public buildings requiring reliable, energy-efficient illumination with professional-grade performance.</p>
                          </div>
                        </div>
                        <div className="flex gap-3 md:gap-4 items-start">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00B0CB]/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-base md:text-lg text-[#231F20] mb-1">Industrial Facilities</h4>
                            <p className="text-black/50 text-sm md:text-base">Robust construction and high-output performance suit manufacturing plants, warehouses, and production environments demanding durable lighting solutions.</p>
                          </div>
                        </div>
                        <div className="flex gap-3 md:gap-4 items-start">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00B0CB]/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-base md:text-lg text-[#231F20] mb-1">Outdoor & Street Lighting</h4>
                            <p className="text-black/50 text-sm md:text-base">Weather-resistant housing and wide-area light distribution make it suitable for parking lots, roadways, and public outdoor spaces.</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="glass-card p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl lg:rounded-3xl">
                  <h4 className="font-semibold text-base md:text-lg lg:text-xl text-[#231F20] mb-3 md:mb-4">Key Benefits by Environment</h4>
                  <ul className="space-y-3 md:space-y-4">
                    <li className="flex items-start gap-2 md:gap-3">
                      <ZapOff className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-[#231F20] text-sm md:text-base block">Energy Efficiency</span>
                        <span className="text-black/50 text-xs md:text-sm">Reduces electricity consumption by up to 80% compared to traditional lighting</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3">
                      <Thermometer className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-[#231F20] text-sm md:text-base block">Thermal Management</span>
                        <span className="text-black/50 text-xs md:text-sm">Advanced heat dissipation ensures consistent performance in demanding conditions</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3">
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B0CB] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-[#231F20] text-sm md:text-base block">Long-Term Reliability</span>
                        <span className="text-black/50 text-xs md:text-sm">50,000+ hour lifespan minimizes maintenance and replacement costs</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Related Products */}
        <section className="py-12 md:py-20 lg:py-32">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 md:mb-12 lg:mb-16 gap-4 sm:gap-0">
              <div>
                <span className="text-[#00B0CB] font-medium text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-2 md:mb-4 block">Recommended</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#231F20]">Complete the Look</h2>
              </div>
              <div className="flex gap-2 md:gap-4">
                <button
                  onClick={() => scrollRelatedProducts("left")}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/10 flex items-center justify-center hover:border-[#00B0CB] text-black/40 hover:text-[#00B0CB] transition-all"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button
                  onClick={() => scrollRelatedProducts("right")}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/10 flex items-center justify-center hover:border-[#00B0CB] text-black/40 hover:text-[#00B0CB] transition-all"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>
            <div id="related-products-scroll" className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-6 md:pb-8 lg:pb-12 snap-x snap-mandatory hide-scrollbar">
              {productData.relatedProducts.map((relatedProduct, idx) => (
                <a
                  key={idx}
                  href={relatedProduct.url}
                  target="_blank"
                  rel="noreferrer"
                  className="min-w-[260px] sm:min-w-[290px] lg:min-w-[320px] snap-start bg-[#f2f2f2] rounded-[16px] md:rounded-[20px] lg:rounded-[24px] border border-black/5 overflow-hidden group hover:-translate-y-2 md:hover:-translate-y-4 transition-all duration-500"
                >
                  <div className="aspect-square bg-black/5 p-4 md:p-6 lg:p-8 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-[#00B0CB]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <div className="p-4 md:p-6 lg:p-8">
                    <span className="text-[#00B0CB] text-[9px] md:text-[10px] font-bold tracking-widest uppercase mb-1 md:mb-2 block">// {relatedProduct.category}</span>
                    <h4 className="text-base md:text-lg lg:text-xl font-bold mb-2 md:mb-4 text-[#231F20]">{relatedProduct.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-black/40 text-xs md:text-sm font-medium">{relatedProduct.wattage}</span>
                      <span className="text-[#00B0CB] font-semibold text-xs md:text-sm hover:underline">View →</span>
                    </div>
                  </div>
                </a>
              ))}
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
