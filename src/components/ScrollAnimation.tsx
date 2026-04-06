/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { useMobileDetection } from "../hooks/useMobileDetection";

interface ScrollAnimationProps {
  frameCount?: number;
  framePath?: string;
  className?: string;
  staticFrame?: number; // If provided, show static image instead of animation
  disableOnMobile?: boolean;
}

export function ScrollAnimation({
  frameCount = 214,
  framePath = "/frames/frame_",
  className = "",
  staticFrame,
  disableOnMobile = true
}: ScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(staticFrame || 0);
  const [phase, setPhase] = useState<"entering" | "animating" | "completed">("entering");
  const accumulatedDeltaRef = useRef(0);
  const animationProgressRef = useRef(0);
  const { isMobile, isTouchDevice } = useMobileDetection();

  // Determine if we should show static or animated
  const showStatic = staticFrame !== undefined || (disableOnMobile && isMobile);
  const effectiveFrame = showStatic ? (staticFrame || 212) : currentFrame;
  const SCROLL_DISTANCE = 2000;

  // Preload images (only for desktop animation mode)
  useEffect(() => {
    if (showStatic) return;
    for (let i = 0; i < Math.min(20, frameCount); i++) {
      const img = new Image();
      img.src = `${framePath}${String(i).padStart(3, "0")}_delay-0.041s.webp`;
    }
  }, [frameCount, framePath, showStatic]);

  // Handle scroll locking and frame animation (desktop only)
  useEffect(() => {
    if (showStatic || phase === "completed") return;

    const container = containerRef.current;
    if (!container) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
      
      if (phase === "entering" && distanceFromCenter < viewportHeight * 0.3) {
        setPhase("animating");
        lastScrollY = window.scrollY;
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${lastScrollY}px`;
        document.body.style.width = "100%";
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (phase !== "animating") return;
      e.preventDefault();
      e.stopPropagation();

      accumulatedDeltaRef.current += e.deltaY;
      if (accumulatedDeltaRef.current < 0) accumulatedDeltaRef.current = 0;

      const progress = Math.min(1, accumulatedDeltaRef.current / SCROLL_DISTANCE);
      animationProgressRef.current = progress;

      const frameIndex = Math.floor(progress * (frameCount - 1));
      setCurrentFrame(Math.max(0, Math.min(frameCount - 1, frameIndex)));

      if (progress >= 1) {
        setPhase("completed");
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        const containerHeight = container?.offsetHeight || window.innerHeight;
        window.scrollTo(0, lastScrollY + containerHeight);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (phase !== "animating") return;
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase !== "animating") return;
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space", "Home", "End"].includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [phase, frameCount, showStatic]);

  const frameSrc = `${framePath}${String(effectiveFrame).padStart(3, "0")}_delay-0.041s.webp`;
  const progress = animationProgressRef.current;

  // Mobile static mode: full viewport
  if (showStatic) {
    return (
      <div
        ref={containerRef}
        className={`relative w-full h-screen ${className}`}
        style={{ backgroundColor: "#000" }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={frameSrc}
            alt="Product showcase"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${phase === "animating" ? "h-screen fixed inset-0 z-50" : phase === "completed" ? "h-auto min-h-screen" : "h-screen"} ${className}`}
      style={{ backgroundColor: "#000" }}
    >
      <div className={`w-full h-full flex items-center justify-center ${phase === "animating" ? "fixed inset-0" : ""}`}>
        <img
          src={frameSrc}
          alt={`Frame ${effectiveFrame}`}
          className="w-full h-full object-cover"
        />
      </div>

      {phase === "animating" && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3">
          <div className="text-white/80 text-sm font-[Poppins] tracking-wide">
            Scroll to explore
          </div>
          <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#00B0CB] transition-all duration-75 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
