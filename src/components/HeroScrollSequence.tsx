import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const frameCount = 192;
const currentFrame = (index: number) => `/frames/frame_${index.toString().padStart(3, "0")}_delay-0.041s.webp`;

export default function HeroScrollSequence({ children }: { children?: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const stateRef = useRef({ frame: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile/tablet on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Laptop breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // 1. Initial Load Images
    let loadedCount = 0;
    const tempImages: HTMLImageElement[] = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load frame ${i}`);
        loadedCount++;
        if (loadedCount === frameCount) setImagesLoaded(true);
      };
      img.src = currentFrame(i);
      tempImages.push(img);
    }
    imagesRef.current = tempImages;
  }, []);

  useEffect(() => {
    if (!imagesLoaded || isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      const frameIndex = Math.floor(stateRef.current.frame);
      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete) return;

      const cw = canvas.width;
      const ch = canvas.height;
      if (cw === 0 || ch === 0) return;

      ctx.clearRect(0, 0, cw, ch);

      // Object cover logic
      const hRatio = cw / img.width;
      const vRatio = ch / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const x = (cw - img.width * ratio) / 2;
      const y = (ch - img.height * ratio) / 2;

      ctx.drawImage(img, 0, 0, img.width, img.height, x, y, img.width * ratio, img.height * ratio);
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      if (canvas.width !== clientWidth) canvas.width = clientWidth;
      if (canvas.height !== clientHeight) canvas.height = clientHeight;
      render();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.to(stateRef.current, {
        frame: frameCount - 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000",
          pin: true,
          scrub: true,
          onUpdate: render,
        },
      });
    });

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      mm.revert();
    };
  }, [imagesLoaded, isMobile]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-black overflow-hidden flex items-center pt-24"
    >
      {/* Static image for mobile/tablet */}
      {isMobile && (
        <div className="absolute inset-0 z-0 w-full h-full">
          <img 
            src="/frames/frame_212_delay-0.041s.webp" 
            alt="Factor LED Product"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center center' }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      )}

      {/* Canvas animation for laptop/desktop */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 block w-full h-full object-cover z-0 pointer-events-none drop-shadow-2xl opacity-60 md:opacity-100 hidden lg:block"
      ></canvas>
      
      <div className="relative z-10 w-full">
        {children}
      </div>

      <div className="absolute bottom-12 right-12 hidden lg:block z-30 pointer-events-none">
        <div className="font-didot italic text-2xl text-neutral-300 transform-gpu">&quot;Light as an art form.&quot;</div>
      </div>
    </div>
  );
}
